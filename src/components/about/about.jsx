import styles from "./about.module.css";

import Graphic1 from "../../assets/image/graphic1.svg";
import Graphic2 from "../../assets/image/graphic2.svg";
import Graphic3 from "../../assets/image/graphic3.svg";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="container break">
      <div className={`${styles.card} ${styles.horizontalCard} card scroll`}>
        <div>
          <p className={`subtitle ${styles.subtitle}`}>
            {t("home.aboutCard1Subtitle")}
          </p>
          <h2> {t("home.aboutCard1Title")}</h2>
          <p className={styles.description}>
            {t("home.aboutCard1Description")}
          </p>
        </div>
        <img src={Graphic1} alt="" />
      </div>
      <div className={`${styles.cardRow}`}>
        <div className={`${styles.card} ${styles.verticalCard} scroll card`}>
          <img src={Graphic2} alt="" />
          <div className={styles.content}>
            <p className={`subtitle ${styles.subtitle}`}>
              {t("home.aboutCard2Subtitle")}
            </p>
            <h3>
              {t("home.aboutCard2TitleP1")}
              <br />
              {t("home.aboutCard2TitleP2")}
            </h3>
            <p className="standard"> {t("home.aboutCard2Description")}</p>
          </div>
        </div>
        <div className={`${styles.card} ${styles.verticalCard} scroll card`}>
          <img src={Graphic3} alt="" />

          <div className={styles.content}>
            <p className={`subtitle ${styles.subtitle}`}>
              {t("home.aboutCard3Subtitle")}
            </p>
            <h3>
              {t("home.aboutCard3TitleP1")}
              <br />
              {t("home.aboutCard3TitleP2")}
            </h3>
            <p className="standard">{t("home.aboutCard3Description")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
