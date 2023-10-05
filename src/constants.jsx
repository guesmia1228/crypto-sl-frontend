import Bitcoin from "./assets/icon/crypto/bitcoin.svg";
import Polygon from "./assets/icon/crypto/polygon.svg";
import Cardano from "./assets/icon/crypto/cardano.svg";
import Binance from "./assets/icon/crypto/binance.svg";
import Ethereum from "./assets/icon/crypto/ethereum.svg";
import Tether from "./assets/icon/crypto/tether.svg";
import USDC from "./assets/icon/crypto/usdc.svg";
import Ripple from "./assets/icon/crypto/xrp.svg";
import DAI from "./assets/icon/crypto/dai.svg";
import SwapAndDistribute1 from "./assets/abi/SwapAndDistribute1.json";
import SwapAndDistribute2 from "./assets/abi/SwapAndDistribute2.json";

export const ROLE_TO_NAME = {
	"vendor": "Vendor",
	"affiliate": "Affiliate",
	"broker": "Broker",
	"seniorbroker": "Senior Broker",
	"senior broker": "Senior Broker",
	"leader": "Leader",
	"admin": "Admin",
}

export const currencies = [
  {
    icon: Ethereum,
    name: "Ethereum",
    abbr: "ETH",
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    decimals: 18,
  },
  {
    icon: Tether,
    name: "Tether",
    abbr: "USDT",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    decimals: 6,
  },
  {
    icon: USDC,
    name: "USD Coin",
    abbr: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimals: 6,
  },
  {
    icon: Bitcoin,
    name: "Bitcoin",
    abbr: "BTC",
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    decimals: 8,
  },
  {
    icon: Binance,
    name: "Binance Coin",
    abbr: "BNB",
    address: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
    decimals: 18,
  },
  {
    icon: Ripple,
    name: "Ripple",
    abbr: "XRP",
    address: "0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe",
    decimals: 18,
  },
  {
    icon: DAI,
    name: "DAI",
    abbr: "DAI",
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    decimals: 18,
  },
  {
    icon: Polygon,
    name: "Polygon",
    abbr: "MATIC",
    address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
    decimals: 18,
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

export const coinList = [
  {
    icon: Ethereum,
    name: "Ethereum",
    abbr: "ETH",
    url: "ethereum"
  },
  {
    icon: Bitcoin,
    name: "Bitcoin",
    abbr: "BTC",
    url: "bitcoin"
  },
  {
    icon: Cardano,
    name: "Cardano",
    abbr: "ADA",
    url: "cardano"
  },
  {
    icon: Binance,
    name: "Binance Coin",
    abbr: "BNB",
    url: "binancecoin"
  },
  {
    icon: Ripple,
    name: "Ripple",
    abbr: "XRP",
    url: "ripple"
  },
//   {
//     icon: Polygon,
//     name: "Polygon",
//     abbr: "MATIC",
//     url: "matic-network"
//   }
]