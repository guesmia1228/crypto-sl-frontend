import { useEffect, useContext } from "react";
import backendAPI from "../../api/backendAPI";
import { uniswapApi, web3Api } from "../../api/web3Api";

import Header from "../header/header";
import PercentageInfo from "../percentageInfo/percentageInfo";
import TopInfo from "../topInfo/topInfo";
import ModalOverlay from "../modal/modalOverlay";
import Table from "../../components/table";
import copyClipboard from "../../assets/icon/copyClipboard.svg";
import CopyValue from "../copyValue";
import styles from "./wallet.module.css";
import Input, { Options } from "./../../components/input/input";
import { useState } from "react";
import Button from "../../components/button/button";
import NefentusLogo from "../../assets/logo/logo_n.png";
import MetaMaskLogo from "../../assets/logo/MetaMask.svg";
import inputStyles from "../../components/input/input.module.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import MessageComponent from "../../components/message";
import { MessageContext } from "../../context/message";
import Tabs from "../../components/tabs";
import useInternalWallet from "../../hooks/internalWallet";
import useBalances from "../../hooks/balances";
import usePrices from "../../hooks/prices";
import { currencies } from "../../constants";
import { formatTokenBalance, formatUSDBalance } from "../../utils";
import { useConnect, useDisconnect, metamaskWallet, useConnectionStatus, useAddress } from "@thirdweb-dev/react";


const WalletBody = () => {
	let internalWalletAddress = useInternalWallet();
	const metamask = {
		connect: useConnect(),
		disconnect: useDisconnect(),
		config: metamaskWallet(),
		address: useAddress(),
		status: useConnectionStatus()
	}

	const { balances, fetchBalances } = useBalances(metamask);
	const { prices, fetchPrices } = usePrices(metamask);

	useEffect(() => {
		fetchPrices();
		fetchBalances();
		console.log("Metamask status changed: " + metamask.status + ", address: " + metamask.address);
	}, [metamask.status, metamask.address]);

	console.log(metamask.address);
	console.log(balances);
	console.log(prices);

  	return (
		<div className="dashboard-body">
			<Header title="Wallet" />

			<TopInfo
				title={"Check your balance"}
				description={"Add more funds to your wallet or withdraw them."}
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
							<Balances
								balances={balances[0]}
								prices={prices}
								metamask={metamask}
								walletAddress={metamask.address}
								fetchBalances={fetchBalances}
							/>
						);
					} else if (tabId === "internal") {
						return (
							<Balances
								balances={balances[1]}
								prices={prices}
								metamask={null}
								walletAddress={internalWalletAddress}
								fetchBalances={fetchBalances}
							/>
						);
					}
				}}
				beforeChangeTab={() => {
					fetchPrices();
					fetchBalances();
				}}
			/>
		</div>
	);
};

export default WalletBody;

const Balances = ({balances, prices, metamask, walletAddress, fetchBalances}) => {
	const [withdrawCurrency, setWithdrawCurrency] = useState(currencies[0].abbr);
	const [withdrawAmount, setWithdrawAmount] = useState("");
	const [withdrawAddress, setWithdrawAddress] = useState("");	
	const [openReceiveModal, setOpenReceiveModal] = useState(false);
	const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
	const [password, setPassword] = useState("");
	const [isWithdrawing, setIsWithdrawing] = useState(false);
	const { setInfoMessage, setErrorMessage, clearMessages } = useContext(MessageContext);

	const isMetaMask = metamask !== null;

	function calculateTotalBalanceUSD() {
		let totalBalanceUSD = 0.0;
		for (let i = 0 ; i < currencies.length ; i++) {
			let balanceUSD = 0.0;
			if (balances[i]) {
				const balanceToken = balances[i];
				if (prices[i]) {
					balanceUSD = balanceToken*prices[i];
				}
			}

			totalBalanceUSD += balanceUSD;
		}
		return totalBalanceUSD;
	}

	async function withdraw() {
		// Check values
		if (isWithdrawing)
			return;
		if (withdrawAmount === "") {
			setErrorMessage("Please enter an amount to withdraw.");
			return;
		}
		if (withdrawAddress === "") {
			setErrorMessage("Please enter an address to withdraw to.");
			return;
		}
		if (password === "") {
			setErrorMessage("Please enter your password.");
			return;
		}
		const sendCurrency = currencies.find((currency) => currency.abbr === withdrawCurrency);
		if (!sendCurrency) {
			setErrorMessage("Please select a correct currency to withdraw.");
			return;
		}

		// Check password
		const backend_Api = new backendAPI();
		const passwordCorrect = await backend_Api.checkPassword(password);
		console.log("passwordCorrect: " + passwordCorrect);
		if (!passwordCorrect) {
			setErrorMessage("You did not provide the correct password!");
			return;
		}

		//Before withdraw
		setPassword("");
		setIsWithdrawing(true);
		setInfoMessage("Withdrawing...");

		// Withdraw
		const tokenAddress = sendCurrency.address;
		if (isMetaMask) {
			const web3API = new web3Api("metamask");

			try {
				const txReceipt = await web3API.send(tokenAddress, withdrawAmount, withdrawAddress);
				if (txReceipt.status === 1) {
					setInfoMessage("Withdrawal successful!");
					fetchBalances();
				} else {
					setErrorMessage("Withdrawal failed!");
				}
			} catch (error) {
				console.log(error);
				setErrorMessage("Withdrawal failed!");
			}
		} else {
			const backend_Api = new backendAPI();
			const ret = await backend_Api.send(tokenAddress, withdrawAmount, withdrawAddress, password);
			if (ret) {
				setInfoMessage("Withdrawal successful!");
				fetchBalances();
			} else {
				setErrorMessage("Withdrawal failed!");
			}
		}
	}

	if (isMetaMask && !(metamask.status === "connected" && metamask.address)) {
		return (
			<div className={`${styles.tabContent} ${styles.tabContentMetaMask}`}>
				<div className={styles.center}>
					{metamask.status === "disconnected" && (
						<Button className={styles.metamaskConnectButton} onClick={() => metamask.connect(metamask.config, {chainId: 1})}>
							Connect to MetaMask
						</Button>
					)}
					{metamask.status === "unknown" && (
						<Button className={styles.metamaskConnectButton} disabled>
							MetaMask is not available!
						</Button>
					)}
					{metamask.status === "connecting" && (
						<Button className={styles.metamaskConnectButton} disabled>
							Connecting...
						</Button>
					)}
				</div>
			</div>
		)
	} else {
		return (
			<div className={styles.tabContent}>					
				<div className={`${styles.balance} card`}>
					<div className={styles.balanceTop}>
						<div className={styles.balanceInfo}>
							<h4>Balance</h4>

							<p>≈ {formatUSDBalance(calculateTotalBalanceUSD())} USD</p>
							{/*
									<p>$58,345,190.00</p>
									<PercentageInfo amount={58345190} percentage={2.11} />
							*/}
						</div>

						<div className={styles.buttons}>
							{walletAddress && (
								<Button color="white" onClick={() => setOpenReceiveModal(true)}>
									Receive
								</Button>
							)}
						</div>
					</div>

					<div className={styles.table}>
						{currencies.map((currency, idx) => (
							<CryptoLine key={currency.abbr} currency={currency} balance={balances[idx]} price={prices[idx]} /> 			
						))}
					</div>
				</div>

				<div className={`${styles.withdrawal} card`}>
					<h3>Withdrawal</h3>

					<div className={styles.inputs}>
						<Options
							label="Currency options"
							value={withdrawCurrency}
							options={currencies.map((item) => item.abbr)}
							setValue={setWithdrawCurrency}
							dashboard
						/>

						<Input
							label={"Amount"}
							placeholder={"Enter amount"}
							dashboard
							value={withdrawAmount}
							setState={setWithdrawAmount}
						/>
					</div>

					<div className={styles.address}>
						<Input
							label={"Address"}
							placeholder={"Enter address"}
							dashboard
							value={withdrawAddress}
							setState={setWithdrawAddress}
						/>
					</div>

					<Button color="white" onClick={() => setOpenWithdrawModal(true)}>
						Withdraw
					</Button>
				</div>

				{(isMetaMask && metamask.address) && (
					<div className={`${styles.metamaskAccount} card`}>
						<span>Connected wallet: {`${metamask.address.substring(0, 5)}...${metamask.address.substring(metamask.address.length-5)}`}</span>
						<div className={styles.metamaskDisconnectButton} onClick={() => metamask.disconnect()} >
							Disconnect
						</div>
					</div>
				)}

				<div className={styles.modalWrapper}>
					{openReceiveModal && (
						<ModalOverlay>
							<div className={styles.modal}>
								<MessageComponent />
								<TopInfo
									title={"Receive funds"}
									description={"Receive funds by sending cryptocurrency to the address below."}
								/>

								<div className={styles.modalInputs}>
									<div>
										<div className={inputStyles.inputWrapper}>
											<p
											className={`${inputStyles.label} ${inputStyles.dashboardLabel}`}
											>
											Wallet address
											</p>

											<CopyValue value={walletAddress} onCopy={() => setInfoMessage("Wallet address copied!")} />
										</div>
									</div>

								</div>
								<div className={styles.modalButtons}>
									<Button onClick={() => { setOpenReceiveModal(false); clearMessages(); }} color="white">
										Close
									</Button>
								</div>
							</div>
						</ModalOverlay>
					)}
				</div>

				<div className={styles.modalWrapper}>
					{openWithdrawModal && (
						<ModalOverlay>
							<div className={styles.modal}>
								<MessageComponent />
								<TopInfo
									title={"Withdraw funds"}
									description={"You requested to withdraw funds from your account."}
								/>

								<Table 
									data={[["Amount:", `${withdrawAmount} ${withdrawCurrency}`], ["Address:", withdrawAddress]]} 
									colSizes={[1, 3]} 
									className={styles.withdrawalTable}
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
									<Button onClick={() => { setOpenWithdrawModal(false); clearMessages() }} color="white">
										Close
									</Button>
									<Button onClick={() => withdraw()}>
										Withdraw
									</Button>
								</div>
							</div>
						</ModalOverlay>
					)}
				</div>
			</div>
		);
	};
};

const CryptoLine = ({ balance, price, currency }) => {
	let balanceToken = "loading";
	let balanceUSD = "loading";
	if (balance) {
		balanceToken = balance;
		if (price) {
			balanceUSD = balance*price;
		}
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
		</div>
	);
};
