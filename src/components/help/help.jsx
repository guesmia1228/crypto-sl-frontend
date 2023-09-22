import HeadingCenter from "../headingCenter/headingCenter";
import styles from "./help.module.css";

import Support from "../../assets/icon/support.svg";
import FAQ from "../../assets/icon/faq.svg";
import Button from "../button/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Help = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className={styles.header}>
        <HeadingCenter
          subtitle={t("home.helpSubtitle")}
          title={t("home.helpTitle")}
        />
      </div>

      <div className={`scroll ${styles.row}`}>
        <div className={`${styles.card} card`}>
          <div>
            <div className={styles.top}>
              <img src={Support} alt="" />
              <h5>{t("home.helpCard1Title")}</h5>
            </div>

            <p className="standard">{t("home.helpCard1Text")}</p>
          </div>

          <Link to="https://calendly.com/nefentus/consulting">
            <div className={styles.button}>{t("home.helpCard1Button")}</div>
          </Link>
        </div>
        <div className={`${styles.card} card`}>
          <div>
            <div className={styles.top}>
              <img src={FAQ} alt="" />
              <h5>{t("home.helpCard2Title")}</h5>
            </div>

            <p className="standard">{t("home.helpCard2Text")}</p>
          </div>

          <Link to="/support">
            <div className={styles.button}>{t("home.helpCard2Button")}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Help;
