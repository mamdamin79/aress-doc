export interface DateType {
    day: number;
    month: number;
    year: number;
}

export interface Props {
  min: string;
  dateRange: { start: string; end: string };
  max: string;
  setDateRange: (start: DateType, end: DateType) => void;
}

export interface ErrorState {
  minError: boolean;
  maxError: boolean;
}