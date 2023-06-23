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
        if (displayedNumber === undefined && element.innerHTML.match(/[/x+-/=0]/) != null || displayedNumber === 0 && element.innerHTML.match(/[/x+-/]/) != null || element.innerHTML.match(/[=]/) && secondDigitEntered === undefined) {
            // If 0 is displayed, no symbols or 0's should be appended
            // = can't be used if we don't have a 2nd digit yet
            console.log("1");
            return;
        } else if (element.innerHTML.match(/[=]/)  && secondDigitEntered != undefined) {
            // If we have all pieces of the equation, calculate it
            console.log("2");
            result = operate(firstDigitEntered, secondDigitEntered, operator);
            secondLineDisplayed.innerHTML = result;
        } else if (displayedNumber === undefined || displayedNumber === 0 && element.innerHTML.match(/[/x+-/=]/) === null) {
            // Assign the first digit
            console.log("3");
            firstDigitEntered = parseInt(element.innerHTML);
            changeDisplay(element.innerHTML, firstLineDisplayed);
        } else if (element.innerHTML.match(/[/x+-/]/) && firstDigitEntered != undefined && secondDigitEntered === undefined && operator === undefined) {
            // Assign the operator if the first digit exists and second digit doesn't and the operator doesn't exist
            console.log("4");
            operator = element.innerHTML;
            changeDisplay(element.innerHTML, firstLineDisplayed);
        } else if (operator === undefined && firstDigitEntered != undefined) {
            // If no operator has been assigned yet, continue adding onto first digit
            console.log("5");
            firstDigitEntered = firstDigitEntered * 10 + parseInt(element.innerHTML);
            changeDisplay(element.innerHTML, firstLineDisplayed);
        } else if (operator != undefined && secondDigitEntered === undefined) {
            // If operator exists and there isn't a second digit yet, assign it
            console.log("6");
            if (isNaN(parseInt(element.innerHTML))) {
                return
            } else {
                secondDigitEntered = parseInt(element.innerHTML);
                console.log(operator);
                newLine = firstDigitEntered+operator+secondDigitEntered;
                firstLineDisplayed.innerHTML = newLine;
            }
        } else if (secondDigitEntered != undefined && operator != undefined && element.innerHTML.match(/[/x+-/=]/) === null) {
            // element.innerHTML.match(/[/x+-/=]/) === null this means if the button clicked wasn't a symbol
            // If second digit exists, add onto it
            console.log("7");
            secondDigitEntered = secondDigitEntered * 10 + parseInt(element.innerHTML);
            firstLineDisplayed.innerHTML += element.innerHTML;
        } else if (operator != undefined && secondDigitEntered != undefined && element.innerHTML.match(/[/x+-/]/)) {
            // Captures situation if another operator is entered
            console.log(parseInt(element.innerHTML));
            if (parseInt(isNaN(element.innerHTML))) {
                console.log("hey");
                return
            } else {
                console.log("8");
                result = operate(firstDigitEntered, secondDigitEntered, operator);
                secondLineDisplayed.innerHTML = result;
                operator = element.innerHTML;
                firstDigitEntered = result;
                secondDigitEntered = undefined;
            }
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

const deleteButton = document.querySelector(".deleteButton");
deleteButton.onclick = function(){
    if (firstDigitEntered != undefined &&
        secondDigitEntered != undefined &&
        operator != undefined &&
        result != undefined) {
            displayedNumber = 0;
        changeDisplay(0, firstLineDisplayed)
        secondLineDisplayed.innerHTML = "&#160";
        operator = undefined;
        firstDigitEntered = undefined;
        secondDigitEntered = undefined;
        result = undefined;
    } else {
        if (firstDigitEntered != undefined && operator === undefined && secondDigitEntered === undefined) {
            // Handles first digit backspace
            displayedNumber  = firstLineDisplayed.innerHTML.slice(0, -1);
            firstLineDisplayed.innerHTML = displayedNumber;
            firstDigitEntered = parseInt(displayedNumber);
            console.log(firstDigitEntered);
        } else if (firstDigitEntered != undefined && operator != undefined && secondDigitEntered === undefined) {
            // Handles operator backspace
            displayedNumber  = firstLineDisplayed.innerHTML.slice(0, -1);
            firstLineDisplayed.innerHTML = displayedNumber;
            operator = undefined;
            console.log(operator);
        } else if (firstDigitEntered != undefined && operator != undefined && secondDigitEntered != undefined) {
            // Handles all cases including if second digit exists
            displayedNumber  = firstLineDisplayed.innerHTML.slice(0, -1);
            if (secondDigitEntered < 10) {
            secondDigitEntered = undefined;
            } else if (secondDigitEntered > 9) {
                secondDigitEntered = (secondDigitEntered - parseInt(firstLineDisplayed.innerHTML.slice(-1))) / 10;
                console.log(secondDigitEntered);
            }
            firstLineDisplayed.innerHTML = displayedNumber;
        }
    }

}

let firstDigitEntered;
let secondDigitEntered;
let operator;
let displayedNumber;
let result;