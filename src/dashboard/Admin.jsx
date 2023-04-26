import AdminBody from "./admin/index";

const Admin = ({ type }) => {
  return (
    <div className="container">
      <AdminBody type={type} />
    </div>
  );
};

export default Admin;
