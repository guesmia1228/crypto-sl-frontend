import styles from "./productBody.module.css";
import { useState, useEffect } from "react";
import ReceivePayment from "../receivePayment";
import TopInfo from "../../dashboard/topInfo/topInfo";
import backendAPI from "../../api/backendAPI";


const ProductBody = ({ product }) => {
	const backend_API = new backendAPI();
	const [imageSource, setImageSource] = useState(null);

	async function fetchProductImage() {
		if (product.s3Key) {
			console.log("Fetch image")
			const newImageSource = await backend_API.getProductImage(product.link);
			if (newImageSource)
				setImageSource(newImageSource);
		}
	}

	useEffect(() => {
		if (product) {
			fetchProductImage();
		}
	}, [product]);

	return (
		<ReceivePayment 
			priceUSD={product.price}
			userId={product.user? product.user.id : null}
			transInfoArg={{productId: product.id}}
			info={
				<div className={styles.productWrapper}>
					<div className={`card ${styles.productInfo}`}>
						<div className={styles.body}>
							<TopInfo
								title={product.name ? product.name : ""}
								description={product.description}
							/>

							<p className={styles.price}><span>Price:</span> <span>{product.price} USD</span></p>

							<p className={styles.stock}><span>Stock:</span> <span>{product.stock}</span></p>
						</div>
					</div>
					<div className={`card ${styles.productImage}`}>
						<div className={styles.imageWrapper}>
							{imageSource &&
								<img src={imageSource} alt={product.title} className={styles.image} />
							}
						</div>
					</div>
				</div>
			}
		/>
	)
}

export default ProductBody;