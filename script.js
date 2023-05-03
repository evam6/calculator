
let firstOperand = '';
let secondOperand = '';
let operator = '';
let inputString = '';
let result = 0;

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const displayTop = document.querySelector('.display-top');
const displayBottom = document.querySelector('.display-bottom');
const deleteButton = document.querySelector('.delete');
const decimalPointButton = document.querySelector('.point');

numberButtons.forEach((button) => button.addEventListener('click', () => {
    if (displayTop.textContent.includes('=')) {
        // if '=' was pressed before, new calculation will take place -> display and variables need to be cleared 
        clearDisplay();
    }
    inputString += button.textContent;
    displayCalculation(button.textContent);
}))

operatorButtons.forEach((button) => button.addEventListener('click', () => {
    if (detectRepeatingOperator(button.textContent)) {
        return;   
    } 
    evaluate(button.textContent);
    displayCalculation(button.textContent);
}))

equalsButton.addEventListener('click', () => {
    const lastChar = displayTop.textContent[displayTop.textContent.length-1];
    if (detectRepeatingOperator(equalsButton.textContent)) {
        return;   
    }
    if (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷') { 
        // if last char is an operator, pressing equalsButton will not start the calculation
        return;
    }
    secondOperand = inputString; // gets number preceding '=', which is the second operand
    if (firstOperand === '' && secondOperand !== '') {
        result = Number(secondOperand);
    } else if (secondOperand === '') {
        result = 0;
    } else {
        result = operate(Number(firstOperand), Number(secondOperand), operator);
    }
    displayCalculation('=');
    displayResult(result);
    inputString = '';
    }
);

clearButton.addEventListener('click', () => {
    clearDisplay();
})

deleteButton.addEventListener('click', () => {
    deleteChar();
})

decimalPointButton.addEventListener('click', () => {
    addDecimalPoint();
})

function displayResult(result) {
    displayBottom.textContent = roundResult(result);
}

function displayCalculation(text) { 
    displayTop.textContent += text;
}

function resetDisplay() {
    displayTop.textContent = '';
}

function clearDisplay() {
        displayBottom.textContent = '0';
        displayTop.textContent = '';
        firstOperand = '';
        secondOperand = '';
        operator = '';
}

function deleteChar() {
    if (inputString.length > 0) {
        inputString = inputString.slice(0, inputString.length-1);
        displayTop.textContent = displayTop.textContent.slice(0, displayTop.textContent.length-1);
    }
}

function detectRepeatingOperator(newOperator) {
    if (displayTop.textContent[displayTop.textContent.length-1] === newOperator) {
        return true;   
    } else {
        return false;
    }
}

function addDecimalPoint() {
    if (inputString === '') {
        inputString = '0.';
        displayCalculation(inputString);
    } else {
        inputString += '.';
        displayCalculation('.');
    }
}

function evaluate(button) {
    const lastChar = displayTop.textContent[displayTop.textContent.length-1]; // lastChar to check whether an operator is already displayed
    // function only takes care of number preceding na operator -> the first operand
    if (displayTop.textContent.includes('=')) {
        // operation with result of previous calculation
        firstOperand = result;
        resetDisplay();
        displayCalculation(roundResult(result));
    } else if (displayTop.textContent.includes('Infinity')) {
        clearDisplay();
    }
    else if (firstOperand !== '' && (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷')) { 
        // different operator is chosen and the original needs to be replaced 
        displayTop.textContent = displayTop.textContent.slice(0, displayTop.textContent.length-1);
    }
    else if (firstOperand !== '') {
        // arithemic operations without pressing '='
        firstOperand = operate(Number(firstOperand), Number(inputString), operator);
        resetDisplay();
        displayCalculation(roundResult(Number(firstOperand)));
        displayResult(firstOperand);
    } 
    else {
        firstOperand = Number(inputString);
    } 
    operator = button;
    inputString = '';
}

function roundResult(number) {
    return Math.round(number * 100000) / 100000;
}

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '×':
            result = multiply(a, b);
            break;
        case '÷':
            result = divide(a, b);
            break;
        default:
            result = 0;
    }
    return result;
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
    if (b === '0') {
        return 'Infinity';
    }
    return a / b;
}