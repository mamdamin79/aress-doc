// path: ./hooks/useReportSelection.ts
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  GetReportsCategoriesResponse,
  GetReportsResponse,
  useReportsServiceGetReports,
  useReportsServiceGetReportsByReportId,
  useReportsServiceGetReportsCategories,
} from '@openapi';

export function useReportSelection(selectedReportID: string | null) {
  const searchParams = useSearchParams();
  const ITEMS_PER_PAGE = 6;

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const queryParams: Record<string, any> = {};
  if (searchParams.has('onlyFavorite'))
    queryParams.onlyFavorite = Boolean(searchParams.get('onlyFavorite'));
  if (searchParams.has('onlyHavingVideo'))
    queryParams.onlyHavingVideo = Boolean(searchParams.get('onlyHavingVideo'));
  if (searchParams.has('onlyNew'))
    queryParams.onlyNew = Boolean(searchParams.get('onlyNew'));

  const [reports, setReports] = useState<GetReportsResponse | null>();
  const [categories, setCategories] =
    useState<GetReportsCategoriesResponse | null>();

  const { data: reportsList, refetch: fetchReportsList } =
    useReportsServiceGetReports(queryParams, undefined, { enabled: false });

  const { data: reportCategories, refetch: fetchReportsCategories } =
    useReportsServiceGetReportsCategories();

  const filteredReports = useMemo(() => {
    return reportsList?.filter((report) => {
      const matchesCategory = category
        ? report.category.title === category
        : true;
      const matchesSearch = search
        ? report.title.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [reportsList, category, search]);

  const paginatedReports = useMemo(() => {
    return filteredReports?.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE,
    );
  }, [filteredReports, page]);

  const totalPages = filteredReports
    ? Math.ceil(filteredReports.length / ITEMS_PER_PAGE)
    : 0;

  const { data: previewData, refetch: fetchReportPreview } =
    useReportsServiceGetReportsByReportId({
      reportId: selectedReportID ?? '6',
    });

  const openPopup = async () => {
    const [reportRes, categoryRes] = await Promise.all([
      fetchReportsList(),
      fetchReportsCategories(),
    ]);

    if (reportRes.data) setReports(reportRes.data);
    if (categoryRes.data) setCategories(categoryRes.data);
  };

  return {
    categories,
    filteredReports,
    paginatedReports,
    totalPages,
    fetchReportPreview,
    previewData,
    openPopup,
    ITEMS_PER_PAGE,
    currentPage: page,
  };
}
