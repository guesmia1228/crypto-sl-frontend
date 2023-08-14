import PaymentBody from "./payment/index";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { metamaskWallet } from "@thirdweb-dev/react";
import { Helmet } from "react-helmet";

const PaymentDashboard = () => {
  return (
	<ThirdwebProvider activeChain="ethereum" supportedWallets={[metamaskWallet()]} clientId="639eea2ebcabed7eab90b56aceeed08b">
		<Helmet>
			<title>Nefentus | Custom Payment</title>
		</Helmet>
		<div className="dashboard-body">
			<PaymentBody />
		</div>
	</ThirdwebProvider>
  );
};

export default PaymentDashboard;
