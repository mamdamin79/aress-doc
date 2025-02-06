import { Icon } from 'design-system';
import { CategoryList } from './CategoryList';
import { NewReportDialog } from './NewReportDialog';
import { GetDashboardReportsCategoriesResponse } from '@openapi';

type Props = {
  categories: GetDashboardReportsCategoriesResponse;
};

export const SideBar: React.FC<Props> = ({ categories }) => {
  return (
    <div className="sticky top-20 h-screen w-[200px] p-2">
      <div className="mb-4 flex items-center gap-2">
        <Icon name="layers-2" size="lg" />
        <div className="text-lg font-medium">دسته بندی ها</div>
      </div>
      <CategoryList categories={categories} />
      <NewReportDialog />
    </div>
  );
};
