export const sentimentChartData = (score) => {
  return {
    type: "pie",
    data: {
      labels: Object.keys(score),
      datasets: [
        {
          label: "Dominent sentiment",
          data: Object.values(score).map((v) => (v * 100).toFixed(1)),
          backgroundColor: [
            "orange",
            "rgb(224, 16, 16)",
            "rgb(161, 159, 159)",
            "#42b983",
          ],
          borderColor: ["orange", "red", "rgb(161, 159, 159)", "#42b983"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
};

export default sentimentChartData;
