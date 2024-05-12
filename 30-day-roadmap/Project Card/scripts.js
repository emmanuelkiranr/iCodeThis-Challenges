const range = document.querySelector("input");
const percentage = document.querySelector(".percentage");

range.addEventListener("input", function () {
  percentage.innerText = range.value;
});
