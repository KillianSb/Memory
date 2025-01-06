profileObj = JSON.parse(sessionStorage.getItem("Connected"));
let valueMail = profileObj[0].mail;
let valueName = profileObj[0].name;
let valuePwd = profileObj[0].password;

let profilMail= document.getElementById('Name');
let profilName= document.getElementById('Mail');
let profilPwd= document.getElementById('Pwd');

profilMail.textContent  = "Adresse Mail : "+valueMail;
profilName.textContent  = "Nom Utilisateur : "+valueName;

let buttonChange= document.getElementById('modif-pwd');

buttonChange.addEventListener('click', modifPwd);

function modifPwd() {
    console.log("Bien appuyer");
    if (confirm("Vous etes sur le point de modifier votre mot de passe, etes vous sur ? (Ok pour oui, Annuler pour non)")) {
        let newpwd = prompt("Veuillez renseigner le nouveau mot de passe (Au moins 1 symbole, 1 majuscule, 1 minuscule, 1 chiffre, ainsi que 6 caractères minimum.)")
        checkPwd();
        function checkPwd() {
            console.log(newpwd);
        
            // ^ et $ délimitent la chaîne de caractères entière.
            // (?=.*\d) vérifie la présence d'au moins un chiffre.
            // (?=.*[!@#$%^&*]) vérifie la présence d'au moins un symbole.
            // (?=.*[a-z]) vérifie la présence d'au moins une lettre minuscule.
            // (?=.*[A-Z]) vérifie la présence d'au moins une lettre majuscule.
            // {6,} vérifie que la chaîne de caractères contient au moins 6 caractères.
            let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
                
            if (regex.test(newpwd)) {
                console.log('Mot de passe valide :', newpwd);

                changeLocal();

                function changeLocal() {
                    // Récupérer le tableau du localStorage
                    let contenuLocalStorage = JSON.parse(localStorage.getItem(valueMail));
                    
                    // Trouver l'objet dans le tableau qui correspond à votre critère
                    let index = contenuLocalStorage.findIndex(obj => obj.password === valuePwd);
                    
                    // Modifier la valeur de `pwd` dans l'objet trouvé
                    contenuLocalStorage[index].password = newpwd;
                    
                    // Enregistrer le tableau modifié dans le localStorage
                    localStorage.setItem(valueMail, JSON.stringify(contenuLocalStorage));
                    changeSession();
                }


                function changeSession() {
                    // Récupération du tableau depuis le sessionStorage
                    let contenuSessionStorage = JSON.parse(sessionStorage.getItem("Connected"));

                    // Parcours du tableau pour trouver l'objet à modifier
                    contenuSessionStorage.forEach((item) => {
                    if (item.name === valueName) { // On suppose que l'objet à modifier a pour "name" la valeur "John"
                        item.password = newpwd; // Modification de la valeur de "password"
                    }
                    });

                    // Ré-enregistrement du tableau dans le sessionStorage
                    sessionStorage.setItem('Connected', JSON.stringify(contenuSessionStorage));
                    alert("Mot de passe changer avec succes !");
                    location.reload();
                }
            } else {
                console.log('Mot de passe invalide :', newpwd);
                alert("Mot de passe invalide !");
            }
        }  
    }else {
        alert("Vous restez donc avec le meme mot de passe");
    }
}
