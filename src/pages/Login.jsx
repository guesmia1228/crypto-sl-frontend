import LoginBox from "./../components/loginBox/loginBox";
import { Helmet } from "react-helmet";

const Login = () => {
  return (
    <div>
      <Helmet>
        <title>Nefentus | Login</title>
      </Helmet>
      <LoginBox />
    </div>
  );
};

export default Login;
