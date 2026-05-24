const clickSound = new Audio("sounds/click.mp3");
const equalSound = new Audio("sounds/equal.mp3");

let currentValue = "";
let previousValue = "";
let operation = "";

const display = document.getElementById("display");
const operationActive = document.getElementById("operation-active");
const historique = document.getElementById("historique");

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function playEqualSound() {
    equalSound.currentTime = 0;
    equalSound.play();
}

function updateDisplay() {
    if (previousValue !== "" && operation !== "") {
        display.textContent = previousValue + " " + operation + " " + currentValue;
    } else {
        display.textContent = currentValue || "0";
    }
}

function appendNumber(number) {
    playClickSound();

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

    playClickSound();

    previousValue = currentValue;
    currentValue = "";
    operation = op;

    operationActive.textContent = op;

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

    if (operation === "+" || operation === "-") {
        if (currentValue.includes("%")) {
            number2 = number1 * Number(currentValue.replace("%", "")) / 100;
        }
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

    display.textContent = calculComplet;

    display.classList.add("result-animation");

    setTimeout(function() {
        display.classList.remove("result-animation");
    }, 250);

    currentValue = String(result);
    previousValue = "";
    operation = "";

    operationActive.textContent = "";
}

function clearDisplay() {
    playClickSound();

    currentValue = "";
    previousValue = "";
    operation = "";

    display.textContent = "0";
    operationActive.textContent = "";

    historique.innerHTML = "";
    localStorage.removeItem("historiqueCalculatrice");
}

function deleteLast() {
    playClickSound();

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

    if (event.key === "%") {
        pourcentage();
    }

    if (event.key === "=" || event.key === "Enter") {
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

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function() {

        navigator.serviceWorker
            .register("./service-worker.js")

            .then(function() {
                console.log("Service Worker enregistré");
            });

    });

}