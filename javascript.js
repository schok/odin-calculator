function add(firstDigitEntered, secondDigitEntered) {
    return firstDigitEntered + secondDigitEntered;
}

function subtract(firstDigitEntered, secondDigitEntered) {
    return firstDigitEntered - secondDigitEntered;
}

function multiply(firstDigitEntered, secondDigitEntered) {
    return firstDigitEntered * secondDigitEntered;
}

function divide(firstDigitEntered, secondDigitEntered) {
    return firstDigitEntered / secondDigitEntered;
}

function operate(firstDigitEntered, secondDigitEntered, operator) {
    if (operator === "+") {
        return add(firstDigitEntered, secondDigitEntered);
    } else if (operator === "-") {
        return subtract(firstDigitEntered, secondDigitEntered);
    } else if (operator === "*") {
        return multiply(firstDigitEntered, secondDigitEntered);
    } else if (operator === "/") {
        return divide(firstDigitEntered, secondDigitEntered);
    }
}

function changeDisplay(clickedNumber, firstLineDisplayed) {
    if (displayedNumber === undefined || displayedNumber ===  0) {
        displayedNumber = clickedNumber;
    } else {
        displayedNumber += clickedNumber;
    } 
    // } else if(clickedbutton doesn't contain /x+-) {
    //     then we make it the first digit entered
    // } else if(it does contain /x+- for the last digit) {
    //     then we store that into the operator
    // } else if(/x+- isn't the last digit) {
    //     then we'll store that into the second digit
    // } else if (it's a equal sign) {
    //     then we can operate on it woot
    // } else if (displayedNumber.length < 20) {
    //     displayedNumber += clickedNumber;
    // }
    firstLineDisplayed.innerHTML = displayedNumber;
};

const firstLineDisplayed = document.querySelector(".firstLineDisplayed");
const smallButton = document.querySelectorAll(".smallButton");

smallButton.forEach((element) => {
    element.onclick = function(){changeDisplay(element.innerHTML, firstLineDisplayed)};
});

const clearButton = document.querySelector(".clearButton");
clearButton.onclick = function(){
    displayedNumber = 0;
    changeDisplay(0, firstLineDisplayed)
};


// function storeFirstDigitAndOperator() {
//     const firstLineDisplayed = document.querySelector(".firstLineDisplayed");
//     window.onclick = e => {
//         operator = e.target.innerText
//     };
// }

let firstDigitEntered;
let secondDigitEntered;
let operator;
let displayedNumber;