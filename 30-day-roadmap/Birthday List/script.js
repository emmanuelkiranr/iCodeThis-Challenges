const profilesContainer = document.querySelector(".lists");
const profileTemplate = document.getElementById("user-info");
const count = document.querySelector(".count");
const btn = document.querySelector("[data-btn]");

function render() {
  clearElements(profilesContainer);
  renderCount();
  profileInfo.forEach((item) => {
    const profileElement = document.importNode(profileTemplate.content, true);
    const li = profileElement.querySelector(".user-profile");
    const imageContainer = profileElement.querySelector(".user-image");
    const username = profileElement.querySelector(".username");
    const age = profileElement.querySelector(".age");

    li.setAttribute("id", item.id);
    imageContainer.style.backgroundImage = `url(${item.image})`;
    username.innerText = item.name;
    age.innerText = `${item.age} years`;
    profilesContainer.appendChild(profileElement);
  });
}

btn.addEventListener("click", function () {
  profilesContainer.scrollTop = 0; // distance from the top of the container to the element
  profilesContainer.classList.toggle("list-scroll");
  btn.classList.toggle("btn-secondary");
  if (profilesContainer.classList.contains("list-scroll")) {
    btn.innerText = "View less";
  } else {
    btn.innerText = "View all";
  }
});

// helper functions
function clearElements(container) {
  while (container.firstElementChild) {
    container.removeChild(container.firstElementChild);
  }
}

function renderCount() {
  count.innerText = profileInfo.length;
}

render();
