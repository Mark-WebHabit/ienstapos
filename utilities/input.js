export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return re.test(email);
};

export const validateUsername = (username) => {
  const re = /^[a-zA-Z0-9]+$/;
  return re.test(username);
};

export const validatePincode = (pincode) => {
  return /^[0-9]{4}$/.test(pincode);
};
