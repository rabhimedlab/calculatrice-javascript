function recupererNombres() {

    const valeur1 = document.getElementById("number1").value;

const valeur2 = document.getElementById("number2").value;



if (valeur1 === "" || valeur2 === "") {

    afficherResultat("Veuillez remplir les deux champs");

    return null;
}


const number1 = Number(valeur1);

const number2 = Number(valeur2);


    return { number1, number2 };
}



function additionner() {

    const nombres = recupererNombres();

if (!nombres) {
    return;
}

const { number1, number2 } = nombres;

    const resultat = number1 + number2;

    afficherResultat(resultat);

    ajouterHistorique(number1 + " + " + number2 + " = " + resultat);
}



function soustraire() {

    const nombres = recupererNombres();

if (!nombres) {
    return;
}

const { number1, number2 } = nombres;

    const resultat = number1 - number2;

    afficherResultat(resultat);

    ajouterHistorique(number1 + " - " + number2 + " = " + resultat);
}



function multiplier() {

    const nombres = recupererNombres();

if (!nombres) {
    return;
}

const { number1, number2 } = nombres;

    const resultat = number1 * number2;

    afficherResultat(resultat);

    ajouterHistorique(number1 + " × " + number2 + " = " + resultat);
}



function diviser() {

    const nombres = recupererNombres();

if (!nombres) {
    return;
}

const { number1, number2 } = nombres;

    if (number2 === 0) {

        afficherResultat("Impossible de diviser par zéro");

        return;
    }

    const resultat = number1 / number2;

    afficherResultat(resultat);

    ajouterHistorique(number1 + " ÷ " + number2 + " = " + resultat);
}



function afficherResultat(resultat) {

    document.getElementById("resultat").textContent =
        "Résultat : " + resultat;
}

function effacerChamps() {

    document.getElementById("number1").value = "";

    document.getElementById("number2").value = "";

    document.getElementById("resultat").textContent = "Résultat :";

    document.getElementById("historique").innerHTML = "";
}


function ajouterHistorique(texte) {

    const historique = document.getElementById("historique");

    historique.innerHTML += "<li>" + texte + "</li>";

}

document.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        additionner();

    }

    if (event.key === "Escape") {

        effacerChamps();

    }

});

document.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        additionner();
    }

    if (event.key === "Escape") {
        effacerChamps();
    }

});

function changerTheme() {

    document.body.classList.toggle("dark-mode");

}