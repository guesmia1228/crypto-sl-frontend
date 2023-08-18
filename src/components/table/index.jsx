import styles from "./table.module.css";
import classNames from "classnames";

const Table = ({ headers, data, colSizes, colColored, colHighlighted, striped, className }) => {
	if (!colSizes) {
		colSizes = data[0].map(() => 1);
	}
	colSizes = colSizes.map((size) => `${size}fr`).join(" ");

	if (!colColored)
		colColored = [];

	if (!colHighlighted)
		colHighlighted = [];

	return (
		<div className={classNames(
			styles.card,
			"card",
			className
		)}>
		  <div className={classNames(
				styles.table,
				{[styles.striped]: striped}
			)}>
			{headers && (
				<div className={styles.tableHead}>
					<ul style={{gridTemplateColumns: colSizes}}>
						{headers.map((header) => (
							<li>{header}</li>
						))}
					</ul>
				</div>
			)}
			<div className={styles.tableBody}>
				{data.map((items) => (
				<ul style={{gridTemplateColumns: colSizes}}>
					{items.map((item, index) => (
						<li className={classNames({
							[styles.colored]: colColored.includes(index),
							[styles.highlighted]: colHighlighted.includes(index),
						}) }>{item}</li>
					))}
				</ul>
				))}
			</div>
		  </div>
		</div>
	)
}

export default Table;
