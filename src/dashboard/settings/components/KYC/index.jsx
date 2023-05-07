import File from "../../../../assets/icon/file.svg";
import Correct from "../../../../assets/icon/correct.svg";
import Fail from "../../../../assets/icon/fail.svg";
import { Buttons } from "../buttons";
import styles from "../../settings.module.css";
import { useRef, useState } from "react";

const KYCContent = [
    {
        label: "Upload Passport",
    },
    {
        label: "Picture of You",
    },
    {
        label: "Company Registration",
    },
    {
        label: "Utility Bill",
    },
    {
        label: "Adress verification",
    },
];

export const KYC = () => {
    const [statusIndex, setStatusIndex] = useState(0);

    const inputRef = useRef(null);

    const [fileStatus, setFileStatus] = useState([
        false,
        false,
        false,
        false,
        false,
    ]);

    const [selectingType, setSelectingType] = useState(null);

    const onChange = () => {
        if (statusIndex >= KYCContent.length) {
            return null;
        }

        const fileName = inputRef.current.value.split("\\").pop();

        setFileStatus((prev) => {
            prev[statusIndex] = fileName;

            return [...prev];
        });

        let nextIndex = -1;

        for (let i = 0; i < fileStatus.length; i++) {
            if (statusIndex === i) continue;

            if (!fileStatus[i]) {
                nextIndex = i;
                break;
            }
        }

        setStatusIndex((prev) => nextIndex);
    };

    const handleRemove = (index) => {
        setFileStatus((prev) => {
            prev[index] = false;

            return [...prev];
        });

        setStatusIndex(index);
    };

    return (
        <div className={styles.kyc}>
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

            <div className={styles.kycList}>
                {KYCContent.map((item, index) => (
                    <div className={styles.kycItem}>
                        <div className={styles.kycLabel}>{item.label}</div>

                        <div
                            className={styles.kycStatus}
                            onClick={() => handleRemove(index)}
                        >
                            <p>{fileStatus[index] ? fileStatus[index] : ""}</p>

                            <img
                                src={fileStatus[index] ? Correct : Fail}
                                alt=""
                            />
                        </div>
                    </div>
                ))}
            </div>

            <Buttons functions={["", ""]} buttons={["Cancel", "Confirm"]} />
        </div>
    );
};
