function add(a, b) { return a + b };

function subtract(a, b) { return a - b };

function multiply(a, b) { return a * b };

function divide(a, b) {
    if (b === 0) {
        return "Self-destruct in 3..2..1.."
    }
    return a / b
};

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

populateElementButtons(numberPad, keypadNumbers);
populateElementButtons(operatorPad, keypadOperators);

const display = document.querySelector("#display");

function populateNumberEventListeners(buttons) {
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.id === "id-." && currentDisplay.includes(".")) {
            } else {
                currentDisplay += button.textContent;
                display.textContent = currentDisplay;
            }
        });
    });
}

const numberButtons = [...keypadNumbers.childNodes]
    .filter(button => /id-([0-9]|\.)/g.test(button.id));

let previousDisplay = "";
let currentDisplay = "";
let operator = "";
let operatorNext = "";

populateNumberEventListeners(numberButtons);

// Clear button event listener
document.querySelector("#clear").addEventListener("click", () => {
    currentDisplay = "";
    previousDisplay = "";
    operator = "";
    operatorNext = "";
    display.textContent = "";
})

// Delete button event listener
document.querySelector("#delete").addEventListener("click", () => {
    currentDisplay = currentDisplay.slice(0, currentDisplay.length - 1);
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
})

function populateOperatorEventListeners(operatorButtons) {
    operatorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            operatorNext = button.textContent;
            if (previousDisplay === "") {
                previousDisplay = currentDisplay;
                currentDisplay = "";
                operator = operatorNext;
            } else {
                if (currentDisplay === "") {
                    currentDisplay = operate(operator,
                        parseFloat(previousDisplay), parseFloat(previousDisplay));
                } else {
                    currentDisplay = operate(operator,
                        parseFloat(previousDisplay), parseFloat(currentDisplay));
                }
                display.textContent = currentDisplay;
                previousDisplay = currentDisplay;
                currentDisplay = "";
                operator = operatorNext;
            }
        })
    })
}

const operatorButtons = [...keypadOperators.childNodes];
populateOperatorEventListeners(operatorButtons);

document.querySelector("#id-\\=").addEventListener("click", () => {
    display.textContent = operate(operator, parseFloat(previousDisplay), parseFloat(currentDisplay));
})