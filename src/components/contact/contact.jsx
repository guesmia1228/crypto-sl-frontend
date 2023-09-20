import Button from "../button/button";
import styles from "./contact.module.css";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.contact} `}>
      <div className="container scroll">
        <h3>{t("contact.title")}</h3>
        {/* <p className={`standard ${styles.description}`}>
        {t("contact.description")}
      </p> */}
        <Button link="https://calendly.com/nefentus/consulting">
          {t("contact.button")}
        </Button>
      </div>
    </div>
  );
};

export default Contact;
