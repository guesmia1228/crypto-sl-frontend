import styles from "./graph.module.css";
import { formatUSDBalance } from "../../utils";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Options } from "../../components/input/input";
import { useState } from "react";
import { months } from "../../constants";

const today = new Date();

// Anzahl der Tage zwischen heute und dem 1. April 2023
const oneDay = 24 * 60 * 60 * 1000; // Millisekunden in einem Tag
const days = Math.round((today - new Date("Apr 01 2023")) / oneDay);

// Erstelle die Labels für den Chart
const labels1 = [];
let labels = [];
for (let i = 0; i < days; i += 2) {
  const date = new Date("Apr 01 2023");
  date.setDate(date.getDate() + i);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  labels1.push(`${month}, ${day}`);
}
if (labels1[labels1.length - 1] !== today.toLocaleDateString()) {
  const month = today.toLocaleString("default", { month: "short" });
  const day = today.getDate();
  labels1.push(`${month}, ${day}`);
}

const randomData = Array.from({ length: days }, () => 0);

function populateGraph(totalPrices) {
  labels = totalPrices ? Object.keys(totalPrices) : [];
  const values = totalPrices ? Object.values(totalPrices) : [];
  return {
    labels,
    datasets: [
      {
        label: "Income",
        data: values,
        borderColor: "#1595C2",
        backgroundColor: "#1595C2",
        tension: 0.1,
      },
    ],
  };
}

function getStartDate(data) {
  if (data == null) {
    return "2023-04-01";
  } else {
    return Object.keys(data)[0];
  }
}

function getTotalIncome(totalPrices) {
  if (totalPrices) {
    const values = Object.values(totalPrices);
    const sum = values.reduce(function (prev, currentValue) {
      return prev + currentValue;
    }, 0);
    return "$" + formatUSDBalance(sum);
  } else {
    return "$0";
  }
}

function getEndDate(data) {
  if (data == null) {
    return "2023-04-30";
  } else {
    const keys = Object.keys(data);
    return keys[keys.length - 1];
  }
}

// Rest des Codes bleibt gleich
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
          return value + " $";
        },
        // beginAtZero: true,
        beginAtZero: true,
        suggestedMin: 0,
        maxTicksLimit: 8,
        padding: 10,
        color: "#c4c4c4",
        font: {
          size: window.innerWidth < 550 ? 8 : 14,
          family: "Euclid, sans-serif",
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
          family: "Euclid, sans-serif",
          weight: 400,
          size: window.innerWidth < 550 ? 8 : 14,
        },
      },
    },
  },
};

const Graph = ({ data, style }) => {
  const [period, setPeriod] = useState("Choose period");

  const extractUniqueMonthsAndYears = (data) => {
    return Object.keys(data).reduce((uniqueDates, date) => {
      const dateParts = date.split("-");
      const month = months[parseInt(dateParts[1], 10) - 1];
      const year = dateParts[0];
      const key = `${month} ${year}`;

      if (!uniqueDates.includes(key)) {
        uniqueDates.push(key);
      }

      return uniqueDates;
    }, []);
  };

  const options = ["All Time", ...extractUniqueMonthsAndYears(data)];

  const filterDataByPeriod = (data, selectedPeriod) => {
    if (selectedPeriod === "All Time" || selectedPeriod === "Choose period") {
      return data;
    } else {
      const filteredData = {};
      for (const date in data) {
        const dateParts = date.split("-");
        const month = months[parseInt(dateParts[1], 10) - 1];
        const year = `${dateParts[0]}`;
        const key = `${month} ${year}`;

        if (key === selectedPeriod) {
          filteredData[date] = data[date];
        }
      }
      return filteredData;
    }
  };

  const graphData = filterDataByPeriod({ ...data }, period);

  return (
    <div className={`card ${styles.graphCard}`} style={style}>
      <div className={styles.info}>
        <div className={styles.left}>
          <div className={styles.label}>Income</div>
          <div className={styles.graphAmount}>{getTotalIncome(graphData)}</div>
        </div>

        <div className={styles.dropdownWrap}>
          <div className={styles.dropdownBorder}>
            <Options
              label={""}
              value={period}
              options={options}
              setValue={setPeriod}
            />
          </div>
          <div className={styles.datePicker}>
            <p>{getStartDate(graphData)}</p>
            <p> - </p>
            <p>{getEndDate(graphData)}</p>
          </div>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <Line options={options} data={populateGraph(graphData)} />
      </div>
    </div>
  );
};

export default Graph;
