import BalanceCard from "../components/balanceCard/balanceCard";
import CryptoCard from "../components/cryptoCard/cryptoCard";
import EarningCards from "../components/earningCards/earningCards";
import IncomeCard from "../components/incomeCard/incomeCard";
import ProfileCard from "../components/profileCard/profileCard";

const MainDashboard = () => {
  return (
    <div>
      <ProfileCard />
      <BalanceCard />
      <EarningCards />
      <IncomeCard />
      <CryptoCard />
    </div>
  );
};

export default MainDashboard;
