import styles from "./settingsTitle.module.css";

const SettingsTitle = ({ title, description }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default SettingsTitle;
