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

export const KYC = () => {
    const backendapi = new backendAPI();
    const [statusIndex, setStatusIndex] = useState(0);
    const [uploadingFiles, setUploadingFiles] = useState({
        [KYC_TYPE.PASSPORT]: null,
        [KYC_TYPE.PERSONAL_PICTURE]: null,
        [KYC_TYPE.COMPANY_REGISTRATION]: null,
        [KYC_TYPE.UTILITY_BILL]: null,
        [KYC_TYPE.ADRESS]: null,
    });

    const [fileStatus, setFileStatus] = useState({
        [KYC_TYPE.PASSPORT]: null,
        [KYC_TYPE.PERSONAL_PICTURE]: null,
        [KYC_TYPE.COMPANY_REGISTRATION]: null,
        [KYC_TYPE.UTILITY_BILL]: null,
        [KYC_TYPE.ADRESS]: null,
    });

    const fetchFYC = async () => {
        const arrayWithResults = await Promise.all(
            Object.values(KYC_TYPE).map((type) => backendapi.getByKYC(type))
        );

        const transformedResults = arrayWithResults
            .map((item) => {
                const key = Object.keys(item)[0];
                return { [key]: item[key].data };
            })
            .reduce((acc, curr) => ({ ...acc, ...curr }), {});
        setFileStatus(transformedResults);
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
            backendapi.uploadKYCByType(type, inputRef.current.files[0]);
        }
    };

    const handleRemove = (index) => {
        setFileStatus((prev) => {
            prev[index] = false;

            return [...prev];
        });

        setStatusIndex(index);
    };

    const handleSelectType = (id) => {
        console.log(id);
        setSelectingType(id);
    };

    return (
        <div className={styles.kyc}>
            {selectingType && (
                <div className={styles.kycDrop}>
                    <img src={File} alt="" />

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
                        onClick={() => console.log("HELLO WORLD")}
                    >
                        <div className={styles.kycLabel}>{item.label}</div>

                        {uploadingFiles[item.id] && (
                            <div
                                className={styles.kycStatus}
                                onClick={() => handleRemove(index)}
                            >
                                <p>
                                    {uploadingFiles[item.id]
                                        ? uploadingFiles[item.id].name
                                        : ""}
                                </p>

                                <img
                                    src={fileStatus[item.id] ? Correct : Fail}
                                    alt=""
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Buttons functions={["", ""]} buttons={["Cancel", "Confirm"]} />
        </div>
    );
};
