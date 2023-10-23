import Logo from "../../assets/logo/logo2.svg";
import Button from "../button/button";
import Input, { SearchOptions } from "../input/input";
import styles from "./signup.module.css";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import backendAPI from "../../api/backendAPI";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import isMobilePhone from "../../func/isMobilePhone";
import Error from "../error/error";

const Signup = () => {
  const { t } = useTranslation();

  // let country_list = [
  //   "Afghanistan",
  //   "Albania",
  //   "Algeria",
  //   "Andorra",
  //   "Angola",
  //   "Anguilla",
  //   "Antigua & Barbuda",
  //   "Argentina",
  //   "Armenia",
  //   "Aruba",
  //   "Australia",
  //   "Austria",
  //   "Azerbaijan",
  //   "Bahamas",
  //   "Bahrain",
  //   "Bangladesh",
  //   "Barbados",
  //   "Belarus",
  //   "Belgium",
  //   "Belize",
  //   "Benin",
  //   "Bermuda",
  //   "Bhutan",
  //   "Bolivia",
  //   "Bosnia & Herzegovina",
  //   "Botswana",
  //   "Brazil",
  //   "British Virgin Islands",
  //   "Brunei",
  //   "Bulgaria",
  //   "Burkina Faso",
  //   "Burundi",
  //   "Cambodia",
  //   "Cameroon",
  //   "Cape Verde",
  //   "Cayman Islands",
  //   "Chad",
  //   "Chile",
  //   "China",
  //   "Colombia",
  //   "Congo",
  //   "Cook Islands",
  //   "Costa Rica",
  //   "Cote D'Ivoire",
  //   "Croatia",
  //   "Cruise Ship",
  //   "Cuba",
  //   "Cyprus",
  //   "Czech Republic",
  //   "Denmark",
  //   "Djibouti",
  //   "Dominica",
  //   "Dominican Republic",
  //   "Ecuador",
  //   "Egypt",
  //   "El Salvador",
  //   "Equatorial Guinea",
  //   "Estonia",
  //   "Ethiopia",
  //   "Falkland Islands",
  //   "Faroe Islands",
  //   "Fiji",
  //   "Finland",
  //   "France",
  //   "French Polynesia",
  //   "French West Indies",
  //   "Gabon",
  //   "Gambia",
  //   "Georgia",
  //   "Germany",
  //   "Ghana",
  //   "Gibraltar",
  //   "Greece",
  //   "Greenland",
  //   "Grenada",
  //   "Guam",
  //   "Guatemala",
  //   "Guernsey",
  //   "Guinea",
  //   "Guinea Bissau",
  //   "Guyana",
  //   "Haiti",
  //   "Honduras",
  //   "Hong Kong",
  //   "Hungary",
  //   "Iceland",
  //   "India",
  //   "Indonesia",
  //   "Iran",
  //   "Iraq",
  //   "Ireland",
  //   "Isle of Man",
  //   "Israel",
  //   "Italy",
  //   "Jamaica",
  //   "Japan",
  //   "Jersey",
  //   "Jordan",
  //   "Kazakhstan",
  //   "Kenya",
  //   "Kuwait",
  //   "Kyrgyz Republic",
  //   "Laos",
  //   "Latvia",
  //   "Lebanon",
  //   "Lesotho",
  //   "Liberia",
  //   "Libya",
  //   "Liechtenstein",
  //   "Lithuania",
  //   "Luxembourg",
  //   "Macau",
  //   "Macedonia",
  //   "Madagascar",
  //   "Malawi",
  //   "Malaysia",
  //   "Maldives",
  //   "Mali",
  //   "Malta",
  //   "Mauritania",
  //   "Mauritius",
  //   "Mexico",
  //   "Moldova",
  //   "Monaco",
  //   "Mongolia",
  //   "Montenegro",
  //   "Montserrat",
  //   "Morocco",
  //   "Mozambique",
  //   "Namibia",
  //   "Nepal",
  //   "Netherlands",
  //   "Netherlands Antilles",
  //   "New Caledonia",
  //   "New Zealand",
  //   "Nicaragua",
  //   "Niger",
  //   "Nigeria",
  //   "Norway",
  //   "Oman",
  //   "Pakistan",
  //   "Palestine",
  //   "Panama",
  //   "Papua New Guinea",
  //   "Paraguay",
  //   "Peru",
  //   "Philippines",
  //   "Poland",
  //   "Portugal",
  //   "Puerto Rico",
  //   "Qatar",
  //   "Reunion",
  //   "Romania",
  //   "Russia",
  //   "Rwanda",
  //   "Saint Pierre & Miquelon",
  //   "Samoa",
  //   "San Marino",
  //   "Satellite",
  //   "Saudi Arabia",
  //   "Senegal",
  //   "Serbia",
  //   "Seychelles",
  //   "Sierra Leone",
  //   "Singapore",
  //   "Slovakia",
  //   "Slovenia",
  //   "South Africa",
  //   "South Korea",
  //   "Spain",
  //   "Sri Lanka",
  //   "St Kitts & Nevis",
  //   "St Lucia",
  //   "St Vincent",
  //   "St. Lucia",
  //   "Sudan",
  //   "Suriname",
  //   "Swaziland",
  //   "Sweden",
  //   "Switzerland",
  //   "Syria",
  //   "Taiwan",
  //   "Tajikistan",
  //   "Tanzania",
  //   "Thailand",
  //   "Timor L'Este",
  //   "Togo",
  //   "Tonga",
  //   "Trinidad &amp; Tobago",
  //   "Tunisia",
  //   "Turkey",
  //   "Turkmenistan",
  //   "Turks &amp; Caicos",
  //   "Uganda",
  //   "Ukraine",
  //   "United Arab Emirates",
  //   "United Kingdom",
  //   "Uruguay",
  //   "Uzbekistan",
  //   "Venezuela",
  //   "Vietnam",
  //   "Virgin Islands (US)",
  //   "Yemen",
  //   "Zambia",
  //   "Zimbabwe",
  // ];

  const country_list = [
    { value: "Afghanistan", display: t("countries.Afghanistan") },
    { value: "Albania", display: t("countries.Albania") },
    { value: "Algeria", display: t("countries.Algeria") },
    { value: "Andorra", display: t("countries.Andorra") },
    { value: "Angola", display: t("countries.Angola") },
    { value: "Anguilla", display: t("countries.Anguilla") },
    { value: "Antigua & Barbuda", display: t("countries.AntiguaBarbuda") },
    { value: "Argentina", display: t("countries.Argentina") },
    { value: "Armenia", display: t("countries.Armenia") },
    { value: "Aruba", display: t("countries.Aruba") },
    { value: "Australia", display: t("countries.Australia") },
    { value: "Austria", display: t("countries.Austria") },
    { value: "Azerbaijan", display: t("countries.Azerbaijan") },
    { value: "Bahamas", display: t("countries.Bahamas") },
    { value: "Bahrain", display: t("countries.Bahrain") },
    { value: "Bangladesh", display: t("countries.Bangladesh") },
    { value: "Barbados", display: t("countries.Barbados") },
    { value: "Belarus", display: t("countries.Belarus") },
    { value: "Belgium", display: t("countries.Belgium") },
    { value: "Belize", display: t("countries.Belize") },
    { value: "Benin", display: t("countries.Benin") },
    { value: "Bermuda", display: t("countries.Bermuda") },
    { value: "Bhutan", display: t("countries.Bhutan") },
    { value: "Bolivia", display: t("countries.Bolivia") },
    {
      value: "Bosnia & Herzegovina",
      display: t("countries.BosniaHerzegovina"),
    },
    { value: "Botswana", display: t("countries.Botswana") },
    { value: "Brazil", display: t("countries.Brazil") },
    {
      value: "British Virgin Islands",
      display: t("countries.BritishVirginIslands"),
    },
    { value: "Brunei", display: t("countries.Brunei") },
    { value: "Bulgaria", display: t("countries.Bulgaria") },
    { value: "Burkina Faso", display: t("countries.BurkinaFaso") },
    { value: "Burundi", display: t("countries.Burundi") },
    { value: "Cambodia", display: t("countries.Cambodia") },
    { value: "Cameroon", display: t("countries.Cameroon") },
    { value: "Cape Verde", display: t("countries.CapeVerde") },
    { value: "Cayman Islands", display: t("countries.CaymanIslands") },
    { value: "Chad", display: t("countries.Chad") },
    { value: "Chile", display: t("countries.Chile") },
    { value: "China", display: t("countries.China") },
    { value: "Colombia", display: t("countries.Colombia") },
    { value: "Congo", display: t("countries.Congo") },
    { value: "Cook Islands", display: t("countries.CookIslands") },
    { value: "Costa Rica", display: t("countries.CostaRica") },
    { value: "Cote D'Ivoire", display: t("countries.CoteDIvoire") },
    { value: "Croatia", display: t("countries.Croatia") },
    { value: "Cuba", display: t("countries.Cuba") },
    { value: "Cyprus", display: t("countries.Cyprus") },
    { value: "Czech Republic", display: t("countries.CzechRepublic") },
    { value: "Denmark", display: t("countries.Denmark") },
    { value: "Djibouti", display: t("countries.Djibouti") },
    { value: "Dominica", display: t("countries.Dominica") },
    { value: "Dominican Republic", display: t("countries.DominicanRepublic") },
    { value: "Ecuador", display: t("countries.Ecuador") },
    { value: "Egypt", display: t("countries.Egypt") },
    { value: "El Salvador", display: t("countries.ElSalvador") },
    { value: "Equatorial Guinea", display: t("countries.EquatorialGuinea") },
    { value: "Estonia", display: t("countries.Estonia") },
    { value: "Ethiopia", display: t("countries.Ethiopia") },
    { value: "Falkland Islands", display: t("countries.FalklandIslands") },
    { value: "Faroe Islands", display: t("countries.FaroeIslands") },
    { value: "Fiji", display: t("countries.Fiji") },
    { value: "Finland", display: t("countries.Finland") },
    { value: "France", display: t("countries.France") },
    { value: "French Polynesia", display: t("countries.FrenchPolynesia") },
    { value: "French West Indies", display: t("countries.FrenchWestIndies") },
    { value: "Gabon", display: t("countries.Gabon") },
    { value: "Gambia", display: t("countries.Gambia") },
    { value: "Georgia", display: t("countries.Georgia") },
    { value: "Germany", display: t("countries.Germany") },
    { value: "Ghana", display: t("countries.Ghana") },
    { value: "Gibraltar", display: t("countries.Gibraltar") },
    { value: "Greece", display: t("countries.Greece") },
    { value: "Greenland", display: t("countries.Greenland") },
    { value: "Grenada", display: t("countries.Grenada") },
    { value: "Guam", display: t("countries.Guam") },
    { value: "Guatemala", display: t("countries.Guatemala") },
    { value: "Guernsey", display: t("countries.Guernsey") },
    { value: "Guinea", display: t("countries.Guinea") },
    { value: "Guinea Bissau", display: t("countries.GuineaBissau") },
    { value: "Guyana", display: t("countries.Guyana") },
    { value: "Haiti", display: t("countries.Haiti") },
    { value: "Honduras", display: t("countries.Honduras") },
    { value: "Hong Kong", display: t("countries.HongKong") },
    { value: "Hungary", display: t("countries.Hungary") },
    { value: "Iceland", display: t("countries.Iceland") },
    { value: "India", display: t("countries.India") },
    { value: "Indonesia", display: t("countries.Indonesia") },
    { value: "Iran", display: t("countries.Iran") },
    { value: "Iraq", display: t("countries.Iraq") },
    { value: "Ireland", display: t("countries.Ireland") },
    { value: "Isle of Man", display: t("countries.IsleofMan") },
    { value: "Israel", display: t("countries.Israel") },
    { value: "Italy", display: t("countries.Italy") },
    { value: "Jamaica", display: t("countries.Jamaica") },
    { value: "Japan", display: t("countries.Japan") },
    { value: "Jersey", display: t("countries.Jersey") },
    { value: "Jordan", display: t("countries.Jordan") },
    { value: "Kazakhstan", display: t("countries.Kazakhstan") },
    { value: "Kenya", display: t("countries.Kenya") },
    { value: "Kuwait", display: t("countries.Kuwait") },
    { value: "Kyrgyz Republic", display: t("countries.KyrgyzRepublic") },
    { value: "Laos", display: t("countries.Laos") },
    { value: "Latvia", display: t("countries.Latvia") },
    { value: "Lebanon", display: t("countries.Lebanon") },
    { value: "Lesotho", display: t("countries.Lesotho") },
    { value: "Liberia", display: t("countries.Liberia") },
    { value: "Libya", display: t("countries.Libya") },
    { value: "Liechtenstein", display: t("countries.Liechtenstein") },
    { value: "Lithuania", display: t("countries.Lithuania") },
    { value: "Luxembourg", display: t("countries.Luxembourg") },
    { value: "Macau", display: t("countries.Macau") },
    { value: "Macedonia", display: t("countries.Macedonia") },
    { value: "Madagascar", display: t("countries.Madagascar") },
    { value: "Malawi", display: t("countries.Malawi") },
    { value: "Malaysia", display: t("countries.Malaysia") },
    { value: "Maldives", display: t("countries.Maldives") },
    { value: "Mali", display: t("countries.Mali") },
    { value: "Malta", display: t("countries.Malta") },
    { value: "Mauritania", display: t("countries.Mauritania") },
    { value: "Mauritius", display: t("countries.Mauritius") },
    { value: "Mexico", display: t("countries.Mexico") },
    { value: "Moldova", display: t("countries.Moldova") },
    { value: "Monaco", display: t("countries.Monaco") },
    { value: "Mongolia", display: t("countries.Mongolia") },
    { value: "Montenegro", display: t("countries.Montenegro") },
    { value: "Montserrat", display: t("countries.Montserrat") },
    { value: "Morocco", display: t("countries.Morocco") },
    { value: "Mozambique", display: t("countries.Mozambique") },
    { value: "Namibia", display: t("countries.Namibia") },
    { value: "Nepal", display: t("countries.Nepal") },
    { value: "Netherlands", display: t("countries.Netherlands") },
    {
      value: "Netherlands Antilles",
      display: t("countries.NetherlandsAntilles"),
    },
    { value: "New Caledonia", display: t("countries.NewCaledonia") },
    { value: "New Zealand", display: t("countries.NewZealand") },
    { value: "Nicaragua", display: t("countries.Nicaragua") },
    { value: "Niger", display: t("countries.Niger") },
    { value: "Nigeria", display: t("countries.Nigeria") },
    { value: "Norway", display: t("countries.Norway") },
    { value: "Oman", display: t("countries.Oman") },
    { value: "Pakistan", display: t("countries.Pakistan") },
    { value: "Palestine", display: t("countries.Palestine") },
    { value: "Panama", display: t("countries.Panama") },
    { value: "Papua New Guinea", display: t("countries.PapuaNewGuinea") },
    { value: "Paraguay", display: t("countries.Paraguay") },
    { value: "Peru", display: t("countries.Peru") },
    { value: "Philippines", display: t("countries.Philippines") },
    { value: "Poland", display: t("countries.Poland") },
    { value: "Portugal", display: t("countries.Portugal") },
    { value: "Puerto Rico", display: t("countries.PuertoRico") },
    { value: "Qatar", display: t("countries.Qatar") },
    { value: "Reunion", display: t("countries.Reunion") },
    { value: "Romania", display: t("countries.Romania") },
    { value: "Russia", display: t("countries.Russia") },
    { value: "Rwanda", display: t("countries.Rwanda") },
    {
      value: "Saint Pierre & Miquelon",
      display: t("countries.SaintPierreMiquelon"),
    },
    { value: "Samoa", display: t("countries.Samoa") },
    { value: "San Marino", display: t("countries.SanMarino") },
    { value: "Satellite", display: t("countries.Satellite") },
    { value: "Saudi Arabia", display: t("countries.SaudiArabia") },
    { value: "Senegal", display: t("countries.Senegal") },
    { value: "Serbia", display: t("countries.Serbia") },
    { value: "Seychelles", display: t("countries.Seychelles") },
    { value: "Sierra Leone", display: t("countries.SierraLeone") },
    { value: "Singapore", display: t("countries.Singapore") },
    { value: "Slovakia", display: t("countries.Slovakia") },
    { value: "Slovenia", display: t("countries.Slovenia") },
    { value: "South Africa", display: t("countries.SouthAfrica") },
    { value: "South Korea", display: t("countries.SouthKorea") },
    { value: "Spain", display: t("countries.Spain") },
    { value: "Sri Lanka", display: t("countries.SriLanka") },
    { value: "St Kitts & Nevis", display: t("countries.StKittsNevis") },
    { value: "St Lucia", display: t("countries.StLucia") },
    { value: "St Vincent", display: t("countries.StVincent") },
    { value: "St. Lucia", display: t("countries.StLucia") },
    { value: "Sudan", display: t("countries.Sudan") },
    { value: "Suriname", display: t("countries.Suriname") },
    { value: "Swaziland", display: t("countries.Swaziland") },
    { value: "Sweden", display: t("countries.Sweden") },
    { value: "Switzerland", display: t("countries.Switzerland") },
    { value: "Syria", display: t("countries.Syria") },
    { value: "Taiwan", display: t("countries.Taiwan") },
    { value: "Tajikistan", display: t("countries.Tajikistan") },
    { value: "Tanzania", display: t("countries.Tanzania") },
    { value: "Thailand", display: t("countries.Thailand") },
    { value: "Timor L'Este", display: t("countries.TimorLEste") },
    { value: "Togo", display: t("countries.Togo") },
    { value: "Tonga", display: t("countries.Tonga") },
    { value: "Trinidad & Tobago", display: t("countries.TrinidadTobago") },
    { value: "Tunisia", display: t("countries.Tunisia") },
    { value: "Turkey", display: t("countries.Turkey") },
    { value: "Turkmenistan", display: t("countries.Turkmenistan") },
    { value: "Turks & Caicos", display: t("countries.TurksCaicos") },
    { value: "Uganda", display: t("countries.Uganda") },
    { value: "Ukraine", display: t("countries.Ukraine") },
    {
      value: "United Arab Emirates",
      display: t("countries.UnitedArabEmirates"),
    },
    { value: "United Kingdom", display: t("countries.UnitedKingdom") },
    { value: "Uruguay", display: t("countries.Uruguay") },
    { value: "Uzbekistan", display: t("countries.Uzbekistan") },
    { value: "Venezuela", display: t("countries.Venezuela") },
    { value: "Vietnam", display: t("countries.Vietnam") },
    { value: "Virgin Islands (US)", display: t("countries.VirginIslandsUS") },
    { value: "Yemen", display: t("countries.Yemen") },
    { value: "Zambia", display: t("countries.Zambia") },
    { value: "Zimbabwe", display: t("countries.Zimbabwe") },
  ].sort((country1, country2) => {
    return country1.display.localeCompare(country2.display);
  });

  const recaptchaRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [CountryOption, setCountryOption] = useState("");
  const api = new backendAPI();

  const schema = z
    .object({
      firstName: z
        .string()
        .min(1, { message: t("messages.validation.firstName") }),
      lastName: z
        .string()
        .min(1, { message: t("messages.validation.lastName") }),
      telNr: z
        .string()
        .min(1, { message: t("messages.validation.phoneNumber") })
        .refine(isMobilePhone, {
          message: t("messages.validation.validPhoneNumber"),
        }),
      email: z
        .string()
        .min(1, { message: t("messages.validation.email") })
        .email({ message: t("messages.validation.validEmail") }),
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
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), mode: "onSubmit" });

  const resetForm = () => {
    reset();
    setCountryOption(t("signUp.option1Placeholder"));
  };

  async function submitForm(data) {
    if (CountryOption === t("signUp.option1Placeholder")) {
      setErrorMessage(t("messages.error.country"));
      return;
    }

    const captchaValue = recaptchaRef.current.getValue();

    if (!captchaValue) {
      setErrorMessage(t("messages.error.reCAPTCHA"));
    } else {
      const requestData = {
        ...data,
        roles: ["Affiliate"],
        country: CountryOption,
        affiliateLink: localStorage.getItem("affiliateJoined"),
      };

      const response = await api.register(requestData);
      if (response == null) {
        setErrorMessage(t("messages.error.register"));
      } else {
        setMessage(t("messages.error.confirmEmail"));
      }
      resetForm();
      setErrorMessage(null);
    }
  }

  return (
    <div className={`${styles.signup}`}>
      <div className={styles.closeWrapper}>
        <Button link={"/"} color={"white"}>
          {t("login.close")}
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
        <Error
          error={
            errorMessage ||
            errors.firstName?.message ||
            errors.lastName?.message ||
            errors.telNr?.message ||
            errors.email?.message ||
            errors.password?.message ||
            errors.confirmPassword?.message
          }
        />
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
          <SearchOptions
            label={t("signUp.option1Label") + "*"}
            value={CountryOption}
            setValue={setCountryOption}
            options={country_list}
            placeholder={t("signUp.option1Placeholder")}
          />
        </div>

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.VITE_REACT_APP_RECAPTCHA_SITE_KEY}
          theme="dark"
        />

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
