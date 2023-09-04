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

export function dashboardLink(localStorage) {
	const roles = localStorage.getItem("roles");
	const roleArray = roles.split(",");
	const isVendor = roleArray.includes("ROLE_VENDOR");
	const isAffiliate = roleArray.includes("ROLE_AFFILIATE");
	const isBroker = roleArray.includes("ROLE_BROKER");
	const isSeniorBroker = roleArray.includes("ROLE_SENIOR_BROKER");
	const isLeader = roleArray.includes("ROLE_LEADER"); 
	const isAdmin = roleArray.includes("ROLE_ADMIN");

	if (isAdmin) {
		return "/dashboard/admin";
	} else if (isVendor) {
		return "/dashboard/vendor";
	} else if (isAffiliate) {
		return "/dashboard/affiliate";
	} else if (isBroker) {
		return "/dashboard/broker";
	} else if (isSeniorBroker) {
		return "/dashboard/seniorbroker";
	} else if (isLeader) {
		return "/dashboard/leader";
	}
}