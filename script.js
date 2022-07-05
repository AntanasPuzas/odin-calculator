function add(a, b) { return a + b };

function subtract(a, b) { return a - b };

function multiply(a, b) { return a * b };

function divide(a, b) { return a / b };

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b)
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

const numberPad = ["=", , "0", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operatorPad = ["+", "-", "*", "/"];

const keypadNumbers = document.querySelector("#keypad-numbers");
const keypadOperators = document.querySelector("#keypad-operators");

function populateElementButtons(padValues, element) {
    padValues.forEach((value) => {
        let button = document.createElement("button");
        button.textContent = value;
        button.id = "id-" + value;
        element.appendChild(button);
    })
}

function populateEventListeners(buttons) {
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            currentDisplay += button.textContent;
        });
    });
}

populateElementButtons(numberPad, keypadNumbers);
populateElementButtons(operatorPad, keypadOperators);

const numberButtons = [...keypadNumbers.childNodes]
    .filter(button => /id-[0-9]/g.test(button.id));

let previousDisplay = "";
let currentDisplay = "";

populateEventListeners(numberButtons);