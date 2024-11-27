import { cn } from "libs/design-system/src/utils";
import { RowData, TableCellFormat, TableRow } from "./GeneralTable.types";
import { Cell } from "./TableNumberCell";

export const addFormatsToRows = (
    modifiedRows: { index: number; format: TableCellFormat }[],
    data: any,
  ): RowData<TableRow>[] => {
    const newData = [...data];
  
    modifiedRows.forEach((row) => {
      // Adjust index for negative values
      const adjustedIndex = row.index < 0 ? data.length + row.index : row.index;
  
      newData[adjustedIndex] = {
        ...newData[adjustedIndex],
        format: row.format,
      };
    });
  
    return newData;
  };
  export const renderCell = (
    value: number | string | null | undefined,
    rowIndex: number,
    colIndex: number,
    hoveredCol: number|null,
    hoveredRow: number|null,
    matchingCol: number|null,
    matchingRow: number|null,
    rowFormat?: TableCellFormat,
    customFormat?: TableCellFormat,
    cellStyle?: string,    
    valueBasedBg?: string
  ) => 
    {
      return <Cell
      value={value ? Number(value) : null}
      grayMode={(hoveredCol!==null && hoveredCol!==colIndex) || (hoveredRow !== null && hoveredRow !==rowIndex)}
      format={
        rowFormat ||
        customFormat || { precision: 0, signed: true, type: 'percent' }
      }
      // merging shared style and style comming from render
      cellStyle={cellStyle || ''} valueBasedBg={valueBasedBg || ''}
    />
    }

  ;
  
  export const getCellBackgroundColor = (
    value: number|null,
    highestPositiveValue: number,
    highestNegativeValue: number,
  ): string =>{
    if (value === null) return 'bg-gray-100'; // Default background for null values
  
    // If the value is positive (green shades)
    if (value > 0) {
      // Calculate the ratio between the value and the highest positive value
      const ratio = value / highestPositiveValue;
  
      if (ratio >= 0.8) return 'bg-green-500';
      if (ratio >= 0.6) return 'bg-green-400';
      if (ratio >= 0.4) return 'bg-green-300';
      if (ratio >= 0.2) return 'bg-green-200';
      return 'bg-green-100';
    } else if (value < 0) {
      // If the value is negative (red shades)
      const absoluteValue = Math.abs(value);
  
      // Calculate the ratio between the absolute value and the lowest negative value
      const ratio = absoluteValue / Math.abs(highestNegativeValue);
  
      if (ratio >= 0.8) return 'bg-red-500';
      if (ratio >= 0.6) return 'bg-red-400';
      if (ratio >= 0.4) return 'bg-red-300';
      if (ratio >= 0.2) return 'bg-red-200';
      return 'bg-red-100';
    }
  
    return ''; // Default fallback
  }

  interface rowsKeysProps {
    name: string;
    [key: string]: string | null;
  }
export const findExtremes = (data: rowsKeysProps[]) => {
  let highestPositive = -Infinity;
  let lowestPositive = Infinity;
  let highestNegative = -Infinity;
  let lowestNegative = Infinity;

  data.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (key !== 'name' && row[key] !== null) {
        const value = parseInt(row[key] as string);

        if (value >= 0) {
          if (value > highestPositive) highestPositive = value;
          if (value < lowestPositive) lowestPositive = value;
        } else {
          if (value > highestNegative) highestNegative = value;
          if (value < lowestNegative) lowestNegative = value;
        }
      }
    });
  });

  // If no positive or negative values found, reset to a default value
  if (highestPositive === -Infinity) highestPositive = 0;
  if (lowestPositive === Infinity) lowestPositive = 0;
  if (highestNegative === -Infinity) highestNegative = 0;
  if (lowestNegative === Infinity) lowestNegative = 0;

  return {
    highestPositive,
    lowestPositive,
    highestNegative,
    lowestNegative,
  };
}