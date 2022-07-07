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
            if (button.id === "id-." && currentValue.toString().includes(".")) {
            } else {
                currentValue += button.textContent;
                updateDisplay();
            }
        });
    });
}

const numberButtons = [...keypadNumbers.childNodes]
    .filter(button => /id-([0-9]|\.)/g.test(button.id));

let previousValue = "";
let currentValue = "";
let operator = "";
let operatorNext = "";
let previousOperatorWasEquals = false;

populateNumberEventListeners(numberButtons);

// Clear button event listener
document.querySelector("#clear").addEventListener("click", () => clearEvent());

function clearEvent() {
    currentValue = "";
    previousValue = "";
    operator = "";
    operatorNext = "";
    previousOperatorWasEquals = false;
    display.textContent = "";
}

// Delete button event listener
document.querySelector("#delete").addEventListener("click", () => deleteEvent())

function deleteEvent() {
    currentValue = currentValue.slice(0, currentValue.length - 1);
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
}

function operatorEvent(eventOperator) {
    operatorNext = eventOperator;
    if (previousOperatorWasEquals) {
        previousOperatorWasEquals = false;
        currentValue = "";
        operator = operatorNext;
    } else if (previousValue === "") {
        previousValue = currentValue;
        currentValue = "";
        operator = operatorNext;
    } else if (currentValue !== "") {
        currentValue = operate(operator,
            parseFloat(previousValue), parseFloat(currentValue));
        updateDisplay();
        previousValue = currentValue;
        currentValue = "";
        operator = operatorNext;
    }
}

function populateOperatorEventListeners(operatorButtons) {
    operatorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            operatorEvent(button.textContent);
        })
    })
}

const operatorButtons = [...keypadOperators.childNodes];
populateOperatorEventListeners(operatorButtons);

function populateEventListenersKeyboard() {
    document.addEventListener("keydown", (event) => {
        const keyName = event.key;
        if (/(\+|\-|\*|\/)/g.test(keyName)) {
            operatorEvent(keyName);
        }
        if (keyName === "." && currentValue.toString().includes(".")) {

        } else if (/^([0-9]|\.)/g.test(keyName)) {
            currentValue += keyName;
            updateDisplay();
        }
        if (keyName === "=") {
            equalsEvent();
        }
        if (keyName === "Enter") {
            equalsEvent();
        }
        if (keyName === "Backspace") {
            deleteEvent();
        }
        if (keyName === "c") {
            clearEvent();
        }
    })
}

populateEventListenersKeyboard();

// = button event listener
document.querySelector("#id-\\=").addEventListener("click", () => equalsEvent());

function equalsEvent() {
    if (currentValue !== "" && previousValue !== "" && previousOperatorWasEquals !== "=") {
        currentValue = operate(operatorNext, parseFloat(previousValue), parseFloat(currentValue));
        if (currentValue.toString().length >= 17) {
            currentValue = parseFloat(currentValue).toExponential(3);
            console.log(currentValue);
        }
        updateDisplay();
        previousValue = currentValue;
        previousOperatorWasEquals = true;
    }
}

function updateDisplay() {
    if (currentValue.toString().length >= 17) {
        return;
    }   
    display.textContent = currentValue;
}