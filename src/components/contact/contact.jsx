import Button from "../button/button";
import styles from "./contact.module.css";
import { useTranslation } from "react-i18next";

const Contact = ({ affiliate }) => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.contact}`}>
      <div className={styles.bgImage}></div>
      <div className="container scroll">
        {false && <h3>{t("contact.title")}</h3>}
        {/* <p className={`standard ${styles.description}`}>
        {t("contact.description")}
      </p> */}
        <div className={styles.buttonWrapper}>
          <Button
            color="white"
            link={
              affiliate ? "https://calendly.com/nefentus/consulting" : "/signup"
            }
          >
            {!affiliate ? t("contact.button") : t("contact.button2")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
