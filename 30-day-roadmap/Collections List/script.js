const collections = document.querySelector(".collections");
const template = document.querySelector("#template");

function render() {
  clearElements(collections);
  data.forEach((item) => {
    const box = template.content.cloneNode(true);
    const thumbnail = box.querySelector(".thumbnail");
    const title = box.querySelector(".title");
    const count = box.querySelector(".count");

    thumbnail.src = item.thumbnail;
    title.innerText = item.title;
    count.append(item.count);

    const related = box.querySelector(".related");
    item.related.forEach((item) => {
      const image = document.createElement("img");
      image.src = item;
      related.appendChild(image);
    });
    collections.append(box);
  });
}

function clearElements(container) {
  while (container.firstElementChild) {
    container.removeChild(container.firstElementChild);
  }
}

render();
