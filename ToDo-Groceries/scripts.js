const addNewItem = document.querySelector(".add-new");
const model = document.querySelector(".model");
const modelInp = document.querySelector("[data-new-inp]");
const addModel = document.querySelector(".add");
const closeModel = document.querySelector(".close");

addNewItem.addEventListener("click", function (e) {
  model.classList.add("reveal");
  model.addEventListener("animationend", function () {
    model.classList.remove("show-animation");
  });
});

addModel.addEventListener("click", function (e) {
  if (!modelInp.value || modelInp.value.trim().length === 0) return;
  console.log(modelInp.value);
});

closeModel.addEventListener("click", function (e) {
  model.classList.add("close-animation");

  model.addEventListener(
    "animationend",
    function (e) {
      model.classList.remove("reveal");
      model.classList.remove("close-animation");
      model.classList.add("show-animation");
    },
    { once: true } // makes sure the animationend event listner is removed after it's called
  );
});
