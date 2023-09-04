import PassswordForgot from "./../components/passwordForgot/passwordForgot";
import Helmet from "react-helmet";

const Login = () => {
    return (
        <div>
            <Helmet>
                <title>Nefentus | Password forgotten</title>
            </Helmet>
            <PassswordForgot className="dashboardFont" />
        </div>
    );
};

export default Login;
