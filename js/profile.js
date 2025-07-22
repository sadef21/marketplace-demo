let itemList = new Array();
function LoadOrders()
{
    ajax('core/getItems.php','POST', GetItems);
    function GetItems(result)
    {
        itemList = MapItems(result);
        ajax('core/getOrders.php','POST', GetOrders, {"userId": GetUserId()});
        function GetOrders(result)
        {
            let ordersPlaceholder = document.getElementById("orderPlaceholder");
            result = JSON.parse(result);
            if(result.length > 0) ordersPlaceholder.innerHTML = "";
            result.forEach(element => {
                let orderItems = JSON.parse(element.orderContent);
                let orderContent = "";
                let price = 0;
                Object.keys(orderItems).forEach(pairId => {
                    let currenItem = itemList.find(x=>x.id == pairId);
                    if(currenItem != null)
                    {
                        let currentTotal = currenItem.price * orderItems[pairId];
                        orderContent += `
                        <div class="row">
                            <div class="col-2 text-center"><img style="object-fit: contain; height:4em" class="w-100" src=${currenItem.img}></div>
                            <div class="col-5 h6">${currenItem.name}</div>
                            <div class="col-5">
                                <div class="row">${currenItem.price} грн. * ${orderItems[pairId]} шт.</div>
                                <div class="row h6">${currentTotal} грн.</div>
                            </div>
                        </div>`;
                        price += currentTotal;
                    }
                });
                let orderHtml = `
                <tr>
                    <td>${element.orderId}</td>
                    <td colspan="2">${orderContent}</td>
                    <td>${price} грн.</td>
                    <td>${element.orderDate}</td>
                </tr>
                `;
                ordersPlaceholder.innerHTML += orderHtml;
            });
        }
    }
}
function UpdateProfile()
{
    let username = document.getElementById("userName");
    let userPermission = document.getElementById("userPermission");

    let d = localStorage.getItem("userData").split(",");

    username.innerHTML = d[1];
    let permissionName = "";
    switch(d[2])
    {
        case "0": permissionName = "Покупець"; break;
        case "1": permissionName = "Продавець"; break;
        case "2": permissionName = "Менеджер"; break;
        default: permissionName = "Помилка"; break;
    }
    userPermission.innerHTML = permissionName;
}
function LogOut()
{
    localStorage.removeItem("userData");
    location.href = "index.html";
}
LoadOrders();
UpdateProfile();