'use client';
import { cn, Icon } from 'design-system';
import { CategoryList } from './CategoryList';
import { GetReportsCategoriesResponse, GetReportsResponse } from '@openapi';
import { useHeaderVisibility } from '../../../../../hooks/useHeaderVisiblity';

type Props = {
  categories: GetReportsCategoriesResponse;
  reports: GetReportsResponse;
  inModal?: boolean;
};

export const SideBar: React.FC<Props> = ({ categories, reports, inModal }) => {
  const { isHeaderVisible } = useHeaderVisibility();
  return (
    <div
      className={cn(
        'sticky top-4 mt-6 h-fit w-[180px] transition-all duration-300',
        {
          'top-[107px]': isHeaderVisible,
        },
        {
          "static w-full" : inModal 
        }
      )}
    >
      {!inModal && (
        <span className="mb-8 inline-block text-3xl font-medium">
          لیست‌ گزارش‌‌‌‌‌‌ها
        </span>
      )}
      <div className="mb-6 flex items-center gap-2">
        <Icon name="layers-2" size="lg" />
        <div className="text-lg font-medium">دسته‌بندی‌ها</div>
      </div>
      <CategoryList inModal={inModal} reports={reports} categories={categories} />
    </div>
  );
};
