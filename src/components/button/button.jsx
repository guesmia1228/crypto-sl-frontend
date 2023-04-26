import { Link } from "react-router-dom";
import styles from "./button.module.css";

const Button = ({ children, className, color, link, onClick }) => {
  return (
    <div
      className={`${styles.button} ${className}`}
      onClick={onClick}
      style={{
        background:
          color === "white"
            ? "#fff"
            : "linear-gradient(94.15deg, #0784B5 -27.47%, #66BFDE 118.26%)",
      }}
    >
      {link ? (
        <Link to={link}>
          <div style={{ color: color === "white" ? "#000" : "#fff" }}>
            {children}
          </div>
        </Link>
      ) : (
        <div style={{ color: color === "white" ? "#000" : "#fff" }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Button;
