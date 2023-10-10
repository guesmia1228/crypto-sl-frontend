import { useState, useEffect } from "react";
import useInternalWallet from "../internalWallet";
import { web3Api } from "../../api/web3Api";
import { currencies } from "../../constants";

function useBalances(metamask) {
  const [balances, setBalances] = useState([initBalances(), initBalances()]);
  let internalWalletAddress = useInternalWallet();

  function initBalances() {
    return currencies.map((currency) => undefined);
  }

  async function fetchBalances() {
    let providerSource = "thirdweb";
    if (metamask.status === "connected" && metamask.address) {
      providerSource = "metamask";
    }
    const web3API = new web3Api(providerSource);

    const balancesEx = metamask.address
      ? await fetchBalanceForWallet(web3API, metamask.address)
      : initBalances();
    const balancesIn = internalWalletAddress
      ? await fetchBalanceForWallet(web3API, internalWalletAddress)
      : initBalances();
    setBalances([balancesEx, balancesIn]);
  }

  async function fetchBalanceForWallet(web3API, walletAddress) {
    const currency_addresses = currencies.map((currency) => currency.address);
    const balances_list = await Promise.all(
      currency_addresses.map((address) =>
        web3API.getBalanceToken(address, walletAddress),
      ),
    );
    return balances_list;
  }

  useEffect(() => {
    fetchBalances();
  }, [internalWalletAddress]);

  return { balances, fetchBalances };
}

export default useBalances;
