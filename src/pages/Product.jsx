import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import backendAPI from "../api/backendAPI";
import ProductBody from "../components/productBody";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";

const Product = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const productLink = params.productLink;
  const backend_API = new backendAPI();

  async function loadProduct() {
    const newProduct = await backend_API.getProduct(productLink);
    if (newProduct) setProduct(newProduct);
    console.log(newProduct);
  }

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <>
      <Helmet>
        <title>{product.name ? product.name : ""} | Nefentus</title>
      </Helmet>
      <ThirdwebProvider
        activeChain="ethereum"
        supportedWallets={[metamaskWallet()]}
        clientId="639eea2ebcabed7eab90b56aceeed08b"
      >
        <ProductBody product={product} />
      </ThirdwebProvider>
    </>
  );
};

export default Product;
