export interface CustomDate {
  day: number;
  month: number;
  year: number;
}

export interface DatePickerProps {
  defaultValue?: string;
  onChange: (value: string | Date) => void;
  min?: string;
  max?: string;
  active?: boolean;
  errorText: string;
  equalInput: boolean;
  focus: boolean;
  clearDate: () => void;
  errors: {
    minError: boolean;
    maxError: boolean;
  };
  placeholder: string;
  errorHandler: (e: { minError: boolean; maxError: boolean }) => void;
}
