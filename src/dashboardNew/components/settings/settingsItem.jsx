import ReactDOM from "react-dom";

import Button from "../button/button";
import styles from "./settingsTitle.module.css";

import Fail from "../../../assets/icon/fail.svg";
import Correct from "../../../assets/icon/correct.svg";

import { classNames } from "classnames";
import { useEffect, useState } from "react";
import Card from "../card/card";

const SettingsItem = ({ data }) => {
  const [value, setValue] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (value.length > 0) return;

    const valueList = [];

    for (let i = 0; i < data.list.length; i++) {
      valueList.push(data.list[i].value);
    }

    setValue([...valueList]);
  }, [value, data]);

  const handleEdit = () => {
    setShow(true);
  };

  const handleChangeImage = (index) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const imageURL = URL.createObjectURL(selectedFile);

        setValue((prev) => {
          prev[index] = imageURL;

          return [...prev];
        });
      }
    });
  };

  const handleEnable = (index) => {
    setValue((prev) => {
      prev[index] = !prev[index];

      return [...prev];
    });
  };

  const handleData = (data, index) => {
    setValue((prev) => {
      prev[index] = data;
      console.log(prev, index);
      return [...prev];
    });
  };

  return (
    <>
      <div className={styles.wrapper}>
        {data.list.map((item, index) => (
          <div className={styles.itemWrapper}>
            <div className={styles.left}>
              <div className={styles.label}>{item.label}</div>
              <div className={styles.description}>{item.description}</div>
            </div>
            <div className={styles.right}>
              {data.type === "edit" ? (
                <EditType value={value[index]} type={item.type} />
              ) : data.type === "image" ? (
                <ImageType value={value[index]} />
              ) : data.type === "enable" ? (
                <EnableType value={value[index]} />
              ) : (
                ""
              )}
              <Button
                color="gray"
                onClick={
                  data.type === "edit"
                    ? () => handleEdit(index)
                    : data.type === "image"
                    ? () => handleChangeImage(index)
                    : data.type === "enable"
                    ? () => handleEnable(index)
                    : ""
                }
              >
                {data.type === "edit"
                  ? "Edit"
                  : data.type === "image"
                  ? "Change"
                  : data.type === "enable"
                  ? "Enable"
                  : ""}
              </Button>
            </div>
            <EditPopup
              show={show}
              value={value[index]}
              setValue={(data) => handleData(data, index)}
              setShow={setShow}
              type={item.type}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SettingsItem;

const EditType = ({ value, type }) => {
  return <div className={styles.value}>{type === "password" ? "" : value}</div>;
};

const ImageType = ({ value }) => {
  return (
    <div className={styles.imageWrapper}>
      <img src={value} alt="" />
    </div>
  );
};

const EnableType = ({ value }) => {
  return (
    <div className={styles.enableWrapper}>
      <img className={styles.enableIcon} src={value ? Correct : Fail} alt="" />

      <div className={styles.text}>{value ? "On" : "Off"}</div>
    </div>
  );
};

const EditPopup = ({ show, setShow, value, setValue, type }) => {
  const [inputValue, setInputValue] = useState(value);
  const dashboardElement = document.getElementById("dashboard");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConfirmClick = () => {
    setValue(inputValue);
    setShow(false);
  };

  return ReactDOM.createPortal(
    <div
      className={styles.popup}
      style={{ display: show ? "initial" : "none" }}
    >
      <Card className={styles.popupBox}>
        <div className={styles.title}>Change Value</div>
        <input
          value={inputValue}
          type={type}
          className={styles.input}
          onChange={handleChange}
        />

        <div className={styles.buttons}>
          <Button onClick={() => setShow(false)}>Cancel</Button>
          <Button color="white" onClick={handleConfirmClick}>
            Confirm
          </Button>
        </div>
      </Card>
    </div>,
    dashboardElement,
  );
};
