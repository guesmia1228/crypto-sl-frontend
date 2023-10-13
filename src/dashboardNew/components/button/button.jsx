import styles from "./button.module.css";

const Button = ({ children, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={styles.button}
      style={{
        border:
          color === "white"
            ? "1px solid rgba(255,255,255,1)"
            : "1px solid rgba(255,255,255,0.2)",
        width: color === "gray" ? "10rem" : "",
      }}
    >
      <div
        className={styles.background}
        style={{
          backgroundColor:
            color === "white"
              ? "white"
              : color === "gray"
              ? "rgba(255,255,255,0.08)"
              : "",
        }}
      ></div>
      <div
        style={{
          color: color === "white" ? "black" : "",
        }}
        className={styles.text}
      >
        {children}
      </div>
    </div>
  );
};

export default Button;
