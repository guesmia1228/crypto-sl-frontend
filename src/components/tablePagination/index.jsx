import Table from "../table";
import Pagination from "../pagination";
import { useState, useEffect } from "react";

const TablePagination = ({ headers, data, colSizes, colColored, colHighlighted, striped, className }) => {
	const [pageData, setPageData] = useState([]);

	const pageSize = 10;

	useEffect(() => {
		setPageData(data.slice(0, pageSize));
	}, [data]);

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
				renderItems={(start, end) => setPageData(data.slice(start, end))}
				length={data.length}
			/>
		</>
	)
}

export default TablePagination;
