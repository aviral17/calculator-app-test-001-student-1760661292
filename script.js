// Initialize variables to store current input, previous value, and selected operation
let currentInput = "0";
let previousValue = null;
let currentOperation = null;
let shouldResetDisplay = false; // Flag to reset display on next digit input

const display = document.getElementById('display');
const digitButtons = document.querySelectorAll('[data-digit]');
const operationButtons = document.querySelectorAll('[data-operation]');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

// Function to update the display
function updateDisplay() {
  display.textContent = currentInput;
}

// Handle digit button clicks
digitButtons.forEach(button => {
  button.addEventListener('click', () => {
    const digit = button.getAttribute('data-digit');
    if (shouldResetDisplay) {
      currentInput = digit;
      shouldResetDisplay = false;
    } else {
      // Prevent multiple leading zeros
      if (currentInput === '0') {
        currentInput = digit;
      } else {
        currentInput += digit;
      }
    }
    updateDisplay();
  });
});

// Handle operation button clicks
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    const operation = button.getAttribute('data-operation');
    if (currentOperation && previousValue !== null) {
      // Perform the previous operation
      performCalculation();
    } else {
      previousValue = parseFloat(currentInput);
    }
    currentOperation = operation;
    shouldResetDisplay = true;
  });
});

// Handle equals button click
equalsButton.addEventListener('click', () => {
  if (currentOperation && previousValue !== null) {
    performCalculation();
    currentOperation = null;
  }
});

// Handle clear button
clearButton.addEventListener('click', () => {
  currentInput = "0";
  previousValue = null;
  currentOperation = null;
  shouldResetDisplay = false;
  updateDisplay();
});

// Function to perform calculation based on the current operation
function performCalculation() {
  const currentValue = parseFloat(currentInput);
  let result = null;
  switch (currentOperation) {
    case '+':
      result = previousValue + currentValue;
      break;
    case '-':
      result = previousValue - currentValue;
      break;
    case '*':
      result = previousValue * currentValue;
      break;
    case '/':
      if (currentValue === 0) {
        alert('Error: Division by zero');
        result = 0;
      } else {
        result = previousValue / currentValue;
      }
      break;
    default:
      return;
  }
  // Update current input with the result
  currentInput = result.toString();
  // Reset previous value
  previousValue = result;
  updateDisplay();
}

// Initialize display
updateDisplay();