import styles from "./percentageInfo.module.css";

import Negative from "../../assets/icon/negative.svg";
import Positive from "../../assets/icon/positive.svg";

const PercentageInfo = ({ amount, percentage }) => {
  const positive = percentage > 0 ? true : false;

  return (
    <div className={styles.info}>
      <img src={positive ? Positive : Negative} alt="" />
      <p className={styles.percentage}>
        <span style={{ color: positive ? "#23C215" : "#C21515" }}>
          {positive ? `+` : ``}
          {percentage}%
        </span>{" "}
        vs last 30 days
      </p>
    </div>
  );
};

export default PercentageInfo;
