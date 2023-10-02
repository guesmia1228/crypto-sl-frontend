import SettingsBody from "./settings/index";
import Sidebar from "./sidebar/sidebar";
import { Helmet } from "react-helmet";

const Settings = ({ type = "" }) => {
  return (
    <div>
      <Helmet>
        <title>{"Nefentus | Settings"}</title>
      </Helmet>
      <SettingsBody type={type} />
    </div>
  );
};

export default Settings;
