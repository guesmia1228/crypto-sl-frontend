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

import PaymentW from "../../assets/icon/moneyW.svg";
import CashW from "../../assets/icon/cashW.svg";
import { Link } from "react-router-dom";

import Arrow from "../../assets/icon/blueArrow.svg";

import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { t, i18n } = useTranslation();

  const [openMenu, setOpenMenu] = useState(false);

  const [openDrop, setOpenDrop] = useState(false);

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
                {t("navigation.solutions")} <img src={DropDown} alt="" />
              </div>
              <div className={`${styles.dropdownMenu}`}>
                <div className={`${styles.listContent}`}>
                  <Link to="/payment" className={styles.item}>
                    <img src={Payment} alt="" />
                    <div>
                      <p className={styles.headline}>
                        {t("navigation.payment")} <img src={Arrow} alt="" />
                      </p>
                      <p className={styles.subheadline}>
                        {t("navigation.paymentDescription")}
                      </p>
                    </div>
                  </Link>
                  <Link to="/payroll" className={styles.item}>
                    <img src={Cash} alt="" />
                    <div>
                      <p className={styles.headline}>
                        {t("navigation.payroll")} <img src={Arrow} alt="" />
                      </p>
                      <p className={styles.subheadline}>
                        {t("navigation.payrollDescription")}
                      </p>
                    </div>
                  </Link>
                </div>
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
          <Link to="/signup">
            <div className={styles.mobButton}>{t("navigation.menu")}</div>
          </Link>

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
            <li
              className={`standard ${styles.hover} ${styles.mobItem}`}
              style={{ height: openDrop ? 220 : 30 }}
            >
              <div
                className={styles.menu}
                onClick={() => setOpenDrop((prev) => !prev)}
              >
                {t("navigation.solutions")}{" "}
                <img
                  style={{
                    transform: openDrop ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  src={DropDown}
                  alt=""
                />
              </div>
              <div className={`${styles.mobDown}`}>
                <div className={`${styles.mobListContent}`}>
                  <Link
                    to="/payment"
                    className={styles.item}
                    onClick={() => setOpenMenu(false)}
                  >
                    <img src={Payment} alt="" />
                    <div>
                      <p className={styles.headline}>
                        {t("navigation.payment")} <img src={Arrow} alt="" />
                      </p>
                      <p className={styles.subheadline}>
                        {t("navigation.paymentDescription")}
                      </p>
                    </div>
                  </Link>
                  <Link
                    to="/payroll"
                    className={styles.item}
                    onClick={() => setOpenMenu(false)}
                  >
                    <img src={Cash} alt="" />
                    <div>
                      <p className={styles.headline}>
                        {t("navigation.payroll")} <img src={Arrow} alt="" />
                      </p>
                      <p className={styles.subheadline}>
                        {t("navigation.payrollDescription")}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
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
