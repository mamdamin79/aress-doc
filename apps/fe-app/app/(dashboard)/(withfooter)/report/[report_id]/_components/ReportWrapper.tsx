'use client';
import {
  FinancialReportCalculationApiModel,
  useReportsServicePostReportsByReportId,
} from '@openapi';
import { DynamicReportRenderer } from '../../../../(nofooter)/(dashboard)/_components/DynamicReportRenderer';
import React, { useEffect, useState } from 'react';
import { OptionItem } from 'design-system';
interface ReportWrapperProps {
  data: FinancialReportCalculationApiModel | null;
  identifier: number | string;
  title?: string;
}
export const ReportWrapper: React.FC<ReportWrapperProps> = ({
  data,
  identifier,
  title,
}) => {
  const [reportData, setReportData] =
    useState<FinancialReportCalculationApiModel | null>(data);
  useEffect(() => {
    setReportData(data);
  }, [data]);
  const { mutateAsync } = useReportsServicePostReportsByReportId();
  const handleSubmit = async (changedOptions: Record<string, OptionItem>) => {
    try {
      const updatedReport = await mutateAsync({
        reportId: String(identifier),
        requestBody: {
          selectedFilters: Object.fromEntries(
            Object.entries(changedOptions).map(([key, { id }]) => [
              key,
              String(id),
            ]),
          ),
        },
      });
      setReportData(updatedReport);

      return true;
    } catch (error) {
      console.error('Error submitting report update', error);
      return false;
    }
  };
  return (
    data && (
      <DynamicReportRenderer
        identifier={Number(identifier)}
        data={reportData?.calculation}
        filters={reportData?.filters}
        onSubmit={(changed) => handleSubmit(changed)}
        title={title}
      />
    )
  );
};
