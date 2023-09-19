import styles from "./footer.module.css";

import Logo from "../../assets/logo/logo.svg";

import Instagram from "../../assets/icon/instagram.svg";
import Linkedin from "../../assets/icon/linkedin.svg";
import Youtube from "../../assets/icon/youtube.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const content = [
  {
    links: [
      { link: "/" },
      { link: "/payroll" },
      { link: "/payment" },
      { link: "/support" },
      { link: "/affiliate" },
    ],
  },
  {
    links: [
      { link: "/login" },
      { link: "/signup" },
      { link: "/" },
      { link: "/" },
    ],
  },
  {
    links: [{ link: "/privacy" }, { link: "/imprint" }],
  },
  {
    links: [{ link: "mailto:office@nefentus.com" }, { link: false }],
  },
];

const Footer = () => {
  const { t } = useTranslation();

  const footerContent = t("footer.content", { returnObjects: true });

  return (
    <footer className={`${styles.footer} card`}>
      <div className={`${styles.top} container`}>
        <img src={Logo} alt="" />

        <div className={styles.content}>
          {content.map((item, indexContent) => (
            <div className={styles.column} key={indexContent}>
              <p className={styles.label}>
                {footerContent[indexContent].label}
              </p>

              <ul>
                {item.links.map((item, indexLinks) => (
                  <li key={indexLinks}>
                    <Link to={item.link}>
                      {footerContent[indexContent].links[indexLinks].text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.copyright} container`}>
        <p>{t("footer.copyright")}</p>
        <div className={styles.icons}>
          <Link to="https://www.linkedin.com/company/nefentuspay/">
            <img src={Linkedin} alt="" />
          </Link>
          <Link to="https://www.instagram.com/nefentus/">
            <img src={Instagram} alt="" />
          </Link>
          <Link to="https://www.youtube.com/channel/UCV1QWqkZXtZvXl6bq3AgkTA">
            <img src={Youtube} alt="" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
