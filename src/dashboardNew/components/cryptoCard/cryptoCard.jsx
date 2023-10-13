import Button from "../button/button";
import Card from "../card/card";
import styles from "./cryptoCard.module.css";

import Bitcoin from "../../../assets/icon/crypto/bitcoin.svg";

const data = [
  {
    icon: Bitcoin,
    title: "Bitcoin",
    subtitle: "100c",
    value: "$380,000.00",
    cryptoValue: "22.41854",
  },
  {
    icon: Bitcoin,
    title: "Bitcoin",
    subtitle: "100c",
    value: "$380,000.00",
    cryptoValue: "22.41854",
  },
  {
    icon: Bitcoin,
    title: "Bitcoin",
    subtitle: "100c",
    value: "$380,000.00",
    cryptoValue: "22.41854",
  },
  {
    icon: Bitcoin,
    title: "Bitcoin",
    subtitle: "100c",
    value: "$380,000.00",
    cryptoValue: "22.41854",
  },
  {
    icon: Bitcoin,
    title: "Bitcoin",
    subtitle: "100c",
    value: "$380,000.00",
    cryptoValue: "22.41854",
  },
];

const CryptoCard = () => {
  return (
    <Card>
      <div className={styles.top}>
        <div className={styles.label}>Crypto Market</div>

        <div className={styles.buttons}>
          <Button color="transparent">Receive</Button>
          <Button color="white">Send</Button>
        </div>
      </div>

      <div className={styles.body}>
        {data.map((item) => (
          <CryptoItem data={item} />
        ))}
      </div>
    </Card>
  );
};

export default CryptoCard;

const CryptoItem = ({ data }) => {
  return (
    <div className={styles.cryptoItem}>
      <div className={styles.left}>
        <img src={data.icon} alt="" />

        <div>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.subtitle}>{data.subtitle}</div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>{data.value}</div>
        <div className={styles.subtitle}>{data.cryptoValue}</div>
      </div>
    </div>
  );
};
