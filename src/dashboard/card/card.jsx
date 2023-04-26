import PercentageInfo from "../percentageInfo/percentageInfo";
import { transformNumber } from "./../func/transformNumber";

import styles from "./card.module.css";

const Card = ({ title, amount, percentage }) => {
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
};

export default Card;
