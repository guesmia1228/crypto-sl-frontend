import { useEffect, useState } from 'react';
import { currencies } from "../../constants";
import { uniswapApi } from "../../api/web3Api";
import styles from "./prices.module.css";

const Prices = () => {
  const [prices, setPrices] = useState([]);
  const uniswap = new uniswapApi();

  useEffect(()=>{
    const getData = async () => {
      try {
        const data = currencies.map(async (currency) => {
          const data = await uniswap.getUSDCPriceForToken(currency.address);
          return { ...currency, price: data };
        });
        const prices = await Promise.all(data);
        setPrices(prices);
      } catch (err) {
        console.log(err);
      }
    };
    getData();

  },[])
  return (
    prices && <div className={styles.container}>
        {prices.map(price=>{
          return (
            <div className={styles.price_box}>
              <div className={styles.main_info}>
                <img
                  src={price.icon}
                  alt={price.name}
                  className={styles.logo}
                />
                <p className={styles.currency}>
                  <span className={styles.abbr}>{price.abbr}</span> {price.name}
                </p>
              </div>
              <span className={styles.abbr}>${price.price.toFixed(2)}</span>
              <span className={`${styles.abbr} ${styles.positive}`}>{price.price.toFixed(2)}%</span>
            </div>
          );
        })}
      </div>
  )
}

export default Prices