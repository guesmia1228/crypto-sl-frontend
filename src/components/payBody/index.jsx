import styles from "./payBody.module.css";
import ReceivePayment from "../receivePayment";
import TopInfo from "../../dashboard/topInfo/topInfo";


const PayBody = ({ invoice }) => {
	return (
		<ReceivePayment 
			priceUSD={invoice.price}
			userId={invoice.user ? invoice.user.id : null}
			transInfoArg={{invoiceId: invoice.id}}
			info={
				<>
					<div className={`card ${styles.payInfo}`}>
						<div className={styles.body}>
							<TopInfo
								title={"Invoice"}
								description={"Pay an invoice"}
							/>

							<p className={styles.price}><span>Price:</span> <span>{invoice.price} USD</span></p>
						</div>
					</div>
				</>
			}
		/>
	)
}

export default PayBody;