// add todo model
const addNewItem = document.querySelector(".add-new");
const model = document.querySelector(".model");
const modelInp = document.querySelector("[data-new-inp]");
const addModel = document.querySelector(".add");
const closeModel = document.querySelector(".close");

const addTodoForm = document.querySelector("[data-add-todo-form]");
const snackbar = document.querySelector(".snackbar");

// render active todos
const inCompleteListContainer = document.querySelector(".todo-list");
const completedListContainer = document.querySelector(".completed-list");
const completeCount = document.querySelector(".complete-count");

const list = JSON.parse(localStorage.getItem("Grocery list")) || [];

function clearElements(container) {
  while (container.firstElementChild) {
    container.removeChild(container.firstElementChild);
  }
}

function render() {
  clearElements(inCompleteListContainer);
  list.forEach((item) => {
    if (!item.complete) {
      const label = document.createElement("label");
      const input = document.createElement("input");
      label.setAttribute("for", item.id);
      input.setAttribute("type", "radio");
      input.setAttribute("name", item.id);
      input.setAttribute("id", item.id);
      label.appendChild(input);
      input.after(item.name);
      inCompleteListContainer.appendChild(label);
    }
  });
  renderCompleteCount();
  renderCompletedTasks();
}

function save() {
  localStorage.setItem("Grocery list", JSON.stringify(list));
}

function renderCompleteCount() {
  const completedTaskCount = list.filter(
    (item) => item.complete === true
  ).length;
  completeCount.innerText = `(${completedTaskCount})`;
}

function renderCompletedTasks() {
  clearElements(completedListContainer);
  list.forEach((item) => {
    if (item.complete) {
      const label = document.createElement("label");
      const input = document.createElement("input");
      label.setAttribute("for", item.id);
      input.setAttribute("type", "radio");
      input.setAttribute("name", item.id);
      input.setAttribute("id", item.id);
      label.appendChild(input);
      input.after(item.name);
      input.checked = item.complete;
      completedListContainer.appendChild(label);
    }
  });
}

addNewItem.addEventListener("click", function (e) {
  model.classList.add("reveal");
  model.addEventListener(
    "animationend",
    function () {
      model.classList.remove("show-animation");
    },
    { once: true }
  );
});

closeModel.addEventListener("click", function (e) {
  model.classList.add("close-animation");

  model.addEventListener(
    "animationend",
    function (e) {
      model.classList.remove("reveal");
      model.classList.remove("close-animation");
      model.classList.add("show-animation");
      modelInp.value = "";
    },
    { once: true } // makes sure the animationend event listner is removed after it's called
  );
});

addTodoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!modelInp.value || modelInp.value.trim().length === 0) return;
  list.push({
    id: Date.now().toString(),
    name: modelInp.value,
    complete: false,
  });
  modelInp.value = "";
  model.classList.remove("reveal");
  model.classList.add("show-animation");
  snackbar.classList.add("reveal");
  save();
  render();
});

let animationCount = 0;
snackbar.addEventListener("animationend", function (e) {
  animationCount++;
  if (animationCount === 2) {
    snackbar.classList.remove("reveal");
    animationCount = 0;
  }
});

inCompleteListContainer.addEventListener("click", function (e) {
  if (e.target.tagName.toLowerCase() === "input") {
    let selectedList = list.find((item) => item.id === e.target.id);
    selectedList.complete = e.target.checked;
    save();
    render();
  }
});

render();
