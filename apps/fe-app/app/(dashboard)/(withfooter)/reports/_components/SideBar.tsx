'use client';
import { cn, Icon } from 'design-system';
import { CategoryList } from './CategoryList';
import {
  GetDashboardReportsCategoriesResponse,
  GetDashboardReportsResponse,
} from '@openapi';
import { useHeaderVisibility } from '../../../../../hooks/useHeaderVisiblity';

type Props = {
  categories: GetDashboardReportsCategoriesResponse;
  reports: GetDashboardReportsResponse;
};

export const SideBar: React.FC<Props> = ({ categories, reports }) => {
  const { isHeaderVisible } = useHeaderVisibility();
  return (
    <div
      className={cn(
        'sticky top-0 mt-6 h-fit w-[180px] transition-all duration-300',
        {
          'top-24': isHeaderVisible,
        },
      )}
    >
      <h1 className="mb-5 text-3xl font-medium">لیست گزارش ها</h1>
      <div className="mb-4 flex items-center gap-2">
        <Icon name="layers-2" size="lg" />
        <div className="text-lg font-medium">دسته بندی ها</div>
      </div>
      <CategoryList reports={reports} categories={categories} />
    </div>
  );
};
