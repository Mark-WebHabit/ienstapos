import CryptoJS from "crypto-js";

export const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
};

export const verifyPassword = (inputPassword, storedHash) => {
  const hashedInput = CryptoJS.SHA256(inputPassword).toString(CryptoJS.enc.Hex);
  return hashedInput === storedHash;
};
