import AdminBody from "./admin/index";
import { Helmet } from "react-helmet";
import Footer from "../components/footer/footer";

const Affiliate = () => {
  return (
	<>
		<div className="container dashboardFont">
			<Helmet>
				<title>Nefentus | Dashboard</title>
			</Helmet>
			<AdminBody type={"affiliate"} />
		</div>
		<Footer />
	</>
  );
};

export default Affiliate;
