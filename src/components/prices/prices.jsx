import { useEffect, useState } from 'react';
import { coinList } from "../../constants";
import styles from "./prices.module.css";

const Prices = () => {
  const [prices, setPrices] = useState([]);

  useEffect(()=>{
    const getPrices = async () => {
      const prices = await Promise.all(
        coinList.map(async (coin) => {
          const price = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coin.url}`
          );
          const priceJson = await price.json();
          return {
            ...coin,
            price: priceJson.market_data.current_price.usd,
            priceChange: priceJson.market_data.price_change_percentage_24h,
          };
        })
      );
      setPrices(prices);
    };
    getPrices()

  },[])
  return (
    prices && <div className={styles.container}>
        {prices?.map(price=>{
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
              <span className={`${styles.abbr} ${price.priceChange>=0 ? styles.positive : styles.negative}`}>{price.priceChange.toFixed(2)}%</span>
            </div>
          );
        })}
      </div>
  )
}

export default Prices