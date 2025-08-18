import { DatePickerTrigger } from '../../../../components';
import { Button, Dialog, Radio } from 'design-system';
import React, { useState } from 'react';
import { fileExportType } from './types';

export const RequestReportPopup = ({
  isOpen,
  onClose,
  setShareReportPopupOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  setShareReportPopupOpen: (
    open: boolean,
    reportType: string,
    reportExtension: fileExportType,
    startDate: string,
    endDate: string,
  ) => void;
}) => {
  const [reportType, setReportType] = useState<
    'accounting' | 'performance' | null
  >(null);
  const [reportExtension, setReportExtension] = useState<fileExportType>(null);
  const [dateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: '1403/07/24',
    endDate: '1404/07/24',
  });
  const handleReportTypeChange = (type: 'accounting' | 'performance') => {
    setReportType(type);
  };

  const handleReportExtensionChange = (extension: fileExportType) => {
    setReportExtension(extension);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-[472px] px-0 text-right"
    >
      <div className="border-border-neutral-primary w-full border-b-2 pb-4">
        <h1 className="px-6 text-right text-lg font-medium">درخواست گزارش</h1>
      </div>
      <div className="flex flex-col gap-5 px-6 pt-6">
        <div className="flex flex-col gap-2">
          <span className="text-text-neutral-primary text-md font-semibold">
            نوع گزارش مورد نظر خود را انتخاب کنید
          </span>
          <div className="p-2">
            <Radio
              id="report-type"
              name="report-type"
              value="report-type"
              content="گزارش حسابداری"
              checked={reportType === 'accounting'}
              onChange={() => handleReportTypeChange('accounting')}
              className="font-medium"
            />
          </div>
          <div className="p-2">
            <Radio
              id="report-type"
              name="report-type"
              value="report-type"
              content="گزارش عملکرد"
              checked={reportType === 'performance'}
              onChange={() => handleReportTypeChange('performance')}
              className="font-medium"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-text-neutral-primary text-md font-semibold">
            فرمت گزارش مورد نظر خود را انتخاب کنید{' '}
          </span>
          <div className="p-2">
            <Radio
              id="report-extension"
              name="report-extension"
              value="PDF"
              content="PDF"
              checked={reportExtension === 'PDF'}
              onChange={() => handleReportExtensionChange('PDF')}
              className="font-medium"
            />
          </div>
          <div className="p-2">
            <Radio
              id="report-extension"
              name="report-extension"
              value="CSV"
              content="CSV"
              checked={reportExtension === 'CSV'}
              onChange={() => handleReportExtensionChange('CSV')}
              className="font-medium"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-text-neutral-primary text-md font-semibold">
            بازه زمانی را انتخاب کنید
          </span>
          <div className="w-full">
            <DatePickerTrigger
              className="justify-between"
              title={['تاریخ شروع', 'تاریخ پایان']}
              mode="range"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 px-6">
        <Button
          theme="brand"
          mode="primary"
          size="md"
          disabled={!reportType || !reportExtension}
          onClick={() => {
            if (reportType && reportExtension) {
              onClose();
              setShareReportPopupOpen(
                true,
                reportType,
                reportExtension,
                dateRange.startDate,
                dateRange.endDate,
              );
            }
          }}
        >
          <span className="font-medium">تولید گزارش</span>
        </Button>
      </div>
    </Dialog>
  );
};
