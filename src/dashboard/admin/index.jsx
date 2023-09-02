import Button from "../../components/button/button";
import Input, { Options } from "../../components/input/input";
import StatsCard from "../statsCard/statsCard";
import { transformNumber } from "../func/transformNumber";
import Graph from "../graph/graph";
import Header from "../header/header";
import TopInfo from "../topInfo/topInfo";
import styles from "./admin.module.css";
import { options } from "./../graph/graph";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ModalOverlay from "../modal/modalOverlay";
import adminDashboardApi from "../../api/adminDashboardApi";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table";
import { formatUSDBalance } from "../../utils";
import { ROLE_TO_NAME } from "../../constants";
import CopyValue from "../copyValue";
import { MessageContext } from "../../context/message";
import MessageComponent from "../../components/message";

const header = [
	"Name",
	"Email",
	"Roles",
	"Status",
	"Income ($)",
	"Joined on",
	"Action",
];

const colSizes = [2, 2, 1, 1, 1, 1, 1];

const AdminBody = ({ type }) => {
	const [cardInfo, setCardInfo] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [graphData, setGraphData] = useState([]);
	const [value, setValue] = useState("");
	const [barContent, setBarContent] = useState([]);
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [openModal, setOpenModal] = useState(false);

	const { setInfoMessage, setErrorMessage } = useContext(MessageContext);

	const navigate = useNavigate();
	const adminApi = new adminDashboardApi(type);
	const affiliate = type === "affiliate";

	useEffect(() => {
		fetchAdminData();
	}, []); 

	const fetchAdminData = async () => {
		const result = await adminApi.checkPermission();
		if (result !== true) {
			navigate("/login");
		} else {
			const getPromises = [
				adminApi.getTotalRegistrations(),
				adminApi.getTotalClicks(),
				adminApi.getTotalIncome(),
				adminApi.getUsers(),
				adminApi.getRoleReport(),
				adminApi.getTotalIncomesPerDay()
			]
      
        	const [dataReg, dataClick, dataInc, dataUsers, reportResp, totalPricePerDate] = await Promise.all(getPromises);

			const cardsContent = [
				{
					title: "Total Income",
					amount: dataInc.number,
					percentage: dataInc.percentage,
					isMonetary: true,
				},
				{
					title: "Clicks",
					amount: dataClick.number,
					percentage: dataClick.percentage,
					isMonetary: false,
				},
				{
					title: "Registrations",
					amount: dataReg.number,
					percentage: dataReg.percentage,
					isMonetary: false,
				},
			];
			console.log(cardsContent)
			setCardInfo(cardsContent);
    
			updateUsers(dataUsers);

			console.log(reportResp);
			setBarContent(reportResp);

			setGraphData(totalPricePerDate);
			console.log(totalPricePerDate)
      	}
    };

	useEffect(() => {
		if (searchText === "") {
			setFilteredData(tableData);
		} else {
			const filtered = tableData.filter((item) => {
				return item[0].toLowerCase().includes(searchText.toLowerCase()) || 
					item[1].toLowerCase().includes(searchText.toLowerCase()) || 
					item[2].toLowerCase().includes(searchText.toLowerCase());
			});
			setFilteredData(filtered);
		}
	}, [searchText, tableData]);

	function updateUsers(dataUsers) {
		console.log(dataUsers)
		if (dataUsers) {
			const newDataUsers = dataUsers.map(user => [
				user.fullname,
				user.email,
				user.roles.map(role => ROLE_TO_NAME[role.replace(" ", "")]).join(', '),
				(
					<span className={`${styles.box} ${user.activated ? styles.approved : styles.pending}`}>{user.activated ? "active" : "not active"}</span>
				),
				formatUSDBalance(user.income),
				new Date(user.createdAt).toLocaleString(),
				!user.activated ? ( <span className={styles.activateLink} onClick={() => activateUser(user.email)}>Activate</span> ) : ""

			]);
			console.log(newDataUsers);
			setTableData(newDataUsers);
  		}
	}

	const activateUser = async (userEmail) => {
		const resp = await adminApi.patchStatus(userEmail);
		if (resp) {
			const newUserData = await adminApi.getUsers();
			updateUsers(newUserData);
		}
	};

	const changeSearchText = async (searchText) => {
		console.log(searchText)
		setSearchText(searchText);
	}

  	const addUser = async () => {
		if (type === "admin") {
			const resp = await adminApi.addUser(email, password, value);
			if (resp === true) {
				setOpenModal(false);
				fetchAdminData();
			}
		}
 	};

	const affiliateLinkCopied = async () => {
		setInfoMessage("Affiliate link copied to clipboard");
	}

  return (
    <>
      <div className={styles.body}>
        <Header title={ROLE_TO_NAME[type] + " Dashboard"} />

        <TopInfo
          title="Overview"
          description="Check information on income, clicks, and registrations."
        >
			<div className={styles.topButtonWrapper}>
				{!affiliate && (
					<Button onClick={() => setOpenModal(true)}>
						Add User
					</Button>
				)}
				<Button color="white" onClick={() => navigate("/dashboard/vendor")}>
					Vendor Dashboard
				</Button>
			</div>
        </TopInfo>

		<MessageComponent />

		{affiliate && (
			<div className={styles.affiliateLink}>
				<p className={styles.affiliateLabel}>Affiliate link: </p>

				<CopyValue 
					value={`https://nefentus.com/?affiliate=${localStorage.getItem("affiliateLink")}`}
					onCopy={() => affiliateLinkCopied(true)}
					inputStyle={{width: "400px"}}
					buttonStyle={{padding: "100px !important"}}
				/>
			</div>
		)}

        <div className={`${styles.rows}`}>
          {cardInfo.map((item) => (
            <StatsCard
			  key={item.title}
              title={item.title}
              amount={item.amount}
              percentage={item.percentage}
			  isMonetary={item.isMonetary}
            />
          ))}

          <Graph data={graphData} style={{gridColumn: affiliate ? "1/4" : "1/3"}} />

		  { !affiliate && (
          <div className={`${styles.registration} card`}>
            <h3>Registrations Roles</h3>

			<div
              style={{ gridTemplateColumns: barContent.map((item) => `${item.percentage}fr`).join(" ") }}
              className={styles.bar}
            >
              {barContent.map((item) => (
                <div
				    key={item.role}
					className={styles["bar" + ROLE_TO_NAME[item.role].replace(" ", "")]}
                ></div>
              ))}
            </div>

            <div className={styles.percentageLabel}>
              <p>0%</p>
              <p>100%</p>
            </div>

            <div className={styles.totalBox}>
              <div className={styles.totalBoxTop}>
                <p>Total</p>
                <p className={styles.label}>
                  {barContent.reduce((total, item) => {
                    const amount = Number(item.count);
                    return total + (isNaN(amount) ? 0 : amount);
                  }, 0)}
                </p>
              </div>

              <div className={styles.infoBox}>
                <div className={styles.left}>
                  {barContent.map((item) => (
                    <div key={item.role} className={styles.leftLine}>
                      <div className={styles["lineBox" + ROLE_TO_NAME[item.role].replace(" ", "")]}></div>
                      <div className={styles.name}>{ROLE_TO_NAME[item.role]}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.right}>
                  <div className={styles.amount}>
                    {barContent.map((item) => (
                      <p key={item.role}>{item.count}</p>
                    ))}
                  </div>
                  <div className={styles.percentage}>
                    {barContent.map((item) => (
                      <p key={item.role}>{item.percentage}%</p>
                    ))}
                  </div>
                </div>
              </div>

              {type === "admin" && (
                <div className={styles.button}>
                  <Button color="white" link={"/dashboard/kyc"}>
                    KYC Requests
                  </Button>
                </div>
              )}
            </div>
          </div>
		  )}
        </div>

		<div className={styles.tableWrapper}>
			<div className={styles.top}>
				<h4>User Management</h4>

				<div className={styles.inputs}>
					<Input placeholder="Search" dashboard value={searchText} setState={changeSearchText} />
				</div>
			</div>
			<Table
				headers={header} 
				data={filteredData} 
				colSizes={colSizes}
				striped 
			/>
		</div>
      </div>

      <div className={styles.modalWrapper}>
        {openModal && (
          <ModalOverlay>
            <div className={styles.modal}>
              <h4>Create User</h4>

              <div className={styles.modalInputs}>
                <Input dashboard label="Email" placeholder={"Enter email"} value={email} setState={setEmail} />
                <Input
                  dashboard
                  label="Password"
                  placeholder={"Enter password"}
                  setState={setPassword}
                  value={password}
                  secure
                />

                {type === "admin" && <Options
                  label="Roles"
                  value={value}
                  options={[
                    "Vendor",
                    "Affiliate",
                    "Broker",
                    "Senior Broker",
                    "Leader",
                  ]}
                  dashboard
                  setValue={setValue}
                />}
				{type === "leader" && <Options
                    label="Roles"
                    value={value}
                    options={[
                      "Vendor",
                      "Affiliate",
                      "Broker",
                      "Senior Broker",
                    ]}
                    dashboard
                    setValue={setValue}
                />}
                {type === "seniorbroker" && <Options
                  label="Roles"
                  value={value}
                  options={[
                    "Vendor",
                    "Affiliate",
                    "Broker"
                  ]}
                  dashboard
                  setValue={setValue}
                />}
				{type === "broker" && <Options
                  label="Roles"
                  value={value}
                  options={[
                    "Vendor",
                    "Affiliate"
                  ]}
                  dashboard
                  setValue={setValue}
                />}
              </div>
              <div className={styles.modalButtons}>
                <div
                  className={styles.button}
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </div>
                <Button onClick={addUser} color="white">Add User</Button>
              </div>
            </div>
          </ModalOverlay>
        )}
      </div>
    </>
  );
};

export default AdminBody;
