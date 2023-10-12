import Button from "../../components/button/button";
import Card from "../../components/card/card";
import SettingsItem from "../../components/settings/settingsItem";
import SettingsTitle from "../../components/settings/settingsTitle";

import styles from "./securitySettings.module.css";

const data = [
  {
    list: [
      {
        label: "Login Password",
        description: "Login password is used to log in to your account.",
        value: "1234567",
        type: "password",
      },
    ],
    type: "edit",
  },
  {
    list: [
      {
        label: "Email",
        description: "Use your email to protect your account and transactions.",
        value: "er**@gmail.com",
      },
    ],
    type: "edit",
  },
  {
    list: [
      {
        label: "Phone Number",
        description:
          "Use your phone number to protect your account and transactions.",
        value: "+38162**80",
      },
    ],
    type: "edit",
  },
  {
    list: [
      {
        label: "Authenticator App",
        description:
          "Use Nefentus/Google Authenticator to protect your account and transactions.",
        value: false,
      },
      {
        label: "Anti-Phishing Code",
        description:
          "Protect your account from phishing attempts and ensure that your notification emails are from Nefentus only.",
        value: true,
      },
    ],
    type: "enable",
  },
];

const SecuritySettings = () => {
  return (
    <Card className={styles.card}>
      <SettingsTitle
        title="Security"
        description="Be safe and set multiple way to secure your account"
      />

      {data.map((item) => (
        <SettingsItem data={item} />
      ))}

      <div
        className={styles.button}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button color="white">Save Changes</Button>
      </div>
    </Card>
  );
};

export default SecuritySettings;
