import WalletBody from "./wallet/index";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { Helmet } from "react-helmet";

const Wallet = () => {
  return (
    <div>
      <ThirdwebProvider
        activeChain="ethereum"
        supportedWallets={[metamaskWallet()]}
        clientId="639eea2ebcabed7eab90b56aceeed08b"
      >
        <Helmet>
          <title>Nefentus | Wallet</title>
        </Helmet>
        <WalletBody />
      </ThirdwebProvider>
    </div>
  );
};

export default Wallet;
