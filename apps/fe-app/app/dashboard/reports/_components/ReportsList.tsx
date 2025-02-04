import { GetDashboardReportsResponse } from '@openapi';
import { ReportCard } from 'design-system';
import React from 'react';

type Props = {
  reports: GetDashboardReportsResponse;
}

export const ReportList: React.FC<Props> = ({ reports }) => {
  console.log(reports[0])
  
  return (
    <div className="flex flex-wrap gap-8">
      {reports.map((report,idx) => (
        <ReportCard
          key={report.identifier}
          {...report}
        />
      ))}
    </div>
  );
};
