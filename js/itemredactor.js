let itemId = localStorage.getItem("currentItemId");
let isEditing = false;
if(itemId != null)
{
    isEditing = true;
    document.getElementById("actionType").innerHTML = "Редагування товару";
    LoadItemData();
}

let itemParameters = Array();
let itemImage;
//#region Item Editor
function SaveItem()
{
    let itemName = document.getElementById("itemName").value;
    if(itemName.length < 10 || itemName.length > 128)
    {
        ShowModal("Назва товару не може бути меньше 10 символів і більше, ніж 128 символи.", "Ок", "", "", "");
        return;
    }
    let itemCategory = document.getElementById("itemCategory").value;
    let itemDesc = document.getElementById("itemDesc").value;
    if(itemDesc.length > 4096)
    {
        ShowModal("Довжина опису не може бути більша, ніж 4096 символи.", "Ок", "", "", "");
        return;
    }
    if(itemImage == null)
    {
        ShowModal("Необхідно завантажити зображення товару.", "Ок", "", "", "");
        return;
    }
    let itemPrice = document.getElementById("itemPrice").value;
    if(itemPrice <= 0)
    {
        ShowModal("Ціна товару не може бути меньше або дорівнювати нулю.", "Ок", "", "", "");
        return;
    }    

    if(isEditing)
    {
        let data = {
            "itemId":itemId,
            "itemCategory": itemCategory,
            "itemName":itemName,
            "itemDesc":itemDesc,
            "itemImg":itemImage,
            "itemPrice":itemPrice,
            "itemParams":ParamsToStr(itemParameters)
        }
        ajax('core/editItem.php','POST', Callback, data);
        function Callback(result)
        {
            if(result == 1)
            {
                localStorage.removeItem("currentItem");
                location.href = "itempage.html";
            } 
            else alert(result);
        }
    }
    else
    {
        let vendorId = localStorage.getItem("userData").split(",")[0];
        let data = {
            "itemVendor":vendorId,
            "itemCategory":itemCategory,
            "itemName":itemName,
            "itemDesc":itemDesc,
            "itemImg":itemImage,
            "itemPrice":itemPrice,
            "itemParams":ParamsToStr(itemParameters)
        }
        ajax('core/addItem.php','POST', Callback, data);
        function Callback(result)
        {
            if(result == 1)
            {
                localStorage.removeItem("currentItem");
                location.href = "catalog.html";
            } 
            else alert(result);
        }
    }
}
function LoadItemData()
{
    ajax('core/getItems.php','POST', GetItem, {"itemId": itemId});
    function GetItem(result)
    {
        let currentItem = MapItems(result)[0];
        if(currentItem == null) alert("Item id error.");

        let itemName = document.getElementById("itemName");
        let itemCategory = document.getElementById("itemCategory");
        let itemDesc = document.getElementById("itemDesc");
        let itemPrice = document.getElementById("itemPrice");
        let itemImg = document.getElementById("itemImage");

        itemName.value = currentItem.name;
        itemCategory.value = currentItem.category;
        itemDesc.value = currentItem.description;
        itemPrice.value = currentItem.price;
        itemImg.src = currentItem.img;

        itemImage = currentItem.img.replace(/^data:.+;base64,/, "");
        itemParameters = currentItem.params;
        RefreshTable();
    }
}
function UploadImage(e)
{
    var file = e.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        document.getElementById("itemImage").src = reader.result;
        itemImage = reader.result.replace(/^data:.+;base64,/, "");
    }
    reader.readAsDataURL(file);
}
//#endregion
//#region Parameter Table
function RefreshTable()
{
    let parameterTable = document.getElementById("parameterTable");
    let tableHtml = "";
    for(let i = 0; i < itemParameters.length; i++)
    {
        let parameterName = itemParameters[i][0];
        let parameterValue = itemParameters[i][1];
        tableHtml += `
        <tr>
            <td>${i}</td>
            <td><input class="form-control w-100" value="${parameterName}" onchange="UpdateParameterName(this,${i})"></td>
            <td><input class="form-control w-100" value="${parameterValue}" onchange="UpdateParameterValue(this,${i})"></td>
            <td><button class="btn btn-danger" onclick="RemoveParameter(${i})">
                <i class="fa fa-trash"></i>
            </td>
        </tr>`;
    }
    parameterTable.innerHTML = tableHtml;
}
function UpdateParameterName(fieldValue, itemIndex)
{
    if(fieldValue.value.length < 1)
    {
        ShowModal("Назва параметру не може бути пустим!", "Ок", "", "", "");
        RefreshTable();
        return;
    }
    itemParameters[itemIndex][0] = fieldValue.value;
}
function UpdateParameterValue(fieldValue, itemIndex)
{
    if(fieldValue.value.length < 1)
    {
        ShowModal("Значення параметру не може бути пустим!", "Ок", "", "", "");
        RefreshTable();
        return;
    }
    itemParameters[itemIndex][1] = fieldValue.value;
}
function AddParameter()
{
    itemParameters.push(["Новий параметер", "Значення"]);
    RefreshTable();
}
function RemoveParameter(parameterIndex)
{
    itemParameters.splice(parameterIndex, 1);
    RefreshTable();
}
//#endregion
