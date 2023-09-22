import Button from "../button/button";
import styles from "./contact.module.css";
import { useTranslation } from "react-i18next";

const Contact = ({ affiliate }) => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.contact} `}>
      <div className="container scroll">
        {!affiliate && <h3>{t("contact.title")}</h3>}
        {/* <p className={`standard ${styles.description}`}>
        {t("contact.description")}
      </p> */}
        <Button
          link={
            affiliate ? "https://calendly.com/nefentus/consulting" : "/signup"
          }
        >
          {!affiliate ? t("contact.button") : t("contact.button2")}
        </Button>
      </div>
    </div>
  );
};

export default Contact;
