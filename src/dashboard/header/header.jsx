import ProfileBox from "./../profileBox/profileBox";

import backend_API from "../../api/backendAPI";

import styles from "./header.module.css";

import Logo from "../../assets/logo/logo.svg";
import Logout from "../../assets/icon/logout.svg";
import Settings from "../../assets/icon/settings.svg";
import { Link } from "react-router-dom";

const Header = ({ title }) => {
  const backendAPI = new backend_API();

  const logOut = async () => {
    try {
      const data = await backendAPI.signout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.navigation}>
      <h2>{title}</h2>

      <div className={styles.right}>
        <div className={`${styles.settingsBody} card`}>
          <Link to="/dashboard/settings" className={styles.logout}>
            <img src={Settings} alt="" />
            <p>Settings</p>
          </Link>
          <Link onClick={logOut} to="/" className={styles.logout}>
            <img src={Logout} alt="" />
            <p>Log out</p>
          </Link>
        </div>

        <ProfileBox />
      </div>
    </div>
  );
};

export default Header;
