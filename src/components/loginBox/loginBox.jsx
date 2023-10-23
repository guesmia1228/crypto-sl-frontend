import Input from "../input/input";
import styles from "./loginBox.module.css";

import Logo from "../../assets/logo/logo2.svg";
import Button from "./../button/button";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { dashboardLink, decryptData, encryptData } from "../../utils";

import backend_API from "../../api/backendAPI";

import CheckBox from "../../assets/icon/whiteCheckmark.svg";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Error from "../error/error";
import setCookie from "../setCookie/setCookie";
import ReCAPTCHA from "react-google-recaptcha";

const ConfirmMeEmail = ({ email, code, setCode, handleClick }) => {
  const { t } = useTranslation();

  return (
    <div className={styles["confirm-email"]}>
      <h3>{t("login.OTPTitle")}</h3>
      <p>
        {t("login.OTPSubtitleP1")}
        {email}
        {t("login.OTPSubtitleP2")}
      </p>
      <form onSubmit={handleClick}>
        <Input
          value={code}
          setState={setCode}
          style={{ backgroundColor: "#161616" }}
        />
        <div className={styles["button-group"]}>
          <div className={`${styles.buttonWrapper} ${styles.buttonWrapperOTP}`}>
            <Button className={styles.button} onClick={handleClick}>
              {t("login.confirm")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const LoginBox = () => {
  const recaptchaRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const backendAPI = new backend_API();
  const { t } = useTranslation();
  const [checkBox, setCheckBox] = useState(
    Cookies.get("nefentus-remember-me")
      ? JSON.parse(Cookies.get("nefentus-remember-me"))
      : false,
  );

  const schema = z.object({
    email: z.string().min(1, { message: t("messages.validation.email") }),
    password: z.string().min(1, { message: t("messages.validation.password") }),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: Cookies.get("nefentus-username")
        ? Cookies.get("nefentus-username")
        : "",
      password: Cookies.get("nefentus-password")
        ? decryptData(Cookies.get("nefentus-password"))
        : "",
    },
  });

  useEffect(() => {
    if (checkBox) {
      setCookie("nefentus-username", getValues("email"), 365);
      setCookie("nefentus-password", encryptData(getValues("password")), 365);
      setCookie("nefentus-remember-me", checkBox, 365);
    } else {
      setCookie("nefentus-username", "", 365);
      setCookie("nefentus-password", "", 365);
      setCookie("nefentus-remember-me", false, 365);
    }
  }, [checkBox, getValues]);
  const [showConfirmMeEmail, setShowConfirmMeEmail] = useState(false);
  const [email, setEmail] = useState(null);
  const [code, setCode] = useState("");

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

  async function loginUser(data, checkbox) {
    const captchaValue = recaptchaRef.current.getValue();

    if (!captchaValue) {
      setErrorMessage(t("messages.error.reCAPTCHA"));
    } else {
      if (Cookies.get("acceptCookie") !== true) {
        checkbox = false;
      }
      try {
        const response = await backendAPI.login(
          data.email,
          data.password,
          checkbox,
        );
        if (response == null) {
          setErrorMessage(t("messages.error.loginData"));
          return;
        } else if (response.requireOtp) {
          setShowConfirmMeEmail(true);
          setEmail(response.email);
        } else {
          navigateDashboard();
        }
      } catch (error) {
        setErrorMessage(t("messages.error.login"));
      }
    }
  }

  async function verifyOtpCode(email, code, checkbox) {
    if (Cookies.get("acceptCookie") !== true) {
      checkbox = false;
    }
    try {
      const response = await backendAPI.verifyOTP(email, code, checkbox);
      if (response == null) {
        setErrorMessage(t("messages.error.confirm"));
        return;
      }
      navigateDashboard();
    } catch (error) {
      setErrorMessage(t("messages.error.login"));
    }
  }

  const activateUser = async (token) => {
    try {
      const response = await backendAPI.activateAccount(token);
      if (response == null) {
        setErrorMessage(t("messages.error.activateAccount"));
        return;
      }
      setMessage(t("messages.success.activateAccount"));
    } catch (error) {
      setErrorMessage(t("messages.error.activateAccount"));
    }
  };

  const handleConfrimCode = (e) => {
    e.preventDefault();
    verifyOtpCode(email, code, checkBox);
  };

  return (
    <div className={`${styles.login}`}>
      <div className={styles.closeWrapper}>
        <Button link={"/"} color={"white"}>
          {t("login.close")}
        </Button>
      </div>
      <div className={styles.left}>
        <img src={Logo} alt="nefentus logo" />

        <div>
          <h2>
            <span className="gradient">{t("login.titleP1") + "*"}</span>
          </h2>
          <p>{t("login.description")}</p>

          <p>
            {t("login.info")}
            <u>
              <Link to="/signUp">{t("login.infoButton") + "*"}</Link>
            </u>
          </p>
        </div>
      </div>

      <div className={styles.right}>
        <Error
          error={
            errorMessage || errors.email?.message || errors.password?.message
          }
        />
        {message && (
          <div className={styles.messagecontainer}>
            <p>{message}</p>
          </div>
        )}

        {showConfirmMeEmail ? (
          <ConfirmMeEmail
            email={email}
            code={code}
            setCode={setCode}
            handleClick={handleConfrimCode}
          />
        ) : (
          <form onSubmit={handleSubmit(loginUser)}>
            <div className={styles.inputWrapper}>
              <Input
                register={register}
                name={"email"}
                label={t("signUp.emailLabel")}
                placeholder={t("signUp.emailPlaceholder")}
              />
              <Input
                register={register}
                name={"password"}
                label={t("signUp.passwordLabel")}
                placeholder={t("signUp.passwordPlaceholder")}
                secure
              />

              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.VITE_REACT_APP_RECAPTCHA_SITE_KEY}
                theme="dark"
              />

              <div className={styles.rememberInfo}>
                <div onClick={() => setCheckBox((prev) => !prev)}>
                  <div className={styles.checkBox}>
                    {checkBox && <img src={CheckBox} alt="checkbox" />}
                  </div>
                  <p>{t("login.remember")}</p>
                </div>

                <Link to="/forgot-password">
                  <p>{t("login.forgot")}</p>
                </Link>
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <Button className={styles.button} type="submit">
                {t("login.button")}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginBox;
