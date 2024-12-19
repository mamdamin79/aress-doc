interface FormatNumberOptions {
  commaSeparated: boolean;
  decimals?: number;
}
export const formatNumber = (
  num: number | string,
  options: FormatNumberOptions,
) => {
  let fixedNum: number;
  if (options.decimals !== undefined) {
    fixedNum =
      Math.floor(+num * Math.pow(10, options.decimals)) /
      Math.pow(10, options.decimals);
  } else fixedNum = +num;

  const formatOptions: Intl.NumberFormatOptions = {
    maximumFractionDigits: options?.decimals,
    useGrouping: options?.commaSeparated,
  };
  return new Intl.NumberFormat('en-IR', formatOptions).format(fixedNum);
};
