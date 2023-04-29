function displayResult(result) {
    displayBottom.textContent = result;
}

function displayCalculation() {
    displayTop.textContent = inputString;
}

function clearDisplay() {
    clearButton.addEventListener('click', () => {
        displayBottom.textContent = '';
        displayTop.textContent = '';
        firstOperand = '';
        secondOperand = '';
        operator = '';
    })
}

function convertInput() {
    const inputSplit = inputString.split(operator);
    console.log(inputSplit);
    firstOperand = Number(inputSplit[0]);
    secondOperand = Number(inputSplit[1]);
    inputString = '';
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    let result = 0;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
        default:
            result = 0;
    }
    displayResult(result);
    return result;
}


let firstOperand = 0;
let secondOperand = 0;
let operator = '';
let inputString = '';

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const displayTop = document.querySelector('.display-top');
const displayBottom = document.querySelector('.display-bottom');

displayBottom.textContent = '';
displayTop.textContent = '';

numberButtons.forEach((button) => button.addEventListener('click', () => {
    inputString += button.textContent;
    displayCalculation();
    console.log(button.textContent);
}))

operatorButtons.forEach((button) => button.addEventListener('click', () => {
    operator = button.textContent;
    inputString += operator;
    displayCalculation();
    console.log(button.textContent);
}))


equalsButton.addEventListener('click', () => {
   convertInput();
   operate(firstOperand, secondOperand, operator);
});

//numberButtons.forEach((button) => button.addEventListener('click', () => {
//}))

clearDisplay();

