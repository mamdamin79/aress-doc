interface FormatNumberOptions {
  commaSeparated: boolean;
  decimals?: number;
}
export const formatNumber = (
  num: number | string,
  options: FormatNumberOptions,
) => {
  const formatOptions: Intl.NumberFormatOptions = {
    maximumFractionDigits: options?.decimals,
    useGrouping: options?.commaSeparated,
  };
  return new Intl.NumberFormat('en-IR', formatOptions).format(+num);
};
