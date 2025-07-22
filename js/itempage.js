let itemId = localStorage.getItem("currentItemId");
let currentItem;
if(itemId == null)
{
    console.log("Current Item id is null!");
    location.href = "catalog.html";
}
function UpdateItemInfo()
{
    if(itemId == null)
    {
        alert("Помилка товару");
        location.href = "catalog.html";
    }

    ajax('core/getItems.php','POST', GetItem, {"itemId": itemId});
    function GetItem(result)
    {
        currentItem = MapItems(result)[0];

        let _itemImage = document.getElementById("itemImage");
        let _itemName = document.getElementById("itemName");
        let _itemDescription = document.getElementById("itemDescription");
        let _itemPrice = document.getElementById("itemPrice");
        let _itemVendor = document.getElementById("itemVendor");
        let _metaTable = document.getElementById("itemTable");
    
        _itemName.innerHTML = currentItem.name;
        _itemDescription.innerHTML = currentItem.description;
        _itemImage.src = currentItem.img;
        _itemPrice.innerHTML = `${currentItem.price} ₴`;
        
        let params = currentItem.params;
        _metaTable.innerHTML += `
            <tr>
                <td>Категорія</td>
                <td>${CategoryName(currentItem.category)}</td>
            </tr>`;
        for(let i = 0; i < params.length; i++)
        {
            _metaTable.innerHTML += `
            <tr>
                <td>${params[i][0]}</td>
                <td>${params[i][1]}</td>
            </tr>`;
        }
        ajax('core/getUser.php','POST', GetUser, {"userId": currentItem.vendor});
        function GetUser(user)
        {
            user = JSON.parse(user);
            _itemVendor.innerHTML = `Продавець: ${user[0].userName}`;
        }
        if(CheckSession())
            if(GetUserPermission() > 1 || GetUserId() == currentItem.vendor)
                AddManagerButtons();
        UpdateFeedback();
    }
}
function AddToCart()
{
    if(!CheckSession())
    {
        ShowModal("Повідомлення", "Щоб додати товар до кошика потрібно спочатку авторизуватися.", "Авторизація", "location.href = 'login.html'", "", "");
        return;
    }
    var itemCount = parseInt(document.getElementById("itemCount").value);

    var storage = localStorage.getItem("cart") ?? "{}";
    storage = JSON.parse(storage);
    if(storage[itemId] != null)
        storage[itemId]+= itemCount;
    else storage[itemId] = itemCount;
    localStorage.setItem("cart", JSON.stringify(storage));

    ShowModal("Повідомлення", "Товар додано до кошику.", "Перевірити кошик", "location.href='cart.html'", 
        "Продовжити покупки", "location.href='catalog.html'");
}
//#region Edit Item
function AddManagerButtons()
{
    let buttonsHolder = document.getElementById("buttonsHolder");
    buttonsHolder.innerHTML +=`
        <div class="btn-group btn-block p-0 w-100" role="group">
            <button type="button" class="btn btn-secondary" onclick="EditItem()">
            <i class = "fa fa-edit"> Редагувати товар</i>
            </button>
            <button type="button" class="btn btn-danger" onclick="DeleteItem()">
            <i class = "fa fa-edit"> Видалити товар</i>
            </button>
        </div>`
}
function EditItem()
{
    if(GetUserPermission() > 1 || GetUserId() == currentItem.vendor)
    {
        location.href = "itemredactor.html";
    }
    else ShowModal("Повідомлення", "Необхідно права доступу.", "Ок", "", "", "");
}
function DeleteItem()
{
    if(GetUserPermission() > 1 || GetUserId() == currentItem.vendor)
    {
        let i = localStorage.getItem("currentItemId");
        ShowModal("Увага!", "Ви впевнені, що хочете видалити товар?", "Ні", "", "Так", `DeleteItemConfirmed(${i})`);
    }
    else ShowModal("Повідомлення", "Необхідно права доступу.", "Ок", "", "", "");
}
function DeleteItemConfirmed(i)
{
    let data = {
        "itemId":i
    }
    ajax('core/deleteItem.php','POST', Callback, data);
    function Callback(result)
    {
        if(result == 1)
        {
            location.href = "catalog.html";
        }
        else alert(result);
    }
}

//#endregion
//#region Feedback
function UpdateFeedback()
{
    let commentContainer = document.getElementById("comments");
    ajax('core/getFeedback.php','POST', LoadFeedback, {"itemId": itemId});
    function LoadFeedback(result)
    {
        if(result.length <= 1) return;
        let comments = JSON.parse(result);
        let commentHTML = "";
        comments.forEach(element => {
            commentHTML += 
            `<div class="card mt-2">
                <div class="card-body">
                    <h5 class="card-title">${element.userName}</h5>
                    <p class="card-text">${element.feedbackText}</p>
                </div>
            </div>`
        })
        commentContainer.innerHTML = commentHTML;
    }
}
function AddFeedback()
{
    if(!CheckSession())
    {
        ShowModal("Повідомлення", "Щоб залишити відгук потрібно спочатку авторизуватися.", "Авторизація", "location.href = 'login.html'", "", "");
        return;
    }
    let feedbackField = document.getElementById("commentField");
    if(feedbackField.value.length <= 5) return;
    ajax('core/addFeedback.php','POST', Callback, {"itemId": itemId, "userId": GetUserId(), "feedbackText": feedbackField.value});
    function Callback(result)
    {
        feedbackField.value = "";
        UpdateFeedback();
    }
}
//#endregion
UpdateItemInfo();