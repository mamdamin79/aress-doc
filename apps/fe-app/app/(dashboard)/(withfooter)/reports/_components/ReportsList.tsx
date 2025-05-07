import { GetDashboardReportsResponse } from '@openapi';
import { ReportCard } from 'design-system';
import React from 'react';
import emptyState from '@aress-assets/icons/Empty state.png';
import Image from 'next/image';
import { FilterReport } from './FilterReport';
import { SearchBar } from './SearchBar';

type Props = {
  reports: GetDashboardReportsResponse;
};

export const ReportList: React.FC<Props> = ({ reports }) => {
  return (
    <>
      <div className="inline-flex items-center justify-center">
        <div className="flex w-full items-start">
          <div className="flex items-center gap-2">
            <SearchBar />
            <FilterReport />
          </div>
        </div>
      </div>
      {reports.length > 0 ? (
        <div className="4xl:grid-cols-3 4xl:max-w-[1591px] grid max-w-[1048px] grid-cols-1 items-center gap-4 xl:grid-cols-2">
          {reports.map((report, idx) => (
            <div
              key={report.identifier}
              className="sm:max-w-[380px] md:max-w-full"
            >
              <ReportCard
                link="/report/1"
                categoryType={report.category.title}
                reportSubscription="رایگان"
                fixedBrief={true}
                {...report}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="4xl:w-[1591px] mx-auto flex h-full flex-col items-center justify-start md:w-[512px] xl:w-[904px]">
          <Image
            src={emptyState}
            alt="empty state"
            className="h-[345px] w-[380px] object-contain md:h-[380px] md:w-[412px]"
          />
          <p className="text-lg font-normal text-gray-500">
            گزارشی برای نمایش وجود ندارد
          </p>
        </div>
      )}
    </>
  );
};
