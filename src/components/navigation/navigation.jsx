import styles from "./navigation.module.css";

import Logo from "../../assets/logo/logo.svg";

import Hamburger from "../../assets/icon/hamburger.svg";
import DropDown from "../../assets/icon/dropdown.svg";
import Button from "../button/button";
import Languages from "./languages.jsx/languages";
import { useState } from "react";

import QR from "../../assets/icon/qrcode.svg";

import Payment from "../../assets/icon/money.svg";
import Cash from "../../assets/icon/cash.svg";

import { Link } from "react-router-dom";

import Arrow from "../../assets/icon/blueArrow.svg";

import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { t, i18n } = useTranslation();

  const [openMenu, setOpenMenu] = useState(false);

  const [openDrop, setOpenDrop] = useState(false);

  return (
    <nav className={`${styles.navigation} load`}>
      <div className={` ${styles.contentWrapper}`}>
        <div className={`container ${styles.content}`}>
          <div className={styles.left}>
            <Link className={styles.logoWrapper} to="/">
              <img className={styles.logo} src={Logo} alt="" />
            </Link>

            <ul className={styles.navList}>
              <li className="standard">
                <Link to="/">
                  <p>{t("navigation.home")}</p>
                  <p className={styles.fake}>{t("navigation.home")}</p>
                </Link>
              </li>
              <li className="standard">
                <Link to="/payment">
                  <p>{t("navigation.solutions")}</p>
                  <p className={styles.fake}>{t("navigation.solutions")}</p>
                </Link>
              </li>
              <li className="standard">
                <Link to="/affiliate">
                  <p>{t("navigation.affiliate")}</p>
                  <p className={styles.fake}>{t("navigation.affiliate")}</p>
                </Link>
              </li>
              <li className="standard">
                <Link to="/support">
                  <p>{t("navigation.resources")}</p>
                  <p className={styles.fake}>{t("navigation.resources")}</p>
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.right}>
            <Languages />

            <p className={styles.login}>
              <Link to="/login">
                <p>{t("navigation.login")}</p>
                <p className={styles.fake}>{t("navigation.login")}</p>
              </Link>
            </p>
            <div className={styles.button}>
              <Link to="/signup">{t("navigation.signUp")}</Link>
            </div>
          </div>

          <div className={styles.mobMenu}>
            <div
              className={`${styles.line} ${openMenu ? styles.openLine : ""}`}
            ></div>
            <div
              className={`${styles.line} ${openMenu ? styles.openLine : ""}`}
            ></div>
            <div
              className={`${styles.line} ${openMenu ? styles.openLine : ""}`}
            ></div>

            <div
              onClick={() => setOpenMenu((prev) => !prev)}
              className={styles.lineButton}
            ></div>
          </div>
        </div>
      </div>

      <div
        className={styles.mobileMenu}
        style={{
          transform: openMenu ? "translateY(0%)" : "translateY(-120%)",
        }}
      >
        <div>
          <ul>
            <li className="standard">
              <Link to="/" onClick={() => setOpenMenu(false)}>
                {t("navigation.home")}
              </Link>
            </li>
            <li className="standard">
              <Link to="/payment" onClick={() => setOpenMenu(false)}>
                {t("navigation.payment")}
              </Link>
            </li>
            <li className="standard">
              <Link to="/support" onClick={() => setOpenMenu(false)}>
                {t("navigation.resources")}
              </Link>
            </li>
            <li className="standard">
              <Link to="/affiliate" onClick={() => setOpenMenu(false)}>
                {t("navigation.affiliate")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Button link="/login" onClick={() => setOpenMenu(false)}>
            {t("navigation.login")}
          </Button>
          <Button
            link="/signup"
            color="white"
            onClick={() => setOpenMenu(false)}
          >
            {t("navigation.signUp")}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
