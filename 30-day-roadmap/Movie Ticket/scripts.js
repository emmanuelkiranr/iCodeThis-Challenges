const seatContainer = document.querySelector(".seat");
const Seattemplate = document.querySelector("#template");

let seatData = [];

function render() {
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
    }
  }
});

function createSeats() {
  let arr = [];
  for (let i = 1; i <= 56; i++) {
    arr.push({ id: i, isBooked: false });
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

render();
