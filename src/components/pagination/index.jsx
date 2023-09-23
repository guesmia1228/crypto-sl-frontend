import styles from "./pagination.module.css";
import { useState } from "react";
import classNames from "classnames";
import { Options } from "../input/input";

const Pagination = ({renderItems, length, initPageSize}) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [pageSize, setPageSize] = useState(initPageSize || 10);

	const numPages = Math.ceil(length/pageSize);

	function updatePage(page) {
		setCurrentPage(page);
		renderItems(page*pageSize, (page+1)*pageSize);
	}

	function updatePageSize(newPageSize) {
		setPageSize(newPageSize);
		renderItems(currentPage*newPageSize, (currentPage+1)*newPageSize);
	}

    return (
        <div className={styles.paginationWrapper}>
            <nav aria-label="pagination" className={styles.nav}>
				<ul className={styles.pagination}>
					<li onClick={() => updatePage(0)} className={classNames({[styles.hide]: currentPage === 0})}>«</li>
					<li onClick={() => updatePage(currentPage-1)} className={classNames({[styles.hide]: currentPage === 0})}>‹</li>
					<li><PageInput value={currentPage+1} updatePage={updatePage}/> of {numPages}</li>
					<li onClick={() => updatePage(currentPage + 1)} className={classNames({[styles.hide]: currentPage + 1 === numPages})}>›</li>
					<li onClick={() => updatePage(numPages-1)} className={classNames({[styles.hide]: currentPage + 1 === numPages})}>»</li>
				</ul>
			</nav>

			<Options 
				options={[10, 20, 50, 100]}
				value={pageSize}
				setValue={updatePageSize}
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
