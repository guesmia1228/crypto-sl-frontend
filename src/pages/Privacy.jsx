import PrivacyBody from "./../components/privacyBody/privacyBody";
import { Helmet } from "react-helmet";

const Privacy = () => {
  return (
    <div>
      <Helmet>
        <title>Nefentus | Privacy</title>
      </Helmet>
      <PrivacyBody />
    </div>
  );
};

export default Privacy;
