import Button from "../button/button";
import styles from "./why.module.css";

const Why = ({ title, content, image = Image, button }) => {
  return (
    <div className={`container break ${styles.section}`}>
      <img className="slide-right" src={image} alt="table/testimonials" />

      <div className={`${styles.content}`}>
        <h3 className="slide-left">{title}</h3>

        {content.map((item, index) => (
          <div key={index} className={`${styles.item} slide-left`}>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}

        <div className={`slide-left`}>
          <Button link="/">{button}</Button>
        </div>
      </div>
    </div>
  );
};

export default Why;
