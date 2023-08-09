import styles from "./input.module.css";

import dropDown from "../../assets/icon/dropdown.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Input = ({
  label,
  placeholder,
  value,
  setState,
  secure,
  disabled,
  dashboard,
  number,
  date
}) => {
  const handleChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <p
          className={`${styles.label} ${
            dashboard ? styles.dashboardLabel : ""
          }`}
        >
          {label}
        </p>
      )}

	<input
		className={`${styles.input} ${dashboard ? styles.dashboardInput : ""}`}
		type={secure ? "password" : number ? "number" : date ? "date" : "text"}
		placeholder={placeholder}
		value={value}
		onChange={handleChange}
		disabled={disabled}
	/>
    </div>
  );
};

export default Input;

export const Options = ({
  value,
  options = [],
  setValue,
  label = "",
  dashboard,
}) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <div className={`${styles.inputWrapper} ${styles.option}`}>
      {label.length > 0 && (
        <p
          className={`${styles.label} ${
            dashboard ? styles.dashboardLabel : ""
          }`}
        >
          {label.length > 0 ? label : t("signUp.optionLabel")}
        </p>
      )}

      <div
        className={`option ${styles.input} ${
          dashboard ? styles.dashboardInput : ""
        }`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {value} <img src={dropDown} alt="" />
        {open && (
          <div className={`card ${styles.body}`}>
            {options.length > 0 ? (
              options.map((item) => (
                <p onClick={() => setValue(item)}>{item}</p>
              ))
            ) : (
              <>
                <p onClick={() => setValue("Vendor")}>{t("signUp.option1")}</p>
                <p onClick={() => setValue("Affiliate")}>
                  {t("signUp.option2")}
                </p>
                <p onClick={() => setValue("Vendor / Affiliate")}>
                  {t("signUp.option1")} / {t("signUp.option2")}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const Textarea = ({
	label,
	placeholder,
	value,
	setState,
	disabled,
	dashboard,
	rows = 5,
  }) => {
	const handleChange = (e) => {
	  setState(e.target.value);
	};
  
	return (
	  <div className={styles.textareaWrapper}>
		{label && (
		  <p
			className={`${styles.label} ${
			  dashboard ? styles.dashboardLabel : ""
			}`}
		  >
			{label}
		  </p>
		)}
  
		<textarea
		  className={`${styles.textarea} ${dashboard ? styles.dashboardTextarea : ""}`}
		  placeholder={placeholder}
		  value={value}
		  onChange={handleChange}
		  disabled={disabled}
		  rows={rows}
		/>
	  </div>
	);
 };