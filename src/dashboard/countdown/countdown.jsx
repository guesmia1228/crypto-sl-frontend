import React, { useEffect, useState } from "react";

import styles from "./countdown.module.css";

function Countdown() {
  const expirationDate = new Date("June 13, 2023 23:59:59");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const setTime = () => {
      const now = new Date();
      const difference = Math.floor((expirationDate - now) / 1000);

      if (difference < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / 86400);
        const hours = Math.floor((difference % 86400) / 3600);
        const minutes = Math.floor((difference % 3600) / 60);
        const seconds = difference % 60;
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    setTime();

    const timer = setInterval(() => {
      setTime();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.countdown}>
      <h2>Coming Soon:</h2>
      <div className={styles.countdownTimer}>
        <span>{timeLeft.days}</span>
        <span>d</span>
        <span>{timeLeft.hours}</span>
        <span>h</span>
        <span>{timeLeft.minutes}</span>
        <span>m</span>
        <span>{timeLeft.seconds}</span>
        <span>s</span>
      </div>
    </div>
  );
}

export default Countdown;
