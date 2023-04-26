import styles from "./profileBox.module.css";

import Arrow from "../../assets/icon/dropdownWhite.svg";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import backendAPI from "../../api/backendAPI";
import BlobPicture from "../../components/blobPicture/blobPicture";
const ProfileBox = () => {

  return (
    <div className={styles.profileBox}>
      <div className={styles.avatar}>
        <BlobPicture />
      </div>
      <div className={styles.info}>
        <div className={styles.nameBox}>
          <p className={styles.name}>{localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")}</p>
          <img src={Arrow} alt="" />
        </div>
        <p className={styles.email}>{localStorage.getItem("email")}</p>
      </div>
    </div>
  );
};

export default ProfileBox;
