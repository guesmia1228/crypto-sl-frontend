import styles from "./graph.module.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";


const today = new Date();

// Anzahl der Tage zwischen heute und dem 1. April 2023
const oneDay = 24 * 60 * 60 * 1000; // Millisekunden in einem Tag
const days = Math.round((today - new Date("Apr 01 2023")) / oneDay);

// Erstelle die Labels für den Chart
const labels = [];
for (let i = 0; i < days; i += 2) {
  const date = new Date("Apr 01 2023");
  date.setDate(date.getDate() + i);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  labels.push(`${month}, ${day}`);
}
if (labels[labels.length - 1] !== today.toLocaleDateString()) {
  const month = today.toLocaleString("default", { month: "short" });
  const day = today.getDate();
  labels.push(`${month}, ${day}`);
}

const randomData = Array.from({ length: days }, () => 0);

const data = {
  labels,
  datasets: [
    {
      label: "Income",
      data: randomData,
      borderColor: "#1595C2",
      backgroundColor: "#1595C2",
      tension: 0.1,
    },
  ],
};

// Rest des Codes bleibt gleich
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },

  tension: 0.4,

  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(255,255,255,8%)",
      },
      ticks: {
        // Include a eur sign in the ticks
        callback: function (value, index, ticks) {
          return value + "K €";
        },
        // beginAtZero: true,
        beginAtZero: true,
        suggestedMin: 0,
        maxTicksLimit: 8,
        padding: 10,
        color: "#c4c4c4",
        font: {
          size: window.innerWidth < 550 ? 8 : 14,
          family: "Euclid",
          weight: 400,
        },
      },
    },
    x: {
      grid: {
        display: false,
      },

      ticks: {
        color: "#c4c4c4",

        font: {
          family: "Euclid",
          weight: 400,
          size: window.innerWidth < 550 ? 8 : 14,
        },
      },
    },
  },
};

const Graph = () => {
  return (
    <div className={`card ${styles.graphCard}`}>
      <div className={styles.info}>
        <div className={styles.left}>
          <div className={styles.label}>Incomes</div>
          <div className={styles.graphAmount}>$0</div>
        </div>

        <div className={styles.datePicker}>
          <p>{labels[0]}</p>
          <p> - </p>
          <p>{labels[labels.length - 1]}</p>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default Graph;
