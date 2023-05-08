import Button from "../../components/button/button";
import Input, { Options } from "../../components/input/input";
import Card from "../card/card";
import { transformNumber } from "../func/transformNumber";
import Graph from "../graph/graph";
import Header from "../header/header";
import TopInfo from "../topInfo/topInfo";
import styles from "./admin.module.css";
import { options } from "./../graph/graph";
import { useEffect, useState } from "react";
import ModalOverlay from "../modal/modalOverlay";
import adminDashboardApi from "../../api/adminDashboardApi";
import { useNavigate } from "react-router-dom";
import diamondDashboardApi from "../../api/diamondDashboardApi";
import goldDashboardApi from "../../api/goldDashboardApi";
import ibLeaderDashboardApi from "../../api/ibLeaderDashboardApi";

// const barContent = [
//   {
//     role: "Vendor",
//     percentage: 31,
//     amount: 311,
//   },
//   {
//     role: "Affiliate",
//     percentage: 20,
//     amount: 100,
//   },
//   {
//     role: "Diamond",
//     percentage: 13,
//     amount: 21,
//   },
//   {
//     role: "Gold",
//     percentage: 36,
//     amount: 550,
//   },
// ];

const AdminBody = ({ type }) => {

  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalRegistrationsPercentage, setTotalRegistrationsPercentage] = useState(0);
  const [totalClicksPercentage, setTotalClicksPercentage] = useState(0);
  const [totalIncomesPercentage, setTotalIncomesPercentage] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [value, setValue] = useState("Filter");
  const [barContent, setBarContent] = useState([]);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const adminApi = new adminDashboardApi();
  const diamondApi = new diamondDashboardApi();
  const goldApi = new goldDashboardApi();
  const ibLeaderApi = new ibLeaderDashboardApi()
  useEffect(() => {
    async function fetchData() {
      if(type === "admin"){
        fetchAdminData();
      }else if(type === "diamond"){
        fetchDiamondData();
      } else if(type === "gold"){
        fetchGoldData();
      } else {
        fetchIBLeaderData();
      }
    }
    fetchData();
  }, []); 

  const fetchAdminData = async () => {
      const result = await adminApi.checkPermission();
      if (result !== true) {
        console.log("asdasdasdasds");
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
      
        const getResponses = await Promise.allSettled(getPromises)
  
        const dataReg = getResponses[0];
        if (dataReg.status === 'fulfilled' && dataReg.value !== null) {
          setTotalRegistrations(dataReg.value.number);
          setTotalRegistrationsPercentage(dataReg.value.percentage)
        }
    
        const dataClick = getResponses[1];
        if (dataClick.status === 'fulfilled' && dataClick.value !== null) {
          setTotalClicks(dataClick.value.number);
          setTotalClicksPercentage(dataClick.value.percentage)
        }
    
        const dataInc = getResponses[2];
        if (dataInc.status === 'fulfilled' && dataInc.value !== null) {
          setTotalIncomes(dataInc.value.number);
          setTotalIncomesPercentage(dataInc.value.percentage)
        }
    
        const dataUsers = getResponses[3];
        if (dataUsers.status === 'fulfilled' && dataUsers.value !== null) {
          setTableData(dataUsers.value.map(user => [
            user.fullname,
            user.roles.join(', '),
            user.email,
            user.status,
            user.income,
            user.joinedOn.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          ]))
        }
    
        const reportResp = getResponses[4];
        if (reportResp.status === 'fulfilled' && reportResp.value !== null) {
          console.log(reportResp.value);
          setBarContent(reportResp.value);
        }
    
        const totalPricePerDate = getResponses[5];
        if (totalPricePerDate.status === 'fulfilled' && totalPricePerDate.value !== null) {
          setGraphData(totalPricePerDate.value)
          console.log(totalPricePerDate.value);
        }
      }
    };

  const fetchDiamondData = async () => {
    const result = await diamondApi.checkPermission();
    if (result !== true) {
      navigate("/login");
    } else {
      const getPromises = [
        diamondApi.getTotalRegistrations(),
        diamondApi.getTotalClicks(),
        diamondApi.getTotalIncome(),
        diamondApi.getUsers(),
        diamondApi.getRoleReport(),
        diamondApi.getTotalIncomesPerDay()
      ]
      const getResponses = await Promise.allSettled(getPromises)
  
      const dataReg = getResponses[0];
      if (dataReg.status === 'fulfilled' && dataReg.value !== null) {
        setTotalRegistrations(dataReg.value.number);
        setTotalRegistrationsPercentage(dataReg.value.percentage)
      }
  
      const dataClick = getResponses[1];
      if (dataClick.status === 'fulfilled' && dataClick.value !== null) {
        setTotalClicks(dataClick.value.number);
        setTotalClicksPercentage(dataClick.value.percentage)
      }
  
      const dataInc = getResponses[2];
      if (dataInc.status === 'fulfilled' && dataInc.value !== null) {
        setTotalIncomes(dataInc.value.number);
        setTotalIncomesPercentage(dataInc.value.percentage)
      }
  
      const dataUsers = getResponses[3];
      if (dataUsers.status === 'fulfilled' && dataUsers.value !== null) {
        setTableData(dataUsers.value.map(user => [
          user.fullname,
          user.roles.join(', '),
          user.email,
          user.status,
          user.income,
          user.joinedOn.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        ]))
      }
  
      const reportResp = getResponses[4];
      if (reportResp.status === 'fulfilled' && reportResp.value !== null) {
        console.log(reportResp.value);
        setBarContent(reportResp.value);
      }
  
      const totalPricePerDate = getResponses[5];
      if (totalPricePerDate.status === 'fulfilled' && totalPricePerDate.value !== null) {
        setGraphData(totalPricePerDate.value)
        console.log(totalPricePerDate.value);
      }
    }
  };

  const fetchIBLeaderData = async () => {
    const result = await ibLeaderApi.checkPermission();
    if (result !== true) {
      navigate("/login");
    } else {
      const getPromises = [
        ibLeaderApi.getTotalRegistrations(),
        ibLeaderApi.getTotalClicks(),
        ibLeaderApi.getTotalIncome(),
        ibLeaderApi.getUsers(),
        ibLeaderApi.getRoleReport(),
        ibLeaderApi.getTotalIncomesPerDay()
      ]
      const getResponses = await Promise.allSettled(getPromises)

      const dataReg = getResponses[0];
      if (dataReg.status === 'fulfilled' && dataReg.value !== null) {
        setTotalRegistrations(dataReg.value.number);
        setTotalRegistrationsPercentage(dataReg.value.percentage)
      }

      const dataClick = getResponses[1];
      if (dataClick.status === 'fulfilled' && dataClick.value !== null) {
        setTotalClicks(dataClick.value.number);
        setTotalClicksPercentage(dataClick.value.percentage)
      }

      const dataInc = getResponses[2];
      if (dataInc.status === 'fulfilled' && dataInc.value !== null) {
        setTotalIncomes(dataInc.value.number);
        setTotalIncomesPercentage(dataInc.value.percentage)
      }

      const dataUsers = getResponses[3];
      if (dataUsers.status === 'fulfilled' && dataUsers.value !== null) {
        setTableData(dataUsers.value.map(user => [
          user.fullname,
          user.roles.join(', '),
          user.email,
          user.status,
          user.income,
          user.joinedOn.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        ]))
      }

      const reportResp = getResponses[4];
      if (reportResp.status === 'fulfilled' && reportResp.value !== null) {
        console.log(reportResp.value);
        setBarContent(reportResp.value);
      }

      const totalPricePerDate = getResponses[5];
      if (totalPricePerDate.status === 'fulfilled' && totalPricePerDate.value !== null) {
        setGraphData(totalPricePerDate.value)
        console.log(totalPricePerDate.value);
      }
    }
  };
  

const fetchGoldData = async () => {
  const result = await goldApi.checkPermission();
  if (result !== true) {
    navigate("/login");
  } else {
    const getPromises = [
      goldApi.getTotalRegistrations(),
      goldApi.getTotalClicks(),
      goldApi.getTotalIncome(),
      goldApi.getRoleReport(),
      goldApi.getTotalIncomesPerDay(),
      goldApi.getUsers()
    ]
    const getResponses = await Promise.allSettled(getPromises)
  
      const dataReg = getResponses[0];
      if (dataReg.status === 'fulfilled' && dataReg.value !== null) {
        setTotalRegistrations(dataReg.value.number);
        setTotalRegistrationsPercentage(dataReg.value.percentage)
      }
  
      const dataClick = getResponses[1];
      if (dataClick.status === 'fulfilled' && dataClick.value !== null) {
        setTotalClicks(dataClick.value.number);
        setTotalClicksPercentage(dataClick.value.percentage)
      }
  
      const dataInc = getResponses[2];
      if (dataInc.status === 'fulfilled' && dataInc.value !== null) {
        setTotalIncomes(dataInc.value.number);
        setTotalIncomesPercentage(dataInc.value.percentage)
      }
  
      const reportResp = getResponses[3];
      if (reportResp.status === 'fulfilled' && reportResp.value !== null) {
        console.log(reportResp.value);
        setBarContent(reportResp.value);
      }
  
      const totalPricePerDate = getResponses[4];
      if (totalPricePerDate.status === 'fulfilled' && totalPricePerDate.value !== null) {
        setGraphData(totalPricePerDate.value)
        console.log(totalPricePerDate.value);
      }

      const dataUsers = getResponses[5];
      if (dataUsers.status === 'fulfilled' && dataUsers.value !== null) {
        setTableData(dataUsers.value.map(user => [
          user.fullname,
          user.roles.join(', '),
          user.email,
          user.status,
          user.income,
          user.joinedOn.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        ]))
      }
    }
  };

  const cardsContent = [
    {
      title: "Total Incomes",
      amount: totalIncomes,
      percentage: totalIncomesPercentage,
    },
    {
      title: "Total Clicks",
      amount: totalClicks,
      percentage: totalClicksPercentage,
    },
    {
      title: "Total Registration",
      amount: totalRegistrations,
      percentage: totalRegistrationsPercentage,
    },
  ];

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const addUser = async () => {

    if(type === "admin"){
      const resp = await adminApi.addUser(email, password, value);
      if (resp === true) {
        setOpenModal(false);
        window.location.reload();
      }
    }else if(type === "diamond"){
      const resp = await diamondApi.addUser(email, password, value);
      if (resp === true) {
        setOpenModal(false);
        window.location.reload();
      }
    }else if(type === "gold"){
      const resp = await goldApi.addUser(email, password, value);
      if (resp === true) {
        setOpenModal(false);
        window.location.reload();
      }
    } else {
      const resp = await ibLeaderApi.addUser(email, password, value);
      if (resp === true) {
        setOpenModal(false);
        window.location.reload();
      }
    }
    

  };

  //   [
  //     "John Smith",
  //     "Vendor",
  //     "ruth.sharp@gmail.com",
  //     true,
  //     "159200",
  //     "Jan 6, 2023",
  //   ],
  //   [
  //     "John Smith",
  //     "Vendor",
  //     "ruth.sharp@gmail.com",
  //     true,
  //     "159200",
  //     "Jan 6, 2023",
  //   ],
  //   [
  //     "John Smith",
  //     "Vendor",
  //     "ruth.sharp@gmail.com",
  //     true,
  //     "159200",
  //     "Jan 6, 2023",
  //   ],
  //   [
  //     "John Smith",
  //     "Vendor",
  //     "ruth.sharp@gmail.com",
  //     true,
  //     "159200",
  //     "Jan 6, 2023",
  //   ],
  //   [
  //     "John Smith",
  //     "Vendor",
  //     "ruth.sharp@gmail.com",
  //     false,
  //     "159200",
  //     "Jan 6, 2023",
  //   ],
  //   [
  //     "John Smith",
  //     "Vendor",
  //     "ruth.sharp@gmail.com",
  //     false,
  //     "159200",
  //     "Jan 6, 2023",
  //   ],
  //   [
  //     "John Smith",
  //     "Vendor",
  //     "ruth.sharp@gmail.com",
  //     false,
  //     "159200",
  //     "Jan 6, 2023",
  //   ],
  // ];
  return (
    <>
      <div className={styles.body}>
        <Header
          title={`${type === "admin" ? "Admin" : type === "diamond" ? "Senior IB" : type === "ib_leader" ? "IB Leader" : "IB"
            } Dashboard`}
        />
        <TopInfo
          title="Overview information"
          description="Total info data for all users & user management."
        >
          <Button color="white" onClick={() => setOpenModal(true)}>
            Add User
          </Button>
        </TopInfo>
        <div className={`${styles.rows}`}>
          {cardsContent.map((item) => (
            <Card
              title={item.title}
              amount={item.amount}
              percentage={item.percentage}
            />
          ))}

          <Graph
              data  = {graphData}
          />

          <div className={`${styles.registration} card`}>
            <h3>Registrations Roles</h3>

            <div
              style={{ display: "flex", width: "100%" }}
              className={styles.bar}
            >
              {barContent.map((item) => (
                <div
                  style={{ flex: 1, flexBasis: `${item.percentage}%` }}
                  className={styles.barItem}
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
                    <div className={styles.leftLine}>
                      <div className={styles.lineBox}></div>
                      <div className={styles.name}>{item.role}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.right}>
                  <div className={styles.amount}>
                    {barContent.map((item) => (
                      <p>{item.count}</p>
                    ))}
                  </div>
                  <div className={styles.percentage}>
                    {barContent.map((item) => (
                      <p>{item.percentage}%</p>
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
        </div>

        {(
          <div className={styles.tableWrapper}>
            <div className={styles.top}>
              <h4>User Management</h4>

              <div className={styles.inputs}>
                <Input placeholder="Search" dashboard />

                <Options
                  value={value}
                  options={["Roles", "Status", "Incomes"]}
                  dashboard
                  setValue={setValue}
                />
              </div>
            </div>
            <Table data={tableData} type={type} />
          </div>
        )}
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

                {type === "gold" && <Options
                  label="Roles"
                  value={value}
                  options={[
                    "Vendor",
                    "Affiliate"
                  ]}
                  dashboard
                  setValue={setValue}
                />}
                {type === "admin" && <Options
                  label="Roles"
                  value={value}
                  options={[
                    "Vendor",
                    "Affiliate",
                    "IB",
                    "Senior IB",
                    "IB Leader",
                  ]}
                  dashboard
                  setValue={setValue}
                />}
                {type === "diamond" && <Options
                  label="Roles"
                  value={value}
                  options={[
                    "Vendor",
                    "Affiliate",
                    "IB",
                    "Senior IB",
                  ]}
                  dashboard
                  setValue={setValue}
                />}
                {type === "ib_leader" && <Options
                    label="Roles"
                    value={value}
                    options={[
                      "Vendor",
                      "Affiliate",
                      "IB",
                      "Senior IB",
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
              </div>feat/kyc-feature
            </div>
          </ModalOverlay>
        )}
      </div>
    </>
  );
};

export default AdminBody;

const header = [
  <li>Name</li>,
  <li>Roles</li>,
  <li>Email</li>,
  <li>Status</li>,
  <li>Incomes</li>,
  <li>Join on</li>,
  <li>Action</li>,
];

const Table = ({ data, type }) => {
  const [tableHeader, setTableHeader] = useState(header);
  const [modifiedData, setModifiedData] = useState(data);
  const adminApi = new adminDashboardApi();
  const diamondApi = new diamondDashboardApi();
  const goldApi = new goldDashboardApi();
  useEffect(() => {
    if (type === "admin") {
      setTableHeader(header);
    }else if (type ==="gold"){
      setTableHeader((prev) => {
        const arr = header.slice(0, header.length - 1);
        return [...arr];
      });
    }else if (type === "diamond" || type === "ib_leader") {
      setTableHeader((prev) => {
        const arr = header.slice(0, header.length - 1);
        return [...arr];
      });
    }
    setModifiedData(data);
  }, [data, type, modifiedData]);

  const toggleUserStatus = async (index) => {
    const newData = [...modifiedData];

    if(type === "admin"){
      const resp = await adminApi.patchStatus(newData[index][2]);
      if (resp !== true) {
        return;
      }
    }else if (type ==="gold") {
      const resp = await goldApi.patchStatus(newData[index][2]);
      if (resp !== true) {
        return;
      }
    }else {
      const resp = await diamondApi.patchStatus(newData[index][2]);
      if (resp !== true) {
        return;
      }
    }
    newData[index][3] = !newData[index][3];
    setModifiedData(newData);
  };

  return (
    <div className={`${styles.tableCard} card`}>
      <div
        className={`${styles.table} ${type === "admin" ? styles.tableAdmin : styles.tableDiamond
          } dashboard-table`}
      >
        <div className={styles.tableHead}>
          <ul>{tableHeader}</ul>
        </div>
        <div className={styles.tableBody}>
          {modifiedData.map((items, lineIndex) => (
            <ul key={lineIndex}>
              {items.map((item, itemIndex) => (
                <>
                  {itemIndex === 3 ? (
                    <li
                      style={{ opacity: modifiedData[lineIndex][3] ? 1 : 0.2 }}
                      className={`${styles.box} ${item ? styles.approved : styles.pending
                        }`}
                    >
                      {item ? "Enabled" : "Disabled"}
                    </li>
                  ) : (
                    <li style={{ opacity: modifiedData[lineIndex][3] ? 1 : 0.2 }}>
                      {itemIndex === 4 ? `$${transformNumber(item, false)}` : item}
                    </li>
                  )}
                </>
              ))}
              {type === "admin" && (
                <li onClick={() => {
                  toggleUserStatus(lineIndex);
                }}>{modifiedData[lineIndex][3] ? "Disable" : "Enable"}</li>
              )}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
