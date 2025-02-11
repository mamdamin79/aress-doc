import { GetDashboardReportsResponse } from '@openapi';
import { ReportCard } from 'design-system';
import React from 'react';
import emptyState from '@aress-assets/icons/Empty state.png';
import Image from 'next/image';


type Props = {
  reports: GetDashboardReportsResponse;
};

export const ReportList: React.FC<Props> = ({ reports }) => {
  if (reports.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
         <Image width={500} height={500} src={emptyState} alt="" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-8">
      {reports.map((report, idx) => (
        <ReportCard key={report.identifier} {...report} />
      ))}
    </div>
  );
};
