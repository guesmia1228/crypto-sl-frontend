import styles from "./transactions.module.css";
import Header from "./../header/header";

import Search from "../../assets/icon/search.svg";

const data = [
  [
    "Lorem ipsum",
    "#C233n867z",
    "ruth.sharp@gmail.com",
    "$1,592.00",
    "Bitcoin",
    "#407869494",
    "Jan 6, 2023",
    "$5,595.00",
  ],
  [
    "Lrem ipsum",
    "#C233n867z",
    "ruth@gmail.com",
    "$1,592.00",
    "Bitcoin",
    "#407869494",
    "Jan 6, 2023",
    "$5,595.00",
  ],
  [
    "Lorem ipsum",
    "#C233n867z",
    "ruth.sharp@gmail.com",
    "$1,592.00",
    "Bitcoin",
    "#407869494",
    "Jan 6, 2023",
    "$5,595.00",
  ],
  [
    "Lorem ipsum",
    "#C233n867z",
    "ruth.sharp@gmail.com",
    "$1,592.00",
    "Bitcoin",
    "#407869494",
    "Jan 6, 2023",
    "$5,595.00",
  ],
  [
    "Lorem ipsum",
    "#C233n867z",
    "ruth.sharp@gmail.com",
    "$1,592.00",
    "Bitcoin",
    "#407869494",
    "Jan 6, 2023",
    "$5,595.00",
  ],
  [
    "Lorem ipsum",
    "#C233n867z",
    "ruth.sharp@gmail.com",
    "$1,592.00",
    "Bitcoin",
    "#407869494",
    "Jan 6, 2023",
    "$5,595.00",
  ],
];

const TransactionsBody = () => {
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

        <div className={styles.input}>
          <img src={Search} alt="search" />
          <input type="text" name="" id="" placeholder="Search..." />
        </div>
      </div>

      <Table data={data} />
    </div>
  );
};

export default TransactionsBody;

const Table = ({ data }) => {
  return (
    <div className={`${styles.card} card`}>
      <div className={`${styles.table} dashboard-table`}>
        <div className={styles.tableHead}>
          <ul>
            <li>Product</li>
            <li>Order</li>
            <li>Email</li>
            <li>Amount</li>
            <li>Currency</li>
            <li>Transaction</li>
            <li>Date</li>
            <li>Earnings</li>
            <li>Actions</li>
          </ul>
        </div>
        <div className={styles.tableBody}>
          {data.map((items) => (
            <ul>
              {items.map((item) => (
                <li>{item}</li>
              ))}

              <li>Download</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
