import { FinancialReportFilterApiModel } from '@openapi';
import { OptionItem } from 'design-system';

export interface ReportProps<T> {
  title?: string;
  data: T;
  filters: FinancialReportFilterApiModel[];
  onSubmit?: (changedOptions: Record<string, OptionItem>) => Promise<boolean>;
  onRemove?: () => void;
  onShare?: () => void;
}
