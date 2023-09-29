import styles from "./dataCards.module.css";

import Image1 from "../../assets/icon/commision.svg";
import Image2 from "../../assets/icon/analytics.svg";
import Image3 from "../../assets/icon/automatons.svg";
import Image4 from "../../assets/icon/products.svg";

import Checkmark from "../../assets/icon/singleCheckmark.svg";
import { useTranslation } from "react-i18next";

const imageContent = [
  {
    icon: Image1,
  },
  {
    icon: Image2,
  },
  {
    icon: Image3,
  },
  {
    icon: Image4,
  },
];

const DataCards = () => {
  const { t } = useTranslation();

  const content = t("payment.dataContent", { returnObjects: true });

  return (
    <div className={`container break ${styles.section}`}>
      {content.map((item, index) => (
        <Card
          side={index % 2 ? "slide-left" : "slide-right"}
          image={imageContent[index].icon}
          title={item.title}
          list={item.list}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default DataCards;

const Card = ({ image, title, description, list, side }) => {
  return (
    <div className={`${styles.card} ${side}`}>
      <div className={`${styles.wrapper} card`}>
        <div className={styles.top}>
          <img src={image} alt="data symbol icon" />
          <h4>{title}</h4>
        </div>
        <p className={styles.description}>{description}</p>

        <div className={styles.list}>
          {list.map((item) => (
            <div>
              <img src={Checkmark} alt="checkmark" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
