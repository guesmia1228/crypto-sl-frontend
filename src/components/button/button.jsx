import { Link } from "react-router-dom";
import styles from "./button.module.css";

const Button = ({ children, className, color, link, onClick }) => {
  return (
    <div
      className={`${styles.button} ${className}`}
      onClick={onClick}
      style={{
        border:
          color === "white"
            ? "1px solid rgba(255, 255, 255, 0.09)"
            : "1px solid #0784B5",
      }}
    >
      <div
        className={styles.background}
        style={{
          background:
            color === "white" ? "rgba(255, 255, 255, 0.09)" : "#0784B5",
        }}
      ></div>
      {link ? (
        <Link to={link}>
          <div style={{ color: "#fff" }}>{children}</div>
        </Link>
      ) : (
        <div style={{ color: "#fff" }}>{children}</div>
      )}
    </div>
  );
};

export default Button;
