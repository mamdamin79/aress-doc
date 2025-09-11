'use client';
import { useMemo, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  GetReportsCategoriesResponse,
  useReportsServiceGetReports,
  useReportsServiceGetReportsByReportId,
  useReportsServiceGetReportsCategories,
} from '@openapi';

export function useReportSelection(
  selectedReportID: string | null,
  isReportSelectionPopupOpen: boolean,
) {
  const searchParams = useSearchParams();
  const ITEMS_PER_PAGE = 6;
  const [displayedItemsCount, setDisplayedItemsCount] =
    useState(ITEMS_PER_PAGE);
  const [hasMore, setHasMore] = useState(true);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

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
    { enabled: isReportSelectionPopupOpen },
  );

  const { refetch: fetchReportsCategories } =
    useReportsServiceGetReportsCategories(undefined, {
      enabled: isReportSelectionPopupOpen,
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

  const displayedReports = useMemo(() => {
    const reports = filteredReports?.slice(0, displayedItemsCount) || [];
    setHasMore(
      filteredReports ? filteredReports.length > displayedItemsCount : false,
    );
    return reports;
  }, [filteredReports, displayedItemsCount]);

  const loadMore = useCallback(() => {
    if (hasMore && filteredReports) {
      const newCount = displayedItemsCount + ITEMS_PER_PAGE;
      setDisplayedItemsCount(newCount);
    }
  }, [hasMore, filteredReports, displayedItemsCount, ITEMS_PER_PAGE]);

  // Reset displayed items when filters change
  useMemo(() => {
    setDisplayedItemsCount(ITEMS_PER_PAGE);
  }, [category, search]);

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
    displayedReports,
    hasMore,
    loadMore,
    fetchReportPreview,
    previewData,
    openPopup,
    ITEMS_PER_PAGE,
  };
}
