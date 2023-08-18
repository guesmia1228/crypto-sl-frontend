import { useEffect, useState } from "react";
import styles from "./transactions.module.css";
import Header from "./../header/header";
import Table from "../../components/table";
import Search from "../../assets/icon/search.svg";
import vendorDashboardApi from "../../api/vendorDashboardApi";

const headers = ["Updated at", "Product name", "Price (USD)", "Quantity", "Currency", "Stablecoin", "Status"]
const colSizes = [1.5, 2.5, 1, 1, 1, 1, 1.5];

const TransactionsBody = () => {
	const [orderData, setOrderData] = useState([]);
	const [orderIds, setOrderIds] = useState([]);
	const dashboardApi = new vendorDashboardApi();

	async function fetchOrders() {
		const newOrders = await dashboardApi.getOrders();
		console.log(newOrders)

		if (newOrders) {
			const newOrderData = newOrders.map((order) => orderToArray(order));
			const newOrderIds = newOrders.map((order) => order.id);
			setOrderData(newOrderData);
			setOrderIds(newOrderIds);
		}
	}

	function orderToArray(order) {
		return [
			new Date(order.updatedAt).toLocaleString(),
			order.product.name,
			order.totalPrice,
			order.quantity,
			order.currency,
			order.stablecoin,
			(
				<span style={{color: order.status === "success" ? "var(--success-color)" : "var(--error-color)"}}>{order.status}</span>
			),
		];
	}

	useEffect(() => {
		fetchOrders();
	}, []);

  return (
    <div className="dashboard-body" style={{ marginBottom: "5rem" }}>
      <Header title="Transactions" />

      <div className={styles.top}>
        <div className={styles.left}>
          <h3>Check all your recent transactions</h3>

          <p>
            Your current gross amount is: <span>$23,335.56</span> and your
            earnings are: <span>$14,629.68</span>.
          </p>
        </div>

		{/*
        <div className={styles.input}>
          <img src={Search} alt="" />
          <input type="text" name="" id="" placeholder="Search..." />
        </div>
  		*/}
      </div>

	  <Table 
	  		headers={headers} 
	  		data={orderData} 
			colSizes={colSizes}
			colHighlighted={[4, 5]} 
			striped 
		/>
	</div>
  );
};

export default TransactionsBody;
