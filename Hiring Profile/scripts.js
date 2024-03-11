const miniNav = document.querySelector(".mini-navigation");
const hireBtn = document.querySelector("#hire-btn");
const profileCard = document.querySelector(".profile-card");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector("#close-btn");
const userName = document.querySelector("[data-username]");
const hiredUser = document.querySelector("#user");

miniNav.addEventListener("click", function (e) {
  for (let index = 0; index < miniNav.children.length; index++) {
    const element = miniNav.children[index];
    console.log(e.target, element);
    if (e.target === element) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  }
});

hireBtn.addEventListener("click", function () {
  profileCard.style.display = "none";
  hiredUser.innerText = userName.innerText;
  modal.classList.add("reveal");
});

closeModal.addEventListener("click", function () {
  profileCard.style.display = "";
  modal.classList.remove("reveal");
});
