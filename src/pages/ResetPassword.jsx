import ResetPasswords from "./../components/resetPassword/resetPassword";
import { Helmet } from "react-helmet";

const ResetPassword = () => {
    return (
        <div>
            <Helmet>
                <title>Nefentus | Password-forgot</title>
            </Helmet>
            <ResetPasswords className="dashboardFont" />
        </div>
    );
};

export default ResetPassword;
