import { useState } from "react";
import styles from "./tabs.module.css";

const Tabs = ({ tabIds, initActiveTab, getHeader, getBody, beforeChangeTab }) => {
	const [activeTabId, setActiveTabId] = useState(initActiveTab);

	return (
		<div className={`${styles.tabBody} card`}>
			<div className={styles.tabNav}>
				{tabIds.map((tabId) => 
					<div
						key={tabId}
						className={styles.tabNavItem}
						onClick={() => { 
							if (beforeChangeTab)
								beforeChangeTab(tabId);
							setActiveTabId(tabId);
						}}
						style={{
							borderColor: activeTabId === tabId ? "#fff" : "transparent",
							color: activeTabId === tabId ? "#fff" : "#c4c4c4",
						}}
					>
						{getHeader(tabId)}
					</div>
				)}
			</div>

			{getBody(activeTabId)}
		</div>
	)
}

export default Tabs;
