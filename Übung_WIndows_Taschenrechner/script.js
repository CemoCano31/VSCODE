// Verweise auf die Elemente
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let firstOperand = null;
let operator = null;
let shouldResetScreen = false; // Flag, um anzuzeigen, dass ein neuer Wert gestartet wird

// Event Listener für alle Buttons
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.getAttribute("data-action");
    
    switch (action) {
      case "digit":
        appendDigit(btn.innerText);
        break;
      case "dot":
        appendDot();
        break;
      case "clear":
        clearAll();
        break;
      case "sign":
        toggleSign();
        break;
      case "percent":
        toPercent();
        break;
      case "plus":
        setOperator("+");
        break;
      case "minus":
        setOperator("-");
        break;
      case "multiply":
        setOperator("*");
        break;
      case "divide":
        setOperator("/");
        break;
      case "equals":
        calculate();
        break;
    }
  });
});

// Ziffern anhängen
function appendDigit(digit) {
  if (display.innerText === "0" || shouldResetScreen) {
    display.innerText = digit;
    shouldResetScreen = false;
  } else {
    display.innerText += digit;
  }
}

// Dezimalpunkt hinzufügen
function appendDot() {
  if (shouldResetScreen) {
    display.innerText = "0";
    shouldResetScreen = false;
  }
  if (!display.innerText.includes(".")) {
    display.innerText += ".";
  }
}

// Alles zurücksetzen
function clearAll() {
  display.innerText = "0";
  firstOperand = null;
  operator = null;
  shouldResetScreen = false;
}

// Vorzeichen umschalten
function toggleSign() {
  if (display.innerText !== "0") {
    if (display.innerText.startsWith("-")) {
      display.innerText = display.innerText.slice(1);
    } else {
      display.innerText = "-" + display.innerText;
    }
  }
}

// Prozent
function toPercent() {
  const currentValue = parseFloat(display.innerText);
  display.innerText = (currentValue / 100).toString();
}

// Operator setzen
function setOperator(op) {
  // Falls bereits ein Operator besteht, zuerst Ergebnis berechnen
  if (operator !== null) {
    calculate();
  }
  firstOperand = parseFloat(display.innerText);
  operator = op;
  shouldResetScreen = true;
}

// Berechnung durchführen
function calculate() {
  if (operator === null || shouldResetScreen) {
    return;
  }

  const secondOperand = parseFloat(display.innerText);
  let result = 0;

  switch (operator) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "-":
      result = firstOperand - secondOperand;
      break;
    case "*":
      result = firstOperand * secondOperand;
      break;
    case "/":
      if (secondOperand === 0) {
        alert("Fehler: Division durch 0!");
        clearAll();
        return;
      }
      result = firstOperand / secondOperand;
      break;
  }

  display.innerText = result.toString();
  operator = null;
}
