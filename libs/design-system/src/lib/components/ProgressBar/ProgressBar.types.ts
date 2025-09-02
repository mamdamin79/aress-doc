export interface ProgressBarItemType {
  text: string;
  status: 'error' | 'success';
  height?: string | number; // Optional height for vertical mode sections
}
