import File from "../../../../assets/icon/file.svg";
import Correct from "../../../../assets/icon/correct.svg";
import Fail from "../../../../assets/icon/fail.svg";
import { Buttons } from "../buttons";
import styles from "../../settings.module.css";
import { useEffect, useRef, useState } from "react";
import backendAPI from "../../../../api/backendAPI";

const KYC_TYPE = {
  PASSPORT: "PASSPORT",
  PERSONAL_PICTURE: "PERSONAL_PICTURE",
  COMPANY_REGISTRATION: "COMPANY_REGISTRATION",
  UTILITY_BILL: "UTILITY_BILL",
  ADRESS: "ADRESS",
};
const KYCContent = [
  {
    id: KYC_TYPE.PASSPORT,
    label: "Upload Passport",
  },
  {
    id: KYC_TYPE.PERSONAL_PICTURE,
    label: "Picture of You",
  },
  {
    id: KYC_TYPE.COMPANY_REGISTRATION,
    label: "Company Registration",
  },
  {
    id: KYC_TYPE.UTILITY_BILL,
    label: "Utility Bill",
  },
  {
    id: KYC_TYPE.ADRESS,
    label: "Address verification",
  },
];

const INITIAL_FILES = {
  [KYC_TYPE.PASSPORT]: null,
  [KYC_TYPE.PERSONAL_PICTURE]: null,
  [KYC_TYPE.COMPANY_REGISTRATION]: null,
  [KYC_TYPE.UTILITY_BILL]: null,
  [KYC_TYPE.ADRESS]: null,
};

export const KYC = () => {
  const backendapi = new backendAPI();
  const [statusIndex, setStatusIndex] = useState(0);
  const [uploadingFiles, setUploadingFiles] = useState(INITIAL_FILES);

  const [files, setFiles] = useState({
    [KYC_TYPE.PASSPORT]: null,
    [KYC_TYPE.PERSONAL_PICTURE]: null,
    [KYC_TYPE.COMPANY_REGISTRATION]: null,
    [KYC_TYPE.UTILITY_BILL]: null,
    [KYC_TYPE.ADRESS]: null,
  });

  const fetchFYC = async () => {
    const arrayWithResults = await Promise.all(
      Object.values(KYC_TYPE).map((type) => backendapi.getByKYC(type)),
    );

    const transformedResults = arrayWithResults
      .map((item) => {
        const key = Object.keys(item)[0];
        return { [key]: item[key].data };
      })
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});
    setFiles(transformedResults);
  };

  useEffect(() => {
    fetchFYC();
  }, []);

  const inputRef = useRef(null);

  const [selectingType, setSelectingType] = useState(KYC_TYPE.PASSPORT);

  const onChange = async () => {
    if (statusIndex >= KYCContent.length) {
      return null;
    }

    if (inputRef.current.files.length > 0) {
      setUploadingFiles({
        ...uploadingFiles,
        [selectingType]: inputRef.current.files[0],
      });
      backendapi.uploadKYCByType(selectingType, inputRef.current.files[0]);
    }
  };

  const handleUpload = async () => {
    const arrayWithResults = await Promise.all(
      Object.keys(uploadingFiles).map((type) =>
        backendapi.uploadKYCByType(type, uploadingFiles[type]),
      ),
    );
    if (arrayWithResults) {
      fetchFYC();
      setUploadingFiles(INITIAL_FILES);
    }
  };

  const handleRemove = (type) => {
    setUploadingFiles({ ...uploadingFiles, [type]: null });
  };

  const handleSelectType = (id) => {
    setSelectingType(id);
  };

  return (
    <div className={styles.kyc}>
      {files[selectingType] && files[selectingType]["url"] ? (
        <div className={styles.kycImageContainer}>
          <img
            className={styles.kycImage}
            src={files[selectingType]["url"]}
            alt="url"
          />
        </div>
      ) : (
        <div className={styles.kycDrop}>
          <img src={File} alt="file" />

          <input
            onChange={onChange}
            ref={inputRef}
            type="file"
            className={styles.attachment}
          />

          <div>
            <div className={styles.main}>
              {statusIndex > -1
                ? `Drag and drop your ${KYCContent[statusIndex].label} here`
                : "You need to confirm it now."}
            </div>
            <div className={styles.size}>10MB max file size</div>
          </div>
        </div>
      )}

      <div className={styles.kycList}>
        {KYCContent.map((item, index) => (
          <div
            className={`${styles.kycItem} ${
              selectingType === item.id ? styles.itemActive : ""
            }`}
            key={index}
            onClick={() => handleSelectType(item.id)}
          >
            <div className={styles.kycLabelSection}>
              <div className={styles.kycLabel}>{item.label}</div>

              <div className={styles.kycStatus}>
                {files[item.id]?.url &&
                  (files[item.id].verify ? (
                    <img src={Correct} alt="correct" />
                  ) : (
                    "(waiting verification)"
                  ))}
              </div>
            </div>

            {uploadingFiles[item.id] && (
              <div
                className={styles.kycStatus}
                onClick={() => handleRemove(item.id)}
              >
                <p>
                  {uploadingFiles[item.id] ? uploadingFiles[item.id].name : ""}
                </p>
                <img src={Fail} alt="fail" />
              </div>
            )}
          </div>
        ))}
      </div>

      <Buttons functions={["", handleUpload]} buttons={["Cancel", "Confirm"]} />
    </div>
  );
};
