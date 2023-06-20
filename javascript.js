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
    } else if (operator === "x") {
        return multiply(firstDigitEntered, secondDigitEntered);
    } else if (operator === "/") {
        return divide(firstDigitEntered, secondDigitEntered);
    }
}

function changeDisplay(clickedButton, LineDisplayed) {
    if (displayedNumber === undefined || displayedNumber ===  0) {
        displayedNumber = clickedButton;
    } else {
        displayedNumber += clickedButton;
    } 
    LineDisplayed.innerHTML = displayedNumber;
};

const firstLineDisplayed = document.querySelector(".firstLineDisplayed");
const secondLineDisplayed = document.querySelector(".secondLineDisplayed");
const smallButton = document.querySelectorAll(".smallButton");

smallButton.forEach((element) => {
    element.onclick = function(){
        if (displayedNumber === undefined && element.innerHTML.match(/[/x+-/=]/) != null || displayedNumber === 0 && element.innerHTML.match(/[/x+-/]/) != null) {
            return;
        } else if (element.innerHTML.match(/[=]/) && secondDigitEntered === undefined) {
            return;
        } else if (element.innerHTML.match(/[=]/)  && secondDigitEntered != undefined) {
            result = operate(firstDigitEntered, secondDigitEntered, operator);
        } else if (displayedNumber === undefined || displayedNumber === 0 && element.innerHTML.match(/[/x+-/=]/) === null) {
            firstDigitEntered = parseInt(element.innerHTML);
        } else if (element.innerHTML.match(/[/x+-/]/)) {
            operator = element.innerHTML;
        } else if (operator === undefined) {
            firstDigitEntered = firstDigitEntered * 10 + parseInt(element.innerHTML);
        } else if (operator != undefined && secondDigitEntered === undefined) {
            secondDigitEntered = parseInt(element.innerHTML);
        } else if (secondDigitEntered != undefined) {
            secondDigitEntered = secondDigitEntered * 10 + parseInt(element.innerHTML);
        }
        
        if (result === undefined) {
            changeDisplay(element.innerHTML, firstLineDisplayed);
        } else if (result != undefined) {
            secondLineDisplayed.innerHTML = result;
        }
    };
});

const clearButton = document.querySelector(".clearButton");
clearButton.onclick = function(){
    displayedNumber = 0;
    changeDisplay(0, firstLineDisplayed)
    secondLineDisplayed.innerHTML = "&#160";
    operator = undefined;
    firstDigitEntered = undefined;
    secondDigitEntered = undefined;
    result = undefined;
};

let firstDigitEntered;
let secondDigitEntered;
let operator;
let displayedNumber;
let result;