import { Icon } from 'design-system';
import { CategoryList } from './CategoryList';
import { NewReportDialog } from './NewReportDialog';
import {
  GetDashboardReportsCategoriesResponse,
  GetDashboardReportsResponse,
} from '@openapi';

type Props = {
  categories: GetDashboardReportsCategoriesResponse;
  reports: GetDashboardReportsResponse;
};

export const SideBar: React.FC<Props> = ({ categories, reports }) => {
  return (
    <div className=" mt-6 h-screen w-[180px]">
      <h1 className="text-3xl sm:text-xl sm:mb-5 font-medium">لیست گزارش ها</h1>
      <div className="mb-4 flex items-center gap-2">
        <Icon name="layers-2" size="lg" />
        <div className="text-lg font-medium">دسته بندی ها</div>
      </div>
      <CategoryList reports={reports} categories={categories} />
      <NewReportDialog />
    </div>
  );
};
