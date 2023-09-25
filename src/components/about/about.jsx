import styles from "./about.module.css";

import Graphic1 from "../../assets/image/graphic4.svg";
import Graphic2 from "../../assets/image/graphic2.svg";
import Graphic3 from "../../assets/image/graphic3.svg";
import { useTranslation } from "react-i18next";
import Button from "../button/button";

import Arrow from "../../assets/icon/arrow.svg";
import separateText from "../../func/separate";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="container break">
      <div className={`${styles.card} ${styles.horizontalCard} card scroll`}>
        <div>
          <p className={`subtitle ${styles.subtitle}`}>
            {t("home.aboutCard1Subtitle")}
          </p>
          <h3>
            {separateText(t("home.aboutCard1Title"))}
            <div className="gradient">{t("home.aboutCard1TitleGradient")}</div>
          </h3>
          <p className="standard">{t("home.aboutCard1Description")}</p>

          <div className={styles.button}>
            <Button link="/" color="white">
              <p>{t("home.aboutCardButton")}</p>
              <img src={Arrow} alt="Arrow" />
            </Button>
          </div>
        </div>
        <img
          className={styles.horizontalImg}
          src={Graphic1}
          alt="cryptocurrency graphics"
        />
      </div>
      <div className={`${styles.cardRow}`}>
        <div
          className={`${styles.card} ${styles.verticalCard} slide-right card`}
        >
          <img
            className={styles.verticalImg}
            src={Graphic2}
            alt="tracking graphics"
          />
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

            <div className={styles.button}>
              <Button link="/" color="white">
                <p>{t("home.aboutCardButton")}</p>
                <img src={Arrow} alt="arrow" />
              </Button>
            </div>
          </div>
        </div>
        <div
          className={`${styles.card} ${styles.verticalCard} slide-left card`}
        >
          <img
            className={styles.verticalImg}
            src={Graphic3}
            alt="integrating logos"
          />

          <div className={styles.content}>
            <p className={`subtitle ${styles.subtitle}`}>
              {t("home.aboutCard3Subtitle")}
            </p>
            <h3>
              {t("home.aboutCard3TitleP1")}
              <br />
              {separateText(t("home.aboutCard3TitleP2"))}
            </h3>
            <p className="standard">{t("home.aboutCard3Description")}</p>

            <div className={styles.button}>
              <Button link="/" color="white">
                <p>{t("home.aboutCardButton")}</p>
                <img src={Arrow} alt="arrow" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
