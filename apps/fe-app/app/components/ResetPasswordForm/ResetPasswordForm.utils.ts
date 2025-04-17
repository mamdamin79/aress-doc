export const validateNationalCode = (code: string): boolean => {
  if (!/^[0-9]{10}$/.test(code)) return false;

  const check = +code[9];
  const sum =
    code
      .split('')
      .slice(0, 9)
      .reduce((acc, num, idx) => acc + +num * (10 - idx), 0) % 11;

  return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
};
