let inputMail = document.getElementById('mail');
inputMail.addEventListener('change', checkMail);

let inputPwd = document.getElementById('password');
inputPwd.addEventListener('change', checkPwd);

document.getElementById('button-validation').addEventListener('click', checkValide);

let mail;
let MailOK = false;

let pwd;
let pwdOK = false;

let Connecter = false;

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

    if (regex.test(pwdValue)) {
        console.log('Mot de passe valide :', pwdValue);
        pwd = pwdValue;
        pwdOK = true;
        document.getElementById('password').style.borderBottomColor = "rgb(69 209 46)";
    } else {
        console.log('Mot de passe invalide :', pwdValue);
        pwdOK = false;
        document.getElementById('password').style.borderBottomColor = "rgb(206 31 31)";
    }
}

function checkValide() {
    console.log(MailOK);
    console.log(pwdOK);
    if (MailOK === true && pwdOK === true) {
        console.log("tout est OK");

        let profileStr = localStorage.getItem(mail);
        let profileObj = JSON.parse(profileStr);
        let mailValueLocal = profileObj[0].mail;
        let pwdValueLocal = profileObj[0].password;
        let Name = profileObj[0].name;

        console.log(mailValueLocal);
        console.log(pwdValueLocal);

        if (mail === mailValueLocal && pwd === pwdValueLocal) {
            Connecter = true;
            console.log("Connecter = "+Connecter);

            // Ajouter la valeur du profils connecter au sessionStorage
            // Créer un tableau de valeurs
            let profile = [{connected: Connecter,name: Name, mail: mail, password: pwd}];

            // Stocker le tableau dans le sessionStorage
            sessionStorage.setItem("Connected", JSON.stringify(profile));

            alert("Vous etes connecter en tant que " + Name +" !")
            window.location.replace('profil.html');
        }else {
            Connecter = false;

            alert("Mot de passe ou adresse mail inncorect !")
            if (confirm("Avez vous deja un compte ? (Ok pour oui, Annuler pour non)")) {
                alert("Veuillez réessayer !")
            }else {
                window.location.replace('register.html');
            }
        }
    } else {
        console.log("Non");
        Connecter = false;
    }
}