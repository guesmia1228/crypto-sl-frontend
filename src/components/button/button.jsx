import { Link } from "react-router-dom";
import styles from "./button.module.css";

const Button = ({
  children,
  type = "button",
  className,
  color,
  link,
  onClick,
  style,
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      type={type}
      style={{
        border:
          color === "white" ? "1px solid rgb(38, 38, 38)" : "1px solid #0784B5",
      }}
    >
      <div
        className={styles.background}
        style={{
          background: color === "white" ? "rgb(38, 38, 38)" : "#0784B5",
        }}
      ></div>
      {link ? (
        <Link to={link}>
          <div
            className={`${styles.buttonText} unselectable`}
            style={{ color: "#fff" }}
          >
            {children}
          </div>
        </Link>
      ) : (
        <div
          className={`${styles.buttonText} unselectable`}
          style={{ color: "#fff" }}
        >
          {children}
        </div>
      )}
    </button>
  );
};

export default Button;
