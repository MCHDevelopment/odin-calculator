
function initCalculator() {
    const calculatorArea = document.querySelector("#calculatorArea");

    calculatorArea.innerHTML = "";

    calculatorArea.appendChild(createCalculatorDisplay());
    calculatorArea.appendChild(createCalculatorKeypadArea());
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
            calculatorKeyRow.appendChild(createCalculatorKey("+"));
            calculatorKeyRow.appendChild(createCalculatorKey("-"));
            calculatorKeyRow.appendChild(createCalculatorKey("x"));
            calculatorKeyRow.appendChild(createCalculatorKey(":"));
            break;
        case 1:
            for (let i = 7; i < 10; i++) {
                calculatorKeyRow.appendChild(createCalculatorKey(i));
            }
            calculatorKeyRow.appendChild(createCalculatorKey("%"));
            break;
        case 2:
            for (let i = 4; i < 7; i++) {
                calculatorKeyRow.appendChild(createCalculatorKey(i));
            }
            calculatorKeyRow.appendChild(createCalculatorKey("="));
            break;
        case 3:
            for (let i = 1; i < 4; i++) {
                calculatorKeyRow.appendChild(createCalculatorKey(i));
            }
            calculatorKeyRow.appendChild(createCalculatorKey("<-"));
            break;
        case 4:
            calculatorKeyRow.appendChild(createCalculatorKey("C"));
            calculatorKeyRow.appendChild(createCalculatorKey("0"));
            calculatorKeyRow.appendChild(createCalculatorKey("+/-"));
            calculatorKeyRow.appendChild(createCalculatorKey("."));
            break;
    }


    return calculatorKeyRow;
}

function createCalculatorKey(keyCaption) {
    const calculatorKey = document.createElement("button");
    calculatorKey.classList.add("calculatorKey");
    calculatorKey.textContent = keyCaption;
    /*
    calculatorKey.addEventListener("mouseenter", () => {
        calculatorKey.classList.add("scratchedField");
    });
    */

    return calculatorKey;
}




initCalculator();