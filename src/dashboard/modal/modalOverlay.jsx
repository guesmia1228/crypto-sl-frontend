import styles from "./modalOverlay.module.css";

const ModalOverlay = ({ children, style }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalBox} card`} style={style}>
        {children}
      </div>
    </div>
  );
};

export default ModalOverlay;
