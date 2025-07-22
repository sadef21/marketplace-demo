let cart = localStorage.getItem("cart");
let orderScrip = 0;
let itemList = new Array();
LoadItems();

function LoadItems()
{
    if(cart == null) return;
    ajax('core/getItems.php','POST', GetItems);
    function GetItems(result)
    {
        itemList = MapItems(result);
        UpdateCart();
    }
}
function UpdateCart()
{
    let cartItems = document.getElementById("cartItems");
    let totalPrice = document.getElementById("totalPrice");
    let cartHTML = "";
    cart = JSON.parse(cart);
    Object.keys(cart).forEach(element => {
        let currenItem = itemList.find(x=>x.id == element);
        if(currenItem == null) alert("Error");
        let thisPrice = currenItem.price * cart[element];
        cartHTML += `
        <tr>
            <td class="text-center"><img style="object-fit: contain; height:5em;" src=${currenItem.img}></td>
            <th>${currenItem.name}</th>
            <td>${cart[element]} шт.</td>
            <td>${currenItem.price} грн.</td>
            <td>${thisPrice} грн.</td>
        </tr>
        `;
        orderScrip += thisPrice;
    });
    cartItems.innerHTML = cartHTML;
    totalPrice.innerHTML = `Всього товарів на: ${orderScrip}грн.`;
}
function MakeOrder()
{
    if(itemList.length <= 0)
    {
        ShowModal(`Увага`, "Кошик порожній.", "Ок", "", "", "");
        return;
    }
    let newModal = `
    <form novalidate="">
        <div class="row mb-3">
            <div class="col-md-4">
                <label for="firstName">Ім'я</label>
                <input type="text" class="form-control" id="firstName" placeholder="Ім'я">
            </div>
            <div class="col-md-4">
                <label for="lastName">Прізвище</label>
                <input type="text" class="form-control" id="lastName" placeholder="Прізвище">
            </div>
            <div class="col-md-4">
                <label for="patronymic">По-батькові</label>
                <input type="text" class="form-control" id="patronymic" placeholder="По-батькові">
            </div>
        </div>
        <div class="row mb-3">
            <div>
                <label for="email">Email</label>
                <input class="form-control" type="email" id="email" placeholder="email@mail.com">
            </div>
        </div>
        <div class="row mb-3">
            <div>
                <input class="form-check-input" id="delivery" type="checkbox" data-bs-toggle="collapse" data-bs-target="#deliveryCollapse" aria-expanded="false" aria-controls="deliveryCollapse">
                <label class="form-check-label" for="delivery">З доставкою?</label></input>
            </div>
            <div class="collapse" id="deliveryCollapse">
                <label for="country">Місто</label>
                <select class="form-select" id="country">
                    <option value="">Київ</option>
                    <option value="">Житомир</option>
                    <option value="">Чернігів</option>
                    <option value="">Суми</option>
                    <option value="">Черкаси</option>
                    <option value="">Харків</option>
                    <option value="">Одеса</option>
                    <option value="">Полтава</option>
                    <option value="">Запоріжжя</option>
                    <option value="">Кривий ріг</option>
                    <option value="">Вінниця</option>
                    <option value="">Івано-франківськ</option>
                    <option value="">Львів</option>
                    <option value="">Ужгород</option>
                </select>
                <div>
                    <label for="address">Адреса</label>
                    <input type="text" class="form-control" id="address" placeholder="вул. Вулиця 1">
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <label for="paymentMethod">Оплата</label>
            <div id="paymentMethod">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="payment" id="flexRadioDefault1">
                    <label class="form-check-label" for="flexRadioDefault1">
                        Готівкою
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="payment" id="flexRadioDefault2" checked>
                    <label class="form-check-label" for="flexRadioDefault2">
                        Онлайн
                    </label>
                </div>
            </div>
        </div>
    </form>`;
    ShowModal(`Оформлення замовлення`,newModal, "Підтвердити", "MakeOrderConfirmed()", "Скасувати", "");
}
function MakeOrderConfirmed()
{
    console.log("Cart ordered");
    let data = {
        "userId": GetUserId(),
        "orderContent": JSON.stringify(cart),
        "orderDate": new Date().toISOString().split('T')[0]
    }
    ajax("core/addOrder.php", "POST", Callback, data);
    function Callback(result)
    {
        if(result == 1)
        {
            ClearCartConfirmed()
        } else alert(result);
    }
}
function ClearCart()
{
    ShowModal("Повідомлення", "Ви впевнені, що хочете очистити кошик?", "Ні", "", "Так", "ClearCartConfirmed()");
}
function ClearCartConfirmed()
{
    localStorage.removeItem("cart");
    location.href = "cart.html";
}