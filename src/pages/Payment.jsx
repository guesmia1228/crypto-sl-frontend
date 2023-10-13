import Layout from "./../components/layout/layout";

import Arrow from "../assets/icon/arrow.svg";
import Grow from "../components/grow/grow";
import IconRow from "./../components/iconRow/iconRow";
import Why from "../components/why/why";
import DataCards from "../components/dataCards/dataCards";
import PaymentCards from "./../components/paymentCards/paymentCards";

import Logo1 from "../assets/icon/methods/logo1.svg";
import Logo2 from "../assets/icon/methods/logo2.svg";
import Logo3 from "../assets/icon/methods/logo3.svg";
import Logo4 from "../assets/icon/methods/logo4.svg";
import Logo5 from "../assets/icon/methods/logo5.svg";
import Logo6 from "../assets/icon/methods/logo6.svg";
import Logo7 from "../assets/icon/methods/logo7.svg";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import HeroImage from "../assets/image/paymentHero.png";
import WhyImage from "../assets/image/whyNew.png";
import { Helmet } from "react-helmet";

const list = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7];

const Payment = () => {
  const { t } = useTranslation();

  const content = t("payment.whyContent", { returnObjects: true });

  return (
    <div>
      <Helmet>
        <title>Nefentus | Payment</title>
      </Helmet>
      {/* <Circle /> */}
      <Layout
        heading={
          <>
            <div className="gradient"> {t("payment.heroHeadingGradient")}</div>
            {t("payment.heroHeading")}
          </>
        }
        description={t("payment.heroDescription")}
        button={
          <>
            <p>{t("payment.heroButton")}</p>
          </>
        }
        image={HeroImage}
      />

      <Grow />
      <IconRow
        subtitle={t("payment.iconSubtitle")}
        title={<>{t("payment.iconTitleP1")}</>}
        description={t("payment.iconDescription")}
        list={list}
      />

      <Why
        title={t("payment.whyTitle")}
        content={content}
        image={WhyImage}
        button={t("payment.whyButton")}
      />
      <DataCards />

      <PaymentCards />
    </div>
  );
};

export default Payment;
