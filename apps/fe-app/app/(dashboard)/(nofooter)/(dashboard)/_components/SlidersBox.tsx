'use client';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  AutoRotateSwitch,
  AutoRotationOff,
  cn,
  ConfirmModal,
  HorizontalScrollBar,
} from 'design-system';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DashboardNumberAndName } from './DashboardNumberAndName';
import { useSearchParams } from 'next/navigation';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useHtmlPaddingRight } from '../../../../../hooks';
import { useCustomToast } from 'libs/design-system/src/hooks/CustomToast/CustomToast';
import {
  FinancialReportCalculationApiModel,
  GetReportsCategoriesResponse,
  GetReportsResponse,
  OpenAPI,
  useReportsServiceGetReports,
  useReportsServiceGetReportsByReportId,
  useReportsServiceGetReportsCategories,
} from '@openapi';
import { fetchToken } from '../../../../(auth)/auth.utils';
import { useAutoRotate } from './hooks/useAutoRotate';
import { ReportTitleSkeleton } from './skeletons/ReportTitleSkeleton';
import { ReportSectionSkeleton } from './skeletons/ReportSectionSkeleton';
import {
  ReportPreviewPopup,
  ReportSelectionPopup,
} from '../../../../components';
import { SortableReport } from './SortableReport';
import { SortableAddReportButton } from './SortableAddReportButton';
import { calculateSlotsToRender, generateTooltips } from './utils';
import { useDashboardData } from './hooks/useDashboardData';
import { useDashboardActions } from './hooks/useDashboardActions';

const MAX_TOTAL_SLOTS = 16;

export const SlidersBox: React.FC = () => {
  const [barsNumber, setBarsNumber] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [isReportSelectionPopupOpen, setIsReportSelectionPopupOpen] =
    useState(false);
  const [isReportPreviewOpen, setIsReportPreviewOpen] = useState(false);
  const [selectedReportID, setSelectedReportID] = useState<string | null>(null);
  const [activeReportPlacementOrder, setActiveReportPlacementOrder] = useState<
    string | null
  >(null);
  const [isRemoveReportOpen, setIsRemoveReportOpen] = useState({
    open: false,
    dashboardName: '',
    dashboardItemID: 0,
  });

  const [reportDataMap, setReportDataMap] = useState<
    Record<
      number,
      {
        data: FinancialReportCalculationApiModel['calculation'];
        filters: FinancialReportCalculationApiModel['filters'];
      }
    >
  >({});

  useEffect(() => {
    async function initToken() {
      const token = await fetchToken();
      if (!token) throw new Error('Failed to fetch access token');
      OpenAPI.HEADERS = { Authorization: `Bearer ${token}` };
      setTokenLoaded(true);
    }

    initToken();
  }, []);

  const searchParams = useSearchParams();
  const {
    dashboardData,
    setDashboardData,
    isDashboardLoading,
    slotsToRender,
    setSlotsToRender,
    dashboardIdParam,
  } = useDashboardData(tokenLoaded);
  const {
    currIndex,
    activeRotate,
    setActiveRotate,
    handleRotation,
    scrollToIndex: handleScroll,
  } = useAutoRotate({ barsNumber, onRotate: () => {} });

  const { showToast } = useCustomToast();
  const htmlPaddingRight = useHtmlPaddingRight();
  const {
    handleSubmit,
    handleRemoveReport,
    handleAddNewReport,
    handleDragEnd: handleDragEndInternal,
  } = useDashboardActions({
    dashboardId: dashboardIdParam ? Number(dashboardIdParam) : null,
    dashboardData,
    setSlotsToRender,
    setReportDataMap,
    setIsRemoveReportOpen,
    showToast,
    setDashboardData,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const ITEMS_PER_PAGE = 6;

  const categoryInSearchParams = searchParams.get('category') || '';
  const searchInSearchParams = searchParams.get('search') || '';
  const pageInSearchParams = searchParams.get('page') || '1';

  const queryParams: Record<string, any> = {};

  if (searchParams.has('onlyFavorite')) {
    queryParams.onlyFavorite = Boolean(searchParams.get('onlyFavorite'));
  }
  if (searchParams.has('onlyHavingVideo')) {
    queryParams.onlyHavingVideo = Boolean(searchParams.get('onlyHavingVideo'));
  }
  if (searchParams.has('onlyNew')) {
    queryParams.onlyNew = Boolean(searchParams.get('onlyNew'));
  }

  const { data: reportsList, refetch: fetchReportsList } =
    useReportsServiceGetReports(queryParams, undefined, { enabled: false });
  const { data: reportCategories, refetch: fetchReportsCategories } =
    useReportsServiceGetReportsCategories();
  const [reports, setReports] = useState<GetReportsResponse | null>();
  const [categories, setCategories] =
    useState<GetReportsCategoriesResponse | null>();

  const filteredReports = useMemo(() => {
    return reportsList?.filter((report) => {
      const matchesCategory = categoryInSearchParams
        ? report.category.title === categoryInSearchParams
        : true;

      const matchesSearch = searchInSearchParams
        ? report.title
            .toLowerCase()
            .includes(searchInSearchParams.toLowerCase())
        : true;

      return matchesCategory && matchesSearch;
    });
  }, [reports, categoryInSearchParams, searchInSearchParams]);

  const currentPage = parseInt(pageInSearchParams, 10) || 1;

  const paginatedReports = useMemo(() => {
    return filteredReports?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    );
  }, [filteredReports, currentPage]);

  const totalPages = filteredReports
    ? Math.ceil(filteredReports.length / ITEMS_PER_PAGE)
    : 0;
  const handleReportSelectionPopupOpen = async () => {
    const [reportsRes, categoriesRes] = await Promise.all([
      fetchReportsList(),
      fetchReportsCategories(),
    ]);

    if (reportsRes.data) setReports(reportsRes.data);
    if (categoriesRes.data) setCategories(categoriesRes.data);

    setIsReportSelectionPopupOpen(true);
  };
  const { data: reportsPreviewData, refetch: fetchReportPreview } =
    useReportsServiceGetReportsByReportId({
      reportId: selectedReportID ?? '6',
    });
  useEffect(() => {
    const cols = window.matchMedia('(min-width: 1280px)').matches ? 4 : 2;
    setSlidesPerView(cols);
    setBarsNumber(Math.ceil(slotsToRender.length / cols));
  }, [dashboardData, slotsToRender]);

  const handleDragEnd = (event: DragEndEvent) => {
    const result = handleDragEndInternal({
      active: { id: String(event.active.id) },
      over: event.over ? { id: String(event.over.id) } : null,
    });

    if (!result) return;

    setSlotsToRender((prev) => result.updatedSlotsToRender(prev));
  };

  {
    !tokenLoaded ||
      !dashboardIdParam ||
      (isDashboardLoading &&
        Array.from(
          [1, 2, 3, 4].map((arr) => {
            return <Skeleton />;
          }),
        ));
  }
  return (
    <div className="w-fit">
      {dashboardData ? (
        <div className="flex w-full justify-between">
          <DashboardNumberAndName
            number={dashboardData?.identifier}
            title={dashboardData?.name}
          />
          <AutoRotateSwitch
            onChange={handleRotation}
            rotateOptions={[5, 10, 15]}
            initialValue={activeRotate}
          />
        </div>
      ) : (
        <ReportTitleSkeleton />
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <section className="mt-6 flex w-full justify-center">
          <SortableContext
            items={slotsToRender.map((order) => `slot-${order}`)}
            strategy={rectSortingStrategy}
          >
            <div
              ref={containerRef}
              className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2"
            >
              {dashboardData
                ? slotsToRender.map((order) => {
                    const report = dashboardData?.items?.find(
                      (r) => r.order === order,
                    );
                    const slotId = `slot-${order}`;
                    if (report) {
                      return (
                        <SortableReport
                          key={slotId}
                          slotId={slotId}
                          identifier={String(report.report.identifier)}
                          title={report.report.title}
                          data={
                            reportDataMap[report.identifier]?.data ??
                            report.report.reportCalculation?.calculation
                          }
                          filters={
                            reportDataMap[report.identifier]?.filters ??
                            report.report.reportCalculation?.filters
                          }
                          onSubmit={(changedOptions) =>
                            handleSubmit(report.identifier, changedOptions)
                          }
                          onRemoveReport={() =>
                            setIsRemoveReportOpen({
                              dashboardItemID: report.identifier,
                              dashboardName: report.report.title,
                              open: true,
                            })
                          }
                        />
                      );
                    }

                    return (
                      <SortableAddReportButton
                        key={slotId}
                        slotId={slotId}
                        onClick={() => {
                          handleReportSelectionPopupOpen();
                          setActiveReportPlacementOrder(slotId);
                        }}
                      />
                    );
                  })
                : Array.from(
                    [1, 2, 3, 4].map((i) => <ReportSectionSkeleton />),
                  )}
            </div>
          </SortableContext>
        </section>
      </DndContext>

      <div
        className={cn(
          'fixed right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-2',
          activeRotate && 'pt-1',
        )}
        style={{ paddingRight: htmlPaddingRight }}
      >
        <HorizontalScrollBar
          onChangeIndex={(index) => {
            setActiveRotate(null);
            handleScroll(index);
          }}
          barsNumber={barsNumber}
          externalIndex={currIndex}
          autoRotate={Boolean(activeRotate)}
          autoRotateDuration={activeRotate || undefined}
          tooltips={generateTooltips(barsNumber * slidesPerView, slidesPerView)}
          onAddReportClick={() => {
            const total = slotsToRender.length;
            if (total >= MAX_TOTAL_SLOTS) {
              showToast({
                message: 'حداکثر تعداد گزارش در هر داشبورد 16 عدد است',
                type: 'warning',
              });
              return;
            }
            setSlotsToRender((prev) => [...prev, prev.length]);
            setTimeout(() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
              });
            }, 100);
          }}
        />
        {activeRotate && (
          <AutoRotationOff onClick={() => setActiveRotate(null)} />
        )}
      </div>

      {isReportSelectionPopupOpen && paginatedReports && (
        <ReportSelectionPopup
          isOpen={isReportSelectionPopupOpen}
          onClose={() => setIsReportSelectionPopupOpen(false)}
          categories={reportCategories ?? []}
          currentPage={currentPage}
          pageCount={totalPages}
          pageSize={ITEMS_PER_PAGE}
          reports={paginatedReports ?? []}
          totalItems={filteredReports?.length ?? 0}
          onReportClick={(id) => {
            setSelectedReportID(String(id));
            fetchReportPreview();
            setIsReportPreviewOpen(true);
            setIsReportSelectionPopupOpen(false);
          }}
        />
      )}
      {isReportPreviewOpen && reportsPreviewData && (
        <ReportPreviewPopup
          isOpen={isReportPreviewOpen}
          onClose={() => {
            setIsReportPreviewOpen(false);
            setSelectedReportID(null);
          }}
          onSubmit={(options) => {
            handleAddNewReport(
              String(selectedReportID),
              activeReportPlacementOrder,
              options,
            );
            setIsReportPreviewOpen(false);
          }}
          category={reportsPreviewData.category.title}
          isNew={reportsPreviewData.isNew ?? false}
          report={{
            data: reportsPreviewData.reportCalculation,
            identifier: reportsPreviewData.identifier,
            title: reportsPreviewData.title,
          }}
          summary={reportsPreviewData.summary}
          title={reportsPreviewData.title}
          video={!!reportsPreviewData.video}
        />
      )}
      <ConfirmModal
        isOpen={isRemoveReportOpen.open}
        onConfirm={() =>
          handleRemoveReport(
            isRemoveReportOpen.dashboardItemID,
            isRemoveReportOpen.dashboardName,
          )
        }
        title="تایید حذف گزارش"
        cancelBtnLabel="خیر"
        submitBtnLabel="بله"
        description={
          <span>
            آیا مطمئن هستید که می‌خواهید گزارش
            <span className="font-medium">
              {' '}
              {isRemoveReportOpen.dashboardName}{' '}
            </span>
            را از این فضا حذف کنید؟
          </span>
        }
        onClose={() =>
          setIsRemoveReportOpen({
            dashboardItemID: 0,
            dashboardName: '',
            open: false,
          })
        }
      />
    </div>
  );
};
