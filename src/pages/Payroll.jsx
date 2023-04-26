import Layout from "./../components/layout/layout";
import IconRow from "./../components/iconRow/iconRow";
import PayrollHero from "../components/payrollHero/payrollHero";
import OptionCards from "../components/optionCards/optionCards";

import Logo1 from "../assets/icon/payroll/logo1.svg";
import Logo2 from "../assets/icon/payroll/logo2.svg";
import Logo3 from "../assets/icon/payroll/logo3.svg";
import Logo4 from "../assets/icon/payroll/logo4.svg";
import Logo5 from "../assets/icon/payroll/logo5.svg";
import Logo6 from "../assets/icon/payroll/logo6.svg";
import Logo7 from "../assets/icon/payroll/logo7.svg";
import { useTranslation } from "react-i18next";

import Image1 from "../assets/image/payroll1.png";
import Image2 from "../assets/image/payroll2.svg";
import Image3 from "../assets/image/payroll3.svg";
import { Helmet } from "react-helmet";

const list = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7];

const Payroll = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>Nefentus | Payroll</title>
      </Helmet>
      <PayrollHero />
      <Layout
        title={<>{t("payroll.manageTitle")}</>}
        description={t("payroll.manageDescription")}
        button={t("payroll.manageButton")}
        subtitle={t("payroll.manageSubtitle")}
        image={Image1}
      />

      <Layout
        subtitle={t("payroll.organizeSubtitle")}
        title={<>{t("payroll.organizeSubtitle")}</>}
        description={t("payroll.organizeDescription")}
        button={t("payroll.manageButton")}
        reverse={true}
        image={Image2}
      />

      <Layout
        title={
          <>
            {t("payroll.trackTitleP1")}
            <br className="" />
            {t("payroll.trackTitleP2")}
          </>
        }
        description={t("payroll.trackDescription")}
        subtitle={t("payroll.trackSubtitle")}
        button={t("payroll.manageButton")}
        image={Image3}
      />

      <IconRow
        subtitle={t("payroll.iconSubtitle")}
        title={
          <>
            {t("payroll.iconTitleP1")}
            <br className="md-mob" />
            {t("payroll.iconTitleP2")}
          </>
        }
        description={t("payroll.iconDescription")}
        list={list}
      />

      <OptionCards />
    </div>
  );
};

export default Payroll;
