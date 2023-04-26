import AffiliateBody from "./affiliate/index";
import { Helmet } from "react-helmet";

const Affiliate = () => {
  return (
    <div>
      <Helmet>
        <title>Nefentus | Affiliate</title>
      </Helmet>
      <AffiliateBody />
    </div>
  );
};

export default Affiliate;
