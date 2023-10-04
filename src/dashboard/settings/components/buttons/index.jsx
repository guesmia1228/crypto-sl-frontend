import styles from "../../settings.module.css";

export const Buttons = ({ buttons, functions }) => {
  return (
    <div className={styles.buttons}>
      <div onClick={functions[0]} className={styles.button1}>
        {buttons[0]}
      </div>
      <div onClick={functions[1]} className={styles.button2}>
        {buttons[1]}
      </div>
    </div>
  );
};
