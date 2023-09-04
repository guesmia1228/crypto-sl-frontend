import styles from "./navigation.module.css";

import Logo from "../../assets/logo/logo.svg";

import Hamburger from "../../assets/icon/hamburger.svg";
import Button from "../button/button";
import Languages from "./languages.jsx/languages";
import { useState, useEffect } from "react";
import QR from "../../assets/icon/qrcode.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import backend_API from "../../api/backendAPI";
import { dashboardLink } from "../../utils";

const Navigation = () => {
	const { t } = useTranslation();
  	const [openMenu, setOpenMenu] = useState(false);
  	const [profile, setProfile] = useState({});

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
		  {loginAndSignupWeb()}

          <Languages />
        </div>

        <div className={styles.mobMenu}>
			<span className={styles.midWidth}>
				{loginAndSignupTopButtons()}
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
		{loginAndSignupMobile()}
      </div>
    </nav>
  );
};

export default Navigation;
