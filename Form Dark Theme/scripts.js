// chat-section
const chatSectionContainer = document.querySelector(".chat-section");
const profileForm = document.querySelector(".details-section");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phno");
const message = document.querySelector("#msg");
const errorMsg = document.getElementById("error-msg");
const closeBtn = document.getElementById("close-btn");

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(profileForm);

  for (let [key, value] of formData.entries()) {
    errorMsg.style.display = "none";
    if ((key === "name" && value === "") || (key === "email" && value === "")) {
      errorMsg.style.display = "block";
      errorMsg.innerText = `Please enter valid ${key}`;
      return;
    } else if (key === "phno" && value.length !== 10) {
      errorMsg.style.display = "block";
      errorMsg.innerText = `Please enter valid ${key}`;
      return;
    } else {
      errorMsg.style.display = "none";
      console.log(key + ": " + value);
    }
  }
  alert("Successfully submitted details");
});

closeBtn.addEventListener("click", (e) => {
  chatSectionContainer.style.display = "none";
});
