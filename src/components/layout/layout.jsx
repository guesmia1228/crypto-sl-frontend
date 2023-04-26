import styles from "./layout.module.css";
import Button from "./../button/button";

import Android from "../../assets/icon/android.svg";
import Apple from "../../assets/icon/apple.svg";

import Dummy from "../../assets/image/dummy.png";

import Checkmark from "../../assets/icon/singleCheckmark.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

const Layout = ({
  heading,
  title,
  description,
  button,
  image = Dummy,
  store,
  subtitle,
  reverse,
  video,
  list,
}) => {
  const { t } = useTranslation();

  const content = t("affiliate.affiliateList", { returnObjects: true });

  const videoRef = useRef(null);

  const handleLoad = (event) => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Reprodukcija počinje
          })
          .catch((error) => {
            console.log("Playback prevented by browser");
          });
      }
    }
  };

  return (
    <div
      className={`${styles.layout} ${heading ? styles.hero : ""} ${
        heading ? "load hero" : ""
      } container`}
    >
      <div
        className={heading ? "" : "scroll"}
        style={{ order: reverse ? 2 : 1 }}
      >
        {subtitle && (
          <p className={`${styles.subtitle} subtitle`}>{subtitle}</p>
        )}
        {heading && <h1>{heading}</h1>}
        {title && <h2>{title}</h2>}

        {description && (
          <p className={`standard ${styles.description}`}>{description}</p>
        )}

        {list && (
          <div className={styles.list}>
            <div>
              <img src={Checkmark} alt="" />
              <p>{content[0]}</p>
            </div>
            <div>
              <img src={Checkmark} alt="" />
              <p>{content[1]}</p>
            </div>
            <div>
              <img src={Checkmark} alt="" />
              <p>{content[2]}</p>
            </div>
            <div>
              <img src={Checkmark} alt="" />
              <p>{content[3]}</p>
            </div>
          </div>
        )}

        {button && <Button link="/signup">{button}</Button>}

        {store && (
          <div className={styles.store}>
            <p className="standard">{t("home.heroAvailable")}</p>

            <div>
              <Link to="/">
                <img src={Android} alt="" />
              </Link>
              <Link to="/">
                <img src={Apple} alt="" />
              </Link>
            </div>
          </div>
        )}
      </div>
      {!video && (
        <img
          className={heading ? "" : "scroll"}
          src={image}
          alt=""
          style={{ order: reverse ? 1 : 2 }}
        />
      )}

      {video && (
        <video
          onLoadedData={handleLoad}
          ref={videoRef}
          style={{ order: reverse ? 1 : 2 }}
          className={heading ? "" : ""}
          controls={false}
          autoPlay
          playsInline
          muted
          loop
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default Layout;
