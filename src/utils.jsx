import { ethers } from "ethers";
import CryptoJS from "crypto-js";

export function formatTokenBalance(x) {
  const parsedFloat = parseFloat(x);
  if (isNaN(parsedFloat)) {
    return "loading";
  } else {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function formatUSDBalance(x) {
  const parsedFloat = parseFloat(x);
  if (isNaN(parsedFloat)) {
    return "loading";
  } else {
    return parsedFloat
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function nullToZeroAddress(address) {
  if (address === null) return ethers.constants.AddressZero;
  return address;
}

export function zeroAddressToNull(address) {
  if (address === ethers.constants.AddressZero) return null;
  return address;
}

export function toChecksumAddress(address) {
  if (address === null) return null;
  return ethers.utils.getAddress(address);
}

export function getRole(localStorage) {
  const roles = localStorage.getItem("roles");
  const roleArray = roles.split(",");
  const isVendor = roleArray.includes("ROLE_VENDOR");
  const isAffiliate = roleArray.includes("ROLE_AFFILIATE");
  const isBroker = roleArray.includes("ROLE_BROKER");
  const isSeniorBroker = roleArray.includes("ROLE_SENIOR_BROKER");
  const isLeader = roleArray.includes("ROLE_LEADER");
  const isAdmin = roleArray.includes("ROLE_ADMIN");

  if (isAdmin) {
    return "admin";
  } else if (isVendor) {
    return "vendor";
  } else if (isAffiliate) {
    return "affiliate";
  } else if (isBroker) {
    return "broker";
  } else if (isSeniorBroker) {
    return "seniorbroker";
  } else if (isLeader) {
    return "leader";
  }
}

export function dashboardLink(localStorage) {
  return "/dashboard/" + getRole(localStorage);
}

export const encryptData = (password) => {
  try {
    return CryptoJS.AES.encrypt(
      JSON.stringify(password),
      process.env.REACT_APP_SECRET_WORD,
    ).toString();
  } catch (error) {
    console.error("Encryption failed. Please check your input.");
  }
};

export const decryptData = (password) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      password,
      process.env.REACT_APP_SECRET_WORD,
    );
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Decryption failed. Please check your input.");
  }
};
