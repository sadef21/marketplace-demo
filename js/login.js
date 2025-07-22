function Login(event)
{
    event.preventDefault();
    var emailHelp = document.getElementById("emailHelp");
    var passHelp = document.getElementById("passHelp");

    emailHelp.innerHTML = "";
    passHelp.innerHTML = "";

    var email = document.getElementById("Email").value;
    var pass = document.getElementById("Password").value;

    if(email.length < 16 || !email.includes('@') || email.length > 64)
    {
        emailHelp.innerHTML = "Довжина пошти не може бути меньше 16 символів і не більше 64, або не містить символ @.";
        return false;
    }
    if(pass.length < 8 || pass.length > 16)
    {
        passHelp.innerHTML = "Довжина паролю не може бути меньше, ніж 8 символів і не більша, ніж 16.";
        return false;
    }

	let data = {
		"pass":pass,
		"email":email
	}
	ajax('core/login.php','POST',login,data);
	function login(result){
		if(result == 1){
			emailHelp.innerHTML = "Користувача з такою скринькою не знайдено.";
        } else if(result == 2){
			passHelp.innerHTML = "Пароль невірний.";
		} else {
			result = JSON.parse(result);
            localStorage.setItem("userData", [result.userId, result.userName, result.userPermission]);
            location.href = "index.html";
		}
	}
}
