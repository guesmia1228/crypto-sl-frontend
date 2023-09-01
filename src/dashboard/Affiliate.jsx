import AdminBody from "./admin/index";
import { Helmet } from "react-helmet";

const Affiliate = () => {
  return (
    <div className="container">
      <Helmet>
        <title>Nefentus | Dashboard</title>
      </Helmet>
      <AdminBody type={"affiliate"} />
    </div>
  );
};

export default Affiliate;
