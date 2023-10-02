import Logo from "../../assets/logo/logo2.svg";
import Button from "../button/button";
import Input, { Options } from "../input/input";

import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import backendAPI from "../../api/backendAPI";

var country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const Signup = () => {
  const recaptchaRef = useRef();
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Telefon, setTelefon] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [UseOption, setUseOption] = useState("Choose Options");
  const [CountryOption, setCountryOption] = useState("Choose Options");
  const api = new backendAPI();

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setTelefon("");
    setEmail("");
    setPassword("");
    setUseOption("Choose Options");
    setCountryOption("Choose Options");
  };

  async function submitForm() {
    const requestData = {
      firstName: FirstName,
      lastName: LastName,
      telNr: Telefon,
      email: Email,
      password: Password,
      roles: [UseOption],
      country: CountryOption,
      affiliate: localStorage.getItem("affiliateJoined"),
    };
    resetForm();

    const response = await api.register(requestData);
    if (response == null) {
      setErrorMessage("Error when registering");
    } else {
      setMessage("Please confirm your email address to proceed.");
    }
  }

  function handleClick(event) {
    event.preventDefault();

    const captchaValue = recaptchaRef.current.getValue();

    if (!captchaValue) {
      setErrorMessage("Please verify the reCAPTCHA!");
    } else {
      submitForm();
    }
  }

  return (
    <div className={`${styles.signup}`}>
      <div className={styles.closeWrapper}>
        <Button link={"/"} color={"white"}>
          Close
        </Button>
      </div>
      <div className={styles.left}>
        <img src={Logo} alt="nefentus logo" />

        <div>
          <h2>
            {t("signUp.titleP1")}
            <br />
            <span className="gradient">{t("signUp.titleP2")}</span>
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
          <Options
            label={t("signUp.option1Label")}
            value={CountryOption}
            setValue={setCountryOption}
            options={country_list}
          />
        </div>

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.REACT_APP_SITE_KEY}
          theme="dark"
        />

        <div className={styles.buttonWrapper}>
          <Button className={styles.button} onClick={handleClick}>
            {t("signUp.formButton")}
          </Button>
        </div>

        <p className={styles.formAgreement}>{t("signUp.formInfo")}</p>
      </div>
    </div>
  );
};

export default Signup;
