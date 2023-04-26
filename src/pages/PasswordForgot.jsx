import PassswordForgot from "./../components/passwordForgot/passwordForgot";
import { Helmet } from "react-helmet";

const Login = () => {
    return (
        <div>
            <Helmet>
                <title>Nefentus | Password-forgot</title>
            </Helmet>
            <PassswordForgot />
        </div>
    );
};

export default Login;
