import styles from "./table.module.css";
import classNames from "classnames";

const Table = ({
  headers,
  data,
  colSizes,
  colColored,
  colHighlighted,
  striped,
  className,
}) => {
  if (!colSizes) {
    colSizes = data[0].map(() => 1);
  }
  colSizes = colSizes.map((size) => `${size}fr`).join(" ");

  if (!colColored) colColored = [];

  if (!colHighlighted) colHighlighted = [];

  return (
    <div className={classNames(styles.card, "card", className)}>
      <div className={classNames(styles.table, { [styles.striped]: striped })}>
        {headers && (
          <div className={styles.tableHead}>
            <ul style={{ gridTemplateColumns: colSizes }}>
              {headers.map((header) => (
                <li key={"header" + header}>{header}</li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.tableBody}>
          {data.map((items, rowIndex) => (
            <ul key={rowIndex} style={{ gridTemplateColumns: colSizes }}>
              {items.map((item, colIndex) => (
                <li
                  key={rowIndex + "_" + colIndex}
                  className={classNames({
                    [styles.colored]: colColored.includes(colIndex),
                    [styles.highlighted]: colHighlighted.includes(colIndex),
                  })}
                >
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
