import { cn, formatNumber } from '../../../utils';

export function Header() {
  console.log(
    formatNumber(238298987.999764, { commaSeparated: true, decimals: 1 }),
  );

  return <header className={cn('ss', 'ff')}>This is header!</header>;
}
