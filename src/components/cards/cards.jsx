import HeadingCenter from "../headingCenter/headingCenter";
import styles from "./cards.module.css";

import Video1 from "../../assets/video/phone.mp4";
import Video2 from "../../assets/video/chart.mp4";
import Video3 from "../../assets/video/target.mp4";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import separateText from "../../func/separate";

const list = [
  {
    video: Video1,
  },
  {
    video: Video2,
  },
  {
    video: Video3,
  },
];

const Cards = () => {
  const { t } = useTranslation();

  const list2 = t("home.cardList", { returnObjects: true });

  const sectionRef = useRef(null);
  const videoRefs = [useRef(null), useRef(null), useRef(null)];

  const handleLoad = (videoRef) => {
    if (window.innerWidth > 900) return;

    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {})
          .catch((error) => {
            console.log("Playback prevented by browser");
          });
      }
    }
  };

  const handleEnter = (videoRef) => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleLeave = (videoRef) => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    const handleScroll = (scrollEvent) => {
      const minValue = window.innerHeight * 0.4;
      const scrollPos =
        window.innerHeight - sectionRef.current.getBoundingClientRect().top;

      if (scrollPos > minValue) {
        sectionRef.current.children[0].style.transform = "scale(1)";
        sectionRef.current.children[0].style.opacity = 1;

        setTimeout(() => {
          sectionRef.current.children[1].style.transform = "scale(1)";
          sectionRef.current.children[1].style.opacity = 1;

          setTimeout(() => {
            sectionRef.current.children[2].style.transform = "scale(1)";
            sectionRef.current.children[2].style.opacity = 1;
          }, 250);
        }, 250);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`container break ${styles.section}`}>
      <HeadingCenter
        subtitle={t("home.cardSubtitle")}
        title={
          <>
            {t("home.cardTitleP1")} <br className={styles.headerSpace} />
            {t("home.cardTitleP2")}
          </>
        }
      />

      <div className={styles.cards} ref={sectionRef}>
        {list.map((item, index) => (
          <div
            className={`${styles.card} card`}
            // onMouseEnter={() => handleEnter(videoRefs[index])}
            // onMouseLeave={() => handleLeave(videoRefs[index])}
          >
            <video
              ref={videoRefs[index]}
              className="cardVideo"
              autoPlay
              playsInline
              muted
              loop
              onLoadedData={() => handleLoad(videoRefs[index])}
            >
              <source src={item.video} type="video/mp4" />
            </video>
            <p>{separateText(list2[index].title)}</p>
            <p className="standard">{list2[index].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
