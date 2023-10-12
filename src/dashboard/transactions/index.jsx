import { useEffect, useState } from "react";
import styles from "./transactions.module.css";
import Header from "./../header/header";
import Table from "../../components/table";
import Search from "../../assets/icon/search.svg";
import vendorDashboardApi from "../../api/vendorDashboardApi";
import { formatUSDBalance } from "../../utils";

const headers = [
  "Updated at",
  "Entity",
  "Price ($)",
  "Quantity",
  "Currency",
  "Stablecoin",
  "Status",
];
const colSizes = [1.5, 2.5, 1, 1, 1, 1, 1.5];

const TransactionsBody = () => {
  const [orderData, setOrderData] = useState([]);
  const [orderIds, setOrderIds] = useState([]);
  const dashboardApi = new vendorDashboardApi();

  async function fetchOrders() {
    let newOrders = await dashboardApi.getOrders();
    // Reverse the array
    newOrders = newOrders.reverse();

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
      order.product !== null ? order.product.name : "Custom payment",
      order.totalPrice,
      order.quantity,
      order.currency,
      order.stablecoin,
      <span
        style={{
          color:
            order.status === "success"
              ? "var(--success-color)"
              : "var(--error-color)",
        }}
      >
        {order.status}
      </span>,
    ];
  }

  function orderDataToTotalValue(orderData) {
    let totalValue = 0;
    for (const order of orderData) {
      totalValue += order[2];
    }
    return totalValue;
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
            All your orders have a total value of{" "}
            <span>${formatUSDBalance(orderDataToTotalValue(orderData))}</span>
          </p>
        </div>

        {/*
        <div className={styles.input}>
          <img src={Search} alt="search" />
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
