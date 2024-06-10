const seatContainer = document.querySelector(".seat");
const Seattemplate = document.querySelector("#template");
const bookbtn = document.querySelector("#book-btn");
const count = document.querySelector(".count");
const total = document.querySelector(".total");

let seatData = [];

function render() {
  clearElements(seatContainer);
  getSeatsFromStorage();
  seatData?.forEach((seat) => {
    const content = Seattemplate.content.cloneNode(true);
    const svg = content.querySelector("svg");
    const div = content.querySelector("div");
    div.id = seat.id;
    if (!seat.isBooked) {
      svg.setAttribute("fill", "#5b889f");
    } else {
      svg.setAttribute("fill", "#c9d9df");
    }
    seatContainer.appendChild(content);
  });
}

seatContainer.addEventListener("click", (e) => {
  const selectedSeat = e.target.closest(".chair");
  if (selectedSeat && selectedSeat !== null) {
    const selectedSeatStatus = seatData.find(
      (seat) => seat.id === parseInt(selectedSeat.id)
    );
    const svg = selectedSeat.querySelector("svg");
    if (!selectedSeatStatus.isBooked) {
      const fill = svg.getAttribute("fill");
      if (fill !== "#e5457a") {
        svg.setAttribute("fill", "#e5457a");
      } else {
        svg.setAttribute("fill", "#5b889f");
      }
      selectedSeatStatus.isSelected = !selectedSeatStatus.isSelected;
      count.innerText = seatData.filter((item) => item.isSelected).length;
      total.innerText = parseInt(count.innerText) * 10;
    }
  }
});

bookbtn.addEventListener("click", () => {
  seatData
    .filter((item) => item.isSelected)
    .forEach((item) => {
      item.isBooked = true;
      item.isSelected = false;
    });
  count.innerText = 0;
  total.innerText = 0;
  saveAndRender();
});

function createSeats() {
  let arr = [];
  for (let i = 1; i <= 56; i++) {
    arr.push({ id: i, isBooked: false, isSelected: false });
  }
  return arr;
}

function getSeatsFromStorage() {
  const seats = localStorage.getItem("seats");
  if (seats) {
    seatData = JSON.parse(seats);
    return;
  } else if (seatData.length === 0) {
    createAndsaveSeats();
  }
}

function createAndsaveSeats() {
  const seats = createSeats();
  localStorage.setItem("seats", JSON.stringify(seats));
  getSeatsFromStorage();
}

function clearElements(container) {
  while (container.firstElementChild) {
    container.removeChild(container.firstElementChild);
  }
}

function saveAndRender() {
  localStorage.setItem("seats", JSON.stringify(seatData));
  render();
}

render();
