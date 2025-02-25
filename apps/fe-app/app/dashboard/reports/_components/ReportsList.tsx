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
    <>
      <div className="flex items-center justify-center  bg-blue-100">
        <div className='w-[380px] flex items-center gap-2'>
          <SearchBar />
          <FilterReport />
        </div>
      </div>
      <div className="grid grid-cols-1 items-center xl:grid-cols-2 gap-4 bg-yellow-100">
        {reports.map((report, idx) => (
          <ReportCard fixedBrief={true} key={report.identifier} {...report} />
        ))}
      </div>
    </>
  );
};
