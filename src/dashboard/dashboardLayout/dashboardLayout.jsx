import Sidebar from "../sidebar/sidebar";
import Countdown from "../countdown/countdown";
import Header from "../header/header";
import Footer from "../footer";

const DashboardLayout = ({ children }) => {
	const roles = localStorage.getItem("roles");
	const roleArray = roles.split(",");
	const isAdmin = roleArray.includes("ROLE_ADMIN");

	if (isAdmin) {
		return (
			<>
				<div className="dashboard dashboardFont">
					<Sidebar />
					<div>
						{children}
						<Footer />
					</div>
				</div>
			</>
		);
	} else {
		return (
			<div className="container dashboardFont">
				<Header title="Dashboard" logo={true} />
				<div>
				<Countdown />
				</div>
			</div>
		);
	}
};

export default DashboardLayout;
