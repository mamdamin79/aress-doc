export const toPersianNumeral = (num: number | string): string => {
  if (typeof num === 'number') {
    num = Math.floor(num);
    return ('' + num).replace(/[0-9]/g, (t) => '٠١٢٣٤٥٦٧٨٩'[+t]);
  } else return num;
};
type CellValue = number | null;


