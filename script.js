let currentValue = "";
let previousValue = "";
let operation = "";

const display = document.getElementById("display");
const operationActive = document.getElementById("operation-active");
const historique = document.getElementById("historique");

function updateDisplay() {

    if (previousValue !== "" && operation !== "") {

        display.textContent =
            previousValue + " " + operation + " " + currentValue;

    } else {

        display.textContent = currentValue || "0";
    }
}

function appendNumber(number) {

    if (number === "." && currentValue.includes(".")) {
        return;
    }

    currentValue += number;

    updateDisplay();
}

function chooseOperation(op) {

    if (currentValue === "") {
        return;
    }

    previousValue = currentValue;

    currentValue = "";

    operation = op;

    if (op === "+") {
        operationActive.textContent = "Opération : Addition";
    }

    if (op === "-") {
        operationActive.textContent = "Opération : Soustraction";
    }

    if (op === "*") {
        operationActive.textContent = "Opération : Multiplication";
    }

    if (op === "/") {
        operationActive.textContent = "Opération : Division";
    }

    updateDisplay();
}

function calculate() {

    if (
        previousValue === "" ||
        currentValue === "" ||
        operation === ""
    ) {
        return;
    }

    const number1 = Number(previousValue);
    const number2 = Number(currentValue);

    let result;

    if (operation === "+") {
        result = number1 + number2;
    }

    if (operation === "-") {
        result = number1 - number2;
    }

    if (operation === "*") {
        result = number1 * number2;
    }

    if (operation === "/") {

        if (number2 === 0) {

            display.textContent = "Erreur";

            return;
        }

        result = number1 / number2;
    }

    const calculComplet =
        previousValue +
        " " +
        operation +
        " " +
        currentValue +
        " = " +
        result;

    ajouterHistorique(calculComplet);

    display.textContent = calculComplet;

    currentValue = String(result);

    previousValue = "";

    operation = "";

    operationActive.textContent = "Opération : aucune";
}

function clearDisplay() {

    currentValue = "";

    previousValue = "";

    operation = "";

    display.textContent = "0";

    operationActive.textContent = "Opération : aucune";

    historique.innerHTML = "";

    localStorage.removeItem("historiqueCalculatrice");
}

function deleteLast() {

    currentValue = currentValue.slice(0, -1);

    updateDisplay();
}

function ajouterHistorique(texte) {

    historique.innerHTML += "<li>" + texte + "</li>";

    localStorage.setItem(
        "historiqueCalculatrice",
        historique.innerHTML
    );
}

document.addEventListener("keydown", function(event) {

    if (event.key >= "0" && event.key <= "9") {
        appendNumber(event.key);
    }

    if (event.key === ".") {
        appendNumber(".");
    }

    if (event.key === "+") {
        chooseOperation("+");
    }

    if (event.key === "-") {
        chooseOperation("-");
    }

    if (event.key === "*") {
        chooseOperation("*");
    }

    if (event.key === "/") {

        event.preventDefault();

        chooseOperation("/");
    }

    if (event.key === "Enter") {
        calculate();
    }

    if (event.key === "Backspace") {
        deleteLast();
    }

    if (event.key === "Escape") {
        clearDisplay();
    }
});

window.addEventListener("load", function() {

    const historiqueSauvegarde =
        localStorage.getItem("historiqueCalculatrice");

    if (historiqueSauvegarde) {

        historique.innerHTML = historiqueSauvegarde;
    }

    updateDisplay();
});