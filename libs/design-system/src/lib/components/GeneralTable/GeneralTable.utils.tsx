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
  ) => (
    <Cell
      value={value ? Number(value) : null}
      grayMode={(hoveredCol!==null && hoveredCol!==colIndex) || (hoveredRow !== null && hoveredRow !==rowIndex)}
      format={
        rowFormat ||
        customFormat || { precision: 0, signed: true, type: 'percent' }
      }
      // merging shared style and style comming from render
      cellStyle={cellStyle || ''}
    />
  );
  