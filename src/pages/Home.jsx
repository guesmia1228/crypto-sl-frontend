import Layout from "../components/layout/layout";
import Navigation from "../components/navigation/navigation";

import Arrow from "../assets/icon/arrow.svg";
import Circle from "../components/circle/circle";
import Logos from "../components/logos/logos";
import Cards from "../components/cards/cards";
import About from "../components/about/about";
import Reviews from "../components/reviews/reviews";
import backendAPI from "../api/backendAPI";
import Cookies from "universal-cookie";
import HomeHeroVideo from "../assets/video/homeHero.mp4";

import { Helmet } from "react-helmet";

import Image1 from "../assets/image/paymentHome.png";
import Image2 from "../assets/image/payrollHome.png";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const Home = () => {
  const { t, i18n } = useTranslation();
  const api = new backendAPI();
  const cookies = new Cookies();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("affiliate")) {
      const paramValue = urlParams.get("affiliate");
      localStorage.setItem("affiliateJoined", paramValue);
      api.countAffiliate(paramValue);
    }

    console.log(cookies.get("profile_pic"));
  }, []);

  return (
    <>
      <Helmet>
        <title>Nefentus | Home</title>
      </Helmet>
      {/* <Circle /> */}
      <Layout
        heading={t("home.heroTitle")}
        description={t("home.heroDescription")}
        button={
          <>
            <p>{t("home.heroButton")}</p>
            <img src={Arrow} alt="" />
          </>
        }
        video={HomeHeroVideo}
        store={true}
      />

      <Logos />
      <Cards />

      <Layout
        subtitle={t("home.simplifySubtitle")}
        title={t("home.simplifyTitle")}
        description={t("home.simplifyDescription")}
        button={t("home.layoutButton")}
        image={Image1}
      />

      <Layout
        title={
          <>
            {t("home.payrollTitleP1")} <br /> {t("home.payrollTitleP2")}
          </>
        }
        description={t("home.payrollDescription")}
        button={t("home.layoutButton")}
        subtitle={t("home.payrollSubtitle")}
        reverse={true}
        image={Image2}
      />

      <About />

      <Reviews />
    </>
  );
};

export default Home;
