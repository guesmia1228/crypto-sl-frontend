import Globe from "../../../assets/icon/globe.svg";
import USA from "../../../assets/icon/flags/usa.svg";
import DE from "../../../assets/icon/flags/de.svg";
import ES from "../../../assets/icon/flags/es.svg";
import AR from "../../../assets/icon/flags/ar.svg";
import FR from "../../../assets/icon/flags/fr.svg";

import styles from "./languages.module.css";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

let list = [
  {
    label: "English",
    flag: USA,
    code: "en",
  },
  {
    label: "Deutsch",
    flag: DE,
    code: "de",
  },
  {
    label: "Español",
    flag: ES,
    code: "es",
  },
  {
    label: "Français",
    flag: FR,
    code: "fr",
  },
  {
    label: "العربية",
    flag: AR,
    code: "ar",
  },
];

const Languages = () => {
  const query = useLocation();
  const [langList, setLangList] = useState(list);

  const [language, setLanguage] = useState("EN");

  const { t, i18n } = useTranslation();

  const handleTrans = (code) => {
    i18n.changeLanguage(code);

    setLanguage(code.toUpperCase());
  };

  useEffect(() => {
    if (query.pathname === "/support") {
      setLangList(list.slice(0, 2));

      handleTrans("en");
    } else if (query.pathname === "/privacy" || query.pathname === "/imprint") {
      setLangList(list.slice(0, 1));

      handleTrans("en");
    } else {
      setLangList(list);
    }
  }, []);

  return (
    <div className={styles.languages}>
      <div className={styles.menu}>
        <img src={Globe} alt="" />
      </div>
      <div className={`${styles.dropdown}`}>
        <div className={`${styles.body} card`}>
          {langList.map((item, index) => (
            <div
              key={index}
              className={styles.item}
              onClick={() => handleTrans(item.code)}
            >
              <img src={item.flag} alt="" />
              <p className="standard">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Languages;
