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