import styles from "./input.module.css";

import AttachmentImage from "../../assets/icon/attachment.svg";
import { useRef, useState } from "react";

const Input = ({ label, placeholder, type = "text", setState, value, disabled }) => {
  const handleChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className={styles.input}>
      <p>{label}</p>

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

export default Input;

export const RawInput = ({ placeholder, type = "text", setState, value, disabled }) => {
	const handleChange = (e) => {
		setState(e.target.value);
	};
  
	return (
		<div className={`${styles.input} ${styles.inputRaw}`}>
			<input type={type} name="" id="" value={value} placeholder={placeholder} onChange={handleChange} disabled={disabled === true}/>
		</div>
	);
};

export const Attachment = ({ label, onUpload }) => {
  const inputRef = useRef(null);

  const [text, setText] = useState(false);

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

        <div className={styles.attachment} onClick={handleClick}>
          <img src={AttachmentImage} alt="" />
          <p style={{ color: text ? "#fff" : "#c4c4c4" }}>
            {text ? text : "Add attachment"}
          </p>
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
