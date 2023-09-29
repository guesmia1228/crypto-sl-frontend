import styles from "./navigation.module.css";

import Logo from "../../assets/logo/logo.svg";

import Hamburger from "../../assets/icon/hamburger.svg";
import Button from "../button/button";
import Languages from "./languages.jsx/languages";
import { useEffect, useState } from "react";

import QR from "../../assets/icon/qrcode.svg";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import backend_API from "../../api/backendAPI";
import { dashboardLink } from "../../utils";

const Navigation = () => {
	const { t, i18n } = useTranslation();
  	const [openMenu, setOpenMenu] = useState(false);
  	const [profile, setProfile] = useState({});
  	const [height, setHeight] = useState("");

	const backendAPI = new backend_API();

	async function getProfile() {
		const jwtIsValid = await backendAPI.checkJwt();
		if (jwtIsValid) {
			const link = dashboardLink(localStorage);
			console.log(link);

			const newProfile = {
				email: localStorage.getItem("email"),
				firstName: localStorage.getItem("firstName"),
				lastName: localStorage.getItem("lastName"),
				dashboardLink: link
			}
			setProfile(newProfile);
		}
	}

	useEffect(() => {
		getProfile();
	}, []);

	function dashboardString(profile) {
		if (profile.firstName || profile.lastName)
			return `Dashboard: ${profile.firstName} ${profile.lastName}`;
		else
			return "Dashboard";
	}

	function loginAndSignupWeb() {
		if (profile.email) {
			return (
				<>
					<div className={`${styles.button} ${styles.dashboardButton}`}>
						<Link to={profile.dashboardLink}>{dashboardString(profile)}</Link>
					</div>
				</>
			);
		} else {
			return (
				<>
					<p className="">
						<Link to="/login">{t("navigation.login")}</Link>
					</p>
					<div className={styles.button}>
						<Link to="/signup">{t("navigation.signUp")}</Link>
					</div>
					<img className={styles.qrcode} src={QR} alt="" />
				</>
			);
		}
	}

	function loginAndSignupTopButtons() {
		if (profile.email) {
			return (
				<Link to={profile.dashboardLink}>
					<div className={styles.mobButton}>{dashboardString(profile)}</div>
				</Link>
			);
		} else {
			return (
				<>
					<Link to="/login">
						<div className={styles.mobButton}>{t("navigation.login")}</div>
					</Link>
					<Link to="/signup">
						<div className={styles.mobButton}>{t("navigation.signUp")}</div>
					</Link>
				</>
			);
		}
	}

	function loginAndSignupMobile() {
		if (profile.email) {
			return (
				<div>
					<Button link={profile.dashboardLink} onClick={() => setOpenMenu(false)}>
						{dashboardString(profile)}
					</Button>
				</div>
			);
		} else {
			return (
				<div>
					<Button link="/login" onClick={() => setOpenMenu(false)}>
						{t("navigation.login")}
					</Button>
					<Button color="white" onClick={() => setOpenMenu(false)}>
						{t("navigation.signUp")}
					</Button>
				</div>
			);
		}
	}

  useEffect(() => {
    if (window.innerHeight >= 900) return;

    const changeHeight = () => {
      setHeight(window.innerHeight);
    };

    changeHeight();

    window.addEventListener("resize", changeHeight);

    return () => window.removeEventListener("resize", changeHeight);
  });

  return (
    <nav className={`${styles.navigation} load`} style={{ height }}>
      <div className={` ${styles.contentWrapper}`}>
        <div className={`container ${styles.content}`}>
          <div className={styles.left}>
            <Link className={styles.logoWrapper} to="/">
              <img className={styles.logo} src={Logo} alt="nefentus logo" />
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
            <div className={styles.rightWrapper}>
              <img src={QR} alt="qr" />
              <div
                className={`${styles.lang} ${
                  openMenu ? styles.showLanguage : ""
                }`}
              >
                <Languages />
              </div>
            </div>

            <p className={styles.login}>
              <Link to="/login">
                <p>{t("navigation.login")}</p>
                <p className={styles.fake}>{t("navigation.login")}</p>
              </Link>
            </p>
            <div className={styles.button}>
              <Link to="/signup">{t("navigation.signUp")}</Link>
            </div>

            <div className={styles.mobileButtonWrapper}>
              <Button link="/signUp " color="white">
                Sign Up
              </Button>
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
      </div>

      <div
        className={styles.mobileMenu}
        style={{
          transform: openMenu ? "translateY(0%)" : "translateY(-120%)",
        }}
      >
        <div>
          <ul>
            <Link to="/" onClick={() => setOpenMenu(false)}>
              <li className="standard">{t("navigation.home")}</li>
            </Link>
            <Link to="/payment" onClick={() => setOpenMenu(false)}>
              <li className="standard">{t("navigation.solutions")}</li>
            </Link>

            <Link to="/affiliate" onClick={() => setOpenMenu(false)}>
              <li className="standard">{t("navigation.affiliate")}</li>
            </Link>
            <Link to="/support" onClick={() => setOpenMenu(false)}>
              <li className="standard">{t("navigation.resources")}</li>
            </Link>
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
