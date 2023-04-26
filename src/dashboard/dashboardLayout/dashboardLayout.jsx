import Sidebar from "../sidebar/sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard">
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
