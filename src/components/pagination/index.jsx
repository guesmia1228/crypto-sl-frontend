import styles from "./pagination.module.css";
import { useState } from "react";
import classNames from "classnames";
import { Options } from "../input/input";

const Pagination = ({renderItems, length, initPageSize}) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [pageSize, setPageSize] = useState(initPageSize || 10);

	const numPages = Math.ceil(length/pageSize);

	function updatePage(page) {
		console.log("Render items from " + page*pageSize + " to " + (page+1)*pageSize);
		setCurrentPage(page);
		renderItems(page*pageSize, (page+1)*pageSize);
	}

    return (
        <div className={styles.paginationWrapper}>
            <nav aria-label="pagination" className={styles.nav}>
				<ul className={styles.pagination}>
					<li onClick={() => updatePage(0)} className={classNames({[styles.hide]: currentPage === 0})}>«</li>
					<li onClick={() => updatePage(currentPage-1)} className={classNames({[styles.hide]: currentPage === 0})}>‹</li>
					<li class="current"><PageInput value={currentPage+1} updatePage={updatePage}/> of {numPages}</li>
					<li onClick={() => updatePage(currentPage + 1)} className={classNames({[styles.hide]: currentPage + 1 === numPages})}>›</li>
					<li onClick={() => updatePage(numPages-1)} className={classNames({[styles.hide]: currentPage + 1 === numPages})}>»</li>
				</ul>
			</nav>

			<Options 
				options={[10, 20, 50, 100]}
				value={pageSize}
				setValue={(newPageSize) => setPageSize(newPageSize)}
			/>
        </div>
    );
};

const PageInput = ({value, updatePage}) => {
	return (
		<input 
			className={styles.pageInput}
			value={value}
			onChange={(e) => updatePage(e.target.value - 1)}
			type="text" 
		/>
	);
}

export default Pagination;
