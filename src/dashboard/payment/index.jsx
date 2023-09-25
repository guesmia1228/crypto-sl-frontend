import { useState } from "react";
import { Options } from "../../components/input/input";
import Header from "../header/header";
import Input from "../../components/input/input";
import styles from "./payment.module.css";

import Checkmark from "../../assets/icon/checkmark.svg";

import QR from "../../assets/image/qr.svg";
import TopInfo from "../topInfo/topInfo";
import ModalOverlay from "../modal/modalOverlay";

const PaymentBody = () => {
  const [value, setValue] = useState("Choose one");

  const [successfulModal, setSuccessfulModal] = useState(false);

  const [qrModal, setQRModal] = useState(false);

  return (
    <>
      <div>
        <Header title={"Payment"} />

        <TopInfo
          title={"Make the payment"}
          description="To make a payment you need to choose payment options and enter valid email."
        />

        <div className={`card ${styles.card}`}>
          <div className={styles.title}>Payment details</div>

          <div className={styles.body}>
            <div className={styles.inputWrapper}>
              <Input dashboard label={"Email"} placeholder={"Enter email"} />
              <Options
                label="Currency options"
                value={value}
                options={[
                  "Bitcoin",
                  "Bitcoin",
                  "Bitcoin",
                  "Bitcoin",
                  "Bitcoin",
                ]}
                dashboard
                setValue={setValue}
              />
              <Input label={"Amout"} placeholder={"Enter amount"} dashboard />
            </div>

            <div className={styles.bill}>
              <div className={styles.label}>You’ve to pay</div>
              <div className={styles.price}>0.000035BTC</div>

              <div className={styles.item}>
                <div className={styles.itemTitle}>
                  <img src={Checkmark} alt="checkmark" />

                  <p>Payment & Invoice</p>
                </div>

                <div className={styles.itemDescription}>
                  We'll worry about all the transactions and payment. You can
                  sit back and relax while you make your clients happy.
                </div>
              </div>

              <div className={styles.item}>
                <div className={styles.itemTitle}>
                  <img src={Checkmark} alt="checkmark" />

                  <p>Transactions</p>
                </div>

                <div className={styles.itemDescription}>
                  You can easily view a list of all your transactions at any
                  time, giving you a clear overview of your finances.
                </div>
              </div>
            </div>

            <div className={styles.button} onClick={() => setQRModal(true)}>
              Pay now
            </div>
          </div>
        </div>
      </div>

      {successfulModal && (
        <Modal
          title={"Payment successful!"}
          info="Transaction Number: #149538292359"
          successful
        >
          <div className={styles.modalBody}>
            <div className={styles.modalItem}>
              <p>Amout Paid:</p>
              <p>$55.00</p>
            </div>
            <div className={styles.modalItem}>
              <p>Currency:</p>
              <p>Bitcoin</p>
            </div>
            <div className={styles.modalItem}>
              <p>Converted:</p>
              <p>0.0019BTC</p>
            </div>

            <div className={styles.buttons}>
              <div
                className={`${styles.button1} ${styles.modalButton}`}
                onClick={() => setSuccessfulModal(false)}
              >
                Close
              </div>
              <div className={`${styles.button2} ${styles.modalButton}`}>
                Print transactions
              </div>
            </div>
          </div>
        </Modal>
      )}

      {qrModal && (
        <Modal
          title={"Scan QR code"}
          info={
            <>
              You've to pay <span>0.00003BTC</span>
            </>
          }
          close={() => setQRModal(false)}
        >
          <div className={styles.modalBody}>
            <img src={QR} alt="qr" />
          </div>
        </Modal>
      )}
    </>
  );
};

export default PaymentBody;

const Modal = ({ title, info, successful, children, close }) => {
  return (
    <ModalOverlay style={{ width: "100%", maxWidth: "38.2rem" }}>
      {successful && (
        <img className={styles.modalImage} src={Checkmark} alt="checkmark" />
      )}
      {!successful && (
        <p className={styles.close} onClick={close}>
          X
        </p>
      )}

      <div className={styles.modalTitle}>{title}</div>
      <div className={styles.modalInfo}>{info}</div>
      {children}
    </ModalOverlay>
  );
};
