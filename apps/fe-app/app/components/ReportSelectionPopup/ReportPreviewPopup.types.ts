import { FinancialReportCalculationApiModel } from '@openapi';
import { OptionItem } from 'design-system';

export interface ReportSelectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (changedOptions: Record<string, OptionItem>) => void;
  title: string;
  category: string;
  isNew: boolean;
  video: boolean;
  summary: string;
  report: {
    data: FinancialReportCalculationApiModel | null;
    identifier: number | string;
    title?: string;
  };
}
