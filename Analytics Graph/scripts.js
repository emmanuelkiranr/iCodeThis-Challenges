// Add JavaScript code here

const chart = document.getElementById("chart");

const data = {
  labels: [
    "Morbi ligula",
    "Scelerisque",
    "Praesent maecenas",
    "Morbi ligula 2",
    "Morbi ligula 3",
  ],
  datasets: [
    {
      label: "Visitors (%)",
      data: [41, 29, 23, 4, 3],
      backgroundColor: ["#ba69c8", "#ec407a", "#ef6c00", "#ffd741", "#69f0ae"],
      hoverOffset: 4,
    },
  ],
};

new Chart(chart, {
  type: "doughnut",
  data: data,
  options: {
    cutout: "80%",
    borderWidth: "1",
    borderColor: "black",
    plugins: {
      legend: {
        display: false,
        // position: 'right',
        // labels: {
        //     boxWidth: 30,
        //     useBorderRadius: true,
        //     borderRadius: '10'
        //     // usePointStyle: true,
        //     // pointStyle: 'rectRounded',
        // },
      },
      // title: {
      //     display: true,
      //     text: 'VISITORS PER DAY',
      //     color: 'white',
      //     fontSize: '10px',
      // }
    },
  },
});
