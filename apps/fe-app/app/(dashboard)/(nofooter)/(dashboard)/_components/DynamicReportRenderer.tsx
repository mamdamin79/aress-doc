'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import {
  FinancialReportFilterApiModel,
  Report13Dot1CalculationResult,
  Report13Dot2CalculationResult,
  Report13Dot3CalculationResult,
  Report15CalculationResult,
  Report2CalculationResult,
  Report6CalculationResult,
} from '@openapi';
import { OptionItem } from 'libs/design-system/src/lib/components/OptionsListExplorer/OptionsListExplorer.types';

// Lazy load report components
const reportComponents: Record<number, any> = {
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
  identifier: number;
  data?:
    | Report2CalculationResult
    | Report6CalculationResult
    | Report13Dot1CalculationResult
    | Report13Dot2CalculationResult
    | Report13Dot3CalculationResult
    | Report15CalculationResult;
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
