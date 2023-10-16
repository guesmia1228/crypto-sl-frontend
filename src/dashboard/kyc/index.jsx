import styles from "./kyc.module.css";
import Header from "../header/header";

import Search from "../../assets/icon/search.svg";
import Correct from "../../assets/icon/correct.svg";

import ModalOverlay from "../modal/modalOverlay";

import Download from "../../assets/icon/download.svg";
import Button from "../../components/button/button";
import { useEffect, useState } from "react";
import backendAPI from "../../api/backendAPI";
import adminDashboardApi from "../../api/adminDashboardApi";

const KYC_TYPE = {
  PASSPORT: "PASSPORT",
  PERSONAL_PICTURE: "PERSONAL_PICTURE",
  COMPANY_REGISTRATION: "COMPANY_REGISTRATION",
  ADRESS: "ADRESS",
  UTILITY_BILL: "UTILITY_BILL",
};

const KycBody = () => {
  const [data, setData] = useState([]);
  const backendapi = new backendAPI();
  const adminApi = new adminDashboardApi("admin");
  const fetchFYC = async () => {
    const users = await adminApi.getUsers();
    const arrayWithResults = await Promise.all(
      users.map(async (user) => {
        const userId = user.id;
        const level = await backendapi.getKYCLevel(userId);
        const userKYCData = await Promise.all(
          Object.values(KYC_TYPE).map((type) =>
            backendapi.getByKYC(type, userId),
          ),
        );

        const transformedResults = userKYCData.map((item) => {
          const key = Object.keys(item)[0];
          const fileType = key.replace(/_/g, " ").toLowerCase();
          return {
            type: fileType.charAt(0).toUpperCase() + fileType.slice(1),
            file: item[key].data.url,
            verify: item[key].data.verify,
          };
        });

        if (
          transformedResults.every(
            (item) =>
              item.file === null ||
              item.file === undefined ||
              item.verify === true,
          )
        )
          return;

        return [
          {
            img: user.s3Url,
            name: `${user.firstName} ${user.lastName}`,
            id: user.id,
          },
          user.email,
          transformedResults,
          user.tel,
          user.business,
          level.data.kycLevel,
          new Date(user.createdAt).toISOString().substring(0, 10),
        ];
      }),
    );
    setData(arrayWithResults.filter((item) => item !== undefined));
  };

  useEffect(() => {
    fetchFYC();
  }, []);

  return (
    <div style={{ marginBottom: "5rem" }}>
      <Header title="Transactions" />

      <div className={styles.top}>
        <div className={styles.left}>
          <h3>KYC Request</h3>

          <p>Check recent KYC requests and approve or deny users.</p>
        </div>

        <div className={styles.input}>
          <img src={Search} alt="" />
          <input type="text" name="" id="" placeholder="Search..." />
        </div>
      </div>

      <Table data={data} setData={setData} />
    </div>
  );
};

export default KycBody;

const Table = ({ data, setData }) => {
  const [checkModal, setCheckModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const adminApi = new adminDashboardApi("admin");

  const acceptKYC = async (id) => {
    try {
      await adminApi.acceptKYC(id);
      setData(data.filter((item) => item[0].id !== id));
    } catch {}
  };

  const declineKYC = async (id) => {
    setFeedbackModal(false);
    try {
      await adminApi.declineKYC(id);
      setData(data.filter((item) => item[0].id !== id));
    } catch {}
  };

  return (
    <>
      <div className={`${styles.card} card`}>
        <div className={`${styles.table} dashboard-table`}>
          <div className={styles.tableHead}>
            <ul>
              <li>Name</li>
              <li>Email</li>
              <li>Verify</li>
              <li>Phone</li>
              <li>Business</li>
              <li>Level</li>
              <li>Join On</li>
              <li>Actions</li>
            </ul>
          </div>
          <div className={styles.tableBody}>
            {data.map((items, index) => (
              <ul key={index}>
                {items.map((item, index) => (
                  <React.Fragment key={index}>
                    {index === 0 ? (
                      <li className={styles.profile}>
                        <div className={styles.profileImage}>
                          <img src={item.img} alt="" />
                        </div>

                        <div className={styles.profileInfo}>
                          <div className={styles.name}>{item.name}</div>
                          <div className={styles.id}>{item.id}</div>
                        </div>
                      </li>
                    ) : index === 2 ? (
                      <li
                        onClick={() => {
                          setCheckModal(true);
                          setSelectedId(items[0].id);
                        }}
                      >
                        Check
                      </li>
                    ) : (
                      <li>{item}</li>
                    )}
                  </React.Fragment>
                ))}

                <li>
                  <p onClick={() => acceptKYC(items[0].id)}>Accept</p>
                  <p
                    onClick={() => {
                      setFeedbackModal(true);
                      setSelectedId(items[0].id);
                    }}
                  >
                    Decline
                  </p>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.modalWrapper}>
        {checkModal && (
          <ModalOverlay>
            <div className={styles.modal}>
              <h4>Check verification</h4>

              <div className={styles.lines}>
                {data
                  .find((item) => {
                    if (Array.isArray(item) && item.length > 0) {
                      const firstElement = item[0];
                      if (
                        firstElement &&
                        typeof firstElement === "object" &&
                        "id" in firstElement
                      ) {
                        return firstElement.id === selectedId;
                      }
                    }
                    return false;
                  })[2]
                  .map((item, index) => (
                    <div>
                      {index === 0 && <h5 className={styles.level}>Level 1</h5>}
                      {index === 3 && <h5 className={styles.level}>Level 2</h5>}
                      {index === 4 && <h5 className={styles.level}>Level 3</h5>}
                      <div className={styles.line} key={index}>
                        <div className={styles.row}>
                          <p>
                            {item.type === "Adress"
                              ? "Proof of adress"
                              : item.type === "Utility bill"
                              ? "Due deligence"
                              : item.type}
                          </p>
                          {item.verify && <img src={Correct} alt="" />}
                        </div>

                        {item.file && (
                          <a href={item.file} download>
                            <img src={Download} alt="" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              <div className={styles.checkButton}>
                <Button onClick={() => setCheckModal(false)} color="white">
                  Close
                </Button>
              </div>
            </div>
          </ModalOverlay>
        )}
      </div>

      <div className={styles.modalWrapper}>
        {feedbackModal && (
          <ModalOverlay>
            <div className={styles.modal}>
              <h4>Leave a reason</h4>

              <div className={styles.message}>
                <p>Message</p>

                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Some message..."
                ></textarea>
              </div>

              <div className={styles.buttons}>
                <div
                  className={styles.button}
                  onClick={() => setFeedbackModal(false)}
                >
                  Cancel
                </div>

                <Button onClick={() => declineKYC(selectedId)} color="white">
                  Confirm
                </Button>
              </div>
            </div>
          </ModalOverlay>
        )}
      </div>
    </>
  );
};
