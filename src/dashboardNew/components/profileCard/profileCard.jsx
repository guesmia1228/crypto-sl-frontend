import { useState } from "react";
import Card from "../card/card";

import styles from "./profileCard.module.css";

const ProfileCard = () => {
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3161&q=80",
  );

  return (
    <Card className={styles.profileCard}>
      <div className={styles.profileWrapper}>
        <div className={styles.profileImage}>
          <img src={profileImage} alt="" />
        </div>
        <div>
          <p className={styles.main}>Erin Vaccaro</p>
          <p className={styles.subtitle}>erin.vaccaro@gmail.com</p>
        </div>
      </div>
      <div>
        <p className={styles.main}>Wallet:</p>
        <p className={styles.subtitle}>0x5A1B3D9fC8bEeD74008</p>
      </div>
      <div>
        <p className={styles.main}>Plan:</p>
        <p className={styles.subtitle}>Enterprise</p>
      </div>
    </Card>
  );
};

export default ProfileCard;
