import { ethers } from "ethers";

export function formatTokenBalance(x) {
	const parsedFloat = parseFloat(x);
	if (isNaN(parsedFloat)) {
		return "loading";
	} else {
		return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	}
}

export function formatUSDBalance(x) {
	const parsedFloat = parseFloat(x);
	if (isNaN(parsedFloat)) {
		return "loading";
	} else {
		return parsedFloat.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	}
}

export function nullToZeroAddress(address) {
	if (address === null)
		return ethers.constants.AddressZero;
	return address;
}

export function zeroAddressToNull(address) {
	if (address === ethers.constants.AddressZero)
		return null;
	return address;
}

export function toChecksumAddress (address) {
	if (address === null)
		return null;
	return ethers.utils.getAddress(address);
}