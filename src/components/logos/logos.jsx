import styles from "./logos.module.css";

import Logo1 from "../../assets/icon/logos/logo1.svg";
import Logo2 from "../../assets/icon/logos/logo2.svg";
import Logo3 from "../../assets/icon/logos/logo3.svg";
import Logo4 from "../../assets/icon/logos/logo4.svg";
import Logo5 from "../../assets/icon/logos/logo5.svg";
import Logo6 from "../../assets/icon/logos/logo6.svg";

import Line from "../../assets/image/line.svg";

const list = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6];

const Logos = () => {
  return (
    <div className={` ${styles.logos}`}>
      <div className={styles.line}>
        <img src={Line} alt="" />
      </div>
      <div className={styles.logoImage}>
        <div className={styles.line1}>
          {list.map((logo) => (
            <img src={logo} />
          ))}
        </div>
        <div className={styles.line2}>
          {list.map((logo) => (
            <img src={logo} />
          ))}
        </div>
      </div>
      <div className={styles.line}>
        <img src={Line} alt="" />
      </div>
    </div>
  );
};

export default Logos;
