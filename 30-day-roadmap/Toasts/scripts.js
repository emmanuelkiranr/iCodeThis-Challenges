const btns = document.querySelectorAll(".btn");

const basicSnackbar = document.querySelector(".basic-container");
const roundedSnackbar = document.querySelector(".rounded-container");
const timerSnackbar = document.querySelector(".timer-container");

const template = document.querySelector("#template");
const container = document.querySelector(".toast-container");

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const toast = template.content.cloneNode(true);
    const snackbar = toast.querySelector(".snackbar");
    const svg = toast.querySelector("[data-close]");

    if (btn.dataset.rounded === "rounded") {
      snackbar.classList.add("rounded");
    } else if (btn.dataset.timer === "timer") {
      svg.remove();
      snackbar.classList.add("timer");
    }

    container.appendChild(toast);
    // svg.addEventListener("click", function () {
    //   container.removeChild(container.firstElementChild);
    // });
    setTimeout(() => {
      container.removeChild(container.firstElementChild);
    }, 6500);
  });
});
