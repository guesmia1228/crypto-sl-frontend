import Layout from "./../components/layout/layout";

import Image from "../assets/image/affiliate.svg";
import Image2 from "../assets/image/affiliate2.png";
import Why from "./../components/why/why";
import Compare from "../components/compare/compare";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import HeroAff from "../components/heroAff/heroAff";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

const Affiliate = () => {
  useEffect(() => {
    checkPermissions();
  }, []);

  useEffect(() => {
    if (window.Tawk_API && window.Tawk_API.showWidget) {
      window.Tawk_API?.showWidget();
    }
    return () => {
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget();
      }
    };
  }, []);

  const checkPermissions = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Der Benutzer ist nicht angemeldet
      return;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch("http://localhost:8080/api/test/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const { t } = useTranslation();

  const content = t("affiliate.whyContent", { returnObjects: true });

  return (
    <div>
      <Helmet>
        <title>Nefentus | Affiliate</title>
      </Helmet>
      <HeroAff />

      <Layout
        subtitle={t("affiliate.heroSubtitle")}
        title={t("affiliate.heroHeading")}
        description={t("affiliate.heroDescription")}
        image={Image}
        list
        load
      />

      <Why
        title={
          <>
            {t("affiliate.whyTitleP1")}
            <br />
            {t("affiliate.whyTitleP2")}
          </>
        }
        button={t("affiliate.whyButton")}
        content={content}
        image={Image2}
      />

      <Compare />

      <TawkMessengerReact
        propertyId="651eae886fcfe87d54b6cbb6"
        widgetId="1hbvtji86"
      />
    </div>
  );
};

export default Affiliate;
