import SideNavigation from "../sideNavigation/sideNavigation";
import TopNavigation from "../topNavigation/topNavigation";

import styles from "./screenLayout.module.css";

const ScreenLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <TopNavigation />

      <div className={styles.body}>
        <div className={styles.side}>
          <SideNavigation />
        </div>

        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};

export default ScreenLayout;
