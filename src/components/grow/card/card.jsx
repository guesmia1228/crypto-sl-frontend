import styles from "./card.module.css";

import Icon from "../../../assets/icon/check.svg";

const Card = ({ title, description, image }) => {
  return (
    <div className={`${styles.card} card`}>
      <img className={styles.icon} src={Icon} alt="" />
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>

      <div className={styles.image}>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default Card;
