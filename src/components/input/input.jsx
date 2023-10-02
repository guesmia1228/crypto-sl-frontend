import styles from "./input.module.css";

import dropDown from "../../assets/icon/dropdown.svg";
import {useState} from "react";
import {useTranslation} from "react-i18next";

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

    const {t} = useTranslation();

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
                {value} <img src={dropDown} alt="dropdown"/>
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

export const SearchOptions = (
    {
        value,
        options = [],
        setValue,
        label = "",
        dashboard,
        placeholder = "",
    }) => {
    const [open, setOpen] = useState(false);
    const {t} = useTranslation();

    const filteredOptions = options.filter((item) => item.toLowerCase().includes(value.toLowerCase()));

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
                />  <img src={dropDown} alt=""/>
                {open && (
                    <div className={`card ${styles.body}`}>
                        {
                            filteredOptions.map((item) => (
                                <p onClick={() => setValue(item)} key={item}>
                                    {item}
                                </p>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
};
