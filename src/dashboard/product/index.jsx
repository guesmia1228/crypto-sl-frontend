import { useState, useEffect } from "react";

import Button from "../../components/button/button";
import Input, { Textarea } from "../../components/input/input";
import Header from "../header/header";
import styles from "./product.module.css";

import Edit from "../../assets/icon/edit.svg";
import Delete from "../../assets/icon/delete.svg";
import TopInfo from "../topInfo/topInfo";
import ModalOverlay from "../modal/modalOverlay";

import vendorDashboardApi from "../../api/vendorDashboardApi";
import MessageComponent from "../../components/message";
import { MessageContext } from "../../context/message";
import { useContext } from "react";

const ProductBody = () => {
	const [openModal, setOpenModal] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [stock, setStock] = useState("");
	const [image, setImage] = useState("");

	const [products, setProducts] = useState([]);

	const [value, setValue] = useState("Filter");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const { setInfoMessage, setErrorMessage } = useContext(MessageContext);

	const dashboardApi = new vendorDashboardApi();

	useEffect(() => {
		async function fetchData() {
			const newProducts = await dashboardApi.getProducts();
			console.log(newProducts)
			if (newProducts)
				setProducts(newProducts);
		}
		fetchData();
	  }, []);

	const addProduct = async () => {
		const resp = await dashboardApi.addProduct(name, description, price, stock, image);
		if (resp) {
			setInfoMessage("Product added successfully!");
			const newProducts = await dashboardApi.getProducts();
			console.log(newProducts)
			if (newProducts)
				setProducts(newProducts);
		} else {
			setErrorMessage("Could not add a new product!");
		}

		setOpenModal(false);
	};

  return (
		<>
			<div className={`dashboard-body`}>
				<Header title="Products" />

				<MessageComponent />

				<TopInfo
					title="Total"
					description={
						<>
							You manage <span>{products.length}</span> products!
						</>
					}
				>
					<Button color="white" onClick={() => setOpenModal(true)}>
						Create New product
					</Button>
				</TopInfo>

				<div className={styles.row}>
					{products.map((product) => (
						<Card
							title={product.name}
							description={product.description}
							price={product.price + " $"}
							image=""
						/>
					))}
				</div>
			</div>
			<div className={styles.modalWrapper}>
				{openModal && (
					<ModalOverlay>
						<div className={styles.modal}>
							<h4>Create Product</h4>

							<div className={styles.modalInputs}>
								<Input
									dashboard
									label="Name"
									placeholder="Enter name"
									value={name}
									setState={setName}
								/>
								<Textarea
									dashboard
									label="Description"
									placeholder="Enter description"
									value={description}
									setState={setDescription}
								/>
								<Input
									dashboard
									label="Price"
									placeholder="Enter price"
									value={price}
									setState={setPrice}
									number
								/>
								<Input
									dashboard
									label="Stock"
									placeholder="Enter stock"
									value={stock}
									setState={setStock}
									number
								/>
							</div>
							<div className={styles.modalButtons}>
								<div
									className={styles.button}
									onClick={() => setOpenModal(false)}
								>
									Cancel
								</div>
								<Button onClick={addProduct} color="white">
									Add Product
								</Button>
							</div>
						</div>
					</ModalOverlay>
				)}
			</div>
		</>
  );
};

export default ProductBody;

const Card = ({ title, description, image, price }) => {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.imageWrapper}>
        <div className={styles.icons}>
          <img src={Edit} alt="" />
          <img src={Delete} alt="" />
        </div>
        <img src={image} alt="" className={styles.image} />
      </div>

      <div className={styles.body}>
        <h4>{title}</h4>

        <p className={styles.description}>{description}</p>

        <p className={styles.price}>{price}</p>

        <div className={styles.buttonMain}>Watch</div>
      </div>
    </div>
  );
};
