export type TableCellFormat =
  | undefined
  | 'quarterSymbol'
  | { type: 'decimal'; precision: number; signed: boolean }
  | { type: 'percent'; precision: number; signed: boolean };

export interface NumberCellProps {
  value: number | null | string;
  format: TableCellFormat;
  cellStyle: string;
  grayMode: boolean;
  valueBasedBg: string;
}
