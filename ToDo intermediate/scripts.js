// list section
const listContainer = document.querySelector(".lists-container");
const addListForm = document.querySelector("[data-new-list-form]");
const addListInp = document.querySelector("[data-new-list-inp]");

// tasks section
const taskSection = document.querySelector(".tasks-section-container");
const taskContainer = document.querySelector(".tasks-container");
const selectedListName = document.querySelector("[data-list-name]");
const taskCount = document.querySelector("[data-task-count]");
const addTaskForm = document.querySelector("[data-new-todo-form");
const addTaskInp = document.querySelector("[data-new-todo-inp]");

// clear and delete btn
const clearTaskBtn = document.querySelector("[data-clear-complete-btn]");
const deleteList = document.querySelector("[data-delete-list-btn]");

// store the lists to localstorage
let list = JSON.parse(localStorage.getItem("list")) || [];
let selectedListId = null;

// list section
addListForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!addListInp.value || addListInp.value.trim().length === 0) return;
  let newList = {
    id: Date.now().toString(),
    name: addListInp.value,
    tasks: [],
  };
  list.push(newList);
  addListInp.value = "";
  saveRender();
});

function saveRender() {
  saveToStorage();
  render();
}

function saveToStorage() {
  localStorage.setItem("list", JSON.stringify(list));
}

function render() {
  renderLists(list);

  // set the header for the todos container
  const selectedList = list.find((item) => item.id === selectedListId);
  if (selectedListId === null) {
    taskSection.style.display = "none";
  } else {
    taskSection.style.display = "";
    selectedListName.innerText = selectedList.name;
    renderCount(selectedList);
    renderTasks(selectedList);
  }
}

function clearElements(element) {
  while (element.children.length > 0) {
    element.firstElementChild.remove();
  }
}

function renderLists() {
  clearElements(listContainer); // to prevent rerendering already rendered elts
  list.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item.name;
    li.dataset.listId = item.id;
    li.classList.add("list-item");
    if (item.id === selectedListId) {
      li.classList.add("active");
    }
    listContainer.appendChild(li);
  });
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
  }
  render();
});

deleteList.addEventListener("click", function () {
  list = list.filter((item) => item.id !== selectedListId);
  selectedListId = null;
  saveRender();
});

// task section
function renderCount(selectedList) {
  // filter based on incomplte tasks
  let inCompletedTaskCount = selectedList.tasks.filter(
    (item) => item.complete === false
  ).length;
  let completeString = inCompletedTaskCount === 1 ? "task" : "tasks";
  taskCount.innerText = `${inCompletedTaskCount} ${completeString} remaining`;
}

function renderTasks(selectedList) {
  clearElements(taskContainer);
  selectedList.tasks.forEach((item) => {
    let li = document.createElement("li");
    let input = document.createElement("input");
    let label = document.createElement("label");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", item.name);
    input.setAttribute("id", item.id);
    input.checked = item.complete;

    label.setAttribute("for", item.id);
    label.innerText = item.name;
    li.appendChild(input);
    li.appendChild(label);
    taskContainer.appendChild(li);
  });
}

addTaskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!addTaskInp.value || addTaskInp.value.trim().length === 0) return;
  const selectedList = list.find((item) => item.id === selectedListId);

  selectedList.tasks.push({
    id: Date.now().toString(),
    name: addTaskInp.value,
    complete: false,
  });
  saveRender();
  addTaskInp.value = "";
});

taskContainer.addEventListener("click", function (e) {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedList = list.find((item) => item.id === selectedListId);
    const selectedTask = selectedList.tasks.find(
      (item) => item.id === e.target.id
    );
    selectedTask.complete = e.target.checked;
    saveToStorage();
    renderCount(selectedList);
  }
});

clearTaskBtn.addEventListener("click", function () {
  let selectedList = list.find((item) => item.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter((item) => !item.complete);
  saveToStorage();
  renderTasks(selectedList);
  renderCount();
});

render();
