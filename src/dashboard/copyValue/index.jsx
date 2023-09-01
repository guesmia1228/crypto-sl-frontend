import styles from "./copyValue.module.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import copyClipboard from "../../assets/icon/copyClipboard.svg";
import Button from "../../components/button/button";
import inputStyles from "../../components/input/input.module.css";

const CopyValue = ({ value, onCopy, inputStyle, buttonStyle }) => {
	return (
		<div className={styles.copyValueWrapper}>
			<input
				className={`${inputStyles.input} ${inputStyles.dashboardInput}`}
				type={"text"}
				value={value}
				disabled={true}
				style={inputStyle}
			/>
			<CopyToClipboard text={value} onCopy={onCopy}>
				<Button color="white" className={styles.clipboardButton} style={buttonStyle}>
					<img src={copyClipboard} className={styles.copyClipboard} alt="Copy to clipboard" />
				</Button>
			</CopyToClipboard>
		</div>
	)
}

export default CopyValue;