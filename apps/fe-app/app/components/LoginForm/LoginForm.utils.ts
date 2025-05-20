export const validateNationalCode = (nationalCode: string): boolean => {
  if (!/^[0-9]{10}$/.test(nationalCode)) return false;
  const check = +nationalCode[9];
  const sum =
    nationalCode
      .split('')
      .slice(0, 9)
      .reduce((acc, num, idx) => acc + +num * (10 - idx), 0) % 11;
  return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
};
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  return /^09[0-9]{9}$/.test(phoneNumber);
};
export const validateUsername = (username: string): boolean => {
  return /^[a-zA-Z0-9_]+$/.test(username);
};
