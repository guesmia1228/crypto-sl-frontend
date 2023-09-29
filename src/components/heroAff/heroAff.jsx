import { useTranslation } from "react-i18next";
import Button from "../button/button";
import styles from "./heroAff.module.css";
import separateText from "../../func/separate";

const HeroAff = () => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.hero} container load hero`}>
      <div className="scroll">
        <h1>
          {separateText(t("affiliate.heroTitleP1"))}{" "}
          <span className="gradient">{t("affiliate.heroGradient")}</span>
          <br /> {t("affiliate.heroTitleP2")}
        </h1>
        <Button link={"/"}>{t("affiliate.heroButton")}</Button>
      </div>
    </div>
  );
};

export default HeroAff;
