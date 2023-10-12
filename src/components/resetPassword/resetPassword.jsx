import Input from "../input/input";
import styles from "./resetPassword.module.css";

import Logo from "../../assets/logo/logo.svg";
import Button from "../button/button";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import backend_API from "../../api/backendAPI";

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [Password, setPassword] = useState("");
  const [CPassword, setCPassword] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const backendAPI = new backend_API();
  const { t } = useTranslation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("token")) {
      const paramValue = urlParams.get("token");
      setToken(paramValue);
    } else {
    }
  }, []);

  async function resetPassword(token, confirmPass, pass) {
    if (confirmPass !== pass) {
      setErrorMessage("Passwords are not equal!");
      return;
    }

    try {
      const response = await backendAPI.resetPassword(pass, token);
      if (response == null) {
        setErrorMessage("Invalid Token!");
        return;
      }
      setMessage("Password reset successfull!");
    } catch (error) {
      setErrorMessage("There was an error updating the password!");
    }
  }

  function handleClick(e) {
    e.preventDefault();
    resetPassword(token, CPassword, Password);
  }

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <div className={styles.top}>
          <img src={Logo} alt="nefentus logo" />

          <h3>{t("reset-password.title")}</h3>
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
            value={Password}
            setState={setPassword}
            label={t("signUp.passwordLabel")}
            placeholder={t("signUp.passwordPlaceholder")}
            secure
          />
          <Input
            value={CPassword}
            setState={setCPassword}
            label={t("reset-password.button-label-confirm")}
            placeholder={t("signUp.passwordPlaceholder")}
            secure
          />
          <Button link={null} onClick={handleClick}>
            {t("reset-password.button")}
          </Button>
          <div className={styles.info}>
            <p>{t("reset-password.info")}</p>
          </div>
          <button type="submit" hidden />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
