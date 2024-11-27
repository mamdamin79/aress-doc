import React from 'react';
import { NumberCellProps } from './CellProps';
import { FourlevelIndicatorProps } from './FourlevelIndicator';
import { cn } from 'libs/design-system/src/utils';

export const Cell: React.FC<NumberCellProps> = ({ value, format, cellStyle, grayMode, valueBasedBg }) => {
  // Render null values as "-"
  if (value === null) {
    return <div className={cellStyle}>-</div>;
  }

  // Handle number values
  if (typeof value === 'number') {
    value = Number(value);

    if (value === 0) {
      return <div className={cn(cellStyle, valueBasedBg)}>0</div>;
    }

    if (format === 'quarterSymbol') {
      return (
        <div className={cellStyle}>
          <FourlevelIndicatorProps value={value} grayMode={grayMode} />
        </div>
      );
    }

    if (typeof format === 'object') {
      const formattedValue =
        format.type === 'decimal'
          ? value.toFixed(format.precision)
          : `%${value.toFixed(format.precision)}`;

      const signedValue = format.signed
        ? value > 0
          ? `${formattedValue} +`
          : `${formattedValue.replace('-', '')} -`
        : formattedValue;

      return <div className={cn(cellStyle, valueBasedBg)}>{signedValue}</div>;
    }
  }

  // Fallback for non-number values
  return <div className={cn(cellStyle, valueBasedBg)}>{value}</div>;
};
