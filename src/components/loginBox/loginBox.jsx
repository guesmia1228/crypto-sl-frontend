import Input from "../input/input";
import styles from "./loginBox.module.css";

import Logo from "../../assets/logo/logo2.svg";
import Button from "./../button/button";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
        const roles = localStorage.getItem("roles");
        const roleArray = roles.split(","); // Konvertiert den String in ein Array von Strings
        const isAdmin = roleArray.includes("ROLE_ADMIN"); // Überprüft, ob "ROLE_ADMIN" im Array enthalten ist
        const isVendor = roleArray.includes("ROLE_VENDOR"); // Überprüft, ob "ROLE_VENDOR" im Array enthalten ist
        const isAffiliate = roleArray.includes("ROLE_AFFILIATE"); // Überprüft, ob "ROLE_VENDOR" im Array enthalten ist
        const isDiamond = roleArray.includes("ROLE_DIAMOND_PARTNER"); // Überprüft, ob "ROLE_VENDOR" im Array enthalten ist
        const isGold = roleArray.includes("ROLE_GOLD_PARTNER"); // Überprüft, ob "ROLE_VENDOR" im Array enthalten ist
        const isIbLeader = roleArray.includes("ROLE_IB_LEADER"); // Überprüft, ob "ROLE_VENDOR" im Array enthalten ist

        if (isAdmin) {
          navigate("/dashboard/admin");
        } else if (isAffiliate) {
          navigate("/dashboard/affiliate");
        } else if (isVendor) {
          navigate("/dashboard/vendor");
        } else if (isGold) {
          navigate("/dashboard/gold");
        } else if (isIbLeader) {
          navigate("/dashboard/ib-leader");
        } else if (isDiamond) {
          navigate("/dashboard/diamond");
        }
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
        setErrorMessage("Invalid Login data");
        return;
      }
      const roles = localStorage.getItem("roles");
      const roleArray = roles.split(","); // Konvertiert den String in ein Array von Strings
      const isAdmin = roleArray.includes("ROLE_ADMIN"); // Überprüft, ob "ROLE_ADMIN" im Array enthalten ist
      const isVendor = roleArray.includes("ROLE_VENDOR"); // Überprüft, ob "ROLE_VENDOR" im Array enthalten ist
      const isAffiliate = roleArray.includes("ROLE_AFFILIATE"); // Überprüft, ob "ROLE_VENDOR" im Array enthalten ist
      const isDiamond = roleArray.includes("ROLE_DIAMOND_PARTNER"); // Überprüft, ob "ROLE_VENDOR" im Array enthalten ist
      const isGold = roleArray.includes("ROLE_GOLD_PARTNER"); // Überprüft, ob "ROLE_VENDOR" im Array enthalten ist
      const isIbLeader = roleArray.includes("ROLE_IB_LEADER");
      if (isAdmin) {
        navigate("/dashboard/admin");
      } else if (isAffiliate) {
        navigate("/dashboard/affiliate");
      } else if (isVendor) {
        navigate("/dashboard/vendor");
      } else if (isGold) {
        navigate("/dashboard/gold");
      } else if (isDiamond) {
        navigate("/dashboard/diamond");
      } else if (isIbLeader) {
        navigate("/dashboard/ib-leader");
      }
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

  function handleClick() {
    loginUser(Username, Password, checkBox);
  }

  return (
    <div className={`${styles.login}`}>
      <div className={styles.closeWrapper}>
        <Button link={"/"} color={"white"}>
          Close
        </Button>
      </div>
      <div className={styles.left}>
        <img src={Logo} alt="" />

        <div>
          <h2>
            {t("login.titleP1")}
            <br />
            <span className="gradient">{t("login.titleP2")}</span>
          </h2>
          <p>{t("login.description")}</p>

          <p>
            {t("login.info")}
            <u>
              <Link to="/signUp">{t("login.infoButton")}</Link>
            </u>
          </p>
        </div>
      </div>

      <div className={styles.right}>
        {errorMessage && (
          <div className={styles.errormessagecontainer}>
            <p>{errorMessage}</p>
          </div>
        )}
        {message && (
          <div className={styles.messagecontainer}>
            <p>{message}</p>
          </div>
        )}

        <div className={styles.inputWrapper}>
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
              <p>Remeber me</p>
            </div>

            <Link to="/forgot-password">
              <p>{t("login.forgot")}</p>
            </Link>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button className={styles.button} onClick={handleClick}>
            {t("login.button")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
