import Layout from "../components/layout/layout";

import Logos from "../components/logos/logos";
import Cards from "../components/cards/cards";
import About from "../components/about/about";
import backendAPI from "../api/backendAPI";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

import { Helmet } from "react-helmet";

import Image1 from "../assets/image/paymentHome.webp";
import Main from "../assets/image/main.svg";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import PaymentCards from "../components/paymentCards/paymentCards";
import Prices from "../components/prices/prices";

const Home = () => {
  const { t } = useTranslation();
  const api = new backendAPI();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("affiliate")) {
      const paramValue = urlParams.get("affiliate");
      localStorage.setItem("affiliateJoined", paramValue);
      api.countAffiliate(paramValue);
    }
  }, []);

  useEffect(()=>{
    if (window.Tawk_API && window.Tawk_API.showWidget) {
      window.Tawk_API?.showWidget();
    }
    return () => {
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget();
      }
    }
  },[])

  return (
    <>
      <Helmet>
        <title>Nefentus | Accept Crypto Payments Risk Free</title>
      </Helmet>
      <Layout
        heading={
          <>
            {t("home.heroTitle")}
            <div className="gradient"> {t("home.heroTitleGradient")}</div>
          </>
        }
        description={t("home.heroDescription")}
        button={
          <>
            <p>{t("home.heroButton")}</p>
          </>
        }
        button2={t("home.heroButton2")}
        image={Main}
        full
        // video={HomeHeroVideo}
        store
        children={<Prices />}
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

      <About />

      {/* <Reviews /> */}

      {/* <Help /> */}

      <PaymentCards />

      <TawkMessengerReact
        propertyId="651eae886fcfe87d54b6cbb6"
        widgetId="1hbvtji86"
      />
    </>
  );
};

export default Home;
