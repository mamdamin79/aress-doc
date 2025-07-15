import { FinancialReportCalculationApiModel } from "@openapi";
import { OptionItem } from "libs/design-system/src/lib/components/OptionsListExplorer/OptionsListExplorer.types";

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
