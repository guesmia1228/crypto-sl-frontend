import Button from "./../../components/button/button";
import { Link, useNavigate } from "react-router-dom";

import Negative from "../../assets/icon/negative.svg";
import Positive from "../../assets/icon/positive.svg";

import styles from "./vendor.module.css";

import UrlLink from "../../assets/icon/link.svg";

import backend_API from "../../api/backendAPI";

import { useEffect, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import ProfileBox from "../profileBox/profileBox";
import Header from "../header/header";
import Graph from "../graph/graph";
import { transformNumber } from "../func/transformNumber";

const VendorBody = () => {
  const backendAPI = new backend_API();

  const navigate = useNavigate();

  const checkPermissions = async () => {
    try {
      const response = await backendAPI.checkPermissionVendor();
      if (response == null) {
        // navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [signUps, setSignUps] = useState(0);
  const [signUpsPercentage, setSignUpsPercentage] = useState(0.0);
  const [allClicks, setAllClicks] = useState(0);
  const [allClicksPercentage, setAllClicksPercentage] = useState(0);
  const [income, setIncome] = useState(0);
  const [incomePercentage, setIncomePercentage] = useState(0);

  const cardsContent = [
    {
      title: "Income Today",
      amount: income,
      percentage: incomePercentage,
    },
    {
      title: "Income this month",
      amount: allClicks,
      percentage: allClicksPercentage,
    },
    {
      title: "Total income",
      amount: signUps,
      percentage: signUpsPercentage,
    },
    {
      title: "Employees on Payroll",
      amount: income,
      percentage: incomePercentage,
    },
    {
      title: "Expenses this month",
      amount: allClicks,
      percentage: allClicksPercentage,
    },
    {
      title: "Payments",
      amount: signUps,
      percentage: signUpsPercentage,
    },
  ];

  const fillCards = (data) => {
    setAllClicks(data.allClicks);
    setAllClicksPercentage(data.allClicksPercentage);
    setIncome(data.income);
    setIncomePercentage(data.incomePercentage);
    setSignUps(data.signUps);
    setSignUpsPercentage(data.signUpsPercentage);
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <div className={`${styles.body}`}>
      <Header title="Dashboard" />
      <VendorHeader />

      <div className={styles.row}>
        {cardsContent.map((item) => (
          <Card
            title={item.title}
            amount={item.amount}
            percentage={item.percentage}
          />
        ))}
      </div>

      <Graph />
    </div>
  );
};

export default VendorBody;

const VendorHeader = () => {
  const [copied, setCopied] = useState(false);

  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <div className={styles.left}>
          <h3>Overview</h3>
          <p>
            You’ve earned <span>0$</span> this month
          </p>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, amount, percentage }) => {
  const positive = amount > 0 ? true : false;

  return (
    <div className={`card ${styles.card}`}>
      <h4>{title}</h4>
      <p className={styles.amount}>
        {positive ? `+` : ``}
        {title === "Incomes" ? `$` : ``}
        {transformNumber(amount)}
      </p>

      <div className={styles.info}>
        <img src={positive ? Positive : Negative} alt="" />
        <p className={styles.percentage}>
          <span style={{ color: positive ? "#23C215" : "#C21515" }}>
            {positive ? `+` : `-`}
            {percentage}%
          </span>{" "}
          vs last 30 days
        </p>
      </div>
    </div>
  );
};
