import Logo from "../../../assets/logo/logo.svg";
import Logo2 from "../../../assets/logo/logo2.svg";
import User from "../../../assets/icon/user.svg";
import Notification from "../../../assets/icon/notification.svg";
import LightMode from "../../../assets/icon/lightMode.svg";
import DarkMode from "../../../assets/icon/darkMode.svg";

import styles from "./topNavigation.module.css";
import { useEffect, useState } from "react";
import SideNavigation from "../sideNavigation/sideNavigation";
import LanguageBox from "../../components/language/language";

const TopNavigation = () => {
  const [lightMode, setLightMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const [openLanguage, setOpenLanguage] = useState(false);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (window.innerHeight >= 900) return;

    const changeHeight = () => {
      setHeight(window.innerHeight);
    };

    changeHeight();

    window.addEventListener("resize", changeHeight);

    return () => window.removeEventListener("resize", changeHeight);
  });

  return (
    <>
      <div className={styles.container}>
        <img className={styles.logo} src={Logo} alt="" />
        <img className={styles.logo2} src={Logo2} alt="" />
        <div className={styles.rightSide}>
          <div className={styles.profileImage}>
            <img src={profileImage ? profileImage : User} alt="Profile" />
          </div>

          <div>
            <img src={Notification} alt="" />
          </div>
          <div>
            <LanguageBox />
          </div>
          <div onClick={() => setLightMode((prev) => !prev)}>
            {lightMode ? (
              <img src={DarkMode} alt="" />
            ) : (
              <img src={LightMode} alt="" />
            )}
          </div>

          <div className={styles.mobMenu}>
            <div
              className={`${styles.line} ${openMenu ? styles.openLine : ""}`}
            ></div>
            <div
              className={`${styles.line} ${openMenu ? styles.openLine : ""}`}
            ></div>
            <div
              className={`${styles.line} ${openMenu ? styles.openLine : ""}`}
            ></div>

            <div
              onClick={() => setOpenMenu((prev) => !prev)}
              className={styles.lineButton}
            ></div>
          </div>
        </div>
      </div>

      <div
        className={styles.sideWrapper}
        style={{ top: !openMenu ? "-100%" : "46px", height: height - 46 }}
      >
        <SideNavigation />
      </div>
    </>
  );
};

export default TopNavigation;
