import num2persian from '../../../utils/num2persian';

/**
 * Format a number to Persian locale string with commas
 * @param num - The number to format
 * @returns Formatted number string with Persian locale
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('fa-IR');
};

/**
 * Helper: split number string into groups of 3 digits for FlipNumbers display
 * @param numStr - The number string to split
 * @returns Array of number groups
 */
export const splitNumberWithCommas = (numStr: string): string[] => {
  const reversed = numStr.split('').reverse();
  const groups = [];
  for (let i = 0; i < reversed.length; i += 3) {
    groups.push(
      reversed
        .slice(i, i + 3)
        .reverse()
        .join(''),
    );
  }
  return groups.reverse();
};

/**
 * Convert quantity to Persian words
 * @param amount - The amount in Rial
 * @returns Persian words representation of the amount in Toman
 */
export const getQuantityInPersianWords = (amount: number): string => {
  // Convert Rial to Toman (divide by 10)
  const tomanAmount = Math.floor(amount / 10);
  return `معادل ${num2persian(tomanAmount)} تومان`;
};
