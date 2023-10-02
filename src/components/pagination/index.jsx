import styles from "./pagination.module.css";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Options } from "../input/input";

const Pagination = ({renderItems, data}) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);

	const length = data.length;
	const numPages = Math.ceil(length/pageSize);

	function updatePage(page) {
		setCurrentPage(page);
		renderItems(page*pageSize, (page+1)*pageSize);
	}

	function updatePageSize(newPageSize) {
		setPageSize(newPageSize);
		setCurrentPage(0);
		renderItems(0, newPageSize);
	}

	useEffect(() => {
		renderItems(currentPage*pageSize, (currentPage+1)*pageSize);
	}, [data]);

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

const PageInput = ({value, updatePageSize}) => {
	return (
		<input 
			className={styles.pageInput}
			value={value}
			onChange={(e) => updatePageSize(e.target.value - 1)}
			type="text" 
		/>
	);
}

export default Pagination;
