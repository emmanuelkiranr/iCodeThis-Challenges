const polls = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: [
      { id: 1, text: "London", checked: false },
      { id: 2, text: "Berlin", checked: false },
      { id: 3, text: "Paris", checked: false, answer: true },
      { id: 4, text: "Rome", checked: false },
    ],
    skipped: false,
    answered: false,
  },
  {
    id: 2,
    text: "Who is the author of 'To Kill a Mockingbird'?",
    options: [
      { id: 1, text: "Mark Twain", checked: false },
      { id: 2, text: "Harper Lee", checked: false, answer: true },
      { id: 3, text: "J.K. Rowling", checked: false },
      { id: 4, text: "Charles Dickens", checked: false },
    ],
    skipped: false,
    answered: false,
  },
  {
    id: 3,
    text: "What is the chemical symbol for water?",
    options: [
      { id: 1, text: "H2O", checked: false, answer: true },
      { id: 2, text: "CO2", checked: false },
      { id: 3, text: "NH3", checked: false },
      { id: 4, text: "O2", checked: false },
    ],
    skipped: false,
    answered: false,
  },
  {
    id: 4,
    text: "Which planet is known as the Red Planet?",
    options: [
      { id: 1, text: "Venus", checked: false },
      { id: 2, text: "Saturn", checked: false },
      { id: 3, text: "Jupiter", checked: false },
      { id: 4, text: "Mars", checked: false, answer: true },
    ],
    skipped: false,
    answered: false,
  },
  {
    id: 5,
    text: "Who painted the Mona Lisa?",
    options: [
      { id: 1, text: "Pablo Picasso", checked: false },
      { id: 2, text: "Vincent van Gogh", checked: false },
      { id: 3, text: "Leonardo da Vinci", checked: false, answer: true },
      { id: 4, text: "Michelangelo", checked: false },
    ],
    skipped: false,
    answered: false,
  },
];

const question = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const submit = document.querySelector("[data-submit]");
const skip = document.querySelector("[data-skip]");

let currentQuestionId = 1;
let selectedQn = null;
let selectedQnOpt = [];
let currentSelctedOpt = null;
let labelOpt = null;

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
  selectedQn.skipped = true;
  let unAnswered = polls.filter((qn) => !qn.answered).length;
  if (unAnswered === 1) {
    return;
  }
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
  currentSelctedOpt = null;
  disableLabel();
  selectedQn.answered = true;
  const rightOpt = selectedQnOpt.find((item) => item.answer);
  if (rightOpt.checked) {
    labelOpt.classList.add("selected-label-option", "correct-opt");
  } else {
    labelOpt.classList.add("selected-label-option", "wrong-opt");
    const correctLabel = rightAnsLabel(rightOpt.id);
    correctLabel.classList.add("selected-label-option", "correct-opt");
  }
  setTimeout(() => {
    nextQuestion();
  }, 2500);
});

// helper functions
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
    console.log("over");
    return;
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
