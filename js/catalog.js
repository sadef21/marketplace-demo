isInCatalog = true;
localStorage.removeItem("currentItemId");
let currentCategory = parseInt(localStorage.getItem("currentCategory"));
document.getElementById("categoryName").innerHTML = CategoryName(currentCategory);

let _itemList = new Array();
let filterList = new Array();
let minPrice;
let maxPrice;
let minPriceTotal = 0;
let maxPriceTotal = 999999;
let storedSearch = localStorage.getItem("search");

if(CheckSession())
{
    if(GetUserPermission() > 0)
    {
        document.getElementById("addItemBtn").innerHTML= `                    
        <button class="btn btn-success w-100" onclick="AddItem()">
            <i class="fa fa-plus-square-o"> Додати товар</i>
        </button>`;
    }
}
LoadItems();

//#region Items
function LoadItems()
{
    ajax('core/getItems.php','POST', GetItems, {"itemCategory":currentCategory});
    function GetItems(result)
    {
        _itemList = MapItems(result);
        minPriceTotal = Math.min(..._itemList.map(o => o.price));
        maxPriceTotal = Math.max(..._itemList.map(o => o.price));
        maxPrice = maxPriceTotal;
        UpdateParameters(_itemList);
        UpdateSlider(true);
    }
}
function DisplayItems()
{
    let htmlPlaceholder = document.getElementById("itemsContainer");
    let filteredItemList = FilterItems(_itemList);
    htmlPlaceholder.innerHTML = "";
    if(filteredItemList.length > 0)
    {
        for(let i = 0; i < filteredItemList.length; i++)
        {
            htmlPlaceholder.innerHTML += ItemHtml(filteredItemList[i]);
        }
    }
    else htmlPlaceholder.innerHTML = `<div class="h1">Товарів не знайдено.</div>`;
    document.getElementById("itemsCount").innerHTML = `Всього відображено: ${filteredItemList.length}`;
}
function ItemHtml(item){
    if(item == null) return null;
    let itemHtml =`<div class="col">
        <div class="card h-100 textBtn cardEffect" onclick="LoadItemDetails(${item.id})">
            <img class="card-img-top" src="${item.img}" alt="preview" style="height:15em; object-fit: contain;">
            <div class="card-body">
                <h6 class="card-title">${item.name}</h6>
                <p class="card-text text-truncate">${item.description}</p>
            </div>
            <div class="card-footer fs-5">${item.price}₴</div>
        </div>
    </div>`;
    return itemHtml;
}
function FilterItems(unfilteredList)
{
    let filteredItems = unfilteredList;
    
    if(storedSearch != null)
        filteredItems = filteredItems.filter(x=>x.name.toLowerCase().includes(storedSearch.toLowerCase()));

    filteredItems = filteredItems.filter(x=>x.price >= minPrice && x.price <= maxPrice);

    //Parameter comprasion
    let tempList = new Array();
    for(let i = 0; i < filteredItems.length; i++)
    {
        let currentItem = filteredItems[i];
        let currentItemParams = currentItem.params;
        let fits = true;
        if(filterList.length > 0)
        {
            fits = false;
            for(let y = 0; y < filterList.length; y++)
            {
                let currentFilter = filterList[y];
                let matchingName = currentItemParams.find(x=>x[0] == currentFilter[0])
                if(matchingName != null)
                {
                    let matchingValue = currentFilter[1].find(x=>x == matchingName[1]);
                    if(matchingValue != null)
                    {
                        fits = true;
                        continue;
                    }
                    else { fits = false; break;}
                }
                else { fits = false; break;}
            }
        }
        if(!fits) continue;
        tempList.push(currentItem);
    }
    filteredItems = tempList;
    //Sorting
    switch(parseInt(document.getElementById("SortingType").value))
    {
        case 2: filteredItems.sort((a, b)=> parseFloat(a.price) > parseFloat(b.price) ? 1 : -1); break;
        case 3: filteredItems.sort((a, b)=> parseFloat(a.price) < parseFloat(b.price) ? 1 : -1); break;
        default: filteredItems.sort((a, b)=> a.name > b.name ? 1 : -1); break;
    }

    return filteredItems;
}
function LoadItemDetails(itemId)
{
    localStorage.setItem("currentItemId", itemId);
    location.href = "itempage.html";
}
function AddItem()
{
    location.href = "itemredactor.html";
}
//#endregion
//#region Parameters
function UpdateParameters(itemList)
{
    let filters = new Array();
    for(let i = 0; i < itemList.length; i++)
    {
        let currenItem = itemList[i];
        let currentParams = currenItem.params; // Parameters of current item
        for(let y = 0; y < currentParams.length; y++)
        {
            let currentParam = currentParams[y]; // Current parameter of item`s parameters
            let matchingName = filters.find(x=>x[0] == currentParam[0]) // Parameter in filters with matching name
            if(matchingName != null) // If filters have parameter with this name
            {
                let matchingValue = matchingName[1].find(x=>x == currentParam[1]) // Parameter in filters with matching values
                if(matchingValue != null) continue; // If exists continue iteration
                else // If doesnt add value to filters category
                { 
                    matchingName[1].push(currentParam[1]);
                }
            } 
            else // If doesnt add parameter category and its value
            { 
                filters.push([currentParam[0], [currentParam[1]]]);
            }
        }
    }

    let parameterHolder = document.getElementById("parameters");
    let parametersHtml = "";
    parametersHtml +=`
    <!-- Price -->
    <div class="accordion-item border">
        <div class="btn btn-block textBtn d-flex" data-bs-toggle="collapse"
            data-bs-target="#collapseParameterPrice" aria-expanded="false" aria-controls="collapseParameterPrice">
            <div class="col-10 text-start">Ціна</div>
            <div class="col-2 text-end"><i class="fa fa-sort ml-auto p-2"></i></div>
        </div>
        <div id="collapseParameterPrice" class="accordion-collapse collapse show p-2">
            <div class="input-group">
                <span class="input-group-text">Від</span>
                <input id="minPrice" type="number" min="${minPriceTotal}" value="${minPriceTotal}" max="${maxPriceTotal}" class="form-control" onchange="UpdateSlider()">
                <span class="input-group-text">До</span>
                <input id="maxPrice" type="number" min="${minPriceTotal}" value="${maxPriceTotal}" max="${maxPriceTotal}" class="form-control" onchange="UpdateSlider()">
            </div>
            <input id="priceSlider" type="range" min="0" value="1" max="1" step="0.001" class="form-range" onchange="UpdateSlider(true)">
        </div>
    </div>`;

    for(let i = 0; i < filters.length; i++)
    {
        let currentParam = filters[i];
        let parameterName = currentParam[0];
        let parameters = "";
        for(let y = 0; y < currentParam[1].length; y++)
            parameters += MakeCheckbox(currentParam[0], currentParam[1][y], `${i}-${y}`);
        parametersHtml += `
        <!-- Parameter${i} -->
        <div class="accordion-item border">
            <div class="btn btn-block textBtn d-flex" data-bs-toggle="collapse"
                data-bs-target="#collapseParameter${i}" aria-expanded="false" aria-controls="collapseParameter${i}">
                <div class="col-10 text-start">${parameterName}</div>
                <div class="col-2 text-end"><i class="fa fa-sort ml-auto p-2"></i></div>
            </div>
            <div id="collapseParameter${i}" class="accordion-collapse collapse show p-2">
            ${parameters}
            </div>
        </div>`;
    }
    parameterHolder.innerHTML = parametersHtml;
}
function MakeCheckbox(paramName, paramValue, id)
{
    return `<input class="form-check-input" type="checkbox" id="${id}" onclick='TickParameter("${paramName}", "${paramValue}")'>
    <label class="form-check-label textBtn" for="${id}">${paramValue}</label></input><br>`;
}
function TickParameter(paramName, paramValue)
{
    let matchingName = filterList.find(x=>x[0] == paramName);
    if(matchingName != null)
    {
        let matchingValue = matchingName[1].find(x=>x == paramValue);
        if(matchingValue != null)
        {
            matchingName[1].splice(matchingName[1].indexOf(matchingValue), 1);
            if(matchingName[1].length == 0)
            {
                filterList.splice(filterList.indexOf(matchingName), 1);
            }
        }
        else
        {
            matchingName[1].push(paramValue);
        }
    }
    else
    {
        filterList.push([paramName, [paramValue]]);
    }
    /*let debug="";
    for(let i = 0; i < filterList.length; i++)
    {
        let currentParam = filterList[i];
        debug += `${currentParam[0]}: `;
        for(let y = 0; y < currentParam[1].length; y++)
        {
            debug += `${currentParam[1][y]}, `;
        }
        debug += '\n';
    }
    alert(debug);*/
    DisplayItems();
}
function UpdateSlider(isSlider = false)
{
    let minPriceInput = document.getElementById("minPrice");
    let maxPriceInput = document.getElementById("maxPrice");
    let priceSlider = document.getElementById("priceSlider");

    minPrice = parseFloat(minPriceInput.value);
    if(isSlider)
    {
        let sliderval = priceSlider.value;
        maxPrice = Math.round(minPrice + ((maxPriceTotal - minPrice) * sliderval));
        maxPriceInput.value = maxPrice;
    }
    else maxPrice = parseFloat(maxPriceInput.value);
    DisplayItems();
}
//#endregion
//#region Search
function Search()
{
    storedSearch = document.getElementById("searchField").value;
    DisplayItems();
}
if(storedSearch != null)
{
    document.getElementById("searchField").value = storedSearch;
    localStorage.removeItem("search");
    Search();
}
//#endregion