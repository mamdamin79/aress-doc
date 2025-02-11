import { ReportList } from './_components/ReportsList';
import { SideBar } from './_components/SideBar';
import { SearchBar } from './_components/SearchBar';
import { DashboardService, GetDashboardReportsData, OpenAPI } from '@openapi';
import { FilterReport } from './_components/FilterReport';

async function getData(searchParams: GetDashboardReportsData) {
  OpenAPI.HEADERS = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzM4OTM0NjY3fQ.n-rwjeSg43FFg7uCfXa1Y9U0pNVtuQoNOTDE6dUeTUk`,
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
  };
}) {
  const { reports, categories } = await getData(searchParams);

  const filteredReports = reports.filter((report) =>
    searchParams.category
      ? report.category.title === searchParams.category
      : report,
  );

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex items-center justify-start gap-6">
        <h1 className="text-3xl font-medium">لیست گزارش ها</h1>
        <SearchBar />
        <FilterReport />
      </div>
      <div className="flex items-start justify-between gap-8">
        <div className="w-[1048px]">
          <ReportList reports={filteredReports} />
          {/* <Pagination
            currentPage={meta.current_page}
            pageCount={meta.last_page}
            pageSize={meta.per_page}
          /> */}
        </div>
        <SideBar reports={reports} categories={categories} />
      </div>
    </div>
  );
}
