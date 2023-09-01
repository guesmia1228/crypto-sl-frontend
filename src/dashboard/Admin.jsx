import AdminBody from "./admin/index";
import { Helmet } from "react-helmet";

const Admin = ({ type }) => {
  return (
    <div className="container">
      <Helmet>
        <title>Nefentus | Dashboard</title>
      </Helmet>
      <AdminBody type={type} />
    </div>
  );
};

export default Admin;
