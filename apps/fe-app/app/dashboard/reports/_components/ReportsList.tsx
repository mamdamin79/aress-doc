import { GetDashboardReportsData, GetDashboardReportsResponse } from '@openapi';
import { ReportCard } from 'design-system';
import React from 'react';

type Props = {
  reports: GetDashboardReportsResponse;
  searchParams: GetDashboardReportsData & {
    page?: string;
    category?: string;
  };
};

export const ReportList: React.FC<Props> = ({ reports, searchParams }) => {
  const filteredReports = reports.filter((report) =>
    searchParams.category
      ? report.category.title === searchParams.category
      : report,
  );
  if (filteredReports.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium">گزارشی یافت نشد</h1>
          <p className="text-gray-500">
            ممکن است گزارشی وجود نداشته باشد یا شما مجوز دسترسی به آن را نداشته
            باشید
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-8">
      {filteredReports.map((report, idx) => (
        <ReportCard key={report.identifier} {...report} />
      ))}
    </div>
  );
};
