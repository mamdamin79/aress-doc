import { RowData, TableCellFormat, TableRow } from './GeneralTable.types';
import { Cell } from './TableNumberCell';

export const addFormatsToRows = (
  modifiedRows: { index: number; format: TableCellFormat }[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  hoveredCol: number | null,
  hoveredRow: number | null,
  rowFormat?: TableCellFormat,
  customFormat?: TableCellFormat,
  cellStyle?: string,
  valueBasedBg?: string,
) => {
  return (
    <Cell
      value={value ? Number(value) : null}
      grayMode={
        (hoveredCol !== null && hoveredCol !== colIndex) ||
        (hoveredRow !== null && hoveredRow !== rowIndex)
      }
      format={
        rowFormat ||
        customFormat || { precision: 0, signed: true, type: 'percent' }
      }
      // merging shared style and style comming from render
      cellStyle={cellStyle || ''}
      valueBasedBg={valueBasedBg || ''}
    />
  );
};

export const getCellBackgroundColor = (value: number | null): string => {
  if (value === null) return 'bg-surface-neutral-primary';
  if (value >= 15) return 'bg-surface-accent-green-500';
  if (value >= 11) return 'bg-surface-accent-green-400';
  if (value >= 7) return 'bg-surface-accent-green-300';
  if (value >= 3) return 'bg-surface-accent-green-200';
  if (value > 0) return 'bg-surface-accent-green-100';
  if (value >= -3) return 'bg-surface-accent-red-100';
  if (value >= -7) return 'bg-surface-accent-red-200';
  if (value >= -11) return 'bg-surface-accent-red-300';
  if (value >= -15) return 'bg-surface-accent-red-400';
  if (value < -15) return 'bg-surface-accent-red-500';

  return 'bg-surface-neutral-primary'; // Default fallback
};
