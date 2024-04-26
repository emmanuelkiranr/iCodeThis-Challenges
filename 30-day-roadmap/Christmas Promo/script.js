const promoContainer = document.querySelector(".container");
const getGiftBtn = document.querySelector("[data-getGift]");
const modal = document.querySelector(".modal-container");
const couponCode = document.querySelector("[data-couponCode]");
const copyIcon = document.querySelector("[data-copyIcon]");
const copyModal = document.querySelector(".copyModal-container");

let animationInProgress = false;
let animationCount = 0;

getGiftBtn.addEventListener("click", function () {
  promoContainer.style.display = "none";
  modal.classList.add("reveal");

  copyIcon.addEventListener("click", function () {
    // couponCode.select(); highlights the text in that filed
    // couponCode.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(couponCode.value);
    if (animationInProgress) {
      return;
    }
    animationInProgress = true;
    handleAnimation();
  });
});

function handleAnimation() {
  copyModal.classList.add("reveal");
  copyModal.addEventListener("animationend", handleSnackbar);
}

function handleSnackbar() {
  animationCount++;
  if (animationCount === 2) {
    copyModal.removeEventListener("animationend", handleSnackbar);
    animationCount = 0;
    copyModal.classList.remove("reveal");
    animationInProgress = false;
  }
}
