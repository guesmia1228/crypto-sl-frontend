import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import backendAPI from "../api/backendAPI";
import PayBody from "../components/payBody";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";

const Pay = () => {
  const [invoice, setInvoice] = useState({});
  const params = useParams();
  const payLink = params.payLink;
  const backend_API = new backendAPI();

  async function loadInvoice() {
    const newInvoice = await backend_API.getInvoice(payLink);
    if (newInvoice) setInvoice(newInvoice);
    console.log(newInvoice);
  }

  useEffect(() => {
    loadInvoice();
  }, []);

  return (
    <div className="container">
      <Helmet>
        <title>Pay invoice | Nefentus</title>
      </Helmet>
      <ThirdwebProvider
        activeChain="ethereum"
        supportedWallets={[metamaskWallet()]}
        clientId="639eea2ebcabed7eab90b56aceeed08b"
      >
        <PayBody invoice={invoice} />
      </ThirdwebProvider>
    </div>
  );
};

export default Pay;
