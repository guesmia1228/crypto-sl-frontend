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
import StatsCard from "../statsCard/statsCard";
import { transformNumber } from "../func/transformNumber";
import { formatUSDBalance } from "../../utils";
import vendorDashboardApi from "../../api/vendorDashboardApi";

const VendorBody = () => {
  const backendAPI = new backend_API();
  const dashboardApi = new vendorDashboardApi();

  const navigate = useNavigate();

  const [cardInfo, setCardInfo] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await dashboardApi.checkPermission();

    console.log("Vendor permission: ", result);

    if (result !== true) {
      navigate("/login");
    } else {
      const getPromises = [
        dashboardApi.getTotalIncome(),
        dashboardApi.getNumOrders(),
        dashboardApi.getTotalIncomesPerDay(),
      ];
      const [sales, numOrders, totalPricePerDate] =
        await Promise.all(getPromises);

      console.log(sales);
      console.log(numOrders);

      const cardsContent = [
        {
          title: "Sales: Total",
          amount: sales.total?.number,
          percentage: sales.total?.percentage,
          isIncome: true,
        },
        {
          title: "Payments",
          amount: numOrders?.number,
          percentage: numOrders?.percentage,
          isIncome: false,
        },
        {
          title: "Sales: Last 24 hours",
          amount: sales.last24Hours?.number,
          percentage: sales.last24Hours?.percentage,
          isIncome: true,
        },
        {
          title: "Sales: Last 30 days",
          amount: sales.last30Days?.number,
          percentage: sales.last30Days?.percentage,
          isIncome: true,
        },
      ];

      console.log(cardsContent);
      setCardInfo(cardsContent);

      console.log(totalPricePerDate);
      setGraphData(totalPricePerDate);
    }
  };

  return (
    <div className={`${styles.body}`}>
      <Header title="Dashboard" />

      <div className={styles.row}>
        {cardInfo.map((item) => (
          <StatsCard
            key={item.title}
            title={item.title}
            amount={item.amount}
            percentage={item.percentage}
            isMonetary={item.isIncome}
          />
        ))}
      </div>

      <Graph data={graphData} />
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
