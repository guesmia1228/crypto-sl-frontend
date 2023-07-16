import styles from "./navigation.module.css";

import Logo from "../../assets/logo/logo.svg";

import Hamburger from "../../assets/icon/hamburger.svg";
import Button from "../button/button";
import Languages from "./languages.jsx/languages";
import { useState } from "react";

import QR from "../../assets/icon/qrcode.svg";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { t } = useTranslation();

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className={`${styles.navigation} load`}>
      <div className={`container ${styles.content}`}>
        <div>
          <Link to="/">
            <img className={styles.logo} src={Logo} alt="" />
          </Link>
          <ul>
            <li className="standard">
              <Link to="/">{t("navigation.home")}</Link>
            </li>
            <li className={`standard ${styles.hover}`}>
              <div className={styles.menu}>
                <Link to="/payment">{t("navigation.solutions")}</Link>
              </div>
            </li>
            <li className="standard">
              <Link to="/support">{t("navigation.resources")}</Link>
            </li>
            <li className="standard">
              <Link to="/affiliate">{t("navigation.affiliate")}</Link>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          <p className="">
            <Link to="/login">{t("navigation.login")}</Link>
          </p>
          <div className={styles.button}>
            <Link to="/signup">{t("navigation.signUp")}</Link>
          </div>
          <img className={styles.qrcode} src={QR} alt="" />

          <Languages />
        </div>

        <div className={styles.mobMenu}>
			<span className={styles.midWidth}>
				<Link to="/login">
					<div className={styles.mobButton}>{t("navigation.login")}</div>
				</Link>
				<Link to="/signup">
					<div className={styles.mobButton}>{t("navigation.signUp")}</div>
				</Link>
			</span>

          <img src={Hamburger} alt="" onClick={() => setOpenMenu(true)} />
        </div>
      </div>

      <div
        className={styles.mobileMenu}
        style={{ transform: openMenu ? "translateX(0%)" : "translateX(100%)" }}
      >
        <div>
          <div>
            <img src={Logo} alt="" />

            <div className={styles.close}>
              <Languages />

              <p onClick={() => setOpenMenu(false)}>X</p>
            </div>
          </div>

          <ul>
            <li className="standard">
              <Link to="/" onClick={() => setOpenMenu(false)}>
                {t("navigation.home")}
              </Link>
            </li>
            <li className="standard">
              <Link to="/payment" onClick={() => setOpenMenu(false)}>
                {t("navigation.solutions")}
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
          <Button color="white" onClick={() => setOpenMenu(false)}>
            {t("navigation.signUp")}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
