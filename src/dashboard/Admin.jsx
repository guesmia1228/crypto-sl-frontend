import AdminBody from "./admin/index";
import { Helmet } from "react-helmet";
import Footer from "./footer";

const Admin = ({ type }) => {
  return (
    <>
      <div className="container dashboardFont">
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
