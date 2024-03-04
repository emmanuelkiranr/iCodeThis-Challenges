// Add JavaScript code here
const feedbackContainer = document.querySelector(".feedback-container");
const form = document.querySelector("[data-feedback-form]");
const feedback = document.querySelector("[data-feedback-inp]");
const allowContacted = document.getElementById("allow-contact");
const joinResearch = document.getElementById("join-research");
const model = document.querySelector(".model-container");
const closeModel = document.querySelector("#close-model");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const errorExists = document.querySelector(".error-msg");

  const formData = new FormData(form);
  let response = {};
  for (let [key, value] of formData.entries()) {
    if (key === "feedback" && value === "") {
      if (errorExists) {
        return;
      }
      const span = document.createElement("span");
      span.classList.add("error-msg");
      span.innerText = "Feedback cannot be empty";

      form.appendChild(span);
      return;
    }
    response[key] = value;
  }

  feedback.value = "";
  allowContacted.checked = false;
  joinResearch.checked = false;

  if (errorExists) {
    errorExists.remove();
  }
  model.classList.add("reveal");
  feedbackContainer.style.display = "none";
});

closeModel.addEventListener("click", function () {
  model.classList.remove("reveal");
  feedbackContainer.style.display = "";
});
