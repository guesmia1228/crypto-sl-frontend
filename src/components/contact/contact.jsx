import Button from "../button/button";
import styles from "./contact.module.css";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.contact}>
      <h2>{t("contact.title")}</h2>
      <p className={styles.description}>{t("contact.description")}</p>
      <Button color="white" link="https://calendly.com/nefentus/consulting">
        {t("contact.button")}
      </Button>
    </div>
  );
};

export default Contact;
