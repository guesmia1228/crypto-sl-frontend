import { useState, useEffect } from "react";
import { uniswapApi } from "../../api/web3Api";
import { currencies } from "../../constants";

function useBalances(metamask) {
	const [prices, setPrices] = useState([initPrices(), initPrices()]);

	function initPrices() {
		return currencies.map((currency) => undefined);
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

	useEffect(() => {
		fetchPrices();
	}, []);

	return { prices, fetchPrices };
}

export default useBalances;