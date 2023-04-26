import styles from "./topInfo.module.css";
import Button from "./../../components/button/button";

const TopInfo = ({ title, description, children }) => {
  return (
    <div className={styles.top}>
      <div>
        <h4>{title}</h4>

        <p>{description}</p>
      </div>

      {children}
    </div>
  );
};

export default TopInfo;
