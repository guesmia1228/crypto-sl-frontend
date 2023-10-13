import styles from "./compare.module.css";

import Pros from "../../assets/icon/pros.svg";
import Cons from "../../assets/icon/cons.svg";
import { useTranslation } from "react-i18next";
import HeadingCenter from "../headingCenter/headingCenter";
import separateText from "../../func/separate";

const Compare = () => {
  const { t } = useTranslation();

  const content = t("affiliate.compareContent", { returnObjects: true });

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.bgImage}></div>
      <div className={`container`}>
        <div className={`${styles.sectionHeader}`}>
          <HeadingCenter
            subtitle={t("affiliate.compareSubtitle")}
            title={<>{separateText(t("affiliate.compareTitle"))}</>}
          />
        </div>
        <div className={`${styles.section} `}>
          {content.map((item, index) => (
            <Card
              key={index}
              type={item.type}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compare;

const Card = ({ type, title, description }) => {
  return (
    <div className={`${styles.card} scroll`}>
      <div className={`${styles.wrapper} card`}>
        <div className={styles.top}>
          <img src={type === "cons" ? Cons : Pros} alt="compare symbol" />
          <h4>
            {title.split("\n")[0]}
            <br />
            {title.split("\n")[1]}
          </h4>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};
