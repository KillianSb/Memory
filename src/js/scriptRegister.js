// Vérif mdp

let inputName = document.getElementById('name');
inputName.addEventListener('change', checName);

let inputMail = document.getElementById('mail');
inputMail.addEventListener('change', checkMail);

let inputPwd = document.getElementById('password');
inputPwd.addEventListener('change', checkPwd);

let inputPwd2 = document.getElementById('password_check');
inputPwd2.addEventListener('change', checkPwd2);

document.getElementById('button-validation').addEventListener('click', checkValide);

let Name;
let NameOK = false;

let mail;
let MailOK = false;

let pwd;
let pwd1OK = false;
let pwd2;
let pwd2OK = false;

let pwdOK = false;

function checName() {
    let NameValue = inputName.value;
    // console.log(NameValue);
    // console.log(NameValue.length);
    if (NameValue.length >= 3) {
        console.log('Name valide', NameValue)
        Name = NameValue;
        NameOK = true;
        document.getElementById('mail').removeAttribute("disabled");
        document.getElementById('name').style.borderBottomColor = "rgb(69 209 46)";
    } else {
        document.getElementById('mail').setAttribute("disabled", "disabled");
        console.log('Name invalide pas assez de caractère :', NameValue);
        document.getElementById('name').style.borderBottomColor = "rgb(206 31 31)";
        NameOK = false;
    }
}

function checkMail() {
    let mailValue = inputMail.value;
    console.log(mailValue);
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (regex.test(mailValue)) {
      console.log('Adresse e-mail valide :', mailValue);
      mail = mailValue;
      MailOK = true;
      document.getElementById('password').removeAttribute("disabled");
      document.getElementById('mail').style.borderBottomColor = "rgb(69 209 46)";
    } else {
        document.getElementById('password').setAttribute("disabled", "disabled");
      console.log('Adresse e-mail invalide :', mailValue);
      document.getElementById('mail').style.borderBottomColor = "rgb(206 31 31)";
      MailOK = false;
    }
}

function checkPwd() {
    let pwdValue = inputPwd.value;
    console.log(pwdValue);

    // ^ et $ délimitent la chaîne de caractères entière.
    // (?=.*\d) vérifie la présence d'au moins un chiffre.
    // (?=.*[!@#$%^&*]) vérifie la présence d'au moins un symbole.
    // (?=.*[a-z]) vérifie la présence d'au moins une lettre minuscule.
    // (?=.*[A-Z]) vérifie la présence d'au moins une lettre majuscule.
    // {6,} vérifie que la chaîne de caractères contient au moins 6 caractères.
    let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    let regex1 = /(?=.*[a-z])(?=.*[A-Z])/; // une lettre Minuscule + une lettre Majuscule
    let regex2 = /.{6,}/; // 6 caractères
    let regex3 = /(?=.*\d)(?=.*[!@#$%^&*])/; // au moins un chiffre + au moins un symbole

    Niveau1()

    function Niveau1() {
        if (regex1.test(pwdValue)){
            document.getElementById('level1').style.display = "flex";
            console.log("ok 1");
            document.getElementById('message-password').innerText ="Au moins 1 symbole, 1 chiffre, ainsi que 6 caractères minimum.";
            Niveau2()
        }else {
            console.log("non 1");
            document.getElementById('password').style.borderBottomColor = "rgb(206 31 31)";
            document.getElementById('level1').style.display = "none";
            document.getElementById('message-password').innerText ="Au moins 1 symbole, 1 majuscule, 1 minuscule, 1 chiffre, ainsi que 6 caractères minimum.";

            document.getElementById('level2').style.display = "none";
            document.getElementById('level3').style.display = "none";
        }
    }

    function Niveau2() {
        if (regex2.test(pwdValue)) {
            document.getElementById('level2').style.display = "flex";
            console.log("ok 2");
            document.getElementById('message-password').innerText ="Au moins 1 symbole, 1 majuscule, 1 chiffre.";
            Niveau3()
        }else {
            console.log("non 2");
            document.getElementById('password').style.borderBottomColor = "rgb(206 31 31)";
            document.getElementById('level2').style.display = "none";
            document.getElementById('message-password').innerText ="Au moins 1 symbole, 1 chiffre, ainsi que 6 caractères minimum.";
            document.getElementById('level3').style.display = "none";
        }
    }

    function Niveau3() {
        if (regex3.test(pwdValue)) {
            document.getElementById('level3').style.display = "flex";
            console.log("ok 3");
            document.getElementById('message-password').innerText ="Tout les prérequis dont remplis !";
            console.log('Mot de passe valide :', pwdValue);
            document.getElementById('password').style.borderBottomColor = "rgb(69 209 46)";
            pwd = pwdValue;
            pwd1OK = true;
            document.getElementById('password_check').removeAttribute("disabled");
        }else {
            document.getElementById('password_check').setAttribute("disabled", "disabled");
            console.log("non 3");
            document.getElementById('password').style.borderBottomColor = "rgb(206 31 31)";
            document.getElementById('level3').style.display = "none";
            document.getElementById('message-password').innerText ="Au moins 1 symbole, 1 chiffre.";
        }
    }

    // if (regex.test(pwdValue)) {
    //   console.log('Mot de passe valide :', pwdValue);
    //   pwd = pwdValue;
    //   pwd1OK = true;
    //   document.getElementById('password_check').removeAttribute("disabled");
    // } else {
    //   console.log('Mot de passe invalide :', pwdValue);
    //   pwd1OK = false;
    // }
}

function checkPwd2() {
    let pwd2Value = inputPwd2.value;
    console.log(pwd2Value);

    if (pwd2Value === pwd) {
        console.log('Mot de passe correspond :', pwd2Value);
        document.getElementById('password_check').style.borderBottomColor = "rgb(69 209 46)";
        pwd2 = pwd2Value;
        pwd2OK = true;
        document.getElementById('button-validation').removeAttribute("disabled");
    } else {
        document.getElementById('button-validation').setAttribute("disabled", "disabled");
        console.log('Mot de passe ne correspond pas correspond :', pwd2Value);
        document.getElementById('password_check').style.borderBottomColor = "rgb(206 31 31)";
        pwd2OK = false;
    }
}

function checkValide() {
    console.log(NameOK);
    console.log(MailOK);
    console.log(pwd1OK);
    console.log(pwd2OK);
    if (NameOK === true && MailOK === true && pwd1OK === true && pwd2OK == true) {
        pwdOK = true;
        console.log("tout est OK");
        let profile = [{name: Name, mail: mail, password: pwd}];

        let profileStr = localStorage.getItem(mail);
        console.log(profileStr);
        if (profileStr === null) {
            localStorage.setItem(mail, JSON.stringify(profile));
            window.location.replace('login.html');
        } else {
            let profileObj = JSON.parse(profileStr);
            let mailValue = profileObj[0].mail;
    
            console.log(profileObj);
            console.log(mailValue);
            if (mailValue !== mail) {
                localStorage.setItem(mail, JSON.stringify(profile));
                window.location.replace('login.html');
            }else {
                alert("Deja un compte de cette adresse mail !")
                if (confirm("Voulez vous etres rediriger sur la page de connection ? (Ok pour oui, Annuler pour non)")) {
                    window.location.replace('login.html');
                }
            }
        }
    } else {
        console.log("Non");
        pwdOK = false;
    }
}