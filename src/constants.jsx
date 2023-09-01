import Bitcoin from "./assets/icon/crypto/bitcoin.svg";
import Polygon from "./assets/icon/crypto/polygon.svg";
import Cardano from "./assets/icon/crypto/cardano.svg";
import Binance from "./assets/icon/crypto/binance.svg";
import Ethereum from "./assets/icon/crypto/ethereum.svg";
import Tether from "./assets/icon/crypto/tether.svg";
import USDC from "./assets/icon/crypto/usdc.svg";
import SwapAndDistribute1 from "./assets/abi/SwapAndDistribute1.json";
import SwapAndDistribute2 from "./assets/abi/SwapAndDistribute2.json";

export const ROLE_TO_NAME = {
	"vendor": "Vendor",
	"affiliate": "Affiliate",
	"broker": "Broker",
	"seniorbroker": "Senior Broker",
	"leader": "Leader",
	"admin": "Admin",
}

export const currencies = [
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

export const ownerAddress = "0xBE011f8F08d05feCc83abeabb6C38b987B9bdD45";

export const contractDeposits = [
	{
		id: 1,
		address: "0xC5a70e940925cBF02F093C8Fb20a7202D7afE2C4",
		abi: SwapAndDistribute1
	},
	{
		id: 2,
		address: "0xd577766dd079c123ce677b8a27f9a01e5f4c9905",
		abi: SwapAndDistribute2
	}
];