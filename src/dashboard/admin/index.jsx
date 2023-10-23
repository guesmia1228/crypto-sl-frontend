import Button from "../../components/button/button";
import Input, { Options } from "../../components/input/input";
import StatsCard from "../statsCard/statsCard";
import Graph from "../graph/graph";
import Header from "../header/header";
import TopInfo from "../topInfo/topInfo";
import styles from "./admin.module.css";
import { useContext, useEffect, useState } from "react";
import ModalOverlay from "../modal/modalOverlay";
import adminDashboardApi from "../../api/adminDashboardApi";
import { useNavigate } from "react-router-dom";
import TablePagination from "../../components/tablePagination";
import { formatUSDBalance } from "../../utils";
import { ROLE_TO_NAME } from "../../constants";
import CopyValue from "../copyValue";
import { MessageContext } from "../../context/message";
import MessageComponent from "../../components/message";
import imputStyles from "../../components/input/input.module.css";
import { useTranslation } from "react-i18next";

const colSizes = [1, 1, 2, 1, 1, 1, 1, 3];

const AdminBody = ({ type }) => {
  const { t } = useTranslation();

  const header = [
    t("dashboard.tableHeaders.firstName"),
    t("dashboard.tableHeaders.lastName"),
    t("dashboard.tableHeaders.email"),
    t("dashboard.tableHeaders.roles"),
    t("dashboard.tableHeaders.status"),
    t("dashboard.tableHeaders.income"),
    t("dashboard.tableHeaders.joinedOn"),
    t("dashboard.tableHeaders.actions"),
  ];

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

  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  const navigate = useNavigate();
  const adminApi = new adminDashboardApi(type);
  const affiliate = type === "affiliate";

  useEffect(() => {
    fetchAdminData();
    fetchAdminUsersData();
    clearMessages();
  }, []);

  const fetchAdminData = async () => {
    const result = await adminApi.checkPermission();
    if (result !== true) {
      navigate("/login");
    } else {
      const getPromises = [
        adminApi.getTotalClicks(),
        adminApi.getRoleReport(),
        adminApi.getTotalIncomesPerDay(),
        adminApi.getTotalIncome(),
        adminApi.getNumOrders(),
        adminApi.getTotalRegistrations(),
      ];

      const [
        dataClick,
        reportResp,
        totalPricePerDate,
        dataInc,
        dataOrders,
        dataReg,
      ] = await Promise.allSettled(getPromises);

      const cardsContent = [
        {
          title: t("dashboard.totalIncome"),
          amount: dataInc?.value?.number,
          percentage: dataInc?.value?.percentage,
          isMonetary: true,
        },
        {
          title: t("dashboard.clicks"),
          amount: dataClick?.value?.number,
          percentage: dataClick?.value?.percentage,
          isMonetary: false,
        },
        {
          title: t("dashboard.registrations"),
          amount: dataReg?.value?.number,
          percentage: dataReg?.value?.percentage,
          isMonetary: false,
        },
      ];
      if (
        type === "admin" ||
        type === "leader" ||
        type === "seniorbroker" ||
        type === "broker"
      ) {
        cardsContent[1] = {
          title: t("dashboard.orders"),
          amount: dataOrders?.value?.number,
          percentage: dataOrders?.value?.percentage,
          isMonetary: false,
        };
      }

      console.log(cardsContent);
      setCardInfo(cardsContent);

      console.log(reportResp);
      setBarContent(reportResp.value);

      setGraphData(totalPricePerDate.value);
      console.log(totalPricePerDate);
    }
  };

  const fetchAdminUsersData = async () => {
    const result = await adminApi.checkPermission();
    if (result !== true) {
      navigate("/login");
    } else {
      const dataUsers = await adminApi.getUsers();

      dataUsers.reverse();
      updateUsers(dataUsers);
    }
  };

  useEffect(() => {
    if (searchText === "") {
      setFilteredData(tableData);
    } else {
      const filtered = tableData.filter((item) => {
        return (
          item[0].toLowerCase().includes(searchText.toLowerCase()) ||
          item[1].toLowerCase().includes(searchText.toLowerCase()) ||
          item[2].toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilteredData(filtered);
    }
  }, [searchText, tableData]);

  function updateUsers(dataUsers) {
    console.log(dataUsers);
    if (dataUsers) {
      const newDataUsers = dataUsers.map((user) => [
        user.firstName,
        user.lastName,
        user.email,
        user.roles
          .map((role) =>
            t(
              `dashboard.roles.${ROLE_TO_NAME[role.replace(" ", "")].replaceAll(
                " ",
                "",
              )}`,
            ),
          )
          .join(", "),
        <span
          className={`${styles.box} ${
            user.activated ? styles.approved : styles.pending
          }`}
        >
          {user.activated ? t("general.active") : t("general.notActive")}
        </span>,
        formatUSDBalance(user.income),
        new Date(user.createdAt).toLocaleString(),
        makeActionsColumn(user),
      ]);
      console.log(newDataUsers);

      setTableData(newDataUsers);
    }
  }

  function makeActionsColumn(user) {
    return (
      <div className={styles.linkWrapper}>
        {!user.activated ? (
          <span
            className={styles.actionsLink}
            onClick={() => activateUser(user.email)}
          >
            {t("general.activate")}
          </span>
        ) : (
          <span
            className={styles.actionsLink}
            onClick={() => deactivateUser(user.email)}
          >
            {t("general.deactivate")}
          </span>
        )}
        <span className={styles.actionsLink} onClick={() => editUser(user)}>
          {t("general.edit")}
        </span>
        <span
          className={styles.deleteLink}
          onClick={() => deleteUser(user.email)}
        >
          {t("general.delete")}
        </span>
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
  };

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
  };

  const deleteUser = async (userEmail) => {
    const resp = await adminApi.deleteUser(userEmail);
    if (resp) {
      updateUsersTable();
    }
  };

  const updateUsersTable = async () => {
    const newUserData = await adminApi.getUsers();
    newUserData.reverse();
    updateUsers(newUserData);
  };

  const clearAddUserFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  const changeSearchText = async (searchText) => {
    console.log(searchText);
    setSearchText(searchText);
  };

  const addUser = async () => {
    if (firstName === "") {
      setErrorMessage(t("messages.error.firstNameRequired"));
      return;
    }
    if (lastName === "") {
      setErrorMessage(t("messages.error.lastNameRequired"));
      return;
    }
    if (email === "" && editEmailAddress === null) {
      setErrorMessage(t("messages.error.emailRequired"));
      return;
    }
    if (password === "" && editEmailAddress === null) {
      setErrorMessage(t("messages.error.passwordRequired"));
      return;
    }
    if (role === "") {
      setErrorMessage(t("messages.error.roleRequired"));
      return;
    }

    if (editEmailAddress) {
      // Update
      const resp = await adminApi.updateUser(
        firstName,
        lastName,
        editEmailAddress,
        role,
      );
      if (resp) {
        setInfoMessage(t("messages.success.updateUser"));
      } else {
        setErrorMessage(t("messages.error.updateUser"));
      }

      updateUsersTable();
      console.log(tableData);
    } else {
      // Add
      const resp = await adminApi.addUser(
        firstName,
        lastName,
        email,
        password,
        role,
      );
      if (resp) {
        if (resp.ok) {
          setOpenModal(false);
          fetchAdminData();
          clearAddUserFields();
          setInfoMessage(t("messages.success.addUser"));
          return;
        } else if (resp.status === 409) {
          setErrorMessage(t("messages.error.userExist"));
          return;
        }
      }

      setErrorMessage(t("messages.error.addUser"));
    }
  };

  const affiliateLinkCopied = async () => {
    setInfoMessage(t("messages.info.affiliateLink"));
  };

  return (
    <>
      <div className={styles.body}>
        <Header title={ROLE_TO_NAME[type] + " " + t("dashboard.title")} />

        <TopInfo
          title={t("dashboard.overview")}
          description={t("dashboard.overviewSubtitle")}
        >
          <div
            className={styles.topButtonWrapper}
            style={{ gridTemplateColumns: !affiliate ? "1fr 1fr" : "1fr" }}
          >
            {!affiliate && (
              <Button onClick={modalAddUser}> {t("dashboard.addUser")}</Button>
            )}
            <Button color="white" onClick={() => navigate("/dashboard/vendor")}>
              {t("dashboard.vendorButton")}
            </Button>
          </div>
        </TopInfo>

        <MessageComponent hide={openModal} />

        {affiliate && (
          <div className={styles.affiliateLink}>
            <p className={styles.affiliateLabel}>Affiliate link: </p>

            <CopyValue
              value={`${
                window.location.origin
              }/?affiliate=${localStorage.getItem("affiliateLink")}`}
              onCopy={() => affiliateLinkCopied(true)}
              inputStyle={{ width: "400px" }}
              buttonStyle={{ padding: "100px !important" }}
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

          <Graph
            data={graphData}
            style={{ gridColumn: affiliate ? "1/4" : "1/3" }}
          />

          {!affiliate && (
            <div className={`${styles.registration} card`}>
              <h3>{t("dashboard.registrationsRoles")}</h3>

              <div
                style={{
                  gridTemplateColumns: barContent
                    .map((item) => `${item.percentage}fr`)
                    .join(" "),
                }}
                className={styles.bar}
              >
                {barContent.map((item) => (
                  <div
                    key={item.role}
                    className={
                      styles["bar" + ROLE_TO_NAME[item.role].replace(" ", "")]
                    }
                  ></div>
                ))}
              </div>

              <div className={styles.percentageLabel}>
                <p>0%</p>
                <p>100%</p>
              </div>

              <div className={styles.totalBox}>
                <div className={styles.totalBoxTop}>
                  <p>{t("dashboard.total")}</p>
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
                        <div
                          className={
                            styles[
                              "lineBox" +
                                ROLE_TO_NAME[item.role].replace(" ", "")
                            ]
                          }
                        ></div>
                        <div className={styles.name}>
                          {t(
                            `dashboard.roles.${ROLE_TO_NAME[
                              item.role
                            ].replaceAll(" ", "")}`,
                          )}
                        </div>
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
                      {t("dashboard.KYCRequests")}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.tableWrapper}>
          <div className={styles.top}>
            <h4>{t("dashboard.userManagement")}</h4>

            <div className={styles.inputs}>
              <Input
                placeholder={t("general.search")}
                dashboard
                value={searchText}
                setState={changeSearchText}
              />
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

              <h4>
                {editEmailAddress
                  ? t("dashboard.modal.titleEdit")
                  : t("dashboard.modal.titleCreate")}
              </h4>

              <div className={styles.modalInputs}>
                <Input
                  dashboard
                  label={t("dashboard.modal.firstName")}
                  placeholder={t("dashboard.modal.firstNamePlaceholder")}
                  value={firstName}
                  setState={setFirstName}
                />
                <Input
                  dashboard
                  label={t("dashboard.modal.lastName")}
                  placeholder={t("dashboard.modal.lastNamePlaceholder")}
                  value={lastName}
                  setState={setLastName}
                />
                <Input
                  dashboard
                  label={t("dashboard.modal.email")}
                  placeholder={t("dashboard.modal.emailPlaceholder")}
                  value={email}
                  setState={setEmail}
                  disabled={editEmailAddress !== null}
                />
                {editEmailAddress === null && (
                  <div className={imputStyles.inputWrapper}>
                    <p
                      className={`${imputStyles.label} ${imputStyles.dashboardLabel}`}
                    >
                      {t("dashboard.modal.password")}
                    </p>

                    <div className={styles.passwordWrapper}>
                      <input
                        className={`${imputStyles.input} ${imputStyles.dashboardInput}`}
                        type={showPassword ? "text" : "password"}
                        placeholder={t("dashboard.modal.passwordPlaceholder")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div
                        className={styles.iconEye}
                        alt="View password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 -960 960 960"
                          width="24"
                        >
                          <path
                            style={{ fill: "white" }}
                            d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {type === "admin" && (
                  <Options
                    label={t("dashboard.modal.role")}
                    value={
                      role
                        ? t(`dashboard.roles.${role.replaceAll(" ", "")}`)
                        : ""
                    }
                    options={[
                      { value: "Vendor", display: t("dashboard.roles.Vendor") },
                      {
                        value: "Affiliate",
                        display: t("dashboard.roles.Affiliate"),
                      },
                      { value: "Broker", display: t("dashboard.roles.Broker") },
                      {
                        value: "Senior Broker",
                        display: t("dashboard.roles.SeniorBroker"),
                      },
                      { value: "Leader", display: t("dashboard.roles.Leader") },
                    ]}
                    dashboard
                    setValue={setRole}
                  />
                )}
                {type === "leader" && (
                  <Options
                    label={t("dashboard.modal.role")}
                    value={
                      role
                        ? t(`dashboard.roles.${role.replaceAll(" ", "")}`)
                        : ""
                    }
                    options={[
                      { value: "Vendor", display: t("dashboard.roles.Vendor") },
                      {
                        value: "Affiliate",
                        display: t("dashboard.roles.Affiliate"),
                      },
                      { value: "Broker", display: t("dashboard.roles.Broker") },
                      {
                        value: "Senior Broker",
                        display: t("dashboard.roles.SeniorBroker"),
                      },
                    ]}
                    dashboard
                    setValue={setRole}
                  />
                )}
                {type === "seniorbroker" && (
                  <Options
                    label={t("dashboard.modal.role")}
                    value={
                      role
                        ? t(`dashboard.roles.${role.replaceAll(" ", "")}`)
                        : ""
                    }
                    options={[
                      { value: "Vendor", display: t("dashboard.roles.Vendor") },
                      {
                        value: "Affiliate",
                        display: t("dashboard.roles.Affiliate"),
                      },
                      { value: "Broker", display: t("dashboard.roles.Broker") },
                    ]}
                    dashboard
                    setValue={setRole}
                  />
                )}
                {type === "broker" && (
                  <Options
                    label={t("dashboard.modal.role")}
                    value={
                      role
                        ? t(`dashboard.roles.${role.replaceAll(" ", "")}`)
                        : ""
                    }
                    options={[
                      { value: "Vendor", display: t("dashboard.roles.Vendor") },
                      {
                        value: "Affiliate",
                        display: t("dashboard.roles.Affiliate"),
                      },
                    ]}
                    dashboard
                    setValue={setRole}
                  />
                )}
              </div>
              <div className={styles.modalButtons}>
                <div
                  className={styles.button}
                  onClick={() => {
                    clearMessages();
                    clearAddUserFields();
                    setOpenModal(false);
                  }}
                >
                  {t("general.cancel")}
                </div>
                <Button onClick={addUser} color="white">
                  {editEmailAddress
                    ? t("dashboard.modal.titleEdit")
                    : t("dashboard.modal.titleCreate")}
                </Button>
              </div>
            </div>
          </ModalOverlay>
        )}
      </div>
    </>
  );
};

export default AdminBody;
