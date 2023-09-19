import HeadingCenter from "../headingCenter/headingCenter";

import styles from "./reviews.module.css";

import Image1 from "../../assets/image/reviews/image1.png";
import Image2 from "../../assets/image/reviews/image2.png";
import Image3 from "../../assets/image/reviews/image3.png";
import { useTranslation } from "react-i18next";

import Video2 from "../../assets/video/leon.mp4";
import { useRef, useState } from "react";

import Speaker from "../../assets/icon/speaker.svg";

const list = [
  {
    image: Image1,
  },
  {
    image: Image2,
    video: Video2,
  },
  {
    image: Image3,
  },
];

const Reviews = () => {
  const { t } = useTranslation();

  const [showVideo, setShowVideo] = useState([false, false, false]);

  const [muted, setMuted] = useState([false, false, false]);

  const content = t("home.reviewList", { returnObjects: true });

  const videoRefs = [useRef(null), useRef(null), useRef(null)];

  const handleMouseEnter = (index) => {
    setShowVideo((prev) => {
      prev[index] = true;

      return [...prev];
    });

    videoRefs[index].current.play();
  };

  const handleMuted = (index) => {
    videoRefs[index].current.muted = !videoRefs[index].current.muted;

    setMuted((prev) => {
      prev[index] = !prev[index];

      return [...prev];
    });
  };

  const handleMouseLeave = (index) => {
    setShowVideo([false, false, false]);

    videoRefs[index].current.pause();
  };

  return (
    <div className={`container  ${styles.reviews}`}>
      <HeadingCenter
        subtitle={t("home.reviewSubtitle")}
        title={
          <>
            {t("home.reviewTitleP1")}
            <br />
            {t("home.reviewTitleP2")}
          </>
        }
      />

      <div className={styles.row}>
        {list.map((item, index) => (
          <div
            key={index}
            className="card scroll"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className={styles.image}>
              <div
                className={styles.imageVideo}
                style={{ opacity: showVideo[index] ? 1 : 0 }}
              >
                <div
                  className={styles.speaker}
                  style={{ opacity: muted[index] ? 1 : 0.25 }}
                >
                  <img
                    src={Speaker}
                    alt=""
                    onClick={() => handleMuted(index)}
                  />
                </div>
                <video loop muted playsInline ref={videoRefs[index]}>
                  <source src={item.video} type="video/mp4" />
                </video>
              </div>
              <div className={styles.blur}>
                <div className={styles.overlay}></div>
                <img src={item.image} alt="" />
              </div>
              <p>{content[index].name}</p>
              <p>{content[index].position}</p>
            </div>

            <div className={styles.body}>
              <p className={styles.text}>“{content[index].message}”</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
