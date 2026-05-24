const clickSound = new Audio("sounds/click.mp3");
const equalSound = new Audio("sounds/equal.mp3");

let currentValue = "";
let previousValue = "";
let operation = "";
let angleMode = "DEG";
let memoryValue = 0;
let shouldResetDisplay = false;

const display = document.getElementById("display");
const miniDisplay = document.getElementById("mini-display");
const operationActive = document.getElementById("operation-active");
const historique = document.getElementById("historique");
const angleModeButton = document.getElementById("angle-mode");
const memoryIndicator = document.getElementById("memory-indicator");

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();

    if (navigator.vibrate) {
        navigator.vibrate(20);
    }
}

function playEqualSound() {
    equalSound.currentTime = 0;
    equalSound.play();

    if (navigator.vibrate) {
        navigator.vibrate(40);
    }
}

function sauvegarderCalculatrice() {
    localStorage.setItem("historiqueCalculatrice", historique.innerHTML);
    localStorage.setItem("themeCalculatrice", document.body.classList.contains("light-mode"));
    localStorage.setItem("currentValue", currentValue);
    localStorage.setItem("previousValue", previousValue);
    localStorage.setItem("operation", operation);
    localStorage.setItem("angleMode", angleMode);
    localStorage.setItem("memoryValue", memoryValue);
}

function updateMemoryIndicator() {
    memoryIndicator.textContent = memoryValue !== 0 ? "MEM" : "";
}

function updateDisplay() {
    if (previousValue !== "" && operation !== "") {
        miniDisplay.textContent = previousValue + " " + operation;
        display.textContent = currentValue || "0";
    } else {
        miniDisplay.textContent = "";
        display.textContent = currentValue || "0";
    }

    operationActive.textContent = angleMode;
    updateMemoryIndicator();
    sauvegarderCalculatrice();
}

function appendNumber(number) {
    playClickSound();

    if (shouldResetDisplay) {
        currentValue = "";
        shouldResetDisplay = false;
    }

    if (number === "." && currentValue.includes(".")) {
        return;
    }

    currentValue += number;
    updateDisplay();
}

function appendParenthesis(parenthesis) {
    playClickSound();

    if (shouldResetDisplay) {
        currentValue = "";
        shouldResetDisplay = false;
    }

    currentValue += parenthesis;

    updateDisplay();
}

function chooseOperation(op) {
    if (currentValue === "") {
        return;
    }

    playClickSound();

    shouldResetDisplay = false;

    previousValue = currentValue;
    currentValue = "";
    operation = op;

    updateDisplay();
}

function pourcentage() {
    if (currentValue === "") {
        return;
    }

    playClickSound();

    currentValue = currentValue + "%";
    updateDisplay();
}

function calculate() {
    if (previousValue === "" || currentValue === "" || operation === "") {
        return;
    }

    const number1 = Number(previousValue);
    let number2 = Number(currentValue);

    if ((operation === "+" || operation === "-") && currentValue.includes("%")) {
        number2 = number1 * Number(currentValue.replace("%", "")) / 100;
    }

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
        previousValue + " " + operation + " " + currentValue + " = " + result;

    ajouterHistorique(calculComplet);

    playEqualSound();

    miniDisplay.textContent = previousValue + " " + operation + " " + currentValue;
    display.textContent = result;

    display.classList.add("result-animation");

    setTimeout(function() {
        display.classList.remove("result-animation");
    }, 250);

    currentValue = String(result);
    previousValue = "";
    operation = "";
    shouldResetDisplay = true;

    sauvegarderCalculatrice();
}

function clearDisplay() {
    playClickSound();

    currentValue = "";
    previousValue = "";
    operation = "";
    shouldResetDisplay = false;

    display.textContent = "0";
    miniDisplay.textContent = "";

    historique.innerHTML = "";

    localStorage.removeItem("historiqueCalculatrice");
    localStorage.removeItem("currentValue");
    localStorage.removeItem("previousValue");
    localStorage.removeItem("operation");

    updateDisplay();
}

function deleteLast() {
    playClickSound();

    if (shouldResetDisplay) {
        currentValue = "";
        shouldResetDisplay = false;
    } else {
        currentValue = currentValue.slice(0, -1);
    }

    updateDisplay();
}

function ajouterHistorique(texte) {
    historique.innerHTML += "<li>" + texte + "</li>";
    sauvegarderCalculatrice();
}

function clearHistory() {
    playClickSound();

    historique.innerHTML = "";
    localStorage.removeItem("historiqueCalculatrice");

    sauvegarderCalculatrice();
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");
    sauvegarderCalculatrice();
}

function racineCarree() {
    if (currentValue === "") {
        return;
    }

    playClickSound();

    currentValue = String(Math.sqrt(Number(currentValue)));
    shouldResetDisplay = true;
    updateDisplay();
}

function carre() {
    if (currentValue === "") {
        return;
    }

    playClickSound();

    currentValue = String(Math.pow(Number(currentValue), 2));
    shouldResetDisplay = true;
    updateDisplay();
}

function ajouterPi() {
    playClickSound();

    currentValue = String(Math.PI);
    shouldResetDisplay = false;
    updateDisplay();
}

function changerSigne() {
    if (currentValue === "") {
        return;
    }

    playClickSound();

    currentValue = String(Number(currentValue) * -1);
    updateDisplay();
}

function changerModeAngle() {
    playClickSound();

    angleMode = angleMode === "DEG" ? "RAD" : "DEG";

    angleModeButton.textContent = angleMode;
    updateDisplay();
}

function convertirAngle(valeur) {
    if (angleMode === "DEG") {
        return valeur * Math.PI / 180;
    }

    return valeur;
}

function sinus() {
    if (currentValue === "") {
        return;
    }

    playClickSound();

    currentValue = String(Math.sin(convertirAngle(Number(currentValue))));
    shouldResetDisplay = true;
    updateDisplay();
}

function cosinus() {
    if (currentValue === "") {
        return;
    }

    playClickSound();

    currentValue = String(Math.cos(convertirAngle(Number(currentValue))));
    shouldResetDisplay = true;
    updateDisplay();
}

function tangente() {
    if (currentValue === "") {
        return;
    }

    playClickSound();

    currentValue = String(Math.tan(convertirAngle(Number(currentValue))));
    shouldResetDisplay = true;
    updateDisplay();
}

function logarithme() {
    if (currentValue === "") {
        return;
    }

    playClickSound();

    currentValue = String(Math.log10(Number(currentValue)));
    shouldResetDisplay = true;
    updateDisplay();
}

function memoryAdd() {
    playClickSound();

    memoryValue += Number(currentValue) || 0;
    updateMemoryIndicator();
    sauvegarderCalculatrice();
}

function memorySubtract() {
    playClickSound();

    memoryValue -= Number(currentValue) || 0;
    updateMemoryIndicator();
    sauvegarderCalculatrice();
}

function memoryRecall() {
    playClickSound();

    currentValue = String(memoryValue);
    shouldResetDisplay = false;

    updateMemoryIndicator();
    updateDisplay();
}

function memoryClear() {
    playClickSound();

    memoryValue = 0;
    updateMemoryIndicator();
    sauvegarderCalculatrice();
}

document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (!isNaN(key) && key !== " ") {
        appendNumber(key);
    }

    else if (key === ".") {
        appendNumber(".");
    }

    else if (key === "+") {
        chooseOperation("+");
    }

    else if (key === "-") {
        chooseOperation("-");
    }

    else if (key === "*") {
        chooseOperation("*");
    }

    else if (key === "/") {
        event.preventDefault();
        chooseOperation("/");
    }

    else if (key === "%") {
        pourcentage();
    }

    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key.toLowerCase() === "c") {
        clearDisplay();
    }
});

window.addEventListener("load", function() {
    const historiqueSauvegarde = localStorage.getItem("historiqueCalculatrice");
    const themeSauvegarde = localStorage.getItem("themeCalculatrice");
    const currentValueSauvegarde = localStorage.getItem("currentValue");
    const previousValueSauvegarde = localStorage.getItem("previousValue");
    const operationSauvegarde = localStorage.getItem("operation");
    const angleModeSauvegarde = localStorage.getItem("angleMode");
    const memoryValueSauvegarde = localStorage.getItem("memoryValue");

    if (historiqueSauvegarde) {
        historique.innerHTML = historiqueSauvegarde;
    }

    if (themeSauvegarde === "true") {
        document.body.classList.add("light-mode");
    }

    if (currentValueSauvegarde) {
        currentValue = currentValueSauvegarde;
    }

    if (previousValueSauvegarde) {
        previousValue = previousValueSauvegarde;
    }

    if (operationSauvegarde) {
        operation = operationSauvegarde;
    }

    if (angleModeSauvegarde) {
        angleMode = angleModeSauvegarde;
    }

    if (memoryValueSauvegarde) {
        memoryValue = Number(memoryValueSauvegarde);
    }

    angleModeButton.textContent = angleMode;

    updateMemoryIndicator();
    updateDisplay();
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("./service-worker.js")
            .then(function() {
                console.log("Service Worker enregistré");
            });
    });
}