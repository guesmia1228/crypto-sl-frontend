import { useState, useEffect } from "react";
import backendAPI from "../../api/backendAPI";

function useInternalWallet() {
	// Use a öist even though currently only one wallet is supported
	const [walletList, setWalletList] = useState([]);
	const backend_Api = new backendAPI();

	async function fetchInternalWalletAddresses() {
		const newWalletList = await backend_Api.getWalletAddresses();
		if (newWalletList) {
			setWalletList(newWalletList);
		}
	}

	useEffect(() => {
		fetchInternalWalletAddresses();
	}, []);

	return walletList.length > 0 ? walletList[0] : undefined;
  }

export default useInternalWallet;