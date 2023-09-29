import styles from "./logos.module.css";

import Logo1 from "../../assets/icon/logos/logo1.svg";
import Logo2 from "../../assets/icon/logos/logo2.svg";
import Logo3 from "../../assets/icon/logos/logo3.svg";
import Logo4 from "../../assets/icon/logos/logo4.svg";
import Logo5 from "../../assets/icon/logos/logo5.svg";
import Logo6 from "../../assets/icon/logos/logo6.svg";

import Line from "../../assets/image/line.svg";
import { useEffect, useRef } from "react";

const list = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6];

const Logos = () => {
  useEffect(() => {
    const line1 = document.querySelector(".line1");
    const line2 = document.querySelector(".line2");

    setTimeout(() => {
      line1.classList.add("move1");
      line2.classList.add("move2");
    }, 1000);
  }, []);

  return (
    <div className={` ${styles.logos}`}>
      <div className={styles.line}>
        <img src={Line} alt="line" />
      </div>
      <div className={styles.logoImage}>
        <div className={`${styles.line1} line1`}>
          {list.map((logo) => (
            <img src={logo} alt="crypto logo" />
          ))}
        </div>
        <div className={`${styles.line2} line2`}>
          {list.map((logo) => (
            <img src={logo} alt="crypto logo" />
          ))}
        </div>
      </div>
      <div className={styles.line}>
        <img src={Line} alt="line" />
      </div>
    </div>
  );
};

export default Logos;
