import Logo from "../../assets/logo/logo2.svg";
import Button from "../button/button";
import Input, { Options } from "../input/input";
import styles from "./signup.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import backendAPI from "../../api/backendAPI";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import isMobilePhone from "../../func/isMobilePhone";

var country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua & Barbuda",
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
  "Bosnia & Herzegovina",
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
  "Cote D'Ivoire",
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
  "Saint Pierre & Miquelon",
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
  "St Kitts & Nevis",
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
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks & Caicos",
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
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [CountryOption, setCountryOption] = useState(
    t("signUp.option1Placeholder")
  );
  const api = new backendAPI();

  const schema = z
    .object({
      firstName: z.string().min(1, { message: "Please enter your first name" }),
      lastName: z.string().min(1, { message: "Please enter your last name" }),
      telNr: z
        .string()
        .min(1, { message: "Please enter your phone number" })
        .refine(isMobilePhone, {
          message: "Please enter a valid phone number",
        }),
      email: z
        .string()
        .min(1, { message: "Please enter your email" })
        .email({ message: "Please enter a valid email" }),
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
    getValues,
    setError,
    clearErrors,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema), mode: "onSubmit" });

  const resetForm = () => {
    reset();
    setCountryOption(t("signUp.option1Placeholder"));
  };

  async function submitForm(data) {
    if (CountryOption === t("signUp.option1Placeholder")) {
      setErrorMessage("Please choose a country");
      return;
    }

    const requestData = {
      ...data,
      roles: ["Affiliate"],
      country: CountryOption,
      affiliateLink: localStorage.getItem("affiliateJoined"),
    };
    resetForm();
    setErrorMessage(null);

    const response = await api.register(requestData);
    if (response == null) {
      setErrorMessage("Error when registering");
    } else {
      setMessage("Please confirm your email address to proceed.");
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

      <form onSubmit={handleSubmit(submitForm)} className={styles.right}>
        {(errorMessage ||
          errors.firstName?.message ||
          errors.lastName?.message ||
          errors.telNr?.message ||
          errors.email?.message ||
          errors.password?.message ||
          errors.confirmPassword?.message) && (
          <div className={styles.errormessagecontainer}>
            <p>
              {errorMessage ||
                errors.firstName?.message ||
                errors.lastName?.message ||
                errors.telNr?.message ||
                errors.email?.message ||
                errors.password?.message ||
                errors.confirmPassword?.message}
            </p>
          </div>
        )}
        {message && (
          <div className={styles.messagecontainer}>
            <p>{message}</p>
          </div>
        )}

        <div className={styles.row}>
          <Input
            label={t("signUp.firstNameLabel") + "*"}
            placeholder={t("signUp.firstNamePlaceholder")}
            register={register}
            name={"firstName"}
          />

          <Input
            label={t("signUp.lastNameLabel") + "*"}
            placeholder={t("signUp.lastNamePlaceholder")}
            register={register}
            name={"lastName"}
          />

          <Input
            label={t("signUp.telefonLabel")}
            placeholder="(979) 268-4143"
            register={register}
            name={"telNr"}
          />
          <Input
            label={t("signUp.emailLabel") + "*"}
            placeholder={t("signUp.emailPlaceholder")}
            register={register}
            name={"email"}
          />
          <Input
            label={t("signUp.passwordLabel") + "*"}
            placeholder={t("signUp.passwordPlaceholder")}
            register={register}
            name={"password"}
            secure
          />
          <Input
            label={t("signUp.confirmPasswordLabel") + "*"}
            placeholder={t("signUp.confirmPasswordPlaceholder")}
            register={register}
            name={"confirmPassword"}
            secure
          />
          <Options
            label={t("signUp.option1Label") + "*"}
            value={CountryOption}
            setValue={setCountryOption}
            options={country_list}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button className={styles.button} type="submit">
            {t("signUp.formButton")}
          </Button>
        </div>

        <p className={styles.formAgreement}>{t("signUp.formInfo")}</p>
      </form>
    </div>
  );
};

export default Signup;
