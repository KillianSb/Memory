// Jeux

// Définir le nombre total d'images dans le dossier
let totalImages = 10;

// Tableau qui stocker les images
let images = [0,1,2,3,4,5];
let imagesParPosition = [];
// Tableau qui stocker les memes images que le tableau "images"
let images2 = images;

let idImage1 = [];
let idImage2 = [];

// Boucle pour choisir entre les 12 id aléatoires
while (idImage1.length < 6) {
    // Générer un nombre aléatoire entre 0 et  11
    let randomid = Math.round(Math.random() * 11);
    // Vérifier si le chiffre n'a pas déjà été choisie
    if (!idImage1.includes(randomid) && !idImage2.includes(randomid)) {
    // Ajouter l'index du chiffre au tableau
    idImage1.push(randomid);
    }
}

// Boucle pour choisir entre les 12 id aléatoires
while (idImage2.length < 6) {
    // Générer un nombre aléatoire entre 0 et  11
    let randomid = Math.round(Math.random() * 11);
    // Vérifier si le chiffre n'a pas déjà été choisie
    if (!idImage2.includes(randomid) && !idImage1.includes(randomid)) {
    // Ajouter l'index du chiffre au tableau
    idImage2.push(randomid);
    }
}

for ( let k = 0; k < idImage1.length; k++) {
    imagesParPosition[idImage1[k]] = images[k];
}

for ( let k = 0; k < idImage2.length; k++) {
    imagesParPosition[idImage2[k]] = images[k];
}


// console.log(idImage1);
// console.log(idImage2);
// console.log(imagesParPosition);
let TableauImageId1 = [];
let TableauImageId2 = [];

// Boucle pour charger les images1 sélectionnées
images.forEach(index => {
    let imageElement = document.getElementById(idImage1[index]);
    // console.log("image 1 = "+index);
    // Action au clique
    imageElement.style.backgroundImage = 'url(./src/img/background1-Copie.jpg)'
    imageElement.addEventListener('click', imageJeu);
});
// Boucle pour charger les images2 sélectionnées
images2.forEach(index => {
    let imageElement = document.getElementById(idImage2[index]);
    // console.log("image 2 = "+index);
    // console.log("id image 2 = "+idImage2[index]);
    // Action au clique
    imageElement.style.backgroundImage = 'url(./src/img/background1-Copie.jpg)'
    imageElement.addEventListener('click', imageJeu);
});

let ClickValue = [];
let idValue = [];
let idMatch = [];
let Click1 = false;
let Click2 = false;

let jeuxOn = false;

let Score = 0;

//
function imageJeu(valeur) {
    if (ClickValue.length === 2) {
        // si deux cartes sont déjà cliquées, ne rien faire
        return;
    }

    jeuxOn = true;

    if (jeuxOn == true) {
        document.getElementById("imageSelect").setAttribute("disabled", "disabled");
    }

    console.log(valeur.target.id);
    console.log(valeur);
    document.getElementById(valeur.target.id).animate([
        // étapes/keyframes animation
        {  transform: 'rotateY(0deg)' },
        {  transform: 'rotateY(90deg)' },
        {  transform: 'rotateX(0deg)' }
      ], {
        // temporisation
        duration: 1000,
    });
    // attendre le temps que la carte sois retourner de moitié
    setTimeout(() => {
        // Récupérer l'élément select
        var selectElement = document.getElementById("imageSelect");
        // Récupérer la valeur de l'option sélectionnée
        var selectedValue = selectElement.value;

        valeur.target.src = `./src/img/${selectedValue}/${imagesParPosition[valeur.target.id]+1}.webp`; 
        console.log(ClickValue);
        let click = imagesParPosition[valeur.target.id]+1;
        if (Click1 !== true) {
            let idValeur = valeur.target.id;
            idValue.push(idValeur)
            console.log(idValue);
            // Ajouter la valuer du click au tableau
            ClickValue.push(click);
            Click1 = true;
            console.log(Click1);
        } else if (Click1 === true && Click2 !== true) {
            let idValeur = valeur.target.id;
            idValue.push(idValeur)
            console.log(idValue);
            ClickValue.push(click);
            Click2 = true;
            console.log(Click2);
            console.log("deja 2 valeur");
            compartId(valeur)
        }    
    }, "500");
}

// Compart si les deux carte cliquer sont les meme
function compartId() {
    console.log(ClickValue);
    console.log(ClickValue[0]);
    console.log(ClickValue[1]);
    Click1 = false;
    Click2 = false;

    Score++;

    let messageCompteur = "Vous etes a " + Score + " coup!";
    let blocMessageCompteur = document.getElementById("compteur");
    blocMessageCompteur.textContent  = messageCompteur;

    if (ClickValue[0] === ClickValue[1]) {
        console.log("OK");
        for(let i = 0; i < idValue.length; i ++) {
            document.getElementById(idValue[i]).setAttribute("id", "image-jeux match");
            idMatch.push(ClickValue[i])
            console.log(idMatch);
            console.log("imagesParPosition "+imagesParPosition.length);
            console.log("idMatch "+idMatch.length);
            if (imagesParPosition.length === idMatch.length) {
                messageCompteur = "🎇 Bravo vous avez gagné avec " + Score + " coup ! 🎇";
                blocMessageCompteur.textContent  = messageCompteur;
                // alert("🎇 Vous avez gagné en "+Score+" coup 🎇!");
                

                if (Connecter === true) {
                    var scores = localStorage.getItem('Scores');
                    scores = scores ? JSON.parse(scores) : {};

                    var jsonString = sessionStorage.getItem('Connected');
                    var data = JSON.parse(jsonString);
                    var Name = data[0].name;

                    // Récupérer l'élément select
                    var selectElement = document.getElementById("imageSelect");
                    // Récupérer la valeur de l'option sélectionnée
                    var selectedValue = selectElement.value;

                    if (scores.hasOwnProperty(Name)) {
                    scores[Name] += "score = "+ Score +" ["+selectedValue+"], ";
                    } else {
                    scores[Name] = "score = "+ Score +" ["+selectedValue+"], ";
                    }

                    localStorage.setItem('Scores', JSON.stringify(scores));
                    console.log("Score sauvgarder !");
                }else {
                    console.log("Pas connecter donc pas d'enregistrement du score ! ");
                }

                // Appuie sur "espace" pour relancer
                document.addEventListener("keydown", function(event) {
                    if (event.code === "Space") {
                        jeuxOn = false;
                        document.getElementById("imageSelect").removeAttribute("disabled");
                      location.reload();
                    }
                });
            }
        }
        ClickValue = [];
        idValue = [];   
    }else {
        console.log("Pas les meme !");
        setTimeout(() => {
            for(let i = 0; i < idValue.length; i ++) {
                let idElement = document.getElementById(idValue[i]);
                // attendre le temps que la carte sois retourner de moitié
                setTimeout(() => {
                    idElement.setAttribute("src", "./src/img/question.svg");
                    idElement.style.backgroundImage = 'url(./src/img/background1-Copie.jpg)'    
                }, "500");
                idElement.animate([
                    // étapes/keyframes animation
                    {  transform: 'rotateY(0deg)' },
                    {  transform: 'rotateY(-90deg)' },
                    {  transform: 'rotateX(0deg)' }
                  ], {
                    // temporisation
                    duration: 1000,
                })
            }
            ClickValue = [];
            idValue = [];
        }, "2000");
    }
}