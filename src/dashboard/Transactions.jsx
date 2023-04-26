import { Helmet } from "react-helmet";
import TransactionsBody from "./transactions/index";

const Transactions = () => {
  return (
    <div>
      <Helmet>
        <title>Nefentus | Transactions</title>
      </Helmet>

      <TransactionsBody />
    </div>
  );
};

export default Transactions;
