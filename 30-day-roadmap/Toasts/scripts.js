const btns = document.querySelectorAll(".btn");

const basicSnackbar = document.querySelector(".basic-container");
const roundedSnackbar = document.querySelector(".rounded-container");

let animation = {
  animationOneInProgress: false,
  animationTwoInProgress: false,
};

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (btn.dataset.basic === "basic") {
      startAnimation(basicSnackbar, "animationOneInProgress");
    } else if (btn.dataset.rounded === "rounded") {
      startAnimation(roundedSnackbar, "animationTwoInProgress");
    }
  });
});

function startAnimation(snackbar, animationInProgress) {
  if (animation[animationInProgress]) return;
  let animationCount = 0;
  animation[animationInProgress] = true;

  snackbar.classList.add("reveal");
  let closeBtn = snackbar.querySelector("[data-close]");
  closeBtn.addEventListener("click", function () {
    reset(snackbar, animationInProgress);
  });

  snackbar.addEventListener("animationend", handleAnimation);
  function handleAnimation() {
    animationCount++;
    if (animationCount === 2) {
      reset(snackbar, animationInProgress);
    }
  }

  function reset(snackbar, animationInProgress) {
    animation[animationInProgress] = false;
    snackbar.removeEventListener("animationend", handleAnimation);
    snackbar.classList.remove("reveal");
  }
}
