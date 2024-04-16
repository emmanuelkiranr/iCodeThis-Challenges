const profilesContainer = document.querySelector(".lists");
const profileTemplate = document.getElementById("user-info");

function render() {
  clearElements(profilesContainer);
  profileInfo.forEach((item) => {
    const profileElement = document.importNode(profileTemplate.content, true);
    const imageContainer = profileElement.querySelector(".user-image");
    const username = profileElement.querySelector(".username");
    const age = profileElement.querySelector(".age");

    imageContainer.style.backgroundImage = `url(${item.image})`;
    username.innerText = item.name;
    age.innerText = `${item.age} years`;
    profilesContainer.appendChild(profileElement);
  });
}

// helper functions
function clearElements(container) {
  while (container.firstElementChild) {
    container.removeChild(container.firstElementChild);
  }
}

render();
