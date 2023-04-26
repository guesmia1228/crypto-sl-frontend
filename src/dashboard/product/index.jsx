import Button from "../../components/button/button";
import Header from "../header/header";
import styles from "./product.module.css";

import Edit from "../../assets/icon/edit.svg";
import Delete from "../../assets/icon/delete.svg";
import TopInfo from "../topInfo/topInfo";

const ProductBody = () => {
  return (
    <div className={`dashboard-body`}>
      <Header title="Products" />

      <TopInfo
        title="Total"
        description={
          <>
            You’ve added <span>3</span> new product this month
          </>
        }
      >
        <Button color="white">Create New product</Button>
      </TopInfo>

      <div className={styles.row}>
        <Card
          title="Chainlink oracle"
          description="Decentralized middleware that enables smart contracts to access
          off-chain data."
          price="30,000.00 $"
          image=""
        />
        <Card
          title="Chainlink oracle"
          description="Decentralized middleware that enables smart contracts to access
          off-chain data."
          price="30,000.00 $"
          image=""
        />
        <Card
          title="Chainlink oracle"
          description="Decentralized middleware that enables smart contracts to access
          off-chain data."
          price="30,000.00 $"
          image=""
        />
      </div>
    </div>
  );
};

export default ProductBody;

const Card = ({ title, description, image, price }) => {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.imageWrapper}>
        <div className={styles.icons}>
          <img src={Edit} alt="" />
          <img src={Delete} alt="" />
        </div>
        <img src={image} alt="" className={styles.image} />
      </div>

      <div className={styles.body}>
        <h4>{title}</h4>

        <p className={styles.description}>{description}</p>

        <p className={styles.price}>{price}</p>

        <div className={styles.button}>Watch</div>
      </div>
    </div>
  );
};
