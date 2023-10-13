import Globe from "../../../assets/icon/language.svg";
import USA from "../../../assets/icon/flags/usa.svg";
import DE from "../../../assets/icon/flags/de.svg";
import UK from "../../../assets/icon/flags/uk.svg";

import styles from "./language.module.css";
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
    label: "Ukrainian",
    flag: UK,
    code: "uk",
  },
];

const LanguageBox = () => {
  const query = useLocation();
  const [langList, setLangList] = useState(list);

  const { i18n } = useTranslation();

  const handleTrans = (code) => {
    i18n.changeLanguage(code);
  };

  useEffect(() => {
    if (query.pathname === "/support") {
      // setLangList(list.slice(0, 2));
      // handleTrans("en");
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
        <img src={Globe} alt="language globe icon" />
      </div>
      <div className={`${styles.dropdown}`}>
        <div className={`${styles.body} card`}>
          {langList.map((item, index) => (
            <div
              key={index}
              className={styles.item}
              onClick={() => handleTrans(item.code)}
            >
              <img src={item.flag} alt="language flag" />
              <p className="standard">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageBox;
