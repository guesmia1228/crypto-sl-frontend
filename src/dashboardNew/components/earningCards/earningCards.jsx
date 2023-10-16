import Card from "../card/card";

import Positive from "../../../assets/icon/positive.svg";
import Negative from "../../../assets/icon/negative.svg";

import styles from "./earningCards.module.css";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
  const { t } = useTranslation();

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
          <div className={styles.rest}>{t("dashboard.cardsDays")}</div>
        </div>
      </div>
    </Card>
  );
};
