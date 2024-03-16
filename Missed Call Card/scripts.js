// send message btn
const sendMsg = document.querySelector("[data-send-msg]");

// message-modal
const messageModal = document.querySelector(".message-modal");
const snackbar = document.querySelector(".snackbar");
const form = document.querySelector("[data-msg-form]");
const input = document.querySelector("[data-msg-inp]");
const send = document.querySelector("[data-msg-submit]");
const closeModal = document.querySelector("[data-form-close]");

// open messageModal
sendMsg.addEventListener("click", function () {
  messageModal.classList.add("reveal");
  messageModal.addEventListener(
    "animationend",
    function () {
      messageModal.classList.remove("message-modal-open-animation");
    },
    { once: true }
  );
});

// close messageModal
closeModal.addEventListener("click", function () {
  messageModal.classList.add("message-modal-close-animation");
  messageModal.addEventListener(
    "animationend",
    function () {
      messageModal.classList.remove("reveal");
      messageModal.classList.remove("message-modal-close-animation");
      messageModal.classList.add("message-modal-open-animation");
      input.value = "";
    },
    { once: true }
  );
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!input.value || input.value.trim().length === 0) return;
  messageModal.classList.remove("reveal");
  input.value = "";
  messageModal.classList.add("message-modal-open-animation");
  snackbar.classList.add("reveal");
});

let animationCount = 0;
snackbar.addEventListener("animationend", function () {
  animationCount++;
  if (animationCount === 2) {
    snackbar.classList.remove("reveal");
    animationCount = 0;
  }
});
