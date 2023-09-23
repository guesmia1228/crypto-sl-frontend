import Table from "../table";
import Pagination from "../pagination";
import { useState, useEffect } from "react";

const TablePagination = ({ headers, data, colSizes, colColored, colHighlighted, striped, className }) => {
	const [pageData, setPageData] = useState([]);

	useEffect(() => {
		setPageData(data.slice(0, 10));
	}, [data]);

	function renderItems(start, end) {
		setPageData(data.slice(start, end));
		console.log("Render items from " + start + " to " + end)

	}

	return (
		<>
			<Table
				headers={headers}
				data={pageData}
				colSizes={colSizes}
				colColored={colColored}
				colHighlighted={colHighlighted}
				striped={striped}
				className={className}
			/>

			<Pagination 
				renderItems={renderItems}
				length={data.length}
			/>
		</>
	)
}

export default TablePagination;
