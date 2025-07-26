'use client';

import { GetReportsCategoriesResponse, GetReportsResponse } from '@openapi';
import { Suspense } from 'react';

import { CategoryItems } from './CategoryItems';

type Props = {
  categories: GetReportsCategoriesResponse;
  reports: GetReportsResponse;
};

export const CategoryList: React.FC<Props> = ({ categories, reports }) => {
  return (
    <Suspense fallback={<div>در حال بارگذاری دسته‌بندی‌ها...</div>}>
      <CategoryItems categories={categories} reports={reports} />
    </Suspense>
  );
};
