export interface NumberCellProps {
  value: number;
  format:
    | 'quarterSymbol'
    | { type: 'decimal'; precision: number; signed: boolean }
    | { type: 'percent'; precision: number; signed: boolean };
}
