import { Link } from "react-router-dom";
import styles from "./button.module.css";

const Button = ({ children, className, color, link, onClick, style }) => {
	let backgroundColor = "linear-gradient(94.15deg, #0784B5 -27.47%, #66BFDE 118.26%)";
	if (color === "white") {
		backgroundColor = "#fff";
	} else if (color === "black") {
		backgroundColor = "#101010";
	}

	let fontColor = "#fff";
	if (color === "white") {
		fontColor = "#000";
	} else if (color === "black") {
		fontColor = "#fff";
	}

	let border = "0px solid transparent";
	if (color === "black") {
		border = "1px solid var(--white-color)";
	}

  return (
    <div
      className={`${styles.button} ${className}`}
      onClick={onClick}
      style={{
		...style,
        background: backgroundColor,
		border: border,
      }}
    >
      {link ? (
        <Link to={link}>
          <div style={{...style, color: fontColor}} className="unselectable">
            {children}
          </div>
        </Link>
      ) : (
        <div style={{...style, color: fontColor }} className="unselectable">
          {children}
        </div>
      )}
    </div>
  );
};

export default Button;
