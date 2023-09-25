import Header from "../header/header";
import PercentageInfo from "../percentageInfo/percentageInfo";
import TopInfo from "../topInfo/topInfo";

import Bitcoin from "../../assets/icon/crypto/bitcoin.svg";
import Polygon from "../../assets/icon/crypto/polygon.svg";
import Cardano from "../../assets/icon/crypto/cardano.svg";
import Binance from "../../assets/icon/crypto/binance.svg";
import Etherium from "../../assets/icon/crypto/etherium.svg";

import styles from "./wallet.module.css";
import Input, { Options } from "./../../components/input/input";
import { useState } from "react";
import Button from "../../components/button/button";

const data = [
  {
    icon: Bitcoin,
    name: "Bitcoin",
    abbr: "BTC",
    amountDollar: "$380,000.00",
    amountCrypto: "22.41854",
  },
  {
    icon: Polygon,
    name: "Polygon",
    abbr: "MATIC",
    amountDollar: "$380,000.00",
    amountCrypto: "22.41854",
  },
  {
    icon: Cardano,
    name: "Cardano",
    abbr: "ADA",
    amountDollar: "$380,000.00",
    amountCrypto: "22.41854",
  },
  {
    icon: Etherium,
    name: "Etherium",
    abbr: "ETC",
    amountDollar: "$380,000.00",
    amountCrypto: "22.41854",
  },
  {
    icon: Binance,
    name: "Binance",
    abbr: "BNB",
    amountDollar: "$380,000.00",
    amountCrypto: "22.41854",
  },
];

const WalletBody = () => {
  const [value, setValue] = useState("Choose one");

  return (
    <div className="dashboard-body">
      <Header title="Wallet" />

      <TopInfo
        title={"Check your balance"}
        description={
          "Add more funds to your wallet or you can withdraw them here."
        }
      />

      <div className={styles.body}>
        <div className={`${styles.balance} card`}>
          <div className={styles.balanceTop}>
            <div className={styles.balanceInfo}>
              <h4>Balance</h4>

              <p>$58,345,190.00</p>

              <PercentageInfo amount={58345190} percentage={2.11} />
            </div>

            <div className={styles.buttons}>
              <div className={`${styles.button} ${styles.button1}`}>
                Receive
              </div>
              <div className={`${styles.button} ${styles.button2}`}>Send</div>
            </div>
          </div>

          <div className={styles.table}>
            {data.map((item) => (
              <CryptoLine data={item} />
            ))}
          </div>
        </div>

        <div className={`${styles.withdrawal} card`}>
          <h3>Withdrawal</h3>

          <div className={styles.inputs}>
            <Options
              label="Currency options"
              value={value}
              options={["Bitcoin", "Bitcoin", "Bitcoin", "Bitcoin", "Bitcoin"]}
              setValue={setValue}
              dashboard
            />

            <Input label={"Amount"} placeholder={"Enter amount"} dashboard />
          </div>

          <div className={styles.address}>
            <Input
              label={"Address"}
              placeholder={"0x71C7656EC7ab88b0e21Gs976f"}
              disabled
              dashboard
            />
          </div>

          <Button color="white">Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default WalletBody;

const CryptoLine = ({ data }) => {
  return (
    <div className={styles.line}>
      <div className={styles.lineLeft}>
        <img src={data.icon} alt="crypto data icon" />
        <div>
          <p className={styles.name}>{data.name}</p>
          <p className={styles.abbr}>{data.abbr}</p>
        </div>
      </div>

      <div className={styles.amounts}>
        <p className={styles.dollar}>{data.amountDollar}</p>
        <p className={styles.crypto}>{data.amountCrypto}</p>
      </div>
    </div>
  );
};
