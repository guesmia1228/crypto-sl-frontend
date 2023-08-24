import { useState, useContext } from "react";
import QRCode from "react-qr-code";
import { Options } from "../../components/input/input";
import Header from "../header/header";
import Input from "../../components/input/input";
import Table from "../../components/table";
import Button from "../../components/button/button";
import CopyValue from "../copyValue";
import styles from "./payment.module.css";
import Checkmark from "../../assets/icon/checkmark.svg";
import backendAPI from "../../api/backendAPI";
import vendorDashboardApi from "../../api/vendorDashboardApi";
import QR from "../../assets/image/qr.svg";
import TopInfo from "../topInfo/topInfo";
import ModalOverlay from "../modal/modalOverlay";
import useInternalWallet from "../../hooks/internalWallet";
import { MessageContext } from "../../context/message";
import inputStyles from "../../components/input/input.module.css";

import { useConnect, useDisconnect, metamaskWallet, useConnectionStatus, useAddress } from "@thirdweb-dev/react";
import MessageComponent from "../../components/message";

const PaymentBody = () => {
	const [address, setAddress] = useState("");
	const [amount, setAmount] = useState("");
	const [wallet, setWallet] = useState(undefined);
	const { setInfoMessage, setErrorMessage } = useContext(MessageContext);

	let internalWallet = useInternalWallet();
	const metamask = {
			connect: useConnect(),
			disconnect: useDisconnect(),
			config: metamaskWallet(),
			address: useAddress(),
			status: useConnectionStatus()
		}
	const walletOptions = [];
	if (internalWallet) {
		walletOptions.push("Nefentus Wallet");
	}
	if (metamask.address) {
		walletOptions.push("Metamask Wallet");
	}

	const [successfulModal, setSuccessfulModal] = useState(false);
	const [qrModalOpen, setQRModalOpen] = useState(false);
	const [qrValue, setQRValue] = useState("");

	const vendorAPI = new vendorDashboardApi();


	async function createInvoice() {
		// Check data
		if (!amount) {
			setErrorMessage("Please enter a valid amount");
			return;
		}
		if (!wallet) {
			setWallet(walletOptions[0]);
		}

		// Create invoice
		const invoiceLinkPart = await vendorAPI.createInvoice(amount, wallet);

		if (invoiceLinkPart) {
			const invoiceLink = window.location.origin + "/pay/" + invoiceLinkPart;
			setQRValue(invoiceLink);
			setQRModalOpen(true);
		} else {
			setErrorMessage("Could not create an invoice!");
		}
	}

  return (
    <>
      <div>
        <Header title={"Receive payment"} />

		<MessageComponent />

        <TopInfo
          title={"Create an invoice"}
          description="To receive a payment you can create a custom invoice for a specific client."
        />

        <div className={`card ${styles.card}`}>
          <div className={styles.title}>Details</div>

          <div className={styles.body}>
            <div className={styles.inputWrapper}>
              {/* <Input dashboard setState={setAddress} label={"Recipient email"} placeholder={"Enter email"} value={address} /> */}
              <Input setState={setAmount} label={"Amout in USD"} placeholder={"Enter amount"} dashboard value={amount} />
			  <Options
                label="Wallet"
                value={wallet ? wallet : walletOptions[0]}
                options={walletOptions}
                dashboard
                setValue={setWallet}
              />
            </div>

            <div className={styles.bill}>
              <div className={styles.label}>You’ve to pay</div>
              <div className={styles.price}>0.000035BTC</div>

              <div className={styles.item}>
                <div className={styles.itemTitle}>
                  <img src={Checkmark} alt="" />

                  <p>Payment & Invoice</p>
                </div>

                <div className={styles.itemDescription}>
                  We'll worry about all the transactions and payment. You can
                  sit back and relax while you make your clients happy.
                </div>
              </div>

              <div className={styles.item}>
                <div className={styles.itemTitle}>
                  <img src={Checkmark} alt="" />

                  <p>Transactions</p>
                </div>

                <div className={styles.itemDescription}>
                  You can easily view a list of all your transactions at any
                  time, giving you a clear overview of your finances.
                </div>
              </div>
            </div>

            <div className={styles.button} onClick={createInvoice}>
				Create invoice
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

      {qrModalOpen && (
        <Modal
			amount={amount}
			qrValue={qrValue}
			onClose={() => setQRModalOpen(false)}
		/>
      )}
    </>
  );
};

export default PaymentBody;

const Modal = ({ amount, qrValue, onClose }) => {
	const { setInfoMessage } = useContext(MessageContext);

	return (
		<ModalOverlay>
			<div className={styles.modal}>
				<MessageComponent />
				<TopInfo
					title={"Invoice"}
					description={`Please scan the QR code below to pay the invoice`}
				/>

				<Table 
					data={[
						["Amount:", `${amount} USD`],
						["Link:", <CopyValue value={qrValue} onCopy={() => setInfoMessage("Payment link copied to clipboard!")} />]
					]} 
					colSizes={[1, 3]}
				/>

				<div className={styles.qrWrapper}>
					<QRCode
						size={256}
						style={{ height: "auto", maxWidth: "100%", width: "100%" }}
						value={qrValue}
						viewBox={`0 0 256 256`}
					/>
				</div>

				<div className={styles.modalButtons}>
					<Button onClick={onClose} color="white">
						Close
					</Button>
				</div>
			</div>
		</ModalOverlay>
	);
};
