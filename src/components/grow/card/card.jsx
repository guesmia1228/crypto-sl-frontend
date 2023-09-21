import styles from "./card.module.css";

import Icon from "../../../assets/icon/check.svg";

const Card = ({ title, description, image, num }) => {
  return (
    <div className={`${styles.card} scroll `}>
      <div className={`${styles.wrapper} card`}>
        {/* <img className={styles.icon} src={Icon} alt="" /> */}
        <div className={styles.number}>{num}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>

        <div className={styles.image}>
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Card;
