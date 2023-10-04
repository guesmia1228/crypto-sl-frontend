import { Helmet } from "react-helmet";
import VendorBody from "./vendor/index";

const Vendor = () => {
  return (
    <div>
      <Helmet>
        <title>Nefentus | Vendor Dashboard</title>
      </Helmet>
      <VendorBody />
    </div>
  );
};

export default Vendor;
