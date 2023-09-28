import styles from "./supportBody.module.css";

import Image1 from "../../assets/image/support/image1.png";
import { useState } from "react";
import { Link } from "react-router-dom";

import IntroductionVideo from "../../assets/video/introduction.mp4";
import { useTranslation } from "react-i18next";

const SupportBody = () => {
  const [active, setActive] = useState(0);

  const { t } = useTranslation();

  const content = t("support.sideBar", { returnObjects: true });

  const handleChange = (index) => {
    setActive(index);

    const element = document.getElementById("content");
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={` ${styles.section}`}>
      <div className="container">
        <h2>{t("support.title")}</h2>
        <div className={`${styles.body}`}>
          <div className={styles.left} id="content">
            {active === 0 && <Introduction />}
            <Contact />
          </div>
          <div className={styles.right}>
            <div className={styles.list}>
              {content.map((item, index) => (
                <div
                  onClick={() => handleChange(index)}
                  className={`card ${styles.card} ${
                    active === index ? styles.active : ""
                  }`}
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.mobBody}>
          {/* <div>
            {list.map((item, index) => (
              <MobCard item={item} index={index} />
            ))}
          </div> */}

          <Contact />
        </div>
      </div>

      <div className={styles.blueBG}></div>
    </div>
  );
};

export default SupportBody;

const Introduction = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <h3>{t("support.introduction.title")}</h3>
      <div className={styles.leftContent}>
        <p className={styles.description}>
          {t("support.introduction.mainDescription")}
        </p>
        <video controls>
          <source src={IntroductionVideo} type="video/mp4" />
        </video>
        <p className={styles.baner}>{t("support.introduction.banner")}</p>

        <p className={styles.description}>
          {t("support.introduction.description1")}
        </p>
        <p className={styles.description}>
          {t("support.introduction.description2")}
        </p>
        <p className={styles.description}>
          {t("support.introduction.description3")}
        </p>
        <p className={styles.description}>
          {t("support.introduction.description4")}
        </p>
      </div>
    </div>
  );
};

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.contact}>
      <h3>{t("support.contact.title")}</h3>
      <p className={styles.description}>{t("support.contact.description")}</p>

      <div className={styles.cards}>
        <div className="card">
          <div className={styles.label}>
            <Link to="https://www.instagram.com/helpdesk.nefentus/">
              {t("support.contact.button1Text")}{" "}
            </Link>
          </div>
          <div className={styles.info}>
            {t("support.contact.button1Description")}{" "}
            {/* <u>
              <Link to="https://www.instagram.com/helpdesk.nefentus/">
                helpdesk.nefentus
              </Link>
            </u> */}
          </div>
        </div>
        <div className="card">
          <div className={styles.label}>support@nefentus.com</div>
          <div className={styles.info}>
            {t("support.contact.button2Description")}
          </div>
        </div>
      </div>
    </div>
  );
};

const MobCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`card ${styles.card} `}
      style={{ maxHeight: open ? "100%" : "6rem" }}
      onClick={() => setOpen((prev) => !prev)}
    >
      {item}

      {index === 0 && <Introduction />}
    </div>
  );
};
