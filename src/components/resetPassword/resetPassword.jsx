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
import Error from "../error/error";

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
        .min(1, { message: t("messages.validation.password") })
        .min(8, { message: t("messages.validation.validPassword") })
        .refine(
          (value) =>
            /^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[.\$\/@!%&*_,#*-+;`])|(?=.*[a-z])(?=.*\d)(?=.*[.\$\/@!%&*_,#*-+;`])|(?=.*[A-Z])(?=.*\d)(?=.*[.\$\/@!%&*_,#*-+;`])|(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.\$\/@!%&*_,#*-+;`])).*$/.test(
              value,
            ),
          {
            message: t("messages.validation.securityPassword"),
          },
        ),
      confirmPassword: z
        .string()
        .nonempty({ message: t("messages.validation.confirmPassword") }),
    })
    .refine(
      (schemaData) => schemaData.password === schemaData.confirmPassword,
      {
        message: t("messages.validation.matchPassword"),
        path: ["confirmPassword"],
      },
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
        setErrorMessage(t("messages.error.token"));
        return;
      }
      setMessage(t("messages.success.passwordReset"));
    } catch (error) {
      setErrorMessage(t("messages.error.updatePassword"));
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <div className={styles.top}>
          <img src={Logo} alt="nefentus logo" />

          <h3>{t("reset-password.title")}</h3>
          <div>
            <Error
              error={
                errorMessage ||
                errors.password?.message ||
                errors.confirmPassword?.message
              }
            />
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
