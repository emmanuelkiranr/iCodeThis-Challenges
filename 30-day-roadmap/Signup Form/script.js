const form = document.querySelector("[data-new-account]");
const error = document.querySelector(".error");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const pass = document.querySelector("#password");
const modal = document.querySelector(".modal-container");

const ERROR = {
  LENGTH: "Password must be atleast 8 characters long",
  LOWERCASE: "Password must contain at least one lowercase letter",
  UPPERCASE: "Password must contain at least one uppercase letter",
  DIGIT: "Password must contain at least one digit",
  SPECIAL_CHAR: "Password must contain at least one special character",
};

let animationCount = 0;
let animationInProgress = false;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const password = formData.get("password");

  const result = validatePassword(password);

  if (result.status) {
    error.innerText = "";
    showAnimation();
  } else {
    error.innerText = result.message;
    return;
  }
  clearFields();
});

function validatePassword(password) {
  if (password.length < 8) {
    return {
      status: false,
      message: ERROR.LENGTH,
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      status: false,
      message: ERROR.LOWERCASE,
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      status: false,
      message: ERROR.UPPERCASE,
    };
  }

  if (!/\d/.test(password)) {
    return {
      status: false,
      message: ERROR.DIGIT,
    };
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    return {
      status: false,
      message: ERROR.SPECIAL_CHAR,
    };
  }
  return {
    status: true,
    message: "Success",
  };
}

function clearFields() {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  pass.value = "";
}

function showAnimation() {
  if (animationInProgress) {
    return;
  }
  animationInProgress = true;
  modal.classList.add("reveal");
  modal.addEventListener("animationend", handleAnimationEnd);
  function handleAnimationEnd() {
    animationCount++;
    if (animationCount === 2) {
      modal.classList.remove("reveal");
      animationCount = 0;
      animationInProgress = false;
      modal.removeEventListener("animationend", handleAnimationEnd);
    }
  }
}
