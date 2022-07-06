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
            if (button.id === "id-." && currentValue.includes(".")) {
            } else {
                currentValue += button.textContent;
                display.textContent = currentValue;
            }
        });
    });
}

function populateNumberEventListenersKeyboard() {
    document.addEventListener("keydown", (event) => {
        const keyName = event.key;
        if (keyName === "." && currentValue.includes(".")) {
        } else if (/([0-9]|\.)/g.test(keyName)) {
            currentValue += keyName;
            display.textContent = currentValue;
        }
    })
}

const numberButtons = [...keypadNumbers.childNodes]
    .filter(button => /id-([0-9]|\.)/g.test(button.id));

let previousValue = "";
let currentValue = "";
let operator = "";
// let operatorNext = "";

populateNumberEventListeners(numberButtons);
populateNumberEventListenersKeyboard();

// Clear button event listener
document.querySelector("#clear").addEventListener("click", () => {
    currentValue = "";
    previousValue = "";
    operator = "";
    operatorNext = "";
    display.textContent = "";
})

// Delete button event listener
document.querySelector("#delete").addEventListener("click", () => {
    currentValue = currentValue.slice(0, currentValue.length - 1);
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
})

function operatorEvent(eventOperator) {
    // operatorNext = eventOperator;
    // if (previousValue === "") {
    //     previousValue = currentValue;
    //     currentValue = "";
    //     operator = operatorNext;
    // } else {
    //     //If no new input is given, repeat previous operation
    //     console.log("Operator: " + operator);
    //     console.log("OperatorNext: " + operatorNext);
    //     if (operator === "=") {
    //         operator = operatorNext;
    //         console.log(operator);
    //     } else if (currentValue === "") {
    //         currentValue = operate(operator,
    //             parseFloat(previousValue), parseFloat(previousValue));
    //     } else {
    //         currentValue = operate(operator,
    //             parseFloat(previousValue), parseFloat(currentValue));
    //     }
    //     // currentValue = operate(operator,
    //     //     parseFloat(previousValue), parseFloat(currentValue));
    //     display.textContent = currentValue;
    //     previousValue = currentValue;
    //     currentValue = "";
    //     operator = operatorNext;
    // }
    operator = eventOperator;
    if (previousValue === "") {
        previousValue = currentValue;
        currentValue = "";
    } else {
        currentValue = operate(operator, parseFloat(previousValue), parseFloat(currentValue));
        display.textContent = currentValue;
        previousValue = currentValue;
        currentValue = "";
    }
}

function populateOperatorEventListeners(operatorButtons) {
    operatorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            operatorEvent(button.textContent);
        })
    })
}

function populateOperatorEventListenersKeyboard() {
    document.addEventListener("keydown", (event) => {
        const keyName = event.key;
        if (/(\+|\-|\*|\/)/g.test(keyName)) {
            operatorEvent(keyName);
        }
    })
}

const operatorButtons = [...keypadOperators.childNodes];
populateOperatorEventListeners(operatorButtons);
populateOperatorEventListenersKeyboard();

// = button event listener
document.querySelector("#id-\\=").addEventListener("click", () => {
    if (currentValue !== "") {
        currentValue = operate(operator, parseFloat(previousValue), parseFloat(currentValue))
        display.textContent = currentValue;
        previousValue = currentValue;
        currentValue = "";
    }
})