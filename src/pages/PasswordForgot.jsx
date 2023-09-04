import PassswordForgot from "./../components/passwordForgot/passwordForgot";
import Helmet from "react-helmet";

const Login = () => {
    return (
        <div className="dashboardFont">
            <Helmet>
                <title>Nefentus | Password forgotten</title>
            </Helmet>
            <PassswordForgot />
        </div>
    );
};

export default Login;
