import styles from "./input.module.css";
import Delete from "../../assets/icon/delete.svg";

import AttachmentImage from "../../assets/icon/attachment.svg";
import React, { useRef, useState, useEffect } from "react";

const Input = ({
  label,
  placeholder,
  type = "text",
  setState,
  value,
  disabled,
  options,
}) => {
  const handleChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className={styles.input}>
      <p>{label}</p>

      {type === "radio" ? (
        <div className={styles["radio-group"]}>
          {options.map((option) => (
            <div key={option.value} className={styles["radio"]}>
              {console.log(
                "checked",
                value,
                option.value,
                value === option.value,
              )}
              <input
                type="radio"
                id={`${label} - ${option.name}`}
                name={label}
                value={option.value}
                onChange={handleChange}
                checked={value === option.value}
              />
              <label htmlFor={`${label} - ${option.name}`}>{option.name}</label>
              <br />
            </div>
          ))}
        </div>
      ) : (
        <input
          type={type}
          name=""
          id=""
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled === true}
        />
      )}
    </div>
  );
};

export default Input;

export const RawInput = ({
  placeholder,
  type = "text",
  setState,
  value,
  disabled,
}) => {
  const handleChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className={`${styles.input} ${styles.inputRaw}`}>
      <input
        type={type}
        name=""
        id=""
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled === true}
      />
    </div>
  );
};

export const Attachment = ({ label, onUpload, onDelete, value }) => {
  const inputRef = useRef(null);

  const [text, setText] = useState(false);

  useEffect(() => {
    if (value) setText(value);
  }, [value]);

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
    <>
      <div className={styles.input}>
        <p>{label}</p>
        <div className={styles.attachment}>
          <div className={styles.left} onClick={handleClick}>
            <img src={AttachmentImage} alt="" />
            <p style={{ color: text ? "#fff" : "#c4c4c4" }}>
              {text ? text : "Add attachment"}
            </p>
          </div>
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
      </div>
      <input
        ref={inputRef}
        className={styles.hideInput}
        type="file"
        onChange={handleChange}
      />
    </>
  );
};

export const Authentificator = ({ handleClick, placeholder, connected }) => {
  return (
    <div className={styles.input}>
      <p>Authentificator</p>

      <div
        className={styles.attachment}
        style={{ color: connected ? "#fff" : "#c4c4c4" }}
        onClick={handleClick}
      >
        {placeholder}

        <div className={styles.status}>
          {connected ? "Connected" : "Not connected"}
        </div>
      </div>
    </div>
  );
};
