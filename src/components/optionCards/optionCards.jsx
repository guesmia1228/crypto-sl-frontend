import styles from "./optionCards.module.css";

import Image1 from "../../assets/image/invoicing.svg";
import Image2 from "../../assets/image/payroll.svg";
import Image3 from "../../assets/image/expenses.svg";
import { useTranslation } from "react-i18next";

const contentImage = [
  {
    image: Image1,
  },
  {
    image: Image2,
  },
  {
    image: Image3,
  },
];

const OptionCards = () => {
  const { t } = useTranslation();

  const content = t("payroll.payrollContent", { returnObjects: true });

  return (
    <div className={`container scroll ${styles.section}`}>
      {content.map((item, index) => (
        <div key={index} className="card">
          <div className={styles.image}>
            <img src={contentImage[index].image} alt="payroll" />
          </div>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default OptionCards;
