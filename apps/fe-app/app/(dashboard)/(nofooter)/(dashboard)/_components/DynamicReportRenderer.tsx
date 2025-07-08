import React from 'react';
import dynamic from 'next/dynamic';
import {  FinancialReportFilterApiModel, Report13Dot1CalculationResult, Report13Dot2CalculationResult, Report13Dot3CalculationResult, Report15CalculationResult, Report2CalculationResult, Report6CalculationResult } from '@openapi';

// Lazy imports
const reportComponents: Record<number, any> = {
  6: dynamic(() => import('../../../../components/Reports/Report6').then(mod => mod.Report6)),
//   we list all reports here to import them dynamically based on API Response
};

interface DynamicReportRendererProps {
  identifier: number;
  data?:  Report2CalculationResult | Report6CalculationResult | Report13Dot1CalculationResult | Report13Dot2CalculationResult | Report13Dot3CalculationResult | Report15CalculationResult;
  filters?: FinancialReportFilterApiModel[];
}

export const DynamicReportRenderer: React.FC<DynamicReportRendererProps> = ({
  identifier,
  data,
  filters,
}) => {
  const ReportComponent = reportComponents[identifier];

  if (!ReportComponent) {
    console.warn(`No report component found for identifier ${identifier}`);
    return null;
  }

  return <ReportComponent data={data} filters={filters} />;
};
