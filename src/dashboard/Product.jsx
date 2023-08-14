import ProductBody from "./product/index";
import { Helmet } from "react-helmet";

const Product = () => {
	return (
		<>
			<Helmet>
				<title>Nefentus | Products</title>
			</Helmet>
			<ProductBody />;
		</>
	)
};

export default Product;
