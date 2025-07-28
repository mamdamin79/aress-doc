export interface ReportSelectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title: string;
  category: string;
  isNew: boolean;
  video: boolean;
  summary: string;
}
