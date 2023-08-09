import WalletBody from "./wallet/index";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { metamaskWallet } from "@thirdweb-dev/react";

const Wallet = () => {
  return (
    <div>
		<ThirdwebProvider activeChain="ethereum" supportedWallets={[metamaskWallet()]} clientId="639eea2ebcabed7eab90b56aceeed08b">
			<WalletBody />
		</ThirdwebProvider>
    </div>
  );
};

export default Wallet;
