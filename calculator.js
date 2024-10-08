
let calculatorPhase = "enterFirstNumber";
let firstNumber = 0;
let secondNumber = 0;
let result = 0;
let operation = "";

function initCalculator() {
    const calculatorArea = document.querySelector("#calculatorArea");
    calculatorArea.innerHTML = "";

    calculatorArea.appendChild(createCalculatorDisplay());
    calculatorArea.appendChild(createCalculatorKeypadArea());

    clear();
}

function createCalculatorDisplay() {
    const calculatorDisplay = document.createElement("div");
    calculatorDisplay.setAttribute("id", "calculatorDisplay");
    calculatorDisplay.textContent = "0.00000";
    return calculatorDisplay;
}

function createCalculatorKeypadArea(numberOfFields) {
    const calculatorKeypadArea = document.createElement("div");
    calculatorKeypadArea.setAttribute("id", "calculatorKeypadArea");

    for (let i = 0; i < 5; i++) {
        calculatorKeypadArea.appendChild(createCalculatorKeyRow(i));
    }

    return calculatorKeypadArea;
}

function createCalculatorKeyRow(chosenRow) {
    const calculatorKeyRow = document.createElement("div");
    calculatorKeyRow.classList.add("calculatorKeyRow");

    switch (chosenRow) {
        case 0:
            calculatorKeyRow.appendChild(createCalculatorKey("+", "operator"));
            calculatorKeyRow.appendChild(createCalculatorKey("-", "operator"));
            calculatorKeyRow.appendChild(createCalculatorKey("x", "operator"));
            calculatorKeyRow.appendChild(createCalculatorKey(":", "operator"));
            break;
        case 1:
            for (let i = 7; i < 10; i++) {
                calculatorKeyRow.appendChild(createCalculatorKey(i, "number"));
            }
            calculatorKeyRow.appendChild(createCalculatorKey("%", "operator"));
            break;
        case 2:
            for (let i = 4; i < 7; i++) {
                calculatorKeyRow.appendChild(createCalculatorKey(i, "number"));
            }
            calculatorKeyRow.appendChild(createCalculatorKey("=", "result"));
            break;
        case 3:
            for (let i = 1; i < 4; i++) {
                calculatorKeyRow.appendChild(createCalculatorKey(i, "number"));
            }
            calculatorKeyRow.appendChild(createCalculatorKey("<-", "special"));
            break;
        case 4:
            calculatorKeyRow.appendChild(createCalculatorKey("C", "clear"));
            calculatorKeyRow.appendChild(createCalculatorKey(0, "number"));
            calculatorKeyRow.appendChild(createCalculatorKey("+/-", "special"));
            calculatorKeyRow.appendChild(createCalculatorKey(".", "special"));
            break;
    }


    return calculatorKeyRow;
}

function createCalculatorKey(keyCaption, keyCategory) {
    const calculatorKey = document.createElement("button");
    calculatorKey.classList.add("calculatorKey");
    calculatorKey.textContent = keyCaption;

    switch (keyCategory) {
        case "number":
            calculatorKey.classList.add("calculatorNumberKey");
            calculatorKey.addEventListener("click", () => {
                enterNumber(parseInt(keyCaption));
            });
            break;
        case "operator":
            calculatorKey.classList.add("calculatorOperatorKey");
            calculatorKey.addEventListener("click", () => {
                enterOperator(keyCaption);
            });
            break;
        case "result":
            calculatorKey.classList.add("calculatorResultKey");
            calculatorKey.addEventListener("click", () => {
                calculate();
            });
            break;
        case "clear":
            calculatorKey.classList.add("calculatorClearKey");
            calculatorKey.addEventListener("click", () => {
                clear();
            });
            break;
        case "special":
            calculatorKey.classList.add("calculatorSpecialKey");

            switch (keyCaption) {
                case "+/-":
                    calculatorKey.addEventListener("click", () => {
                        invert();
                    });
                    break;
                case ".":
                    calculatorKey.addEventListener("click", () => {
                        addDecimalPoint();
                    });
                    break;
                case "<-":
                    calculatorKey.addEventListener("click", () => {
                        deleteLastElement();
                    });
                    break;
            }

            break;
    }

    return calculatorKey;
}

function enterNumber(enteredNumber) {
    switch (calculatorPhase) {
        case "enterFirstNumber":
            firstNumber *= 10;
            firstNumber += enteredNumber;
            break;
        case "enterSecondNumber":
            secondNumber *= 10;
            secondNumber += enteredNumber;
            break;
        case "showResult":
            //reset everything before starting the next calculation
            clear();
            calculatorPhase = "enterFirstNumber";
            enterNumber(enteredNumber);
            break;
    }

    updateDisplay();
}

function enterOperator(enteredOperator) {
    switch (calculatorPhase) {
        case "enterFirstNumber":
            operation = enteredOperator;
            calculatorPhase = "enterSecondNumber";
            break;
        case "showResult":
            //Store the result, because everything will be deleted
            let tempNumber = operate(firstNumber, secondNumber, operation);
            clear();
            //use the result as the first number, like the assigment asked
            firstNumber = tempNumber;
            operation = enteredOperator;
            calculatorPhase = "enterSecondNumber";
            break;
    }

    updateDisplay();
}

function calculate() {
    switch (calculatorPhase) {
        case "enterSecondNumber":
            result = operate(firstNumber, secondNumber, operation);
            calculatorPhase = "showResult";
            break;
    }

    updateDisplay();
}

function operate(numberOne, numberTwo, chosenOperation) {
    //Parameters are only here because the asignment asked for them, all of those values could be accessed without passing them
    //so I added an return value to make this function independent of this script
    let calculatedResult = 0;
    switch (chosenOperation) {
        case "+":
            calculatedResult = numberOne + numberTwo;
            break;
        case "-":
            calculatedResult = numberOne - numberTwo;
            break;
        case "x":
            calculatedResult = numberOne * numberTwo;
            break;
        case ":":
            if (numberTwo != 0) {
                calculatedResult = numberOne / numberTwo;
            } else {
                calculatedResult = "No!";
            }
            break;
        case "%":
            calculatedResult = numberOne % numberTwo;
            break;
    }

    return calculatedResult;
}


function clear() {
    const calculatorDisplay = document.querySelector("#calculatorDisplay");
    calculatorDisplay.textContent = "0.00000";

    calculatorPhase = "enterFirstNumber";
    firstNumber = 0;
    secondNumber = 0;
    result = 0;
    operation = "";
}

function updateDisplay() {
    const calculatorDisplay = document.querySelector("#calculatorDisplay");

    let displayString = "";
    let calculationString = "";

    switch (calculatorPhase) {
        case "enterFirstNumber":
            calculationString += firstNumber;
            displayString = firstNumber;
            break;
        case "enterSecondNumber":
            calculationString += firstNumber + " " + operation + " " + secondNumber;
            displayString = secondNumber;
            break;
        case "showResult":
            calculationString += firstNumber + " " + operation + " " + secondNumber + " = " + result;
            displayString = result;
            break;
    }

    console.log(calculationString);

    calculatorDisplay.textContent = displayString;
}

function invert() {
    switch (calculatorPhase) {
        case "enterFirstNumber":
            firstNumber *= -1;
            break;
        case "enterSecondNumber":
            secondNumber *= -1;
            break;
    }

    updateDisplay();
}

function addDecimalPoint() {
    console.log("Decimal point added");
}

function deleteLastElement() {
    let str = "";
    switch (calculatorPhase) {
        case "enterFirstNumber":
            str = firstNumber.toString();
            str = str.substring(0, str.length - 1);
            if (str.length == 0) {
                firstNumber = 0;
            } else {
                firstNumber = parseInt(str);
            }
            break;
        case "enterSecondNumber":
            str = secondNumber.toString();
            str = str.substring(0, str.length - 1);
            if (str.length == 0) {
                secondNumber = 0;
            } else {
                secondNumber = parseInt(str);
            }
            break;
    }

    updateDisplay();
}
initCalculator();