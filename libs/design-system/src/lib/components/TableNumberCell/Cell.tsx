import React from 'react';
import { NumberCellProps } from './CellProps';
import { FourlevelIndicatorProps } from './FourlevelIndicator';
export const Cell: React.FC<NumberCellProps> = ({ value, format }) => {
  if (format === 'quarterSymbol') {
    return <FourlevelIndicatorProps value={value} />;
  } else if (typeof format === 'object') {
    const formattedValue =
      format.type === 'decimal'
        ? value.toFixed(format.precision)
        : '%' + (value * 100).toFixed(format.precision);
    return (
      <>
        {format.signed && value > 0
          ? `${formattedValue} +`
          : `${formattedValue.replace('-', '')} -`}
      </>
    );
  }
};
