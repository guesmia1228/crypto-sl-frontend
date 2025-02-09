import AdminBody from "./admin/index";
import { Helmet } from "react-helmet";
import Footer from "./footer";

const Affiliate = () => {
  return (
    <>
      <div className="container dashboardContainer">
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
