import styles from "./compare.module.css";

import Pros from "../../assets/icon/pros.svg";
import Cons from "../../assets/icon/cons.svg";
import { useTranslation } from "react-i18next";

const Compare = () => {
  const { t } = useTranslation();

  const content = t("affiliate.compareContent", { returnObjects: true });

  return (
    <div className={`${styles.section} container`}>
      {content.map((item) => (
        <Card
          type={item.type}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default Compare;

const Card = ({ type, title, description }) => {
  return (
    <div className={`${styles.card} scroll card`}>
      <div className={styles.top}>
        <img src={type === "cons" ? Cons : Pros} alt="" />
        <h4>{title}</h4>
      </div>
      <p>{description}</p>
    </div>
  );
};
