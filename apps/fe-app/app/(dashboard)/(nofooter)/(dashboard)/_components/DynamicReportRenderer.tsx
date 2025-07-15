import React from 'react';
import dynamic from 'next/dynamic';
import { FinancialReportCalculationApiModel } from '@openapi';
import { OptionItem } from 'libs/design-system/src/lib/components/OptionsListExplorer/OptionsListExplorer.types';

// Lazy load report components
const reportComponents: Record<string, any> = {
  6: dynamic(() =>
    import('../../../../components/Reports/Report6').then((mod) => mod.Report6),
  ),
  15: dynamic(() =>
    import('../../../../components/Reports/Report15').then(
      (mod) => mod.Report15,
    ),
  ),
  2: dynamic(() =>
    import('../../../../components/Reports/Report2').then((mod) => mod.Report2),
  ),
  // Add others as needed
};

interface DynamicReportRendererProps {
  title?: string;
  identifier: string;
  data?: FinancialReportCalculationApiModel['calculation'];
  filters?: FinancialReportCalculationApiModel['filters'];
  onSubmit?: (changedOptions: Record<string, OptionItem>) => Promise<boolean>;
  onRemove?: () => void;
}

export const DynamicReportRenderer: React.FC<DynamicReportRendererProps> = ({
  identifier,
  data,
  filters,
  onSubmit,
  title,
  onRemove,
}) => {
  const ReportComponent = reportComponents[identifier];

  if (!ReportComponent) {
    return null;
  }

  return (
    <ReportComponent
      data={data}
      filters={filters}
      onSubmit={onSubmit}
      title={title}
      onRemove={onRemove}
    />
  );
};
