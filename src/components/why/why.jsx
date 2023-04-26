import styles from "./why.module.css";

import Image from "../../assets/image/why.png";

const Why = ({ title, content, image = Image }) => {
  return (
    <div className={`container break ${styles.section}`}>
      <img className="scroll" src={image} alt="" />

      <div className={`scroll ${styles.content}`}>
        <h2>{title}</h2>

        {content.map((item) => (
          <div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Why;
