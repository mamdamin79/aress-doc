import { ReportList } from './_components/ReportsList';
import { SideBar } from './_components/SideBar';
import { SearchBar } from './_components/SearchBar';
import { DashboardService, GetDashboardReportsData, OpenAPI } from '@openapi';
import { FilterReport } from './_components/FilterReport';
import { Pagination } from 'design-system';

const ITEMS_PER_PAGE = 5;

async function getData(searchParams: GetDashboardReportsData) {
  OpenAPI.HEADERS = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzQwNTYxODgxfQ.AYeDmC-D54omX5jI_I78zNx66a98iKBnNzGqXRN5n3U`,
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
    <div className="mx-8 bg-red-200">
      <div className="flex flex-row-reverse items-start justify-between gap-4 xl:justify-center">
        <div className="w-full">
          <ReportList reports={paginatedReports} />
          <Pagination
            currentPage={currentPage}
            pageCount={totalPages}
            pageSize={ITEMS_PER_PAGE}
          />
        </div>
        <div className='bg-red-400'>
          <SideBar reports={reports} categories={categories} />
        </div>
      </div>
    </div>
  );
}
