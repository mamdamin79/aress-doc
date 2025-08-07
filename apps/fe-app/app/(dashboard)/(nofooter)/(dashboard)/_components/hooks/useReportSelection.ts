// path: ./hooks/useReportSelection.ts
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  GetReportsCategoriesResponse,
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

  const queryParams: Record<string, boolean> = {};
  if (searchParams.has('onlyFavorite'))
    queryParams.onlyFavorite = Boolean(searchParams.get('onlyFavorite'));
  if (searchParams.has('onlyHavingVideo'))
    queryParams.onlyHavingVideo = Boolean(searchParams.get('onlyHavingVideo'));
  if (searchParams.has('onlyNew'))
    queryParams.onlyNew = Boolean(searchParams.get('onlyNew'));

  const [categories, setCategories] =
    useState<GetReportsCategoriesResponse | null>();

  const { data: reportsList } = useReportsServiceGetReports(
    queryParams,
    undefined,
    { enabled: !!selectedReportID },
  );

  const { refetch: fetchReportsCategories } =
    useReportsServiceGetReportsCategories(undefined, {
      enabled: !!selectedReportID,
    });

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
    useReportsServiceGetReportsByReportId(
      {
        reportId: selectedReportID ?? '6',
      },
      undefined,
      { enabled: !!selectedReportID },
    );

  const openPopup = async () => {
    const categoryRes = await fetchReportsCategories();

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
