import ProfileBox from "./../profileBox/profileBox";

import backend_API from "../../api/backendAPI";

import styles from "./header.module.css";

import Logo from "../../assets/logo/logo.svg";
import Logout from "../../assets/icon/logout.svg";
import Settings from "../../assets/icon/settings.svg";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ title, logo }) => {
  const backendAPI = new backend_API();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const data = await backendAPI.signout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.navigation}>
      {logo && <img src={Logo} alt="Nefentus payment solutions" />}

      {title && <h2>{title}</h2>}

      <div className={styles.right}>
        <div className={`${styles.settingsBody} card`}>
          <Link to="/dashboard/settings" className={styles.logout}>
            <img src={Settings} alt="settings" />
            <p>Settings</p>
          </Link>
          <Link onClick={logOut} to="#" className={styles.logout}>
            <img src={Logout} alt="logout" />
            <p>Log out</p>
          </Link>
        </div>

        <ProfileBox />
      </div>
    </div>
  );
};

export default Header;
