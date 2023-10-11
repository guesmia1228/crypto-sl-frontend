import styles from "./input.module.css";

import dropDown from "../../assets/icon/dropdown.svg";
import AttachmentImage from "../../assets/icon/attachment.svg";
import Delete from "../../assets/icon/delete.svg";
import { useRef, useState } from "react";
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
  date,
  style,
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
        style={style}
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
      {label && label.length > 0 && (
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
        {value} <img src={dropDown} alt="dropdown" />
        {open && (
          <div className={`card ${styles.body}`}>
            {options.length > 0 ? (
              options.map((item) => (
                <p key={item} onClick={() => setValue(item)}>
                  {item}
                </p>
              ))
            ) : (
              <>
                <p key={"vendor"} onClick={() => setValue("Vendor")}>
                  {t("signUp.option1")}
                </p>
                <p key={"affiliate"} onClick={() => setValue("Affiliate")}>
                  {t("signUp.option2")}
                </p>
                <p
                  key={"vendoraffiliate"}
                  onClick={() => setValue("Vendor / Affiliate")}
                >
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
        className={`${styles.textarea} ${
          dashboard ? styles.dashboardTextarea : ""
        }`}
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
    if (checkFileExtension(extension)) {
      setText(fileName);
      onUpload(file);
    } else {
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
        <p style={{ color: text ? "#fff" : "#c4c4c4" }} onClick={handleClick}>
          {text ? text : "Add attachment"}
        </p>
        <img
          src={Delete}
          alt="Delete attachment"
          onClick={() => {
            onDelete();
            setText(null);
          }}
          className={styles.deleteLogo}
        />
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

export const SearchOptions = ({
  value,
  options = [],
  setValue,
  label = "",
  dashboard,
  placeholder = "",
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const filteredOptions = options.filter((item) =>
    item.toLowerCase().includes(value.toLowerCase()),
  );

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
        <input
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onFocus={() => setOpen(true)}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={styles.searchInput}
        />{" "}
        <img src={dropDown} alt="" />
        {open && (
          <div className={`card ${styles.body}`}>
            {filteredOptions.map((item) => (
              <p onClick={() => setValue(item)} key={item}>
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
