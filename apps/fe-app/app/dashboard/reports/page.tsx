import { ReportList } from './_components/ReportsList';
import { SideBar } from './_components/SideBar';
import { DashboardService, GetDashboardReportsData, OpenAPI } from '@openapi';
import { Pagination } from 'design-system';

const ITEMS_PER_PAGE = 5;

async function getData(searchParams: GetDashboardReportsData) {
  OpenAPI.HEADERS = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzQ1NDE2MjY5fQ.fYoeXOvstJcWxcoExDW1fwwmvzi0L7aXqgO_3viizU0`,
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
    <div className="mx-8 md:flex md:justify-center xl:block ">
      <div className="flex md:max-w-[772px] xl:max-w-full flex-row-reverse items-start justify-between gap-4 xl:justify-center">
        <div className="w-full">
          <ReportList reports={paginatedReports} />
          <Pagination
            currentPage={currentPage}
            pageCount={totalPages}
            pageSize={ITEMS_PER_PAGE}
          />
        </div>
        <div className=''>
          <SideBar reports={reports} categories={categories} />
        </div>
      </div>
    </div>
  );
}
