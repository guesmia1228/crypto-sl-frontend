import styles from "./kyc.module.css";
import Header from "../header/header";

import Search from "../../assets/icon/search.svg";

import Profile from "../../assets/image/reviews/image3.png";
import ModalOverlay from "../modal/modalOverlay";

import Download from "../../assets/icon/download.svg";
import Button from "../../components/button/button";
import { useEffect, useState } from "react";
import backendAPI from "../../api/backendAPI";
import adminDashboardApi from "../../api/adminDashboardApi";

// const data = [
//   [
//     { img: Profile, name: "Ruth Sharp", id: "#13587" },
//     "ruth.sharp@gmail.com",
//     [
//       {
//         type: "Passport",
//         file: "https://dev-nefentus-image-new.s3.eu-central-1.amazonaws.com/51f2625a-3de9-4100-a391-ba9637eb8fbe_Avatar.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231003T083720Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIARXZ5DTKACDVHLZF6%2F20231003%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=56d56b5074c247996182becc26a858528a246127d62b1c6a81102a0e61b59e44",
//       },
//       {
//         type: "Personal picture",
//         file: "https://dev-nefentus-image-new.s3.eu-central-1.amazonaws.com/b4616c5d-4230-4aa2-9cc6-9e0f60a2757f_c1-zOepPsW1ftyWSzMZErVTaqW0jZfnt57nKiNnIQVmRp_CmzU6vpsqCUS1Um0BFSW.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231003T083720Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIARXZ5DTKACDVHLZF6%2F20231003%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=c052b236899c60ea73b638c016e53cf3e6e5e7e5d2e02867f35fb4573cc0d490",
//       },
//       {
//         type: "Company registration",
//         file: "https://dev-nefentus-image-new.s3.eu-central-1.amazonaws.com/79cde58a-031b-4c7e-9bf7-986dcafcc265_Avatar.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231003T083720Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIARXZ5DTKACDVHLZF6%2F20231003%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=755c423b7b05a4c4ec1fbf308370b8e7bd2550e397ed1e28d07259f7bbd5eabb",
//       },
//       {
//         type: "Utility bill",
//         file: "https://dev-nefentus-image-new.s3.eu-central-1.amazonaws.com/2456e888-e97c-43fd-8ffb-0b4a332461ab_c1-zOepPsW1ftyWSzMZErVTaqW0jZfnt57nKiNnIQVmRp_CmzU6vpsqCUS1Um0BFSW.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231003T083720Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIARXZ5DTKACDVHLZF6%2F20231003%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=4d3a1e15a7e775c555d21879d8b3386fdaf6e376de2ca572fe2f76e02e019e32",
//       },
//       {
//         type: "Adress",
//         file: "https://dev-nefentus-image-new.s3.eu-central-1.amazonaws.com/768e7236-1a4f-4474-a0af-c633cce4d5a1_Avatar.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231003T083720Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIARXZ5DTKACDVHLZF6%2F20231003%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=287a129ebaa259f64c3bf11a903b758d1ee56da47e871d553fd29ebdacd456a6",
//       },
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

const KYC_TYPE = {
  PASSPORT: "PASSPORT",
  PERSONAL_PICTURE: "PERSONAL_PICTURE",
  COMPANY_REGISTRATION: "COMPANY_REGISTRATION",
  UTILITY_BILL: "UTILITY_BILL",
  ADRESS: "ADRESS",
};
// const data = [];
const KycBody = () => {
  const [data, setData] = useState([]);
  const backendapi = new backendAPI();
  const adminApi = new adminDashboardApi("admin");
  const fetchFYC = async () => {
    const users = await adminApi.getUsers();
    const arrayWithResults = await Promise.all(
      users.map(async (user) => {
        const userId = user.id;
        const userKYCData = await Promise.all(
          Object.values(KYC_TYPE).map((type) =>
            backendapi.getByKYC(type, userId)
          )
        );

        const transformedResults = userKYCData.map((item) => {
          const key = Object.keys(item)[0];
          const fileType = key.replace(/_/g, " ").toLowerCase();
          return {
            type: fileType.charAt(0).toUpperCase() + fileType.slice(1),
            file: item[key].data.url,
          };
        });

        if(transformedResults.every(item => item.file === null || item.file === undefined)) return;

        return [
          {
            img: user.s3Url,
            name: user.firstName + " " + user.lastName,
            id: user.id,
          },
          user.email,
          transformedResults,
          user.tel,
          user.business,
          new Date(user.createdAt).toISOString().substring(0, 10),
        ];
      })
    );

    console.log(arrayWithResults.filter(item => item !== undefined));
    setData(arrayWithResults.filter(item => item !== undefined));
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

      <Table data={data} />
    </div>
  );
};

export default KycBody;

const Table = ({ data }) => {
  const [checkModal, setCheckModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [selectedId, setSelectedId]=useState(null)

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
            {data.map((items) => (
              <ul>
                {items.map((item, index) => (
                  <>
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
                      <li onClick={() => {setCheckModal(true); setSelectedId(items[0].id)}}>Check</li>
                    ) : (
                      <li>{item}</li>
                    )}
                  </>
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
                {data.find(item => {
                    if (Array.isArray(item) && item.length > 0) {
                      const firstElement = item[0];
                      if (firstElement && typeof firstElement === 'object' && 'id' in firstElement) {
                        return firstElement.id === selectedId;
                      }
                    }
                    return false;
                  })[2].map((item) => (
                  <div className={styles.line}>
                    <p>{item.type}</p>

                    {item.file && <a href={item.file} download>
                        <img src={Download} alt="" />
                      </a>}
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
