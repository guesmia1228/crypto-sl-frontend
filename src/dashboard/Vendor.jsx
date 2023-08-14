import { Helmet } from "react-helmet";
import VendorBody from "./vendor/index";

const Vendor = () => {
	return (
		<div style={{ height: "100vh" }}>
			<Helmet>
				<title>Nefentus | Vendor Dashboard</title>
			</Helmet>
			<VendorBody />
		</div>
	);
};

export default Vendor;
