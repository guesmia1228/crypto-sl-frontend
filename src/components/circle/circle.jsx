import Object from "../../assets/image/circle.svg";

import styles from "./circle.module.css";

const Circle = () => {
  return (
    <div className={styles.circle}>
      <img src={Object} alt="" />
    </div>
  );
};

export default Circle;
