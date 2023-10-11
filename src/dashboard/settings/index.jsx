import { Attachment, Authentificator } from "../input/input";
import styles from "./settings.module.css";
import { useEffect, useState, useContext } from "react";

import Logo from "../../assets/logo/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import backend_API from "../../api/backendAPI";
import InputComponent, { RawInput } from "../input/input";
import backendAPI from "../../api/backendAPI";
import Header from "../header/header";
import BlobPicture from "../../components/blobPicture/blobPicture";
import { KYC } from "./components/KYC";
import { Buttons } from "./components/buttons";
import Button from "../../components/button/button";
import { dashboardLink } from "../../utils";
import MessageComponent from "../../components/message";
import { MessageContext } from "../../context/message";
import TopInfo from "../topInfo/topInfo";
import Tabs from "../../components/tabs/index";

let nav = ["Profile", "Change password", "Change email"];

const nav_kyc = [
  "Profile",
  "Change password",
  "Change email",
  <div>
    <span className={styles.rest}>Know Your Customer(</span>KYC
    <span className={styles.rest}>)</span>
  </div>,
];

const instruction = [
  {
    title: "Personal information",
    description: "Change your personal information in the fields below.",
  },
  {
    title: "Password",
    description: "Please enter your current password to change it.",
  },
  {
    title: "Confirm",
    description:
      "Please confirm your identity. Company registration and utility bill can't be older than 6 months.",
  },
];

const SettingsBody = ({ type }) => {
  const backendapi = new backendAPI();
  const [active, setActive] = useState(0);
  const [requireKyc, setRequireKyc] = useState(
    localStorage.getItem("requireKyc")
  );
  const [profilePicUrl, setProfilePicUrl] = useState(
    localStorage.getItem("profile_pic")
  );
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const { clearMessages } = useContext(MessageContext);

  useEffect(() => {
    const handleStorageChange = () => {
      setProfilePicUrl(localStorage.getItem("profile_pic"));
      setCounter(counter + 1);
      setRequireKyc(localStorage.setItem("requireKyc"));
    };

    async function checkJwtAndNavigate() {
      const jwtIsValid = await backendapi.checkJwt();
      if (jwtIsValid) {
        const newLink = dashboardLink(localStorage);
        setLink(newLink);
      } else {
        navigate("/login");
      }
    }

    checkJwtAndNavigate();

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [counter]);

  useEffect(() => {
    if (requireKyc === "true") {
      nav = nav_kyc;
    }
  }, [requireKyc]);

  const [link, setLink] = useState("");
  return (
    <div
      className={`${styles.body} ${
        type === "vendor" ? "dashboard-body" : "container"
      }`}
      style={{ paddingTop: type === "vendor" ? "0" : "2rem" }}
    >
      {type === "vendor" ? (
        <Header title={"Settings"} />
      ) : (
        <>
          <div className={styles.navigation}>
            <img src={Logo} alt="" />

            <div className={styles.button}>
              <Link to={link} color="white">
                To Dashboard
              </Link>
            </div>
          </div>
        </>
      )}

      {type !== "vendor" && (
        <div
          className={styles.profile}
          style={{ justifyContent: type === "vendor" ? "start" : "end" }}
        >
          <div
            className={styles.avatar}
            style={{
              width: type === "vendor" ? "10rem" : "7rem",
              height: type === "vendor" ? "10rem" : "7rem",
            }}
          >
            <BlobPicture />
          </div>

          <div className={styles.info}>
            <p className={styles.name}>
              {localStorage.getItem("firstName") +
                " " +
                localStorage.getItem("lastName")}
            </p>
            <p className={styles.email}>{localStorage.getItem("email")}</p>
          </div>
        </div>
      )}

      <Tabs
        tabIds={nav}
        initActiveTab={nav[active]}
        getHeader={(tabId) => tabId}
        getBody={(tabId) => {
          switch (tabId) {
            case nav[0]:
              return (
                <ProfileBody
                  active={active}
                  afterUpdateSettings={() =>
                    setProfilePicUrl(localStorage.getItem("profile_pic"))
                  }
                />
              );
            case nav[1]:
              return <PasswordBody active={active} />;
            case nav[2]:
              return <EmailBody active={active} />;
            default:
              return <KYC />;
          }
        }}
      />
    </div>
  );
};

export default SettingsBody;

const ProfileBody = ({ afterUpdateSettings, active }) => {
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
  const [business, setBusiness] = useState(localStorage.getItem("business"));
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber")
  );
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);

  const profileContent = [
    {
      label: "First Name",
      type: "text",
      value: firstName,
      onChange: setFirstName,
      required: true,
    },
    {
      label: "Last Name",
      type: "text",
      value: lastName,
      onChange: setLastName,
      required: true,
    },
    {
      label: "Business",
      type: "text",
      value: business,
      onChange: setBusiness,
      required: false,
    },
    {
      label: "Phone Number",
      type: "text",
      value: phoneNumber,
      onChange: setPhoneNumber,
      required: false,
    },
  ];

  const backendAPI = new backend_API();

  const handleUpload = (uploadedFile) => {
    setFile(uploadedFile);
  };

  const checkErrors = () => {
    if (!firstName) {
      setErrorMessage("First name is required.");
      return null;
    }

    if (!lastName) {
      setErrorMessage("Last name is required.");
      return null;
    }

    if (!email || !email.trim()) {
      setErrorMessage("Email is required.");
      return null;
    }

    return true;
  };

  const handleConfirm = async () => {
    if (checkErrors() == null) {
      return;
    }
    setErrorMessage(null);

    const requestData = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      business: business,
    };

    let response = 1;
    if (file) {
      const response = await backendAPI.uploadFile(file);
      if (response == null) {
        setErrorMessage("Error on uploading the profile picture");
      }
    }

    const response2 = await backendAPI.update(requestData);
    if (response2 == null) {
      setErrorMessage("Error on updating data");
    }

    resetValues();
    afterUpdateSettings();

    if (response !== null && response2 !== null) {
      setInfoMessage("Settings updated successfully!");
    }
  };

  const resetValues = () => {
    setFirstName(localStorage.getItem("firstName"));
    setLastName(localStorage.getItem("lastName"));
    setBusiness(localStorage.getItem("business"));
    setPhoneNumber(localStorage.getItem("phoneNumber"));
    setEmail(localStorage.getItem("email"));
  };

  return (
    <div className={styles.tabContent}>
      <MessageComponent />

      <TopInfo
        title={instruction[active].title}
        description={instruction[active].description}
      />

      {profileContent.map((item) => (
        <div>
          <InputComponent
            label={item.label + (item.required ? "*" : "")}
            placeholder={item.placeholder}
            type={item.type}
            value={item.value}
            setState={item.onChange}
          />
        </div>
      ))}

      <div>
        <InputComponent
          disabled
          label={"Email Address"}
          placeholder={email}
          type={"text"}
          value={email}
        />
      </div>

      <Attachment label="Upload logo image" onUpload={handleUpload} />

      <Buttons
        functions={[resetValues, handleConfirm]}
        buttons={["Reset", "Confirm"]}
      />
    </div>
  );
};

const PasswordBody = ({ active }) => {
  const [openBox, setOpenBox] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState(null);
  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);

  const backendAPI = new backend_API();

  const passwordContent = [
    {
      label: "Current Password",
      placeholder: "Enter your password",
      type: "password",
      value: currentPassword,
      onChange: setCurrentPassword,
      required: true,
    },
    {
      label: "New Password",
      placeholder: "Enter new password",
      type: "password",
      value: newPassword,
      onChange: setNewPassword,
      required: true,
    },
    {
      label: "Confirm Password",
      placeholder: "Confirm new password",
      type: "password",
      value: confirmPassword,
      onChange: setConfirmPassword,
      required: true,
    },
  ];

  const handleConfirm = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords are not equal");
      return;
    }

    const response = await backendAPI.changePasswordDashboard(
      newPassword,
      currentPassword
    );
    if (response == null) {
      setErrorMessage("Old password is not the right one!");
      return;
    }
    setErrorMessage(null);
    setOpenBox(true);
  };

  const handleConfirmCode = async () => {
    const response =
      await backendAPI.changePasswordConfirmDashboard(verificationCode);
    if (response == null) {
      setErrorMessage("Code is not valid or too old!");
      return;
    }
    setInfoMessage("Password successfully changed!");
    resetValues();
    setVerificationCode("");
    setOpenBox(false);
  };

  const resetValues = () => {
    setConfirmPassword("");
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleClose = () => {
    setOpenBox(false);
    setVerificationCode("");
  };

  return (
    <div className={styles.tabContent}>
      {openBox && (
        <div className={styles.modal}>
          <div className={`${styles.popup} card`}>
            <MessageComponent />

            <p className={styles.modalHeadline}>Enter verification code:</p>

            <RawInput
              value={verificationCode}
              setState={setVerificationCode}
              type="text"
            />

            <div className={styles.modalButtonRow}>
              <Button onClick={handleClose} color="black">
                Cancel
              </Button>
              <Button onClick={handleConfirmCode} color="white">
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      <MessageComponent hide={openBox} />

      <TopInfo
        title={instruction[active].title}
        description={instruction[active].description}
      />

      {passwordContent.map((item) => (
        <div>
          <InputComponent
            label={item.label + (item.required ? "*" : "")}
            placeholder={item.placeholder}
            type={item.type}
            setState={item.onChange}
            value={item.value}
            secure
          />
        </div>
      ))}
      {/*
            <Authentificator
                placeholder={"Google Authentificator"}
                connected={true}
                handleClick={() => {}}
			/>*/}
      <Buttons functions={["", handleConfirm]} buttons={["Reset", "Confirm"]} />
    </div>
  );
};

const EmailBody = ({ active }) => {
  const [openBox, setOpenBox] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(null);
  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);

  const backendAPI = new backend_API();
  const navigate = useNavigate();

  const passwordContent = [
    {
      label: "New Email",
      placeholder: "Enter new email",
      type: "email",
      value: newEmail,
      onChange: setNewEmail,
      required: true,
    },
    {
      label: "Confirm Email",
      placeholder: "Confirm new email",
      type: "email",
      value: confirmEmail,
      onChange: setConfirmEmail,
      required: true,
    },
  ];

  const logOut = async () => {
    try {
      await backendAPI.signout();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async () => {
    if (newEmail !== confirmEmail) {
      setErrorMessage("Emails are not equal");
      return;
    }

    const response = await backendAPI.changeEmailDashboard(newEmail);
    if (response == null) {
      setErrorMessage("Email is already in use!");
      return;
    } else {
      setInfoMessage("Email successfully changed!");
    }
    setErrorMessage(null);
    setOpenBox(true);
  };

  const resetValues = () => {
    setNewEmail("");
    setConfirmEmail("");
  };

  const handleClose = () => {
    setOpenBox(false);
    setVerificationCode("");
  };

  const handleCode = async () => {
    if (verificationCode.trim().length === 0) {
      setErrorMessage("Enter confirmation code!");
      return;
    } else {
      const response = await backendAPI.confirmEmail(
        verificationCode.trim(),
        newEmail
      );
      if (response == null) {
        setErrorMessage("Wrong verification code!");
        return;
      } else {
        setInfoMessage("Email successfully changed!");
        resetValues();
        await logOut();
      }
    }
  };

  return (
    <div className={styles.tabContent}>
      {openBox && (
        <div className={styles.modal}>
          <div className={`${styles.popup} card`}>
            <MessageComponent />

            <p className={styles.modalHeadline}>Enter verification code:</p>

            <RawInput
              value={verificationCode}
              setState={setVerificationCode}
              type="text"
            />

            <div className={styles.modalButtonRow}>
              <Button onClick={handleClose} color="white">
                Cancel
              </Button>
              <Button onClick={handleCode} color="black">
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      <MessageComponent hide={openBox} />

      <TopInfo
        title={instruction[active].title}
        description={instruction[active].description}
      />

      {passwordContent.map((item) => (
        <div>
          <InputComponent
            label={item.label + (item.required ? "*" : "")}
            placeholder={item.placeholder}
            type={item.type}
            setState={item.onChange}
            value={item.value}
            secure
          />
        </div>
      ))}
      {/*
            <Authentificator
                placeholder={"Google Authentificator"}
                connected={true}
                handleClick={() => {}}
			/>*/}
      <Buttons functions={["", handleConfirm]} buttons={["Reset", "Confirm"]} />
    </div>
  );
};
