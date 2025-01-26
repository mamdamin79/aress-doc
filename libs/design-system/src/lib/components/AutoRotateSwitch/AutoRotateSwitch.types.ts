export interface AutoRotateProps {
  rotateOptions: number[];
  onChange: (value: number | null) => void;
  initialValue?: number | null;
  disabled?: boolean;
}
