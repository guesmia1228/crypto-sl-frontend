import AdminBody from "./admin/index";
import { Helmet } from "react-helmet";
import Footer from "../components/footer/footer";

const Admin = ({ type }) => {
  return (
	<>
		<div className="container">
		<Helmet>
			<title>Nefentus | Dashboard</title>
		</Helmet>
		<AdminBody type={type} />
		</div>
		<Footer />
	</>
  );
};

export default Admin;
