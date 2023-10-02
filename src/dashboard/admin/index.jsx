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
import TablePagination from "../../components/tablePagination";
import { formatUSDBalance } from "../../utils";
import { ROLE_TO_NAME } from "../../constants";
import CopyValue from "../copyValue";
import { MessageContext } from "../../context/message";
import MessageComponent from "../../components/message";
import imputStyles from "../../components/input/input.module.css";
import { tab } from "@testing-library/user-event/dist/tab";

const header = [
	"First Name",
	"Last Name",
	"Email",
	"Roles",
	"Status",
	"Income ($)",
	"Joined on",
	"Actions",
];

const colSizes = [1, 1, 2, 1, 1, 1, 1, 2];

const AdminBody = ({ type }) => {
	const [cardInfo, setCardInfo] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [graphData, setGraphData] = useState([]);
	const [role, setRole] = useState("");
	const [barContent, setBarContent] = useState([]);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [openModal, setOpenModal] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [editEmailAddress, setEditEmailAddress] = useState(null);

	const { setInfoMessage, setErrorMessage, clearMessages } = useContext(MessageContext);

	const navigate = useNavigate();
	const adminApi = new adminDashboardApi(type);
	const affiliate = type === "affiliate";

	useEffect(() => {
		fetchAdminData();
		clearMessages();
	}, []); 

	const fetchAdminData = async () => {
		const result = await adminApi.checkPermission();
		if (result !== true) {
			navigate("/login");
		} else {
			const getPromises = [
				adminApi.getTotalRegistrations(),
				adminApi.getTotalClicks(),
				adminApi.getNumOrders(),
				adminApi.getTotalIncome(),
				adminApi.getUsers(),
				adminApi.getRoleReport(),
				adminApi.getTotalIncomesPerDay()
			]
      
        	const [dataReg, dataClick, dataOrders, dataInc, dataUsers, reportResp, totalPricePerDate] = await Promise.all(getPromises);

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
			if (type === "admin" || type === "leader" || type === "seniorbroker" || type === "broker") {
				cardsContent[1] = {
					title: "Orders",
					amount: dataOrders.number,
					percentage: dataOrders.percentage,
					isMonetary: false,
				};
			}

			console.log(cardsContent)
			setCardInfo(cardsContent);
    
			dataUsers.reverse();
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
				user.firstName,
				user.lastName, 
				user.email,
				user.roles.map(role => ROLE_TO_NAME[role.replace(" ", "")]).join(', '),
				(
					<span className={`${styles.box} ${user.activated ? styles.approved : styles.pending}`}>{user.activated ? "active" : "not active"}</span>
				),
				formatUSDBalance(user.income),
				new Date(user.createdAt).toLocaleString(),
				makeActionsColumn(user)

			]);
			console.log(newDataUsers);

			setTableData(newDataUsers);
  		}
	}

	function makeActionsColumn(user) {
		return (
			<div className={styles.linkWrapper}>
				{!user.activated ? ( <span className={styles.actionsLink} onClick={() => activateUser(user.email)}>Activate</span> ) : (<span className={styles.actionsLink} onClick={() => deactivateUser(user.email)}>Deactivate</span>) }
				<span className={styles.actionsLink} onClick={() => editUser(user)}>Edit</span>
				<span className={styles.deleteLink} onClick={() => deleteUser(user.email)}>Delete</span>
			</div>
		);
	}

	const modalAddUser = async () => {
		setEditEmailAddress(null);

		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
		setRole("");

		setOpenModal(true);
	}

	const activateUser = async (userEmail) => {
		const resp = await adminApi.patchStatus(userEmail);
		if (resp) {
			updateUsersTable();
		}
	};

	const deactivateUser = async (userEmail) => {
		const resp = await adminApi.deactivateUser(userEmail);
		if (resp) {
			updateUsersTable();
		}
	};

	const editUser = async (user) => {
		setEditEmailAddress(user.email);
		setFirstName(user.firstName);
		setLastName(user.lastName);
		setEmail(user.email);
		// Only one role!
		setRole(ROLE_TO_NAME[user.roles[0]]);

		setOpenModal(true);
	}

	const deleteUser = async (userEmail) => {
		const resp = await adminApi.deleteUser(userEmail);
		if (resp) {
			updateUsersTable();
		}
	}

	const updateUsersTable = async () => {
		const newUserData = await adminApi.getUsers();
		newUserData.reverse();
		updateUsers(newUserData);
	}

	const clearAddUserFields = () => {
		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
		setRole("");
	}

	const changeSearchText = async (searchText) => {
		console.log(searchText)
		setSearchText(searchText);
	}

  	const addUser = async () => {
		if (firstName === "") {
			setErrorMessage("First name is required");
			return;
		}
		if (lastName === "") {
			setErrorMessage("Last name is required");
			return;
		}
		if (email === "" && editEmailAddress === null) {
			setErrorMessage("Email is required");
			return;
		}
		if (password === "" && editEmailAddress === null) {
			setErrorMessage("Password is required");
			return;
		}
		if (role === "") {
			setErrorMessage("Role is required");
			return;
		}

		if (editEmailAddress) {
			// Update
			const resp = await adminApi.updateUser(firstName, lastName, editEmailAddress, role);
			if (resp) {
				setInfoMessage("User updated successfully!");
			} else {
				setErrorMessage("Could not update user!");
			}

			updateUsersTable();
			console.log(tableData)
		} else {
			// Add
			const resp = await adminApi.addUser(firstName, lastName, email, password, role);
			if (resp) {
				if (resp.ok) {
					setOpenModal(false);
					fetchAdminData();
					clearAddUserFields();
					setInfoMessage("User added successfully!");
					return;
				} else if (resp.status === 409) {
					setErrorMessage("User already exists!");
					return;
				}
			}
	
			setErrorMessage("Could not add user!");
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
			<div className={styles.topButtonWrapper} style={{gridTemplateColumns: !affiliate ? "1fr 1fr" : "1fr"}}>
				{!affiliate && (
					<Button onClick={modalAddUser}>
						Add User
					</Button>
				)}
				<Button color="white" onClick={() => navigate("/dashboard/vendor")}>
					Vendor Dashboard
				</Button>
			</div>
        </TopInfo>

		<MessageComponent hide={openModal} />

		{affiliate && (
			<div className={styles.affiliateLink}>
				<p className={styles.affiliateLabel}>Affiliate link: </p>

				<CopyValue 
					value={`${window.location.origin}/?affiliate=${localStorage.getItem("affiliateLink")}`}
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

			<TablePagination
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
				<MessageComponent />

              <h4>{editEmailAddress ? "Edit" : "Create"} User</h4>

              <div className={styles.modalInputs}>
				<Input dashboard label="First name*" placeholder={"Enter first name"} value={firstName} setState={setFirstName} />
				<Input dashboard label="Last name*" placeholder={"Enter last name"} value={lastName} setState={setLastName} />
                <Input dashboard label="Email*" placeholder={"Enter email"} value={email} setState={setEmail} disabled={editEmailAddress !== null} />
				{editEmailAddress === null && (
					<div className={imputStyles.inputWrapper}>
						<p className={`${imputStyles.label} ${imputStyles.dashboardLabel}`}>
							Password*
						</p>

						<div className={styles.passwordWrapper}>
							<input
								className={`${imputStyles.input} ${imputStyles.dashboardInput}`}
								type={showPassword ? "text" : "password"}
								placeholder={"Enter password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<div className={styles.iconEye} alt="View password" onClick={() => setShowPassword(!showPassword)}>
								<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path style={{fill: "white"}} d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
							</div>
						</div>
					</div>
				)}

                {type === "admin" && <Options
                  label="Role*"
                  value={role}
                  options={[
                    "Vendor",
                    "Affiliate",
                    "Broker",
                    "Senior Broker",
                    "Leader",
                  ]}
                  dashboard
                  setValue={setRole}
                />}
				{type === "leader" && <Options
                    label="Role*"
                    value={role}
                    options={[
                      "Vendor",
                      "Affiliate",
                      "Broker",
                      "Senior Broker",
                    ]}
                    dashboard
                    setValue={setRole}
                />}
                {type === "seniorbroker" && <Options
                  label="Role*"
                  value={role}
                  options={[
                    "Vendor",
                    "Affiliate",
                    "Broker"
                  ]}
                  dashboard
                  setValue={setRole}
                />}
				{type === "broker" && <Options
                  label="Role*"
                  value={role}
                  options={[
                    "Vendor",
                    "Affiliate"
                  ]}
                  dashboard
                  setValue={setRole}
                />}
              </div>
              <div className={styles.modalButtons}>
                <div
                  className={styles.button}
                  onClick={() => { clearMessages(); clearAddUserFields(); setOpenModal(false)}}
                >
                  Cancel
                </div>
                <Button onClick={addUser} color="white">{editEmailAddress ? "Edit" : "Create"} User</Button>
              </div>
            </div>
          </ModalOverlay>
        )}
      </div>
    </>
  );
};

export default AdminBody;
