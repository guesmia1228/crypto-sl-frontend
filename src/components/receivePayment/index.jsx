import styles from "./receivePayment.module.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/input/input";
import Tabs from "../tabs";
import TopInfo from "../../dashboard/topInfo/topInfo";
import Table from "../../components/table";
import MessageComponent from "../message";
import ModalOverlay from "../../dashboard/modal/modalOverlay";
import { MessageContext } from "../../context/message";
import NefentusLogo from "../../assets/logo/logo_n.png";
import MetaMaskLogo from "../../assets/logo/MetaMask.svg";
import backendAPI from "../../api/backendAPI";
import { web3Api, uniswapApi } from "../../api/web3Api";
import Button from "../../components/button/button";
import useInternalWallet from "../../hooks/internalWallet";
import { useConnect, useDisconnect, metamaskWallet, useConnectionStatus, useAddress } from "@thirdweb-dev/react";
import useBalances from "../../hooks/balances";
import usePrices from "../../hooks/prices";
import { currencies } from "../../constants";
import { formatTokenBalance, formatUSDBalance } from "../../utils";
import { nullToZeroAddress } from "../../utils";


const ReceivePayment = ({ priceUSD, userId, info, transInfoArg }) => {
	let internalWalletAddress = useInternalWallet();

	const [password, setPassword] = useState("");
	const [internalPayIdx, setInternalPayIdx] = useState(-1); // Index of the currency to pay with (or -1 if not selected)

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

	const { setInfoMessage, setErrorMessage, clearMessages } = useContext(MessageContext);

	const backend_API = new backendAPI();


	useEffect(() => {
		clearMessages();
	}, []);

	useEffect(() => {
		fetchPrices();
		fetchBalances();
	}, [metamask.status, metamask.address]);

	async function handleBuy(providerSource, currencyIdx) {
		// Checks
		if (!(priceUSD > 0.0)) {
			setErrorMessage("Invalid price!");
			return;
		}
		if (!userId) {
			setErrorMessage("Invalid user id!");
			return;
		}

		// Currently not used because it is always paid in Ethereum
		const currency = currencies[currencyIdx];
		const stablecoinAddress = currencies[1].address;
		const quantity = 1;

		if (providerSource === "metamask") {
			const web3API = new web3Api(providerSource);

			const hierarchy = await backend_API.getHierarchy(userId);
			console.log(hierarchy)

			const transactionInfo = await web3API.callDepositContract(
				nullToZeroAddress(hierarchy.sellerAddress),
				nullToZeroAddress(hierarchy.affiliateAddress),
				nullToZeroAddress(hierarchy.brokerAddress),
				nullToZeroAddress(hierarchy.seniorBrokerAddress),
				nullToZeroAddress(hierarchy.leaderAddress),
				stablecoinAddress,
				priceUSD
			);

			if (transactionInfo) {
				transactionInfo.quantity = quantity;
				transactionInfo.totalPrice = priceUSD;

				web3API.convertBigIntToString(transactionInfo);
				const ret = await backend_API.setTransactionInfo(transactionInfo, metamask.address, transInfoArg);
				if (ret) {
					setInfoMessage("Transaction successful!");
				} else {
					setInfoMessage("Transaction successfull but could not send transaction info!");
				}
			} else {
				setErrorMessage("Transaction failed!");
			}
		} else if (providerSource === "internal") {
			const ret = await backend_API.makePayment(null, priceUSD, quantity, password, stablecoinAddress, transInfoArg);

			if (ret === "insufficientFunds") {
				setErrorMessage("Transaction failed! Insufficient funds.");
			} else if (ret) {
				setInfoMessage("Transaction successful!");
			} else {
				setErrorMessage("Transaction failed!");
			}
		}
	}

	return (
		<div className={styles.container}>
			<MessageComponent />

			<div className={styles.infoWrapper}>
				{ info }
			</div>

			<div className={`card ${styles.productBuy}`}>
				<div className={styles.body}>
					<TopInfo
							title="Buy product"
							description="You can buy this product using MetaMask or Nefentus Wallet, in case you have a Nefentus account."
					/>
					<Tabs
						tabIds={["internal", "metamask"]}
						initActiveTab={"internal"}
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
															priceProduct={priceUSD}
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
											<div className={styles.center}>
												<Button
													className={
														styles.nefentusLoginButton
													}
													onClick={() => {}}
												>
													Login to Nefentus
												</Button>
											</div>
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
																priceUSD
															}
															onClick={() => { setInternalPayIdx(idx) }}
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

			{(internalPayIdx >= 0) && (
				<Modal
					price={priceUSD}
					currencyAbbr={currencies[internalPayIdx].abbr}
					onClose={() => setInternalPayIdx(-1)}
					onPay={() => handleBuy("internal", internalPayIdx)}
					password={password}
					setPassword={setPassword}
				/>
			)}
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
						Pay
					</Button>
				)}
			</div>
		</div>
	);
};

const Modal = ({ price, currencyAbbr, onClose, onPay, password, setPassword }) => {
	return (
		<ModalOverlay>
			<div className={styles.modal}>
				<MessageComponent />

				<TopInfo
					title={"Password"}
					description={`Type in your password to pay with your Nefentus wallet`}
				/>

				<Table 
					data={[
						["Amount:", `${price} USD`],
						["Currency:", currencyAbbr]
					]} 
					colSizes={[1, 3]}
				/>

				<div className={styles.modalInputs}>
					<Input
						label={"Password"}
						placeholder={"Enter password"}
						dashboard
						value={password}
						setState={setPassword}
						secure
					/>
				</div>

				<div className={styles.modalButtons}>
					<Button onClick={onClose} color="black">
						Close
					</Button>
					<Button onClick={onPay} color="white">
						Pay
					</Button>
				</div>
			</div>
		</ModalOverlay>
	);
};

export default ReceivePayment;