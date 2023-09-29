import HeadingCenter from "../headingCenter/headingCenter";

import styles from "./paymentCards.module.css";
import Button from "./../button/button";

import Checkmark from "../../assets/icon/whiteCheckmark.svg";
import { useTranslation } from "react-i18next";
import separateText from "../../func/separate";

const PaymentCards = () => {
  const { t } = useTranslation();

  const card1List = t("payment.paymentCard1", { returnObjects: true });

  const card2List = t("payment.paymentCard2", { returnObjects: true });

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.bgImage}></div>
      <div className={`container scroll `}>
        <HeadingCenter
          noScroll
          title={<>{separateText(t("payment.paymentTitle"))}</>}
          subtitle={t("payment.paymentSubtitle")}
        />

        <div className={styles.body}>
          <div className={`${styles.lightCard} card ${styles.card}`}>
            <div>
              <div className={styles.top}>
                <h5>{t("payment.paymentCard1Title")}</h5>
                <p>{t("payment.paymentCard1Description")}</p>
              </div>
              <div className={styles.list}>
                {card1List.map((item) => (
                  <div>
                    <img src={Checkmark} alt="checkmark" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button link="/signup" color="white">
              {t("payment.paymentButton")}
            </Button>
          </div>

          <div className={`${styles.boldCard} card ${styles.card}`}>
            <div>
              <div className={styles.top}>
                <h5>{t("payment.paymentCard2Title")}</h5>
                <p>{t("payment.paymentCard2Description")}</p>
              </div>
              <div className={styles.list}>
                {card2List.map((item) => (
                  <div>
                    <img src={Checkmark} alt="checkmark" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button link="/signup">{t("payment.paymentButton")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCards;
