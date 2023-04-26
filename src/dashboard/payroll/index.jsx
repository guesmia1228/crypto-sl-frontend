import Button from "../../components/button/button";
import Card from "../card/card";
import Header from "../header/header";
import TopInfo from "../topInfo/topInfo";
import styles from "./payroll.module.css";

import Bitcoin from "../../assets/icon/crypto/bitcoin.svg";
import Cardano from "../../assets/icon/crypto/cardano.svg";
import Etherium from "../../assets/icon/crypto/etherium.svg";
import Polygon from "../../assets/icon/crypto/polygon.svg";

import Profile from "../../assets/image/reviews/image3.png";

import { transformNumber } from "./../func/transformNumber";
import ModalOverlay from "../modal/modalOverlay";
import { useState } from "react";
import Input, { Options } from "../../components/input/input";

const cardsContent = [
  {
    title: "Paid this month",
    amount: 467867,
    percentage: 13,
  },
  {
    title: "To pay this month",
    amount: 325800,
    percentage: 11.52,
  },
  {
    title: "Employees",
    amount: 20,
    percentage: 105.55,
  },
];

const cardContent = [
  {
    title: "Your top Currencies",
    description: "Last month",
    data: [
      {
        img: Bitcoin,
        percentage: 10,
        amount: 1876000,
      },
      {
        img: Cardano,
        percentage: 30,
        amount: 2076000,
      },
      {
        img: Etherium,
        percentage: 20,
        amount: 714000,
      },
      {
        img: Polygon,
        percentage: 40,
        amount: 978800,
      },
    ],
  },
  {
    title: "Employees",
    description: "Highest expense claims",
    data: [
      {
        img: Profile,
        percentage: 50,
        amount: 284200,
      },
      {
        img: Profile,
        percentage: 80,
        amount: 1876000,
      },
      {
        img: Profile,
        percentage: 90,
        amount: 2276000,
      },
      {
        img: Profile,
        percentage: 75,
        amount: 569000,
      },
    ],
  },
];

const tableData = [
  ["John Smith", "Marekting", "159200", false, "Bitcoin", "Jan 6, 2023"],
  ["John Smith", "Marekting", "159200", true, "Bitcoin", "Jan 6, 2023"],
  ["John Smith", "Marekting", "159200", false, "Bitcoin", "Jan 6, 2023"],
  ["John Smith", "Marekting", "159200", false, "Bitcoin", "Jan 6, 2023"],
  ["John Smith", "Marekting", "159200", true, "Bitcoin", "Jan 6, 2023"],
  ["John Smith", "Marekting", "159200", true, "Bitcoin", "Jan 6, 2023"],
  ["John Smith", "Marekting", "159200", false, "Bitcoin", "Jan 6, 2023"],
];

const PayrollBody = () => {
  const [openModal, setOpenModal] = useState(false);

  const [optionValue, setOptionValue] = useState("Choose method");

  return (
    <>
      <div className={`dashboard-body`}>
        <Header title={"Payroll"} />

        <TopInfo
          title={"Easily pay salaries and bonuses"}
          description={
            "Start paying salaries, bonuses, and reimburse expenses in crypto."
          }
        >
          <Button color={"white"} onClick={() => setOpenModal(true)}>
            Pay Salary
          </Button>
        </TopInfo>

        <div className={styles.cards}>
          {cardsContent.map((item) => (
            <Card
              title={item.title}
              amount={item.amount}
              percentage={item.percentage}
            />
          ))}
        </div>

        <div className={styles.graphs}>
          {cardContent.map((data) => (
            <CardGraph
              title={data.title}
              description={data.description}
              data={data.data}
            />
          ))}
        </div>

        <Table data={tableData} />
      </div>
      <div className={styles.modalWrapper}>
        {openModal && (
          <ModalOverlay>
            <div className={styles.modalBody}>
              <h3>Add Salary</h3>

              <div className={styles.inputsArea}>
                <div className={styles.inputLine}>
                  <Input label="Time Frame" date dashboard />
                  <Input
                    label="Department"
                    placeholder="Enter deparment"
                    dashboard
                  />
                </div>
                <div className={styles.inputLine}>
                  <Input
                    label="Email address"
                    placeholder="Enter email"
                    dashboard
                  />
                  <Input
                    label="Employee"
                    placeholder="Enter employee name"
                    dashboard
                  />
                </div>
                <div className={styles.inputLine}>
                  <Options
                    label="Method"
                    value={optionValue}
                    options={[
                      "Bitcoin",
                      "Bitcoin",
                      "Bitcoin",
                      "Bitcoin",
                      "Bitcoin",
                    ]}
                    dashboard
                    setValue={setOptionValue}
                  />
                  <Input
                    label="Amount"
                    placeholder="Enter salary amount"
                    dashboard
                    number
                  />
                </div>

                <div className={styles.buttons}>
                  <div
                    className={styles.button}
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </div>
                  <Button color="white">Confirm</Button>
                </div>
              </div>
            </div>
          </ModalOverlay>
        )}
      </div>
    </>
  );
};

export default PayrollBody;

const CardGraph = ({ title, description, data }) => {
  return (
    <div className={`${styles.graph} card`}>
      <div className={styles.top}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className={styles.graphTable}>
        {data.map((item) => (
          <div className={styles.tableLine}>
            <div className={styles.left}>
              <div className={styles.image}>
                <img src={item.img} alt="" />
              </div>

              <Bar percentage={item.percentage} />
            </div>
            <div className={styles.amount}>${transformNumber(item.amount)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Bar = ({ percentage }) => {
  return (
    <div className={styles.barWrapper}>
      <div className={styles.bar} style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

const Table = ({ data }) => {
  return (
    <div className={`${styles.tableCard} card`}>
      <div className={`${styles.table} dashboard-table`}>
        <div className={styles.tableHead}>
          <ul>
            <li>Name</li>
            <li>Department</li>
            <li>Amount</li>
            <li>Status</li>
            <li>Method</li>
            <li>Date</li>
            <li>Action</li>
          </ul>
        </div>
        <div className={styles.tableBody}>
          {data.map((items, lineIndex) => (
            <ul key={lineIndex}>
              {items.map((item, itemIndex) => (
                <>
                  {itemIndex === 3 ? (
                    <li
                      className={`${styles.box} ${
                        item ? styles.approved : styles.pending
                      }`}
                    >
                      {item ? "Approved" : "Pending"}
                    </li>
                  ) : (
                    <li>
                      {itemIndex === 2 ? `$${transformNumber(item)}` : item}
                    </li>
                  )}
                </>
              ))}

              <li
                style={{
                  opacity: data[lineIndex][3] ? "0.5" : 1,
                  cursor: data[lineIndex][3] ? "initial" : "pointer",
                }}
              >
                Confirm
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
