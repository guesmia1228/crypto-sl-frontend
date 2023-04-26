import Signup from "./../components/signup/signup";
import { Helmet } from "react-helmet";

const SignUp = () => {
  return (
    <div>
      <Helmet>
        <title>Nefentus | SignUp</title>
      </Helmet>
      <Signup />
    </div>
  );
};

export default SignUp;
