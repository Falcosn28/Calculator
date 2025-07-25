let numberOne = ""; //use these to update display 
let operator = "";
let numberTwo = ""; 

let fullnumber = "";

const buttonsNumbers = document.querySelectorAll(".buttons-numbers");
const buttonsOperators = document.querySelectorAll(".buttons-operators");
const buttonEquals = document.querySelector("#button-equals");
const buttonClear = document.querySelector("#button-clear");
const display = document.querySelector("#display");

const buttonDecimal = document.querySelector("#button-decimal");
const buttonBack = document.querySelector("#button-back")

function add (num01, num02) 
{
  return num01 + num02
}

function subtract (num01, num02) 
{
  return num01 - num02
}

function multiply (num01, num02) 
{
  return num01 * num02
}

function divide (num01, num02) 
{
  return num01 / num02
}

function operate(num01, operator, num02) {
  let result;
  if (operator == "/" && num02 == 0) { 
    alert("cant divide by 0 you stupid")
    fullnumber = ""
    numberTwo = ""
    numberOne = ""
    operator = ""
    return "ERROR";
  }
  switch (operator) {
    case "+":
      result = add(parseFloat(num01), parseFloat(num02)) 
      break;
    case "-":
      result = subtract(parseFloat(num01), parseFloat(num02)) 
      break;
    case "*":
      result = multiply(parseFloat(num01), parseFloat(num02)) 
      break;
    case "/":
      result = divide(parseFloat(num01), parseFloat(num02)) 
      break;
    default:
      result = add(parseFloat(num01), parseFloat(num02))
      break;
  }
  return  Math.round(result * 100) / 100;
}

function updatedisplay () 
{
  display.innerText = fullnumber
}

function calculate () {

  if (numberOne !== "" && numberTwo !== "") {  //calculate
    fullnumber = operate(numberOne, operator, numberTwo).toString()
  
  if (fullnumber == "ERROR") { //if error that display and delete
    updatedisplay()
    fullnumber = ""
  }
  else {
    updatedisplay() //if number that save for fullnumber
    numberOne = ""
    numberTwo = ""
  }

  }
}

function operatorClicked(curr) 
{ 
  if (numberOne == "") {
    numberOne = fullnumber.toString()
    fullnumber = ""
  }
  else if (numberTwo == "") {
    numberTwo = fullnumber.toString()
    fullnumber = ""
  }

  calculate()
  operator = curr
}


//handle click

buttonEquals.addEventListener("click", () => {
  if (numberOne !== "") {
    numberTwo = fullnumber
  }
  calculate()
})

buttonClear.addEventListener("click", () => {
  fullnumber = ""
  numberTwo = ""
  numberOne = ""
  operator = ""
  updatedisplay()
})


buttonsNumbers.forEach(btn => {
  btn.addEventListener("click", () => {
    fullnumber += btn.innerText
    updatedisplay()
  })
})

buttonsOperators.forEach(btn => {
  btn.addEventListener("click", () => {
    operatorClicked(btn.innerText) 
  })
})

buttonDecimal.addEventListener("click", () => {
  if (!fullnumber.includes(".")) {
    if (fullnumber === "") {
      fullnumber += "0";
    } 
    fullnumber += "."; 
    updatedisplay();
  }
})

buttonBack.addEventListener("click", () => {
  fullnumber = fullnumber.slice(0, -1)
  updatedisplay()

})



// hande keys
document.addEventListener("keydown", (event) => {
  
  buttonsNumbers.forEach(btn => {
    if (event.key === btn.innerText) {
      fullnumber += btn.innerText;
      updatedisplay();
    }
  });
  
  buttonsOperators.forEach(btn => {
    if (event.key === btn.innerText) {
      operatorClicked(btn.innerText);
    }
  });

  if (event.key === "." && !fullnumber.includes(".") && fullnumber !== "") {
    fullnumber += ".";
    updatedisplay();
  }

  if (event.key === "Backspace") {
    fullnumber = fullnumber.slice(0, -1);
    updatedisplay();
  }
 
  if (event.key === "Enter") {
    if (numberOne !== "") {
      numberTwo = fullnumber
    }
    calculate()
  }
 
});
