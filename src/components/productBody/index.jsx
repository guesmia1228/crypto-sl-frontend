import styles from "./productBody.module.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Tabs from "../tabs";
import TopInfo from "../../dashboard/topInfo/topInfo";
import MessageComponent from "../message";
import { MessageContext } from "../../context/message";
import NefentusLogo from "../../assets/logo/logo_n.png";
import MetaMaskLogo from "../../assets/logo/MetaMask.svg";
import backendAPI from "../../api/backendAPI";
import { web3Api } from "../../api/web3Api";
import Button from "../../components/button/button";
import useInternalWallet from "../../hooks/internalWallet";
import { useConnect, useDisconnect, metamaskWallet, useConnectionStatus, useAddress } from "@thirdweb-dev/react";
import useBalances from "../../hooks/balances";
import usePrices from "../../hooks/prices";
import { currencies, contractDeposits } from "../../constants";
import { formatTokenBalance, formatUSDBalance } from "../../utils";
import { ethers } from "ethers";


const ProductBody = ({ product }) => {
	let internalWalletAddress = useInternalWallet();
	const metamask = {
		connect: useConnect(),
		disconnect: useDisconnect(),
		config: metamaskWallet(),
		address: useAddress(),
		status: useConnectionStatus()
	}
	console.log("MetaMask status: " + metamask.status)
	console.log("MetaMask address: " + metamask.address)

	const { balances, fetchBalances } = useBalances(metamask);
	const { prices, fetchPrices } = usePrices(metamask);

	const backend_API = new backendAPI();
	const [imageSource, setImageSource] = useState(null);

	const { setInfoMessage, setErrorMessage, clearMessages } = useContext(MessageContext);

	async function fetchProductImage() {
		if (product.s3Key) {
			console.log("Fetch image")
			const newImageSource = await backend_API.getProductImage(product.link);
			if (newImageSource)
				setImageSource(newImageSource);
		}
	}

	useEffect(() => {
		clearMessages();
	}, []);

	useEffect(() => {
		fetchPrices();
		fetchBalances();
	}, [metamask.status, metamask.address]);

	useEffect(() => {
		if (product) {
			fetchProductImage();
		}
	}, [product]);

	async function handleBuy(providerSource, currencyIdx) {
		function nullToZeroAddress(address) {
			if (address === null)
				return ethers.constants.AddressZero;
			return address;
		}

		// Checks
		if (!product)
			return;

		const hierarchy = await backend_API.getHierarchy(product.user.id);
		console.log(hierarchy)

		const web3API = new web3Api(providerSource);
		// Currently not used because it is always paid in Ethereum
		const currency = currencies[currencyIdx];

		if (providerSource === "metamask") {
			const totalPrice = product.price;

			const transactionInfo = await web3API.callDepositContract(
				nullToZeroAddress(hierarchy.sellerAddress),
				nullToZeroAddress(hierarchy.affiliateAddress),
				nullToZeroAddress(hierarchy.brokerAddress),
				nullToZeroAddress(hierarchy.leaderAddress),
				currencies[1].address,
				product.price
			);

			if (transactionInfo) {
				transactionInfo.quantity = 1;
				transactionInfo.totalPrice = totalPrice;

				web3API.convertBigIntToString(transactionInfo);
				const ret = await backend_API.setTransactionInfo(product, transactionInfo, metamask.address);
				if (ret) {
					setInfoMessage("Transaction successful!");
				} else {
					setInfoMessage("Transaction successfull but could not send transaction info!");
				}
			} else {
				setErrorMessage("Transaction failed!");
			}
		} else if (providerSource === "internal") {

		}
	}

	return (
		<div className={styles.container}>
			<MessageComponent />

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

			<div className={`card ${styles.productBuy}`}>
				<div className={styles.body}>
					<TopInfo
							title="Buy product"
							description="You can buy this product using MetaMask or Nefentus Wallet, in case you have a Nefentus account."
					/>
					<Tabs
						tabIds={["metamask", "internal"]}
						initActiveTab={"metamask"}
						getHeader={(tabId) => {
							if (tabId === "metamask") {
								return (
									<>
										<img
											src={MetaMaskLogo}
											className={styles.tabNavLogo}
											alt="MetaMask Wallet"
										/>{" "}
										MetaMask
									</>
								);
							} else if (tabId === "internal") {
								return (
									<>
										<img
											src={NefentusLogo}
											className={styles.tabNavLogo}
											alt="Nefentus Wallet"
										/>{" "}
										Nefentus Wallet
									</>
								);
							}
						}}
						getBody={(tabId) => {
							if (tabId === "metamask") {
								return (
									<div className={styles.tabContent}>
										{metamask.status === "connected" && (
											<div className={styles.table}>
												{currencies.map(
													(currency, idx) => (
														<CryptoLine
															key={currency.abbr}
															currency={currency}
															balance={balances[0][idx]}
															price={prices[idx]}
															priceProduct={product.price}
															onClick={() => { handleBuy("metamask", idx) }}
														/>
													)
												)}
											</div>
										)}
										{metamask.status === "disconnected" && (
											<div className={styles.center}>
												<Button
													className={
														styles.metamaskConnectButton
													}
													onClick={() =>
														metamask.connect(
															metamask.config,
															{ chainId: 1 }
														)
													}
												>
													Connect to MetaMask
												</Button>
											</div>
										)}
										{metamask.status === "unknown" && (
											<div className={styles.center}>
												<Button
													className={
														styles.metamaskConnectButton
													}
													disabled
												>
													MetaMask is not available!
												</Button>
											</div>
										)}
										{metamask.status === "connecting" && (
											<div className={styles.center}>
												<Button
													className={
														styles.metamaskConnectButton
													}
													disabled
												>
													Connecting...
												</Button>
											</div>
										)}
									</div>
								);
							} else if (tabId === "internal") {
								return (
									<div className={styles.tabContent}>
										{!internalWalletAddress && (
											<Button
												className={
													styles.nefentusLoginButton
												}
												onClick={() => {}}
											>
												Login to Nefentus
											</Button>
										)}
										{internalWalletAddress && (
											<div className={styles.table}>
												{currencies.map(
													(currency, idx) => (
														<CryptoLine
															key={currency.abbr}
															currency={currency}
															balance={
																balances[1][idx]
															}
															price={prices[idx]}
															priceProduct={
																product.price
															}
															onClick={() => { handleBuy("internal", idx) }}
														/>
													)
												)}
											</div>
										)}
									</div>
								);
							}
						}}
						beforeChangeTab={() => {}}
					/>
				</div>
			</div>
		</div>
	);
};

const CryptoLine = ({ balance, price, currency, priceProduct, onClick }) => {
	let balanceToken = "loading";
	let balanceUSD = "loading";
	if (balance) {
		balanceToken = balance;
		if (price) {
			balanceUSD = balance*price;
		}
	}

	let buttonActive = false;
	if (balanceUSD) {
		// Currently, we can only pay in Ethereum
		buttonActive = balanceUSD > priceProduct && currency.abbr === "ETH";
	}

	return (
		<div className={styles.line}>
			<div className={styles.lineLeft}>
				<img src={currency.icon} className={styles.icon} alt="" />
				<div>
				<p className={styles.name}>{currency.name}</p>
				<p className={styles.abbr}>{currency.abbr}</p>
				</div>
			</div>

			<div className={styles.amounts}>
				<p className={styles.dollar}>≈ {formatUSDBalance(balanceUSD)} USD</p>
				<p className={styles.crypto}>{formatTokenBalance(balanceToken, currency.decimals)} {currency.abbr}</p>
			</div>

			<div className={styles.actions}>
				{buttonActive && (
					<Button className={styles.buyButton} onClick={onClick} color={"white"}>
						Buy
					</Button>
				)}
			</div>
		</div>
	);
};

export default ProductBody;