import styles from "./layout.module.css";
import Button from "./../button/button";

import Android from "../../assets/icon/android2.svg";
import Apple from "../../assets/icon/apple2.svg";
import Chevron from "../../assets/icon/chevron.svg";

import Dummy from "../../assets/image/dummy.png";

import Checkmark from "../../assets/icon/singleCheckmark.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

const Layout = ({
  heading,
  title,
  load = false,
  description,
  button,
  button2,
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
        heading || load ? "load hero" : ""
      } container`}
    >
      <div
        className={heading || load ? "" : "scroll"}
        style={{ order: reverse ? 2 : 1 }}
      >
        {subtitle && (
          <p className={`${styles.subtitle} subtitle`}>{subtitle}</p>
        )}
        {heading && <h1>{heading}</h1>}
        {title && <h3>{title}</h3>}

        {description && (
          <p className={`standard ${styles.description}`}>{description}</p>
        )}

        {list && (
          <div className={styles.list}>
            <div>
              <img src={Checkmark} alt="Checkmark" />
              <p>{content[0]}</p>
            </div>
            <div>
              <img src={Checkmark} alt="Checkmark" />
              <p>{content[1]}</p>
            </div>
            <div>
              <img src={Checkmark} alt="Checkmark" />
              <p>{content[2]}</p>
            </div>
            <div>
              <img src={Checkmark} alt="Checkmark" />
              <p>{content[3]}</p>
            </div>
          </div>
        )}

        <div className={styles.buttonWrapper}>
          {button && <Button link="/signup">{button}</Button>}
          {button2 && (
            <div className={styles.button}>
              <p>{button2}</p>
              <div className={styles.imgWrapper}>
                <img src={Chevron} alt="chevron arrow" />

                <div className={styles.buttonLine}></div>
              </div>
            </div>
          )}

          {store && (
            <div className={styles.store}>
              <p className="standard">{t("home.heroAvailable")}</p>

              <div className={styles.buttonWrapperMob}>
                <Button link="/" color="white">
                  <img src={Android} alt="android logo" />
                  <span>Play Store</span>
                </Button>
                <Button link="/" color="white">
                  <img src={Apple} alt="apple logo" />
                  <span>App Store</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {!video && (
        <img
          className={
            heading || load ? "" : reverse ? "slide-right" : "slide-left"
          }
          src={image}
          alt="nefentus graphics"
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
