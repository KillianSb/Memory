// Récupérer la valeur du profil connecter à partir du tableau de sessionStorage
let profileObj = JSON.parse(sessionStorage.getItem("Connected"));

let liLogedToDisable1 = document.getElementById('loged1');
let liLogedToDisable2 = document.getElementById('loged2');
let liLogedToOn = document.getElementById('isloged');
let liLogedToDisconnect = document.getElementById('loged3');


let Connecter = profileObj[0].connected;

if (profileObj === null) {
    liLogedToDisable1.style.display = "inline-block";
    liLogedToDisable2.style.display = "inline-block";
    console.log("Pas connecter donc affichage des loged ");

    console.log("Pas connecter donc pas de profils ");
    liLogedToOn.style.display = "none";

    liLogedToDisconnect.style.display = "none";
} else {

    liLogedToDisconnect.addEventListener('click', Disconnect);

    function Disconnect() {
        sessionStorage.removeItem("Connected");
    }

    if (Connecter === true) {
        liLogedToDisable1.style.display = "none";
        liLogedToDisable2.style.display = "none";
        console.log("connecter donc plus les loged "+Connecter);

        console.log("connecter donc affichage de profils "+Connecter);
        liLogedToOn.style.display = "inline-block";

        liLogedToDisconnect.style.display = "inline-block";
    }else {
        liLogedToDisable1.style.display = "inline-block";
        liLogedToDisable2.style.display = "inline-block";
        console.log("Pas connecter donc affichage des loged "+Connecter);

        console.log("Pas connecter donc pas de profils "+Connecter);
        liLogedToOn.style.display = "none";

        liLogedToDisconnect.style.display = "none";
    }
}