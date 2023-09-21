import { useTranslation } from "react-i18next";
import Button from "../button/button";
import styles from "./heroAff.module.css";

const HeroAff = () => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.hero} container load hero`}>
      <div className="scroll">
        <h1>
          {t("affiliate.heroTitle")} <br />
          <span className="gradient">{t("affiliate.heroGradient")}</span>
        </h1>
        <Button link={"/"}>{t("affiliate.heroButton")}</Button>
      </div>
    </div>
  );
};

export default HeroAff;
