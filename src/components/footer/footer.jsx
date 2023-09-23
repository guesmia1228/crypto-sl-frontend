import styles from "./footer.module.css";

import LogoIcon from "../../assets/logo/logo.svg";
import Logo from "../../assets/logo/logo2.svg";

import Instagram from "../../assets/icon/instagram.svg";
import Linkedin from "../../assets/icon/linkedin.svg";
import Youtube from "../../assets/icon/youtube.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../button/button";

const content = [
  { link: "/" },
  { link: "/payment" },
  { link: "/support" },
  { link: "/affiliate" },
];

const Footer = () => {
  const { t } = useTranslation();

  const footerContent = t("footer.content", { returnObjects: true });

  return (
    <footer className={`${styles.footer} card`}>
      <div className={`${styles.top} container`}>
        <img src={Logo} alt="" />

        <div className={styles.content}>
          <ul>
            {content.map((item, indexLinks) => (
              <li key={indexLinks}>
                <Link to={item.link}>{footerContent[indexLinks].text}</Link>
              </li>
            ))}
          </ul>

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
          <div className={styles.buttonWrapper}>
            <Button color={"white"}>
              <img src={LogoIcon} alt="" />
              <p>Get our app now</p>
            </Button>
          </div>
        </div>
      </div>

      <div className={`${styles.copyright} container`}>
        <p>{t("footer.copyright")}</p>

        <div>
          <ul className={styles.bottomList}>
            <li>
              <Link to={"/privacy"}>{t("footer.privacy")}</Link>
            </li>
            <li>
              <Link to={"/imprint"}>{t("footer.imprint")}</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
