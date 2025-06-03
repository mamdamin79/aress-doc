import { cn } from '../../../../utils/classNames.utils';
import { formatNumber } from '../../../../utils/number-utils';
export const NumberSection = ({ value }: { value: number }) => {
  const formattedNumber = Number(
    formatNumber(value, {
      commaSeparated: true,
      decimals: 2,
    }),
  );
  return (
    <div
      dir="ltr"
      className={cn(
        'text-left text-xs font-medium',

        formattedNumber > 0 && 'text-border-accent-green-600',
        formattedNumber < 0 && 'text-text-accent-red-primary-600',
      )}
    >
      {formattedNumber > 0 ? '+' : '-'} ٪{Math.abs(formattedNumber)}
    </div>
  );
};
