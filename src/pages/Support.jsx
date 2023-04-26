import SupportBody from "./../components/supportBody/supportBody";
import { Helmet } from "react-helmet";

const Support = () => {
  return (
    <div>
      <Helmet>
        <title>Nefentus | Support</title>
      </Helmet>
      <SupportBody />
    </div>
  );
};

export default Support;
