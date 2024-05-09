const question = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const submit = document.querySelector("[data-submit]");
const skip = document.querySelector("[data-skip]");
const pollsContainer = document.querySelector(".container");
const modal = document.querySelector(".modal-container");
const score = document.querySelector("[data-score]");
const retry = document.querySelector("[data-retry]");

let currentQuestionId = 1;
let selectedQn = null;
let selectedQnOpt = [];
let currentSelctedOpt = null;
let labelOpt = null;
let points = 0;

function renderPoll() {
  getQuestion();
  getOptions();
  if (selectedQn) {
    question.innerText = selectedQn.text;
    selectedQnOpt.forEach((item) => {
      let label = document.createElement("label");
      let input = document.createElement("input");
      let p = document.createElement("p");
      label.setAttribute("for", item.id);
      input.setAttribute("type", "radio");
      input.setAttribute("name", selectedQn.text);
      input.setAttribute("id", item.id);
      p.innerText = item.text;
      label.appendChild(input);
      label.appendChild(p);
      optionsContainer.appendChild(label);
    });
  }
}

skip.addEventListener("click", function () {
  currentSelctedOpt = null;
  selectedQn.skipped = true;
  let unAnswered = polls.filter((qn) => !qn.answered).length;
  if (unAnswered === 1) {
    return;
  }
  submit.classList.add("disabled");
  nextQuestion();
});

optionsContainer.addEventListener("click", function (e) {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedOpt = selectedQnOpt.find((item) => item.id == e.target.id);
    if (currentSelctedOpt === selectedOpt.id) return;
    selectedQnOpt.forEach((item) => (item.checked = false));
    currentSelctedOpt = selectedOpt.id;
    selectedOpt.checked = e.target.checked;
    submit.classList.remove("disabled");
    labelOpt = e.target.parentElement;
  }
});

submit.addEventListener("click", function () {
  submit.classList.add("disabled");
  skip.classList.add("disabled");

  currentSelctedOpt = null;
  disableLabel();
  selectedQn.answered = true;
  const rightOpt = selectedQnOpt.find((item) => item.answer);
  if (rightOpt.checked) {
    points++;
    labelOpt.classList.add("selected-label-option", "correct-opt");
  } else {
    labelOpt.classList.add("selected-label-option", "wrong-opt");
    const correctLabel = rightAnsLabel(rightOpt.id);
    correctLabel.classList.add("selected-label-option", "correct-opt");
  }
  setTimeout(() => {
    nextQuestion();
    skip.classList.remove("disabled");
  }, 2500);
});

retry.addEventListener("click", function () {
  pollsContainer.style.display = "";
  modal.classList.remove("reveal");
  resetPolls();
  renderPoll();
});

// helper functions
function resetPolls() {
  currentQuestionId = 1;
  points = 0;
  polls.forEach((item) => {
    item.answered = false;
    item.skipped = false;
  });
}

function rightAnsLabel(id) {
  const labelElements = document.querySelectorAll("label");
  let label = null;
  labelElements.forEach((item) => {
    if (item.firstElementChild.id == id) {
      label = item;
    }
  });
  return label;
}

function getQuestion() {
  selectedQn = currentQuestionId
    ? polls.find((qn) => qn.id === currentQuestionId)
    : null;
}

function getOptions() {
  selectedQnOpt = currentQuestionId
    ? polls.find((qn) => qn.id === currentQuestionId).options
    : null;
}

function disableLabel() {
  const labelElements = document.querySelectorAll("label");
  labelElements.forEach((item) => {
    item.classList.add("disable-label");
  });
}

function nextQuestion() {
  let answered;
  currentQuestionId = polls.find((qn) => !qn.answered && !qn.skipped)?.id;
  if (!currentQuestionId) {
    answered = polls.filter((qn) => qn.answered).length;
  }
  if (!currentQuestionId && answered !== polls.length) {
    polls.forEach((item) => {
      if (!item.answered) {
        item.skipped = false;
      }
    });
    nextQuestion();
  } else if (answered === polls.length) {
    pollsContainer.style.display = "none";
    score.innerText = `${points}/${polls.length}`;
    modal.classList.add("reveal");
  }
  clearElements(optionsContainer);
  renderPoll();
}

function clearElements(container) {
  question.innerText = "";
  while (container.firstElementChild) {
    container.removeChild(container.firstElementChild);
  }
}

renderPoll();
