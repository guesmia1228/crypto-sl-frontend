import PercentageInfo from "../percentageInfo/percentageInfo";
import { transformNumber } from "../func/transformNumber";
import Negative from "../../assets/icon/negative.svg";
import Positive from "../../assets/icon/positive.svg";
import { formatUSDBalance } from "../../utils";
import { useTranslation } from "react-i18next";

import styles from "./statsCard.module.css";

const StatsCard = ({ title, amount, percentage, isMonetary }) => {
  const { t } = useTranslation();

  let positive = null;
  let color = null;
  let percChange = t("dashboard.cardsDays");
  if (percentage !== undefined && percentage !== null && percentage !== 0) {
    positive = percentage > 0 ? true : false;
    color = positive ? "#23C215" : "#C21515";
    percChange = (
      <>
        <span style={{ color: color }}>
          {(positive ? `+` : ``) + parseFloat(percentage).toFixed(0) + "%"}
        </span>{" "}
        vs {t("dashboard.cardsDays")}
      </>
    );
  }

  return (
    <div className={`card ${styles.card}`}>
      <h4>{title}</h4>
      <p className={styles.amount}>
        {isMonetary && formatUSDBalance(amount) + " $	"}
        {!isMonetary && amount}
      </p>

      <div className={styles.info}>
        {positive !== null && (
          <img src={positive ? Positive : Negative} alt="" />
        )}
        {positive === null && <b>=</b>}
        <p className={styles.percentage}>{percChange}</p>
      </div>
    </div>
  );

  /*
  const positive = percentage > 0 ? true : false;

  return (
    <div className={`card ${styles.card}`}>
      <h4>{title}</h4>
      <p className={styles.amount}>
        {positive ? `+` : ``}
        {title === "Incomes" ? `$` : ``}
        {transformNumber(amount)}
      </p>

      <PercentageInfo amount={amount} percentage={percentage} />
    </div>
  );
  */
};

export default StatsCard;
