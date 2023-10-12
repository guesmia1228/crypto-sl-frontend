import ProductBody from "./products/index";
import { Helmet } from "react-helmet";

const Products = () => {
  return (
    <>
      <Helmet>
        <title>Nefentus | Products</title>
      </Helmet>
      <ProductBody />
    </>
  );
};

export default Products;
