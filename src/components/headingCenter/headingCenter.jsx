import styles from "./headingCenter.module.css";

const HeadingCenter = ({ subtitle, title, noScroll }) => {
  return (
    <div className={`${noScroll ? "" : "scroll"} ${styles.heading}`}>
      <div className={styles.subtitle}>{subtitle}</div>
      <h2>{title}</h2>
    </div>
  );
};

export default HeadingCenter;
