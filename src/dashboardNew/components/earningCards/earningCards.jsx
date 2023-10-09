import Card from "../card/card";

import Positive from "../../../assets/icon/positive.svg";
import Negative from "../../../assets/icon/negative.svg";

import styles from "./earningCards.module.css";

const data = [
  {
    label: "Sales Total",
    value: "+$4,678.67",
    percentage: 2.11,
  },
  {
    label: "Sales Total",
    value: "+$4,678.67",
    percentage: -2.11,
  },
  {
    label: "Sales Total",
    value: "+$4,678.67",
    percentage: 2.11,
  },
];

const EarningCards = () => {
  return (
    <div className={styles.cards}>
      {data.map((item, index) => (
        <SingleCard data={item} key={index} />
      ))}
    </div>
  );
};

export default EarningCards;

const SingleCard = ({ data }) => {
  return (
    <Card>
      <div className={styles.label}>{data.label}</div>
      <div className={styles.value}>{data.value}</div>
      <div className={styles.percentage}>
        <img src={data.percentage > 0 ? Positive : Negative} alt="" />
        <div className={styles.percentageText}>
          <div
            className={data.percentage > 0 ? styles.positive : styles.negative}
          >
            {data.percentage}%
          </div>
          <div className={styles.rest}>vs last 30 days</div>
        </div>
      </div>
    </Card>
  );
};
