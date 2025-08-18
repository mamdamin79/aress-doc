'use client';
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Button, Icon } from 'design-system';
import { RequestReportPopup } from './RequestReportPopup';
import { ShareReportPopup } from './ShareReportPopup';
import { fileExportType } from './types';

export const SidebarWrapper: React.FC = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [requestReportPopupOpen, setRequestReportPopupOpen] = useState(false);
  const [shareReportPopupOpen, setShareReportPopupOpen] = useState(false);
  const [reportType, setReportType] = useState<string>('');
  const [reportExtension, setReportExtension] = useState<fileExportType>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  return (
    <>
      <div className="flex w-full justify-end gap-4 lg:hidden">
        <Button
          onClick={() => setSideBarOpen(true)}
          mode="secondary"
          size="sm"
          theme="brand"
          className="w-[114px] font-medium"
        >
          <div className="flex items-center gap-2 font-medium">
            <span>فیلترها</span>
            <Icon name="filter" size="lg" />
          </div>
        </Button>
        <Button
          mode="secondary"
          className="w-[170px]"
          size="sm"
          theme="brand"
          onClick={() => setRequestReportPopupOpen(true)}
        >
          <div className="flex items-center gap-2 font-medium">
            <span>درخواست گزارش</span>
            <Icon name="file-plus-2" size="lg" />
          </div>
        </Button>
      </div>
      {/* Sidebar - hidden on lg screens and above */}
      <div className="lg:hidden">
        <Sidebar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      </div>
      <RequestReportPopup
        isOpen={requestReportPopupOpen}
        setShareReportPopupOpen={(
          open: boolean,
          reportType: string,
          reportExtension: fileExportType,
          startDate: string,
          endDate: string,
        ) => {
          setReportType(reportType);
          setReportExtension(reportExtension);
          setStartDate(startDate);
          setEndDate(endDate);
          setShareReportPopupOpen(open);
        }}
        onClose={() => setRequestReportPopupOpen(false)}
      />
      <ShareReportPopup
        isOpen={shareReportPopupOpen}
        onClose={() => setShareReportPopupOpen(false)}
        url="https://www.google.com"
        message="گزارش"
        platformNames={[
          'Instagram',
          'Telegram',
          'WhatsApp',
          'Linkedin',
          'Email',
        ]}
        reportType={reportType}
        reportExtension={reportExtension}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
};
