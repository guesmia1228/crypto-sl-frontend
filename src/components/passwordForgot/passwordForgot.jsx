import Input from "../input/input";
import styles from "./passwordForgot.module.css";

import Logo from "../../assets/logo/logo.svg";
import Button from "../button/button";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import backend_API from "../../api/backendAPI";

const PasswordForgot = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [Username, setUsername] = useState("");
  const navigate = useNavigate();
  const backendAPI = new backend_API();
  const { t } = useTranslation();


  async function sendResetMail(username1) {
    try {
      const response = await backendAPI.forgotPassword(username1);
      if(response == null){
        setErrorMessage("Invalid Email!");
        return;
      }
        setMessage("Password reset sent!");
    } catch (error) {
      setErrorMessage("There was an error sending the email!");
    }
  }


  function handleClick() {
    sendResetMail(Username);
  }

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <div className={styles.top}>
          <img src={Logo} alt="" />

          <h3>{t("forgot-password.title")}</h3>
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

        <Input
          value={Username}
          setState={setUsername}
          label={t("signUp.emailLabel")}
          placeholder={t("signUp.emailPlaceholder")}
        />
		<div className={styles.buttonWrapper}>
        <Button link={null} onClick={handleClick}>{t("forgot-password.button")}</Button>
		</div>
        <div className={styles.info}>
          <p>
            {t("forgot-password.info")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordForgot;
