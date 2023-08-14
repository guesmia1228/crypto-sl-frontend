import styles from "./input.module.css";

import dropDown from "../../assets/icon/dropdown.svg";
import AttachmentImage from "../../assets/icon/attachment.svg";
import Delete from "../../assets/icon/delete.svg";
import { useState, useRef } from "react";
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

 export const Attachment = ({ label, onUpload, onDelete, value, dashboard }) => {
	const inputRef = useRef(null);
  
	const [text, setText] = useState(value ? value : false);
  
	const handleClick = () => {
		inputRef.current.click();
	};
  
	const allowedExtensions = ["jpg", "jpeg", "png", "JPG", "PNG", "JPEG"];
  
	function checkFileExtension(extension) {
		return allowedExtensions.includes(extension);
	}
  
	const handleChange = () => {
		const file = inputRef.current.files[0];
		const fileName = inputRef.current.value.split("\\").pop();
		var extension = fileName.split(".").pop();
		console.log(extension);
		if(checkFileExtension(extension)){
			setText(fileName);
			onUpload(file);
		} else{
			//todo throw new Error maybe with toast!
		}
	};
  
	return (
		<div className={styles.attachmentWrapper}>
			{label && (
				<p
					className={`${styles.label} ${
					dashboard ? styles.dashboardLabel : ""
					}`}
				>
					{label}
				</p>
				)}
			<div className={styles.attachment}>
				<img src={AttachmentImage} alt="Attachment" onClick={handleClick} />
				<p style={{ color: text ? "#fff" : "#c4c4c4" }} onClick={handleClick} >
					{text ? text : "Add attachment"}
				</p>
				<img src={Delete} alt="Delete attachment" onClick={() => { onDelete(); setText(null)} } className={styles.deleteLogo} />
			</div>
			<input
				ref={inputRef}
				className={styles.hideInput}
				type="file"
				onChange={handleChange}
			/>
		</div>
	);
  };