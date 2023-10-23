import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const list = [
    {
      text: t("footer.imprint"),
      link: "/imprint",
    },
    {
      text: t("footer.privacy"),
      link: "/privacy",
    },
    {
      text: t("footer.terms"),
      link: "/terms",
    },
    {
      text: t("footer.contact"),
      link: "/contact",
    },
  ];
  return (
    <div className={styles.footer}>
      <ul>
        {list.map((item) => (
          <li>
            <Link to={item.link}>{item.text}</Link>
          </li>
        ))}
      </ul>

      <p>{t("footer.copyright")}</p>
    </div>
  );
};

export default Footer;
