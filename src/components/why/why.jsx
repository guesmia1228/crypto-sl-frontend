import styles from "./why.module.css";

import Image from "../../assets/image/why.png";

const Why = ({ title, content, image = Image }) => {
  return (
    <div className={`container break ${styles.section}`}>
      <img className="slide-right" src={image} alt="" />

      <div className={`${styles.content}`}>
        <h3 className="slide-left">{title}</h3>

        {content.map((item) => (
          <div className={`${styles.item} slide-left`}>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Why;
