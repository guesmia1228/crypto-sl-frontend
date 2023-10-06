import Input from "../input/input";
import styles from "./resetPassword.module.css";

import Logo from "../../assets/logo/logo.svg";
import Button from "../button/button";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import backend_API from "../../api/backendAPI";

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null);
  const backendAPI = new backend_API();
  const { t } = useTranslation();

  const schema = z
    .object({
      password: z
        .string()
        .min(1, { message: "Please enter your password" })
        .min(8, { message: "Password must be at least 8 characters" })
        .refine(
          (value) =>
            /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*\d){1,})(?=(.*[@#$%^&+=!_]){1,}).{8,}$/.test(
              value
            ),
          {
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
          }
        ),
      confirmPassword: z
        .string()
        .nonempty({ message: "Confirm your password" }),
    })
    .refine(
      (schemaData) => schemaData.password === schemaData.confirmPassword,
      {
        message: "Passwords must match",
        path: ["confirmPassword"],
      }
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), mode: "onSubmit" });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("token")) {
      const paramValue = urlParams.get("token");
      setToken(paramValue);
    } else {
    }
  }, []);

  async function resetPassword(data) {
    try {
      const response = await backendAPI.resetPassword(data.password, token);
      if (response == null) {
        setErrorMessage("Invalid Token!");
        return;
      }
      setMessage("Password reset successfull!");
    } catch (error) {
      setErrorMessage("There was an error updating the password!");
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <div className={styles.top}>
          <img src={Logo} alt="nefentus logo" />

          <h3>{t("reset-password.title")}</h3>
          <div>
            {(errorMessage ||
              errors.password?.message ||
              errors.confirmPassword?.message) && (
              <div className={styles.errormessagecontainer}>
                <p style={{ color: "red" }}>
                  {errorMessage ||
                    errors.password?.message ||
                    errors.confirmPassword?.message}
                </p>
              </div>
            )}
            {message && (
              <div className={styles.messagecontainer}>
                <p style={{ color: "green" }}>{message}</p>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(resetPassword)}>
          <Input
            register={register}
            name="password"
            label={t("signUp.passwordLabel")}
            placeholder={t("signUp.passwordPlaceholder")}
            secure
          />
          <Input
            register={register}
            name="confirmPassword"
            label={t("reset-password.button-label-confirm")}
            placeholder={t("signUp.passwordPlaceholder")}
            secure
          />
          <Button link={null} type="submit">
            {t("reset-password.button")}
          </Button>
          <div className={styles.info}>
            <p>{t("reset-password.info")}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
