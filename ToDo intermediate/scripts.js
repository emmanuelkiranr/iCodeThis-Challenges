const todoListContainer = document.querySelector(".todo-lists-container");
const addListForm = document.querySelector("[data-new-todo-list]");
const addListInp = document.querySelector("[data-new-list-inp]");
const deleteList = document.querySelector("[data-delete-list-btn]");

// tasks
const todoContainer = document.querySelector("[data-todo-container]");
const todoTaskContainer = document.querySelector(".todo-tasks-container");
const selectedListName = document.querySelector("[data-list-name]");
const taskCount = document.querySelector("[data-task-count]");
const addTodoForm = document.querySelector("[data-new-todo-form");
const addTodoInp = document.querySelector("[data-new-todo-inp]");

const clearTodoBtn = document.querySelector("[data-clear-complete-btn]");

let list = JSON.parse(localStorage.getItem("list")) || [];
let selectedListId = null;

// user enters new task
addListForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!addListInp.value || addListInp.value.trim().length === 0) return; // maybe display an error message
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

// store the task to local storage
function saveToStorage() {
  localStorage.setItem("list", JSON.stringify(list));
}

// render the task and the todos container
function render() {
  // cause its rendering from the lists it will rerender already rendered elements so clear its
  clearElements(todoListContainer);

  // render task elements
  displayListElements(list);

  // set the header for the todos container
  const selectedList = list.find((item) => item.id === selectedListId);
  if (selectedListId === null) {
    todoContainer.style.display = "none";
  } else {
    todoContainer.style.display = "";
    selectedListName.innerText = selectedList.name;
    renderCount(selectedList);
    clearElements(todoTaskContainer);
    // since tasks can already exist we render it first before taking from user
    renderTasks(selectedList);
  }
}

function clearElements(element) {
  while (element.children.length > 0) {
    element.firstElementChild.remove();
  }
}

function displayListElements() {
  list.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item.name;
    li.dataset.listId = item.id;
    li.classList.add("list-item");
    if (item.id === selectedListId) {
      li.classList.add("active");
    }
    todoListContainer.appendChild(li);
  });
}

function renderCount(selectedList) {
  // filter based on incomplte tasks
  let inCompltedTaskCount = selectedList.tasks.filter(
    (item) => item.complete === false
  ).length;
  let completeString = inCompltedTaskCount === 1 ? "task" : "tasks";
  taskCount.innerText = `${inCompltedTaskCount} ${completeString} remaining`;
}

addTodoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!addTodoInp.value || addTodoInp.value.trim().length === 0) return;
  const selectedList = list.find((item) => item.id === selectedListId);

  selectedList.tasks.push({
    id: Date.now().toString(),
    name: addTodoInp.value,
    complete: false,
  });
  saveRender();
  addTodoInp.value = "";
});

function renderTasks(selectedList) {
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
    todoTaskContainer.appendChild(li);
  });
}

render();

todoListContainer.addEventListener("click", function (e) {
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

todoTaskContainer.addEventListener("click", function (e) {
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

clearTodoBtn.addEventListener("click", function () {
  let selectedList = list.find((item) => item.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter((item) => !item.complete);

  saveRender();
});
