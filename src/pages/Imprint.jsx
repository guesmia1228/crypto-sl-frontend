import ImprintBody from "./../components/imprintBody/imprintBody";
import { Helmet } from "react-helmet";

const Imprint = () => {
  return (
    <div>
      <Helmet>
        <title>Nefentus | Imprint</title>
      </Helmet>
      <ImprintBody />
    </div>
  );
};

export default Imprint;
