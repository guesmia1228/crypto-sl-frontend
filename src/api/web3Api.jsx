import { ethers } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
import { contractDeposits, currencies } from "../constants";
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import IUniswapV3FactoryABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json";
import ERC20_ABI from "../assets/abi/ERC20_ABI.json";
import { zeroAddressToNull, toChecksumAddress } from "../utils";

const FACTORY_CONTRACT_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
const USDC_CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const POOL_FEES = "500";
const THIRDWEB_CLIENT_ID = "639eea2ebcabed7eab90b56aceeed08b";

const thirdwebProvider = new ethers.providers.JsonRpcProvider(
  "https://ethereum.rpc.thirdweb.com/" + THIRDWEB_CLIENT_ID,
);

export class uniswapApi {
  WETH_CONTRACT_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

  constructor(type) {
    if (type === "metamask") {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      this.provider = thirdwebProvider;
    }

    this.FactoryContract = new ethers.Contract(
      FACTORY_CONTRACT_ADDRESS,
      IUniswapV3FactoryABI.abi,
      this.provider,
    );
  }

  /**
   * Determine the price of the two tokens in the pool
   * See https://blog.uniswap.org/uniswap-v3-math-primer
   * @param {*} sqrtPriceX96 The sqrtPriceX96 of the pool
   * @param {*} Decimal0 The decimal of token0
   * @param {*} Decimal1 The decimal of token1
   * @returns The price of one token0 in token1
   */
  calculatePoolPrice(
    sqrtPriceX96,
    tokenAddress0,
    tokenAddress1,
    Decimal0,
    Decimal1,
  ) {
    let buyOneOfToken0 = (sqrtPriceX96 / 2 ** 96) ** 2;

    if (parseInt(tokenAddress0) < parseInt(tokenAddress1)) {
      buyOneOfToken0 = buyOneOfToken0 * 10 ** (Decimal0 - Decimal1);
      return buyOneOfToken0;
    } else {
      buyOneOfToken0 = buyOneOfToken0 / 10 ** (Decimal0 - Decimal1);
      return 1 / buyOneOfToken0;
    }
  }

  /**
   * Get the number of decimals of a token
   * @param {*} tokenAddress The token address
   * @returns Number of decimals
   */
  async getDecimals(tokenAddress) {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      this.provider,
    );
    const digits = await tokenContract.decimals();
    return digits;
  }

  /**
   * Get the price of a token in USDC
   * @param {*} tokenAddress The token address
   * @param {*} decimalsToken0 The decimals of token0
   * @param {*} decimalsToken1 The decimals of token1
   * @returns The price of the token in USDC
   */
  async getUSDCPriceForToken(
    tokenAddress,
    decimalsToken0 = null,
    decimalsToken1 = null,
  ) {
    if (tokenAddress === USDC_CONTRACT_ADDRESS) {
      return 1;
    }

    const poolAddress = await this.FactoryContract.getPool(
      tokenAddress,
      USDC_CONTRACT_ADDRESS,
      POOL_FEES,
    );
    const poolContract = new ethers.Contract(
      poolAddress,
      IUniswapV3PoolABI.abi,
      this.provider,
    );

    const slot0 = await poolContract.slot0();
    const sqrtPriceX96 = slot0.sqrtPriceX96.toString();

    if (decimalsToken0 === null || decimalsToken1 === null) {
      [decimalsToken0, decimalsToken1] = await Promise.all([
        this.getDecimals(tokenAddress),
        this.getDecimals(USDC_CONTRACT_ADDRESS),
      ]);
    }

    const price = this.calculatePoolPrice(
      sqrtPriceX96,
      tokenAddress,
      USDC_CONTRACT_ADDRESS,
      decimalsToken0,
      decimalsToken1,
    );
    return price;
  }
}

export class web3Api {
  constructor(type) {
    if (type === "metamask") {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      this.provider = thirdwebProvider;
    }
  }

  async getBalanceNative(walletAddress) {
    const balance = await this.provider.getBalance(walletAddress);
    const balanceInEth = ethers.utils.formatEther(balance);
    return balanceInEth;
  }

  async getBalanceToken(tokenAddress, walletAddress) {
    if (!tokenAddress) return await this.getBalanceNative(walletAddress);

    const tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      this.provider,
    );
    const [digits, balanceWei] = await Promise.all([
      tokenContract.decimals(),
      tokenContract.balanceOf(walletAddress),
    ]);

    const balance = ethers.utils.formatUnits(balanceWei, digits);
    return balance;
  }

  /* Send cryptocurrency (native token or token) */

  async send(tokenAddress, amount, toAddress) {
    if (!tokenAddress) return await this.sendNative(amount, toAddress);
    else return await this.sendToken(tokenAddress, amount, toAddress);
  }

  async sendNative(amount, toAddress) {
    const signer = this.provider.getSigner();
    const transaction = {
      to: toAddress,
      value: ethers.utils.parseEther(amount),
    };
    const txRequest = await signer.sendTransaction(transaction);
    const txReceipt = await txRequest.wait();
    return txReceipt;
  }

  async sendToken(tokenAddress, amount, toAddress) {
    const signer = this.provider.getSigner();
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    const decimals = await tokenContract.decimals();
    const txRequest = await tokenContract.transfer(
      toAddress,
      ethers.utils.parseUnits(amount, decimals),
    );
    const txReceipt = await txRequest.wait();
    return txReceipt;
  }

  /* Call deposit smart contract */
  async callDepositContract(
    sellerAddress,
    affiliateAddress,
    brokerAddress,
    seniorBrokerAddress,
    leaderAddress,
    stablecoinAddress,
    price,
  ) {
    // Get min amount out
    const uniswap = new uniswapApi();
    const decimalsIn = 18;
    const stablecoinDecimals = await uniswap.getDecimals(stablecoinAddress);
    const priceConvert = await uniswap.getUSDCPriceForToken(
      uniswap.WETH_CONTRACT_ADDRESS,
      decimalsIn,
      stablecoinDecimals,
    );
    // Amount in token
    const amountIn = price / priceConvert;
    const amountInInt = Math.ceil(amountIn * 10 ** decimalsIn);
    // Amount in USD stablecoin
    const minAmountOut = price * 0.98 * 10 ** stablecoinDecimals;

    console.log("priceConvert: " + priceConvert);
    console.log("amountIn: " + amountIn);
    console.log("amountInInt: " + amountInInt);
    console.log("minAmountOut: " + minAmountOut);

    // Deposit contract
    const contractInfo = contractDeposits[contractDeposits.length - 1];
    const signer = this.provider.getSigner();
    const contract = new ethers.Contract(
      contractInfo.address,
      contractInfo.abi,
      signer,
    );

    const timestampSent = Date.now();
    const txRequest = await contract.deposit(
      sellerAddress,
      affiliateAddress,
      brokerAddress,
      seniorBrokerAddress,
      leaderAddress,
      stablecoinAddress,
      minAmountOut,
      POOL_FEES,
      { value: amountInInt },
    );
    console.log(txRequest);
    const txReceipt = await txRequest.wait();
    console.log(txReceipt);

    const timestampMined = Date.now();
    // const transaction = await this.provider.getTransaction(txReceipt.transactionHash);

    // Create transaction info
    // 1. 0x000 to null  2. Make checksum addresses
    const info = this.parseReceipt(txRequest, txReceipt);
    info.timestampSent = timestampSent;
    info.timestampMined = timestampMined;
    info.sellerAddress = zeroAddressToNull(toChecksumAddress(sellerAddress));
    info.affiliateAddress = zeroAddressToNull(
      toChecksumAddress(affiliateAddress),
    );
    info.brokerAddress = zeroAddressToNull(toChecksumAddress(brokerAddress));
    info.seniorBrokerAddress = zeroAddressToNull(
      toChecksumAddress(seniorBrokerAddress),
    );
    info.leaderAddress = zeroAddressToNull(toChecksumAddress(leaderAddress));
    info.currencyAddress = null;
    info.stablecoinAddress = toChecksumAddress(stablecoinAddress);
    info.transactionHash = txReceipt.transactionHash;
    return info;
  }

  parseReceipt(request, receipt) {
    function bigNumberArgToBigInt(arg) {
      try {
        return arg.toBigInt();
      } catch (error) {
        console.log(error);
      }
      return BigNumber.from(arg.hex).toBigInt();
    }

    let info = {};

    // Basic info
    info.contractAddress = toChecksumAddress(request.to);
    info.status = receipt.status;

    // Gas & value
    info.gasPrice = BigNumber.from(request.gasPrice).toBigInt();
    info.gasUsed = BigNumber.from(receipt.gasUsed).toBigInt();
    info.value = BigNumber.from(request.value).toBigInt();

    // Amounts distributed
    for (const event of receipt.events) {
      if (event.event === "Distributed") {
        console.log(event);
        const values = event.args.map((arg) => bigNumberArgToBigInt(arg));
        // 	event Distributed(uint seller, uint affiliate, uint broker, uint leader, uint owner);
        info = {
          ...info,
          sellerAmount: values[0],
          affiliateAmount: values[1],
          brokerAmount: values[2],
          seniorBrokerAmount: values[3],
          leaderAmount: values[4],
          ownerAmount: values[5],
        };
      }
    }

    // Amount swapped
    const decodeInterface = new ethers.utils.Interface(IUniswapV3PoolABI.abi);
    for (const log of receipt.logs) {
      try {
        const swapReturn = decodeInterface.decodeEventLog(
          "Swap",
          log.data,
          log.topics,
        );
        info.swappedAmount = BigNumber.from(swapReturn[3]).abs().toBigInt();
      } catch (error) {}
    }

    return info;
  }

  /**
   * Convert BigInts to String because they are not serializable.
   * @param {*} obj The boject to be converted
   */
  convertBigIntToString(obj) {
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === "bigint") {
        obj[key] = obj[key].toString();
      }
    }
  }
}
