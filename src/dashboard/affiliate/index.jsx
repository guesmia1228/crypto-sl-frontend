import Button from "./../../components/button/button";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../assets/logo/logo.svg";

import styles from "./affiliate.module.css";

import Logout from "../../assets/icon/logout.svg";
import Settings from "../../assets/icon/settings.svg";

import UrlLink from "../../assets/icon/link.svg";

import { Line } from "react-chartjs-2";

import backend_API from "../../api/backendAPI";

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
import { useEffect, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import ProfileBox from "../profileBox/profileBox";
import PercentageInfo from "../percentageInfo/percentageInfo";
import { transformNumber } from "./../func/transformNumber";
import Card from "../card/card";
import affiliateDashboardApi from "../../api/affiliateDashboardApi";

const AffiliateBody = () => {
  const affDashboardApi = new affiliateDashboardApi();
  const navigate = useNavigate();
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalRegistrationsPercentage, setTotalRegistrationsPercentage] =
    useState(0);
  const [totalClicksPercentage, setTotalClicksPercentage] = useState(0);
  const [totalIncomesPercentage, setTotalIncomesPercentage] = useState(0);
  const [tableData, setTableData] = useState([]);

  const cardsContent = [
    {
      title: "Incomes",
      amount: totalIncomes,
      percentage: totalIncomesPercentage,
    },
    {
      title: "Total Clicks",
      amount: totalClicks,
      percentage: totalClicksPercentage,
    },
    {
      title: "Total Sign ups",
      amount: totalRegistrations,
      percentage: totalRegistrationsPercentage,
    },
  ];

  useEffect(() => {
    async function fetchData() {
      fetchAffData();
    }
    fetchData();
  }, []);

  const fetchAffData = async () => {
    const result = await affDashboardApi.checkPermission();
    if (result !== true) {
      navigate("/login");
    } else {
      const dataReg = await affDashboardApi.getTotalRegistrations();
      setTotalRegistrations(dataReg.number);
      setTotalRegistrationsPercentage(dataReg.percentage);
      const dataClick = await affDashboardApi.getTotalClicks();
      setTotalClicks(dataClick.number);
      setTotalClicksPercentage(dataClick.percentage);
      const dataInc = await affDashboardApi.getTotalIncome();
      setTotalIncomes(dataInc.number);
      setTotalIncomesPercentage(dataInc.percentage);
    }
  };

  return (
    <div className="container">
      <AffiliateNavigation />
      <AffiliateHeader />

      <div className={styles.row}>
        {cardsContent.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            amount={item.amount}
            percentage={item.percentage}
          />
        ))}
      </div>

      <Graph />

      <Footer />
    </div>
  );
};

export default AffiliateBody;

const AffiliateNavigation = () => {
  const backendAPI = new backend_API();

  const logOut = async () => {
    try {
      const data = await backendAPI.signout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.navigation}>
      <img src={Logo} alt="nefentus logo" />

      <div className={styles.right}>
        <div className={`${styles.settingsBody} card`}>
          <Link to="/dashboard/settings" className={styles.logout}>
            <img src={Settings} alt="settings" />
            <p>Settings</p>
          </Link>
          <Link onClick={logOut} to="/" className={styles.logout}>
            <img src={Logout} alt="logout" />
            <p>Log out</p>
          </Link>
        </div>

        <ProfileBox />
      </div>
    </div>
  );
};

const AffiliateHeader = () => {
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const handleClick = async () => {
    navigate("/dashboard/vendor");
  };

  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <div className={styles.left}>
          <h3>Overview</h3>
          <p>
            You’ve earned <span>0$</span> this month
          </p>
        </div>

        <Button color="white" link={null} onClick={handleClick}>
          Vendor Dashboard
        </Button>
      </div>

      <div className={styles.link}>
        <p className={styles.label}>Affiliate link: </p>

        <div className={styles.linkBox}>
          <p id="affiliate-link" className={styles.url}>
            https://nefentus.com/?affiliate=
            {localStorage.getItem("affiliateLink")}
          </p>
          <img
            src={UrlLink}
            alt="url icon"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://nefentus.com/?affiliate=${localStorage.getItem(
                  "affiliateLink",
                )}`,
              );
              setCopied(true);
            }}
          />
        </div>
      </div>
      {copied && (
        <div className={styles.tooltip}>Link copied to clipboard!</div>
      )}
    </div>
  );
};

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

const Footer = () => {
  const list = [
    {
      text: "Imprint",
      link: "/imprint",
    },
    {
      text: "Privacy Policy",
      link: "/privacy",
    },
    {
      text: "Terms and Condition",
      link: "/terms",
    },
    {
      text: "Contact us",
      link: "/contact",
    },
  ];

  return (
    <div className={styles.footer}>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <Link to={item.link}>{item.text}</Link>
          </li>
        ))}
      </ul>

      <p>© 2023 Nefentus. All rights reserved. | Minerian Agency.</p>
    </div>
  );
};
