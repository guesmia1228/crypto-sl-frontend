import React from "react";
import HeadingCenter from "../headingCenter/headingCenter";

import Image1 from "../../assets/image/grow1.svg";
import Image2 from "../../assets/image/grow2.svg";
import Image3 from "../../assets/image/grow3.svg";
import Card from "./card/card";

import styles from "./grow.module.css";
import { useTranslation } from "react-i18next";

const content = [
  {
    image: Image1,
  },
  {
    image: Image2,
  },
  {
    image: Image3,
  },
];

const Grow = () => {
  const { t } = useTranslation();

  const listContent = t("payment.growContent", { returnObjects: true });

  return (
    <div className="container break">
      <HeadingCenter
        subtitle={t("payment.growSubtitle")}
        title={
          <>
            {t("payment.growTitle")}
            {/* <br />
            {t("payment.growTitle2")} */}
          </>
        }
      />

      <div className={styles.body}>
        <div className={styles.left}>
          <Card
            num={1}
            title={listContent[0].title}
            description={listContent[0].description}
            image={content[0].image}
            button={listContent[0].button}
          />
          <Card
            num={window.innerWidth > 900 ? 3 : 2}
            title={listContent[2].title}
            description={listContent[2].description}
            image={content[2].image}
            button={listContent[2].button}
          />
        </div>
        <div className={styles.right}>
          <Card
            num={window.innerWidth > 900 ? 2 : 3}
            title={listContent[1].title}
            description={listContent[1].description}
            image={content[1].image}
            button={listContent[1].button}
          />
        </div>
      </div>
    </div>
  );
};

export default Grow;
