'use client';

import { Suspense } from 'react';
import { FilterReportClient } from './FilterReportClient';

export const FilterReport = () => {
  return (
    <Suspense fallback={<div className="h-12 w-12" />}>
      <FilterReportClient />
    </Suspense>
  );
};
