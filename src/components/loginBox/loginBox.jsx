import Input from "../input/input";
import styles from "./loginBox.module.css";

import Logo from "../../assets/logo/logo.svg";
import Button from "./../button/button";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { dashboardLink } from "../../utils";

import backend_API from "../../api/backendAPI";

import CheckBox from "../../assets/icon/whiteCheckmark.svg";
import Cookies from "js-cookie";

const LoginBox = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const backendAPI = new backend_API();
  const { t } = useTranslation();
  const [checkBox, setCheckBox] = useState(false);

  function navigateDashboard() {
	const link = dashboardLink(localStorage);
	navigate(link);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("token")) {
      const paramValue = urlParams.get("token");
      activateUser(paramValue);
    } else {
    }

    async function checkJwtAndNavigate() {
      const jwtIsValid = await backendAPI.checkJwt();
      if (jwtIsValid) {
		navigateDashboard();
      }
    }

    checkJwtAndNavigate();
  }, []);

  async function loginUser(username1, password1, checkbox) {
    if (Cookies.get("acceptCookie") !== true) {
      checkbox = false;
    }
    try {
      const response = await backendAPI.login(username1, password1, checkbox);
      if (response == null) {
        setErrorMessage("Invalid login data");
        return;
      }
      navigateDashboard();
    } catch (error) {
      setErrorMessage("There was an error logging in");
    }
  }

  const activateUser = async (token) => {
    try {
      const response = await backendAPI.activateAccount(token);
      if (response == null) {
        setErrorMessage("Error on activating account: ");
        return;
      }
      setMessage("Account successfully activated");
    } catch (error) {
      setErrorMessage("Error on activating account: ");
    }
  };

  function handleClick(e) {
	e.preventDefault();
    loginUser(Username, Password, checkBox);
  }

  return (
    <div className={styles.login}>
      <div className={styles.card}>
		<div className={styles.top}>
			<img src={Logo} alt="" />

			<h3>{t("login.title")}</h3>
			<div>
				{errorMessage && (
				<div className={styles.errormessagecontainer}>
					<p style={{ color: "red" }}> {errorMessage}</p>
				</div>
				)}
				{message && (
				<div className={styles.messagecontainer}>
					<p style={{ color: "green" }}>{message}</p>
				</div>
				)}
			</div>
		</div>

		<form onSubmit={handleClick}>
			<Input
			value={Username}
			setState={setUsername}
			label={t("signUp.emailLabel")}
			placeholder={t("signUp.emailPlaceholder")}
			/>
			<Input
			value={Password}
			setState={setPassword}
			label={t("signUp.passwordLabel")}
			placeholder={t("signUp.passwordPlaceholder")}
			secure
			/>

			<div className={styles.remeberInfo}>
			<div onClick={() => setCheckBox((prev) => !prev)}>
				<div className={styles.checkBox}>
				{checkBox && <img src={CheckBox} alt="" />}
				</div>
				<p>Remember me</p>
			</div>

			<Link to="/forgot-password">  <p>{t("login.forgot")}</p></Link>
			</div>

			<Button link={null} onClick={handleClick} style={{width: "100%"}}>
				{t("login.button")}
			</Button>
			<div className={styles.info}>
			<p>
				{t("login.info")}
				<u>
				<Link to="/signUp">{t("login.infoButton")}</Link>
				</u>
			</p>
			</div>

			<button type="submit" hidden />
		</form>
      </div>
    </div>
  );
};

export default LoginBox;
