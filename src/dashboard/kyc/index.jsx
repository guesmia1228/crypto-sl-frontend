import styles from "./kyc.module.css";
import Header from "../header/header";

import Search from "../../assets/icon/search.svg";

import Profile from "../../assets/image/reviews/image3.png";
import ModalOverlay from "../modal/modalOverlay";

import Download from "../../assets/icon/download.svg";
import Button from "../../components/button/button";
import React, { useState } from "react";

// const data = [
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       { type: "Passport", file: "" },
//       { type: "Picture", file: "" },
//       { type: "Company Registration", file: "" },
//       { type: "Utility Bill", file: "" },
//       { type: "Address verification", file: "" },
//     ],
//     "(979) 268-4143",
//     "Sales Institut",
//     "Jan 6, 2023",
//   ],
// ];

const data = [];
const KycBody = () => {
  return (
    <div style={{ marginBottom: "5rem" }}>
      <Header title="Transactions" />

      <div className={styles.top}>
        <div className={styles.left}>
          <h3>KYC Request</h3>

          <p>Check recent KYC requests and approve or deny users.</p>
        </div>

        <div className={styles.input}>
          <img src={Search} alt="search" />
          <input type="text" name="" id="" placeholder="Search..." />
        </div>
      </div>

      <Table data={data} />
    </div>
  );
};

export default KycBody;

const Table = ({ data }) => {
  const [checkModal, setCheckModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);

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
                          <img src={item.img} alt="table icon" />
                        </div>

                        <div className={styles.profileInfo}>
                          <div className={styles.name}>{item.name}</div>
                          <div className={styles.id}>{item.id}</div>
                        </div>
                      </li>
                    ) : index === 2 ? (
                      <li onClick={() => setCheckModal(true)}>Check</li>
                    ) : (
                      <li>{item}</li>
                    )}
                  </React.Fragment>
                ))}

                <li>
                  <p>Accept</p>
                  <p onClick={() => setFeedbackModal(true)}>Decline</p>
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
                {data[0][2].map((item, index) => (
                  <div key={index} className={styles.line}>
                    <p>{item.type}</p>

                    <img src={Download} alt="download" />
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

                <Button onClick={() => setCheckModal(false)} color="white">
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
