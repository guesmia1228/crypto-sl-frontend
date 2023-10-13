import styles from "./error.module.css";

const Error = ({ error, className }) => {
  return (
    error && (
      <div className={`${styles.error} ${className}`}>
        <p>{error}</p>
      </div>
    )
  );
};

export default Error;
