/**
 * Convert Persian digits to English digits for parsing user input
 * @param input - The input string containing Persian digits
 * @returns String with Persian digits converted to English digits
 */
export const persianToEnglishDigits = (input: string): string => {
  return input.replace(/[\u06F0-\u06F9]/g, (d) =>
    String.fromCharCode(d.charCodeAt(0) - 1728),
  );
};
