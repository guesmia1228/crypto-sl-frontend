import Card from "../card/card";
import { Line } from "react-chartjs-2";

import styles from "./incomeCard.module.css";

import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,

  tension: 0.1,

  plugins: {
    title: {
      display: true,
    },
    legend: {
      position: "bottom",
    },
  },

  scales: {
    y: {
      beginAtZero: true,

      grid: {
        color: "rgba(255,255,255,0.08)",
      },
      ticks: {
        callback: function (value, index, ticks) {
          return value + " $";
        },
        suggestedMin: 0,
        padding: 10,
        color: "rgba(255,255,255,0.6)",
        font: {
          size: window.innerWidth < 550 ? 8 : 12,
          family: "Axiforma",
          weight: 400,
        },
      },
    },
    x: {
      grid: {
        display: false,
      },

      ticks: {
        color: "rgba(255,255,255,0.6)",
        padding: 10,
        font: {
          family: "Axiforma",
          weight: 400,
          size: window.innerWidth < 550 ? 8 : 12,
        },
      },
    },
  },
};

const labels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "00:00"];

export const data = {
  labels,
  datasets: [
    {
      label: "Last 24h",
      data: [1, 2, 3, 4, 5, 6, 7],
      borderColor: "#8CD1EA",
      backgroundColor: "#8CD1EA",
    },
    {
      label: "Previous 24h",
      data: [12, 18, 9, 5, 3, 15, 20],
      borderColor: "rgba(255, 255, 255,0.2)",
      backgroundColor: "rgba(255, 255, 255,0.2)",
    },
  ],
};

const IncomeCard = () => {
  return (
    <Card>
      <div className={styles.label}>Income 24 Hours</div>

      <div className={styles.chart}>
        <Line options={options} data={data} />
      </div>
    </Card>
  );
};

export default IncomeCard;
