document.querySelector(".percentage").innerText = `25%`;
function updateProgress(percentage) {
  document.querySelector(".progress").style.background = `conic-gradient(
                #2c295f 0% ${percentage}%,
                transparent ${percentage}% 100%
            )`;
  document.querySelector(".percentage").innerText = `${percentage}%`;
}
updateProgress(25);
