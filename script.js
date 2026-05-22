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


function afficherOperation(texte) {
    document.getElementById("operation-active").textContent = texte;
}


function additionner() {

    operation = "+";
    afficherOperation("Opération : Addition");

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

    operation = "-";
    afficherOperation("Opération : Soustraction");

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

    operation = "*";
    afficherOperation("Opération : Multiplication");

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

    operation = "/";
    afficherOperation("Opération : Division");

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

    afficherOperation("Opération : aucune");

    operation = "";

    localStorage.removeItem("historiqueCalculatrice");
}


function ajouterHistorique(texte) {

    const historique = document.getElementById("historique");

    historique.innerHTML += "<li>" + texte + "</li>";

    localStorage.setItem("historiqueCalculatrice", historique.innerHTML);
}


let operation = "";


document.addEventListener("keydown", function(event) {

    if (event.key === "+") {

        event.preventDefault();

        operation = "+";

        afficherOperation("Opération : Addition");
    }


    if (event.key === "-") {

        event.preventDefault();

        operation = "-";

        afficherOperation("Opération : Soustraction");
    }


    if (event.key === "*") {

        event.preventDefault();

        operation = "*";

        afficherOperation("Opération : Multiplication");
    }


    if (event.key === "/") {

        event.preventDefault();

        operation = "/";

        afficherOperation("Opération : Division");
    }


    if (event.key === "Enter") {

        if (operation === "+") {
            additionner();
        }

        if (operation === "-") {
            soustraire();
        }

        if (operation === "*") {
            multiplier();
        }

        if (operation === "/") {
            diviser();
        }
    }


    if (event.key === "Escape") {

        effacerChamps();
    }
});


function changerTheme() {

    document.body.classList.toggle("dark-mode");
}


window.addEventListener("load", function() {

    const historiqueSauvegarde =
        localStorage.getItem("historiqueCalculatrice");

    if (historiqueSauvegarde) {

        document.getElementById("historique").innerHTML =
            historiqueSauvegarde;
    }
});