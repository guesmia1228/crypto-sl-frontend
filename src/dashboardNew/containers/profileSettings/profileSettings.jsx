import Button from "../../components/button/button";
import Card from "../../components/card/card";
import SettingsItem from "../../components/settings/settingsItem";
import SettingsTitle from "../../components/settings/settingsTitle";

import styles from "./profileSettings.module.css";

const data = [
  {
    list: [
      {
        label: "Nickname",
        description: "Set a customized nickname for your profile.",
        value: "Erin Vaccaro",
      },
    ],
    type: "edit",
  },
  {
    list: [
      {
        label: "Avatar",
        description: "Select an avatar to personalize your account. ",
        value:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3161&q=80",
      },
    ],
    type: "image",
  },
  {
    list: [
      {
        label: "Marketing Updates",
        description:
          "Once disabled, you will not be able to receive marketing notifications (email, app push and on-site inbox notifications).",
        value: false,
      },
      {
        label: "E-mail Transaction",
        description:
          "Once disabled, you will not be able to receive marketing notifications (email, app push and on-site inbox notifications).",
        value: true,
      },
      {
        label: "App Transaction",
        description:
          "Once disabled, you will not be able to receive marketing notifications (email, app push and on-site inbox notifications).",
        value: false,
      },
    ],
    type: "enable",
  },
  {
    list: [
      {
        label: "Notification Language",
        description:
          "Select your preferred language for email, app push and on-site inbox notifications.",
        value: "English",
      },
    ],
    type: "edit",
  },
];

const ProfileSettings = () => {
  return (
    <Card className={styles.card}>
      <SettingsTitle
        title="User Profile"
        description="Update your personal information and notification settings"
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

export default ProfileSettings;
