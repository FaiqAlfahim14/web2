let display = document.getElementById("display");

function clearDisplay() {
  display.textContent = "0";
}

function appendToDisplay(value) {
  if (display.textContent === "0") {
    display.textContent = value;
  } else {
    display.textContent += value;
  }
}

function calculate() {
  try {
    display.textContent = eval(display.textContent);
  } catch (e) {
    display.textContent = "Error";
  }
}

function undoLast() {
  if (displayStack.length > 0) {
    const lastValue = displayStack.pop(); // Ambil state terakhir dari stack
    updateDisplay(lastValue);
  }
}
