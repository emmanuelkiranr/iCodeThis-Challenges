function appendToScreen(x) {
  document.getElementById("display").value += x;
}

function flip() {
  calculate();
  document.getElementById("display").value =
    -document.getElementById("display").value;
}

function clearScreen() {
  document.getElementById("display").value = "";
}

function calculate() {
  let result = math.evaluate(document.getElementById("display").value);
  document.getElementById("display").value = result;
}
