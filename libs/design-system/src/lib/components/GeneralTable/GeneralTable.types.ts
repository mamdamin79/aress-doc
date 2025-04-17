import { TableCellFormat } from './TableNumberCell';
export interface RenderCellProps<T> {
  value: T[keyof T];
  rowIndex: number;
  colIndex: number;
  hoveredCol: number | null;
  hoveredRow: number | null;
  matchingCol: number | null;
  matchingRow: number | null;
  format?: TableCellFormat;
  valueBasedBg?: string;
}
export interface Column<T = unknown> {
  key: keyof T;
  header: string;
  headerDivider?: 'left' | 'right' | 'both';
  render?: (props: RenderCellProps<T>) => React.ReactNode;
}

export type Separator = { type: 'separator'; label?: string };

export type RowData<T> =
  | (T & { type?: undefined; format?: TableCellFormat })
  | Separator;

export interface TableProps<T> {
  data: RowData<T>[];
  schema: Column<T>[];
  tableDataStyleClasses?: string;
  border?: boolean;
  striped?: boolean;
}

export interface TableRow {
  name: string;
  format?: TableCellFormat;
  [key: string]: any;
}

export { TableCellFormat };
