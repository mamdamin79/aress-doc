import { cn } from '../../../../utils/classNames.utils';
import React from 'react';
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

        formattedNumber > 0 && 'text-green-600',
        formattedNumber < 0 && 'text-red-600',
      )}
    >
      {formattedNumber > 0 && '+'}
      {value}
    </div>
  );
};
