import Input from "../input/input";
import styles from "./passwordForgot.module.css";

import Logo from "../../assets/logo/logo.svg";
import Button from "../button/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import backend_API from "../../api/backendAPI";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Error from "../error/error";

const PasswordForgot = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const backendAPI = new backend_API();
  const { t } = useTranslation();

  const schema = z.object({
    email: z.string().min(1, { message: "Please enter your email" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), mode: "onSubmit" });

  async function sendResetMail(data) {
    try {
      const response = await backendAPI.forgotPassword(data.email);
      if (response == null) {
        setErrorMessage("Invalid email address!");
        return;
      }
      setMessage("Email sent to reset password!");
    } catch (error) {
      setErrorMessage("There was an error sending the email!");
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <div className={styles.left}>
          <img src={Logo} alt="nefentus logo" />

          <h3>{t("forgot-password.title")}</h3>
        </div>
        <div className={styles.top}>
          <div className={styles.message}>
            <Error error={errorMessage || errors.email?.message} />
            {message && (
              <div className={styles.messagecontainer}>
                <p>{message}</p>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(sendResetMail)}>
          <Input
            register={register}
            name="email"
            label={t("signUp.emailLabel")}
            placeholder={t("signUp.emailPlaceholder")}
          />
          <div className={styles.buttonWrapper}>
            <Button link={null} type="submit">
              {t("forgot-password.button")}
            </Button>
          </div>
          <div className={styles.info}>
            <p>{t("forgot-password.info")}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordForgot;
