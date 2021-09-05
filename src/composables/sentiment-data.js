export const sentimentChartData = (score) => {
  return {
    type: "line",
    data: {
      labels: Object.keys(score),
      datasets: [
        {
          label: "Dominent sentiment",
          data: Object.values(score).map((v) => (v * 100).toFixed(1)),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
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
