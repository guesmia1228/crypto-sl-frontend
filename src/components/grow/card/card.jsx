import styles from "./card.module.css";

import Icon from "../../../assets/icon/check.svg";
import Button from "../../button/button";

import Arrow from "../../../assets/icon/arrow.svg";

const Card = ({ title, description1, description2, image, num, button }) => {
  return (
    <div className={`${styles.card} scroll `}>
      <div className={`${styles.wrapper} card`}>
        {/* <img className={styles.icon} src={Icon} alt="" /> */}
        {/* <div className={styles.number}>{num}</div> */}
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>
          {description1}
          <div style={{ marginTop: 10 }}>{description2}</div>
        </div>
        <div className={styles.button}>
          <Button link="/" color="white">
            <p>{button}</p>
          </Button>
        </div>

        <div className={styles.image}>
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Card;
