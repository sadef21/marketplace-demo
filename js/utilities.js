//#region Session
function GetUserPermission()
{
    return parseInt(localStorage.getItem("userData").split(",")[2]);
}
function GetUserId()
{
    return parseInt(localStorage.getItem("userData").split(",")[0]);
}
function CheckSession()
{
    return localStorage.getItem("userData") != null;
}
//#endregion
//#region Modal Window
function AddModal()
{
    let modalCore = `
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" id="MyModal">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title fs-5" id="exampleModalLongTitle">Title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
                </div>
                <div class="modal-body" id="modalBody"></div>
                <div class="modal-footer">
                    <div id="modalButtonNo"></div>
                    <div id="modalButtonYes"></div>
                </div>
            </div>
        </div>
    </div>`;
    document.body.innerHTML += modalCore;
}
function ShowModal(titleText, modalText, yesBtn, yesAction, noBtn, noAction)
{
    document.getElementById("exampleModalLongTitle").innerHTML = titleText;
    document.getElementById("modalBody").innerHTML = modalText;
    if(yesBtn)
        document.getElementById("modalButtonYes").innerHTML = `<button type="button" class="btn btn-success" data-bs-dismiss="modal" onclick="${yesAction}">${yesBtn}</button>`;
    if(noBtn)
        document.getElementById("modalButtonNo").innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="${noAction}">${noBtn}</button>`;

    var mm = new bootstrap.Modal(document.getElementById('exampleModalCenter'), {});
    mm.show();
}
AddModal();
//#endregion
//#region Item class
class Item{
    constructor(id, vendor, category, name, description, img, price, params)
    {
        this.id = id;
		this.vendor = vendor;
        this.category = category;
        this.name = name;
        this.description = description;
        this.img = img;
		this.price = price;
        this.params = params;
    }
}

function MapItems(result)
{
    if(result == 1)
        return;
    result = JSON.parse(result);
    var returnArray = new Array();
    result.forEach(element => {
        let newItem = new Item();
        newItem.id = element.itemId;
        newItem.vendor = element.vendorId;
        newItem.category = parseInt(element.itemCategory);
        newItem.name = element.itemName;
        newItem.description = element.itemDesc;
        newItem.img = "data:image/png;base64," + element.itemImg;
        newItem.price = element.itemPrice;
        newItem.params = StrToParams(element.itemParams);
        returnArray.push(newItem);
    });
    return returnArray;
}
function ParamsToStr(params)
{
    let parametersToString = "";
    for(let i = 0; i < params.length; i++)
    {
        parametersToString += `${params[i][0]}:${params[i][1]};`;
    }
    return parametersToString;
}
function StrToParams(str)
{
    let params = new Array();
    let pairs = str.split(";");
    for(let i = 0; i < pairs.length - 1; i++)
    {
        let pair = pairs[i].split(":");
        params.push([pair[0], pair[1]]);
    }
    return params;
}
//#endregion
function CategoryName(i)
{
    switch(i)
    {
        case 1: return "Побутові товари";
        case 2: return "Краса та здоров'я";
        case 3: return "Комп'ютерні комплектуючі";
        case 4: return "Інструменти та автотовари";
        case 5: return "Смартфони, ТВ та електроніка";
        default: return "Категорія не існує.";
    }
}