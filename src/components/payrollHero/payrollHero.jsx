import styles from "./payrollHero.module.css";
import HeadingCenter from "./../headingCenter/headingCenter";

import Image from "../../assets/image/payrollHero.png";
import { useTranslation } from "react-i18next";

const PayrollHero = () => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.section} payroll container`}>
      <div>
        <HeadingCenter
          title={
            <>
              {t("payroll.heroTitleP1")}
              <br />
              {t("payroll.heroTitleP2")}
            </>
          }
          subtitle={t("payroll.heroSubtitle")}
        />
        <p className={`${styles.description}`}>
          {t("payroll.heroDescription")}
        </p>
      </div>

      <img src={Image} alt="" />
    </div>
  );
};

export default PayrollHero;
