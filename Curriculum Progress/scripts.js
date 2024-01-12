document.querySelector(".percentage").innerText = `0%`;

let newPercentage = 0;
let currentPercentage = 0;

function updateProgress(percentage, n) {
  // get the current % each time before calculating new %
  currentPercentage = parseFloat(
    document.querySelector(".percentage").innerText
  );

  let checkbox = document.getElementById(`chapter-${n}`);

  // if checked add up the % else subtract
  if (checkbox.checked) {
    newPercentage = currentPercentage + percentage;

    document.querySelector(".progress").style.background = `conic-gradient(
                #2c295f 0% ${newPercentage}%,
                transparent ${newPercentage}% 100%
            )`;

    document.querySelector(".percentage").innerText = `${newPercentage}%`;
  } else {
    newPercentage = currentPercentage - percentage;

    document.querySelector(".progress").style.background = `conic-gradient(
                #2c295f 0% ${newPercentage}%,
                transparent ${newPercentage}% 100%
            )`;
    document.querySelector(".percentage").innerText = `${newPercentage}%`;
  }
}
