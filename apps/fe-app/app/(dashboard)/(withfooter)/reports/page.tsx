import { fetchToken } from '../../../(auth)/auth.utils';
import { NewReportDialog } from './_components/NewReportDialog';
import { ReportList } from './_components/ReportsList';
import { SideBar } from './_components/SideBar';
import { ReportsService, OpenAPI, GetReportsData } from '@openapi';
import { Pagination } from 'design-system';

const ITEMS_PER_PAGE = 6;

async function getData(searchParams: GetReportsData) {
  const token = await fetchToken();
  if (!token) {
    throw new Error('Failed to fetch access token');
  }
  OpenAPI.HEADERS = {
    Authorization: `Bearer ${token}`,
  };

  const [reports, categories] = await Promise.all([
    ReportsService.getReports({
      ...searchParams,
    }),
    ReportsService.getReportsCategories(),
  ]);
  return { reports, categories };
}
export default async function ReportMenuPage({
  searchParams,
}: {
  searchParams: Promise<
    GetReportsData & {
      page?: string;
      category?: string;
      search?: string;
    }
  >;
}) {
  const resolvedSearchParams = await searchParams;
  const { reports, categories } = await getData(resolvedSearchParams);
  const filteredReports = reports.filter((report) => {
    const matchesCategory = resolvedSearchParams.category
      ? report.category.title === resolvedSearchParams.category
      : true;

    const matchesSearch = resolvedSearchParams.search
      ? report.title.includes(resolvedSearchParams.search)
      : true;

    return matchesCategory && matchesSearch;
  });

  // calculate current page based on searchParams
  const currentPage = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page, 10)
    : 1;

  // total pages
  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);

  // paginating products
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="text-text-neutral-primary mx-auto flex justify-center px-20 xl:block">
      <div className="flex flex-row-reverse items-stretch justify-between gap-8 md:max-w-[772px] xl:max-w-full xl:justify-center">
        <div>
          <ReportList reports={paginatedReports} />
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              pageCount={totalPages}
              pageSize={ITEMS_PER_PAGE}
              totalItems={filteredReports.length}
            />
          </div>
        </div>
        <div className={`relative pb-20`}>
          <SideBar reports={reports} categories={categories} />
        </div>
      </div>
      <NewReportDialog />
    </div>
  );
}
