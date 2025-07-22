function Registration(event)
{
    event.preventDefault();
    let emailHelp = document.getElementById("emailHelp");
    let nameHelp = document.getElementById("nameHelp");
    let passHelp = document.getElementById("passHelp");
    let passRHelp = document.getElementById("passRHelp");

    emailHelp.innerHTML = "";
    nameHelp.innerHTML = "";
    passHelp.innerHTML = "";
    passRHelp.innerHTML = "";

    let email = document.getElementById("Email").value;
    let name = document.getElementById("Name").value;
    let pass = document.getElementById("Password").value;
    let passC = document.getElementById("PasswordR").value;
    let permission = document.getElementById("accoutPermission").value;
    
    if(email.length < 16 || email.length > 64 || !email.includes('@'))
    {
        emailHelp.innerHTML = "Довжина пошти повинна бути від 16 до 64 символів і мати символ @.";
        return false;
    }
    if(name.length < 4 || name.length > 16)
    {
        nameHelp.innerHTML = "Довжина повинна бути від 4 до 16 символів.";
        return false;
    }
    if(pass.length < 8 || pass.length > 16)
    {
        passHelp.innerHTML = "Довжина паролю повинна бути від 8 до 16 символів.";
        return false;
    }
    if(passC != pass)
    {
        passRHelp.innerHTML = "Повторіть пароль правильно!";
        return false;
    }

    let data = {
        "email":email,
		"name":name,
		"pass":pass,
        "permission":permission
	}
	ajax('core/registration.php','POST',signup,data);
	function signup(result){
		console.log(result);
		if(result == 1){
            location.href = "login.html";
		}  else if(result == 2){
			emailHelp.innerHTML = 'Користувач з такою скринькою вже існує!';
		} else if(result == 3){
			nameHelp.innerHTML = 'Користувач з таким логіном вже існує!';
		} else {
			SendMessage('Помилка, повторіть реєстрацію пізніше!');
		}
	}
}