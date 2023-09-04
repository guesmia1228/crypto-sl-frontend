import { useContext } from "react";
import { MessageContext } from "../../context/message";
import styles from "./message.module.css";
import Icon from "../../assets/icon/close.svg";
import Button from "../button/button";
import classNames from "classnames";

const MessageComponent = ({hide}) => {
	const { infoMessage, errorMessage, setInfoMessage, setErrorMessage } = useContext(MessageContext);

	function closeInfo() {
		setInfoMessage(undefined);
	};

	function closeError() {
		setErrorMessage(undefined);
	};

	if (!hide)
		hide = false;

	return (
		<div className={classNames({[styles.messagewrapper]: true, [styles.hide]: hide})}>
			{errorMessage && (
			<div className={styles.errormessagecontainer}>
				<p>{errorMessage}</p>
				<Button className={styles.closeButton} onClick={closeError}>
					<img className={styles.icon} src={Icon} alt="" />
				</Button>
			</div>
			)}
			{infoMessage && (
			<div className={styles.messagecontainer}>
				<p>{infoMessage}</p>
				<Button className={styles.closeButton} onClick={closeInfo}>
					<img className={styles.icon} src={Icon} alt="" />
				</Button>
			</div>
			)}
		</div>
	);
}

export default MessageComponent;