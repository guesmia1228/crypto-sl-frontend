import HeadingCenter from "../headingCenter/headingCenter";

import styles from "./iconRow.module.css";

const IconRow = ({ subtitle, title, description, list }) => {
  return (
    <div className={`container scroll break ${styles.section}`}>
      <HeadingCenter noScroll subtitle={subtitle} title={title} />
      <p className={`${styles.description}`}>{description}</p>
      <div className={`${styles.logos}`}>
        {list.map((image) => (
          <div>
            <img src={image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconRow;
