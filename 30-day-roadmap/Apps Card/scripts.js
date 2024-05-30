const appsContainer = document.querySelector(".apps");
const template = document.querySelector("#template");
const appContainer = document.querySelector(".apps");
const box = document.querySelectorAll(".box");

function renderApps() {
  apps.forEach((item) => {
    const content = template.content.cloneNode(true);
    const image = content.querySelector("img");
    const name = content.querySelector(".name");
    image.src = item.src;
    name.innerText = item.name;
    appsContainer.appendChild(content);
  });
}

appContainer.addEventListener("mouseover", function (e) {
  const box = e.target.closest(".box");
  if (box && box !== null) {
    const btn = box.querySelector(".add-app-btn");
    if (btn.classList.contains("hide")) {
      const text = box.querySelector(".name");
      text.classList.add("hide");
      const btn = box.querySelector(".add-app-btn");
      btn.classList.remove("hide");
    }
  }
});

appContainer.addEventListener("mouseout", function (e) {
  const box = e.target.closest(".box");
  if (box && box !== null) {
    const btn = box.querySelector(".add-app-btn");
    if (!btn.classList.contains("hide")) {
      const text = box.querySelector(".name");
      text.classList.remove("hide");
      const btn = box.querySelector(".add-app-btn");
      btn.classList.add("hide");
    }
  }
});

renderApps();
