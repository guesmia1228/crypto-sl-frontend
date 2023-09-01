import { useState, useContext, useEffect } from "react";
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
import QR from "../../assets/icon/qrcode.svg";
import TopInfo from "../topInfo/topInfo";
import ModalOverlay from "../modal/modalOverlay";
import useInternalWallet from "../../hooks/internalWallet";
import { MessageContext } from "../../context/message";
import inputStyles from "../../components/input/input.module.css";
import { formatUSDBalance } from "../../utils";
import { useConnect, useDisconnect, metamaskWallet, useConnectionStatus, useAddress } from "@thirdweb-dev/react";
import MessageComponent from "../../components/message";

const headers = ["Created at", "Price ($)", "Status", "QR code"]
const colSizes = [1.5, 1, 1.5, 1.5];

const PaymentBody = () => {
	const [amount, setAmount] = useState("");
	const [invoiceData, setInvoiceData] = useState([]);
	const { setInfoMessage, setErrorMessage } = useContext(MessageContext);
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

		// Create invoice
		const invoiceLinkPart = await vendorAPI.createInvoice(amount);

		if (invoiceLinkPart) {
			const invoiceLink = window.location.origin + "/pay/" + invoiceLinkPart;
			setQRValue(invoiceLink);
			setQRModalOpen(true);
		} else {
			setErrorMessage("Could not create an invoice!");
		}
	}

	// List of invoices

	async function fetchInvoices() {
		let newInvoices = await vendorAPI.getInvoices();
		// Reverse the array
		newInvoices = newInvoices.reverse();
		console.log(newInvoices)

		if (newInvoices) {
			const newInvoiceData = newInvoices.map((item) => invoiceToArray(item));
			setInvoiceData(newInvoiceData);
		}
	}

	function invoiceToArray(invoice) {
		function openModalWithInvoiceData() {
			setQRValue(window.location.origin + "/pay/" + invoice.link);
			setAmount(invoice.price);
			setQRModalOpen(true);
		}

		return [
			new Date(invoice.createdAt).toLocaleString(),
			invoice.price,
			(
				<span style={{color: invoice.paidAt ? "var(--success-color)" : "var(--error-color)"}}>{invoice.paidAt ? "paid" : "open"}</span>
			),
			(
				<img className={styles.qr} src={QR} alt="QR" onClick={openModalWithInvoiceData} />
			)
		];
	}

	function invoiceDataToTotalValue(invoiceData) {
		let totalValue = 0;
		for (const invoice of invoiceData) {
			totalValue += invoice[1];
		}
		return totalValue;
	}

	useEffect(() => {
		fetchInvoices();
	}, []);

  return (
    <>
      <div>
        <Header title={"Receive payment"} />

		<MessageComponent />

        <TopInfo
          title={"Invoices"}
          description={
			<>
				You have <span>{invoiceData.length}</span> invoices with a total value of <span>{formatUSDBalance(invoiceDataToTotalValue(invoiceData))} $</span>!
			</>
		  }
        />

        <div className={`card ${styles.card}`}>
          <div className={styles.title}>Create a new invoice</div>

          <div className={styles.body}>
			<div className={styles.columns}>
					<Input setState={setAmount} placeholder={"Enter amount in $"} dashboard value={amount} />

					<div className={styles.button} onClick={createInvoice}>
						<center>Create invoice</center>
					</div>
			</div>
          </div>
        </div>

		<Table 
	  		headers={headers} 
	  		data={invoiceData}
			colSizes={colSizes}
			colHighlighted={[4, 5]} 
			striped 
		/>
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
			onClose={() => { setQRModalOpen(false); fetchInvoices() } }
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
