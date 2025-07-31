import React from 'react';
import dynamic from 'next/dynamic';
import {
  FinancialReportCalculationApiModel,
  FinancialReportFilterApiModel,
} from '@openapi';
import { OptionItem } from 'design-system';

// Lazy load report components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reportComponents: Record<string, React.ComponentType<any>> = {
  '6': dynamic(() =>
    import('../../../../components/Reports/Report6').then((mod) => mod.Report6),
  ),
  '15': dynamic(() =>
    import('../../../../components/Reports/Report15').then(
      (mod) => mod.Report15,
    ),
  ),
  '2': dynamic(() =>
    import('../../../../components/Reports/Report2').then((mod) => mod.Report2),
  ),
  '13_3': dynamic(() =>
    import('../../../../components/Reports/Report13_3').then(
      (mod) => mod.Report13_3,
    ),
  ),
  '133': dynamic(() =>
    import('../../../../components/Reports/Report13_3').then(
      (mod) => mod.Report13_3,
    ),
  ),
  '13_2': dynamic(() =>
    import('../../../../components/Reports/Report13_2').then(
      (mod) => mod.Report13_2,
    ),
  ),
  '132': dynamic(() =>
    import('../../../../components/Reports/Report13_2').then(
      (mod) => mod.Report13_2,
    ),
  ),
  // Add others as needed
  '13_1': dynamic(() =>
    import('../../../../components/Reports/Report_13_1').then(
      (mod) => mod.Report_13_1,
    ),
  ),
  '131': dynamic(() =>
    import('../../../../components/Reports/Report_13_1').then(
      (mod) => mod.Report_13_1,
    ),
  ),
};

interface DynamicReportRendererProps {
  title?: string;
  identifier: number | string;
  data?: FinancialReportCalculationApiModel['calculation'];
  filters?: FinancialReportFilterApiModel[];
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
  // Convert identifier to string to ensure proper lookup with underscore values
  const identifierKey = String(identifier);
  const ReportComponent = reportComponents[identifierKey];

  if (!ReportComponent) {
    console.warn(`No report component found for identifier: ${identifierKey}`);
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
