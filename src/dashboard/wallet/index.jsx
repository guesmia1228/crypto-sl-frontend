import { useEffect, useContext } from "react";
import backendAPI from "../../api/backendAPI";
import { uniswapApi, web3Api } from "../../api/web3Api";

import Header from "../header/header";
import PercentageInfo from "../percentageInfo/percentageInfo";
import TopInfo from "../topInfo/topInfo";
import ModalOverlay from "../modal/modalOverlay";

import Bitcoin from "../../assets/icon/crypto/bitcoin.svg";
import Polygon from "../../assets/icon/crypto/polygon.svg";
import Cardano from "../../assets/icon/crypto/cardano.svg";
import Binance from "../../assets/icon/crypto/binance.svg";
import Ethereum from "../../assets/icon/crypto/ethereum.svg";
import Tether from "../../assets/icon/crypto/tether.svg";
import USDC from "../../assets/icon/crypto/usdc.svg";
import copyClipboard from "../../assets/icon/copyClipboard.svg";

import styles from "./wallet.module.css";
import Input, { Options } from "./../../components/input/input";
import { useState } from "react";
import Button from "../../components/button/button";
import Logo from "../../assets/logo/logo_n.png";
import MetaMaskLogo from "../../assets/logo/MetaMask.svg";
import inputStyles from "../../components/input/input.module.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import MessageComponent from "../../components/message";
import { MessageContext } from "../../context/message";
import Tabs from "../../components/tabs";

import { useConnect, useDisconnect, metamaskWallet, useConnectionStatus, useAddress } from "@thirdweb-dev/react";

const currencies = [
	{
		icon: Ethereum,
		name: "Ethereum",
		abbr: "ETH",
		address: null,
		decimals: 18
	},
	{
		icon: Tether,
		name: "Tether",
		abbr: "USDT",
		address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
		decimals: 6
	},
	{
		icon: USDC,
		name: "USD Coin",
		abbr: "USDC",
		address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
		decimals: 6
	  },
];

function formatTokenBalance(x) {
	const parsedFloat = parseFloat(x);
	if (isNaN(parsedFloat)) {
		return "loading";
	} else {
		return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	}
}

function formatUSDBalance(x) {
	const parsedFloat = parseFloat(x);
	if (isNaN(parsedFloat)) {
		return "loading";
	} else {
		return parsedFloat.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	}
}

const WalletBody = () => {
	const backend_Api = new backendAPI();
  	const [walletList, setWalletList] = useState([]);
	const [prices, setPrices] = useState([initBalances()]);
	const [allBalances, setAllBalances] = useState([initBalances(), initBalances()]);

	const metamask = {
		connect: useConnect(),
		disconnect: useDisconnect(),
		config: metamaskWallet(),
		address: useAddress(),
		status: useConnectionStatus()
	}

	async function fetchInternalWalletAddresses() {
		const newWalletList = await backend_Api.getWalletAddresses();
		if (newWalletList) {
			setWalletList(newWalletList);
		}
	}

	async function fetchPrices() {
		let providerSource = "thirdweb";
		if (metamask.status === "connected") {
			providerSource = "metamask";
		}
		const uniswapAPi = new uniswapApi(providerSource);

		const addressesAndDecimals = currencies.map((currency) => [currency.address ? currency.address : uniswapAPi.WETH_CONTRACT_ADDRESS, currency.decimals]);
		const pricesList = await Promise.all(addressesAndDecimals.map((element) => uniswapAPi.getUSDCPriceForToken(element[0], element[1], 6)));
		setPrices(pricesList);
	}

	async function fetchBalances() {
		let providerSource = "thirdweb";
		if (metamask.status === "connected") {
			providerSource = "metamask";
		}
		const web3API = new web3Api(providerSource);

		const balancesEx = metamask.address ? await fetchBalanceForWallet(web3API, metamask.address) : initBalances();
		const balancesIn = walletList.length > 0 ? await fetchBalanceForWallet(web3API, walletList[0]) : initBalances();
		setAllBalances([balancesEx, balancesIn]);
	}

	async function fetchBalanceForWallet(web3API, walletAddress) {
		const currency_addresses = currencies.map((currency) => currency.address);
		const balances_list = await Promise.all(currency_addresses.map((address) => web3API.getBalanceToken(address, walletAddress)));
		return balances_list;
	}

	function initBalances() {
		return currencies.map((currency) => undefined);
	}

	useEffect(() => {
		fetchInternalWalletAddresses();
	}, []);

	useEffect(() => {
		fetchPrices();
		fetchBalances();
	}, [metamask.status, metamask.address]);

	useEffect(() => {
		fetchBalances();
	}, [walletList]);

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
									src={Logo}
									className={styles.tabNavLogo}
									alt="Internal Wallet"
								/>{" "}
								Internal
							</>
						);
					}
				}}
				getBody={(tabId) => {
					if (tabId === "metamask") {
						return (
							<Balances
								balances={allBalances[0]}
								prices={prices}
								metamask={metamask}
								walletAddress={metamask.address}
								fetchBalances={fetchBalances}
							/>
						);
					} else if (tabId === "internal") {
						return (
							<Balances
								balances={allBalances[1]}
								prices={prices}
								metamask={null}
								walletAddress={walletList[0]}
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

	if (isMetaMask && metamask.status !== "connected") {
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

											<div className={styles.walletAddressWrapper}>
												<input
													className={`${inputStyles.input} ${inputStyles.dashboardInput}`}
													type={"text"}
													value={walletAddress}
													disabled={true}
												/>
												<CopyToClipboard text={walletAddress} onCopy={() => setInfoMessage("Wallet address copied!")}>
													<Button color="white" className={styles.clipboardButton}>
														<img src={copyClipboard} className={styles.copyClipboard} alt="Copy to clipboard" />
													</Button>
												</CopyToClipboard>
											</div>
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

								<table>
									<tbody>
										<tr>
											<td>Amount:</td>
											<td>{withdrawAmount} {withdrawCurrency}</td>
										</tr>
										<tr>
											<td>Address:</td>
											<td>{withdrawAddress}</td>
										</tr>
									</tbody>
								</table>

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