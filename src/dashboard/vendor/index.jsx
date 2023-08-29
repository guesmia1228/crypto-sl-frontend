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
import { formatUSDBalance } from "../../utils";
import vendorDashboardApi from "../../api/vendorDashboardApi";

const VendorBody = () => {
	const backendAPI = new backend_API();
	const dashboardApi = new vendorDashboardApi();

	const navigate = useNavigate();

	const [cardInfo, setCardInfo] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const result = await dashboardApi.checkPermission();

		if (result !== true) {
			navigate("/login");
		} else {
			const getPromises = [
				dashboardApi.getSales(),
				dashboardApi.getNumOrders(),
				];
			const [sales, numOrders] = await Promise.all(getPromises);

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

			console.log(cardsContent)
			setCardInfo(cardsContent);
		}
	}

  	return (
		<div className={`${styles.body}`}>
			<Header title="Dashboard" />

			<div className={styles.row}>
				{cardInfo.map((item) => (
					<Card
						title={item.title}
						amount={item.amount}
						percentage={item.percentage}
						isIncome={item.isIncome}
					/>
				))}
			</div>

			<Graph className={styles.graph} />
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

const Card = ({ title, amount, percentage, isIncome }) => {
  const positive = amount > 0 ? true : false;

  return (
    <div className={`card ${styles.card}`}>
      <h4>{title}</h4>
      <p className={styles.amount}>
		{isIncome && formatUSDBalance(amount) + " $	"}
		{!isIncome && amount}
      </p>

      <div className={styles.info}>
		{ percentage && 
			<>
				<img src={positive ? Positive : Negative} alt="" />
				<p className={styles.percentage}>
					<span style={{ color: positive ? "#23C215" : "#C21515" }}>
						{positive ? `+` : `-`}
						{percentage}%
					</span>{" "}
					vs last 30 days
				</p>
			</>
		}
      </div>
    </div>
  );
};
