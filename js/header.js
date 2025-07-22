var isInCatalog = false;
//#region Header
let header = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
    <a class="navbar-brand h3 m-0" href="index.html">
        <img src="images/favicon.png" width="64" height="64" class="d-inline-block">
        Sell Zone
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDropdown" aria-controls="navbarDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse p-0" id="navbarDropdown">
        <ul class="navbar-nav mr-auto w-100 align-items-center justify-content-between">
            <li class="nav-item"></li>

            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle btn btn-success text-center text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-qrcode fa-2x"> Каталог</i>
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="SetCategory(1)" href='catalog.html'>Побутові товари</a></li>
                    <li><a class="dropdown-item" onclick="SetCategory(2)" href='catalog.html'>Краса та здоров'я</a></li>
                    <li><a class="dropdown-item" onclick="SetCategory(3)" href='catalog.html'>Комп'ютерні комплектуючі</a></li>
                    <li><a class="dropdown-item" onclick="SetCategory(4)" href='catalog.html'>Інструменти та автотовари</a></li>
                    <li><a class="dropdown-item" onclick="SetCategory(5)" href='catalog.html'>Смартфони, ТВ та електроніка</a></li>
                </ul>
            </li>

            <li class="nav-item col-lg-4">
                <div class="input-group rounded">
                    <input type="search" id="searchField" class="form-control" placeholder="Пошук" aria-label="Search" aria-describedby="search-addon" onchange="Searchfield()">
                    <button class="btn btn-success" id="search-addon">
                        <i class="fa fa-search text-light"></i>
                    </button>
                </div>
            </li>
            
            <li class="nav-item">
                ${CheckSession() ? 
                `<a class="headerBtn nav-link btn btn-outline-secondary text-center text-light" href='cart.html'>
                    <i class="fa fa-shopping-basket fa-2x"> Кошик</i>
                </a>` : 
                ""
                }
            </li>

            <li class="nav-item">
                ${CheckSession() ? 
                `<a class="headerBtn nav-link btn btn-outline-secondary text-center text-light" href='profile.html'>
                    <i class="fa fa-user fa-2x"> Кабінет</i>
                </a>`:
                `<a class="headerBtn nav-link btn btn-outline-secondary text-center text-light" href='login.html'>
                    <i class="fa fa-sign-in fa-2x"> Авторизація</i>
                </a>`
                }
            </li>
        </div>
    </div>
</nav>`;
//#endregion
//#region Footer
let footer = ` 
<footer class="text-center text-lg-start bg-secondary text-light">
<section>
<div class="container text-center text-md-start mt-5 p-2">
    <div class="row mt-3">
    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
        <h6 class="text-uppercase fw-bold mb-4">
        <i class="fas fa-gem me-3"></i>Sell Zone
        </h6>
        <p>SellZone – ваш надійний маркетплейс<br>
        Продаж та купівля товарів без зайвих зусиль.</p>
    </div>

    <div class="col-md-5 col-lg-2 col-xl-2 mx-auto mb-4">
        <center>
        <h6 class="text-uppercase fw-bold mb-4">Соціальні мережі</h6>
        <table>
            <tr><td><i class = "fa fa-facebook"></i></td><td class="p-2"><a href="https://uk-ua.facebook.com" class="text-light"></div>Facebook</a></td></tr>
            <tr><td><i class = "fa fa-instagram"></i></td><td class="p-2"><a href="https://www.instagram.com" class="text-light"></div>Instagram</a></td></tr>
            <tr><td><i class = "fa fa-youtube"></i></td><td class="p-2"><a href="https://www.youtube.com" class="text-light">YouTube</a></td></tr>
            <tr><td><i class = "fa fa-telegram"></i></td><td class="p-2"><a href="https://web.telegram.org" class="text-light">Telegram</a></td></tr>
        </table>
        </center>
    </div>

    <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
        <center>
        <h6 class="text-uppercase fw-bold mb-4">Контакти</h6>
        <table>
            <tr><td><i class="fa fa-home"></i></td><td class="p-2">м. Київ, Україна</td></tr>
            <tr><td><i class="fa fa-envelope"></i></td><td class="p-2">info@example.com</td></tr>
            <tr><td><i class="fa fa-phone"></i></td><td class="p-2">+380 66 34 56 789</td></tr>
            <tr><td><i class="fa fa-print"></i></td><td class="p-2">+380 97 34 56 789</td></tr>
        </table>
        </center>
    </div>
    </div>
</div>
</section>

<div class="text-center p-4 bg-dark">
© 2025 Sell Zone.
</div>
</footer>`;
//#endregion
function Searchfield()
{
    if(isInCatalog)
    {
        Search();
    }
    else
    {
        let searchField = document.getElementById("searchField").value;
        localStorage.setItem("search", searchField);
        location.href = "catalog.html";
    }
}
function SetCategory(i)
{
    localStorage.setItem("currentCategory", i);
}
function SetHeaderFooter()
{
    document.querySelector("#header").innerHTML = header;
    document.querySelector("#footer").innerHTML = footer;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
SetHeaderFooter();