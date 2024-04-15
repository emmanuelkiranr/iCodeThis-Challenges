const primaryBtn = document.querySelector("[data-addToCart]");
const secondaryBtn = document.querySelectorAll("[data-secondaryBtn]");
const modal = document.querySelector(".modal-container");
const modalText = document.querySelector(".modal-text");

secondaryBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    const btnText = btn.querySelector("[data-btnText]");
    const icon = btn.querySelector("svg");

    const cart = document.querySelector(".cart-btn");
    const wishlist = document.querySelector(".wishlist-btn");

    icon.classList.toggle("filled");

    if (icon.classList.contains("filled")) {
      if (btn === cart) {
        btnText.innerText = "Remove item";
      }
      if (btn === wishlist) {
        btnText.innerText = "unfavorite";
      }
    } else {
      if (btn === cart) {
        btnText.innerText = "Add to cart";
      }
      if (btn === wishlist) {
        btnText.innerText = "Add to wishlist";
      }
    }
  });
});

primaryBtn.addEventListener("click", function () {
  const cart = document.querySelector(".cart-btn");
  secondaryBtn.forEach((btn) => {
    if (btn === cart) {
      const icon = btn.querySelector("svg");
      const btnText = btn.querySelector("[data-btnText]");
      if (icon.classList.contains("filled")) {
        modalText.innerText = "Already added!";
      } else {
        modalText.innerText = "Successfully addded to cart";
      }
      icon.classList.add("filled");
      btnText.innerText = "Remove item";
    }
  });
  modal.classList.add("reveal");
  // modal.classList.add("reveal-animation");
  // modal.addEventListener(
  //   "animationend",
  //   function () {
  //     modal.classList.remove("reveal-animation");
  //     modal.classList.add("close-animation");
  //     modal.addEventListener(
  //       "animationend",
  //       function () {
  //         modal.classList.remove("reveal");
  //         modal.classList.remove("close-animation");
  //       },
  //       { once: true }
  //     );
  //   },
  //   { once: true }
  // );
  let animationCount = 0;
  modal.addEventListener("animationend", function () {
    animationCount++;
    if (animationCount === 2) {
      modal.classList.remove("reveal");
      animationCount = 0;
    }
  });
});
