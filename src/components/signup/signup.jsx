import Logo from "../../assets/logo/logo.svg";
import Button from "../button/button";
import Input, { Options } from "../input/input";

import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import backendAPI from "../../api/backendAPI"

const Signup = () => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Telefon, setTelefon] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [UseOption, setUseOption] = useState("Choose Options");
  const api = new backendAPI();

    const resetForm = () => {
      setFirstName("");
      setLastName("");
      setTelefon("");
      setEmail("");
      setPassword("");
      setUseOption("Choose Options");
    }
    

  async function submitForm() {
    const requestData = {
      firstName: FirstName,
      lastName: LastName,
      telNr: Telefon,
      email: Email,
      password: Password,
      roles: [UseOption],
      affiliate: localStorage.getItem("affiliateJoined"),
    };
    resetForm();

    const response = await api.register(requestData);
    if (response == null) {
      setErrorMessage("Error when registering");
    }else{
      setMessage("Please confirm your email address to proceed.");  
    }
  
}

function handleClick() {
  submitForm();
}

return (
  <div className={styles.signup}>
    <div className={styles.left}>
      <img src={Logo} alt="" />

      <div>
        <h2>
          {t("signUp.titleP1")}
          <br />
          {t("signUp.titleP2")}
        </h2>
        <p>{t("signUp.description")}</p>

        <p>
          {t("signUp.info")}
          <u>
            <Link to="/login">{t("signUp.infoButton")}</Link>
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
      <div className={styles.row}>
        <Input
          label={t("signUp.firstNameLabel")}
          placeholder={t("signUp.firstNamePlaceholder")}
          value={FirstName}
          setState={setFirstName}
        />
        <Input
          label={t("signUp.lastNameLabel")}
          placeholder={t("signUp.lastNamePlaceholder")}
          value={LastName}
          setState={setLastName}
        />
      </div>
      <Input
        label={t("signUp.telefonLabel")}
        placeholder="(979) 268-4143"
        value={Telefon}
        setState={setTelefon}
      />
      <Input
        label={t("signUp.emailLabel")}
        placeholder={t("signUp.emailPlaceholder")}
        value={Email}
        setState={setEmail}
      />
      <Input
        label={t("signUp.passwordLabel")}
        placeholder={t("signUp.passwordPlaceholder")}
        value={Password}
        setState={setPassword}
        secure
      />
      <Options value={UseOption} setValue={setUseOption} />
      <Button className={styles.button} onClick={handleClick}>
        {t("signUp.formButton")}
      </Button>

      <p>{t("signUp.formInfo")}</p>
    </div>
  </div>
);
};

export default Signup;
