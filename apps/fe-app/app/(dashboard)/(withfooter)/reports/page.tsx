import { fetchToken } from '../../../(auth)/auth.utils';
import { NewReportDialog } from './_components/NewReportDialog';
import { ReportList } from './_components/ReportsList';
import { SideBar } from './_components/SideBar';
import { DashboardService, GetDashboardReportsData, OpenAPI } from '@openapi';
import { Pagination } from 'design-system';

const ITEMS_PER_PAGE = 6;

async function getData(searchParams: GetDashboardReportsData) {
  const token = await fetchToken();
  if (!token) {
    throw new Error('Failed to fetch access token');
  }
  OpenAPI.HEADERS = {
    Authorization: `Bearer ${token}`,
  };

  const [reports, categories] = await Promise.all([
    DashboardService.getDashboardReports({
      ...searchParams,
    }),
    DashboardService.getDashboardReportsCategories(),
  ]);
  return { reports, categories };
}

export default async function ReportMenuPage({
  searchParams,
}: {
  searchParams: GetDashboardReportsData & {
    page?: string;
    category?: string;
    search?: string;
  };
}) {
  const { reports, categories } = await getData(searchParams);

  const filteredReports = reports.filter((report) => {
    const matchesCategory = searchParams.category
      ? report.category.title === searchParams.category
      : true;

    const matchesSearch = searchParams.search
      ? report.title.includes(searchParams.search)
      : true;

    return matchesCategory && matchesSearch;
  });

  // calculate current page based on searchParams
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  // total pages
  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);

  // paginating products
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="mx-auto flex justify-center px-20 xl:mx-[80px] xl:block">
      <div className="flex flex-row-reverse items-stretch justify-between gap-4 md:max-w-[772px] xl:max-w-full xl:justify-center">
        <div>
          <ReportList reports={paginatedReports} />
          <Pagination
            currentPage={currentPage}
            pageCount={totalPages}
            pageSize={ITEMS_PER_PAGE}
          />
        </div>
        <div className={`relative pb-20`}>
          <SideBar reports={reports} categories={categories} />
        </div>
      </div>
      <NewReportDialog />
    </div>
  );
}
