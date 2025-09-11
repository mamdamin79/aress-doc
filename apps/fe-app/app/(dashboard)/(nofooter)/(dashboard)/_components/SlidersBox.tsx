'use client';
import {
  AutoRotateSwitch,
  AutoRotationOff,
  cn,
  ConfirmModal,
  HorizontalScrollBar,
} from 'design-system';
import React, { useEffect, useRef, useState } from 'react';
import { DashboardNumberAndName } from './DashboardNumberAndName';

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
import { useHtmlPaddingRight } from '@shared';
import { useCustomToast } from 'design-system';
import { FinancialReportCalculationApiModel } from '@openapi';
import { useAutoRotate } from './hooks/useAutoRotate';
import { ReportTitleSkeleton } from './skeletons/ReportTitleSkeleton';
import { ReportSectionSkeleton } from './skeletons/ReportSectionSkeleton';
import {
  ReportPreviewPopup,
  ReportSelectionPopup,
} from '../../../../components';
import { SortableReport } from './SortableReport';
import { SortableAddReportButton } from './SortableAddReportButton';
import { generateTooltips } from './utils';
import { useDashboardData } from './hooks/useDashboardData';
import { useDashboardActions } from './hooks/useDashboardActions';
import { useReportSelection } from './hooks/useReportSelection';
import { SuccessShareResponse } from './types/types';
import { ShareReportPopUp } from './ShareReportPopup';

const MAX_TOTAL_SLOTS = 16;

export const SlidersBox: React.FC = () => {
  const [barsNumber, setBarsNumber] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReportSelectionPopupOpen, setIsReportSelectionPopupOpen] =
    useState(false);
  const [isReportPreviewOpen, setIsReportPreviewOpen] = useState(false);
  const [selectedReportID, setSelectedReportID] = useState<string | null>(null);
  const [activeReportPlacementOrder, setActiveReportPlacementOrder] = useState<
    string | null
  >(null);
  const [shareReportData, setShareReportData] = useState<{
    data: SuccessShareResponse;
    reportID: string;
  } | null>(null);
  const [shareReportOpen, setShareReportOpen] = useState(false);
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
  const [replaceReportID, setReplaceReportID] = useState<number | null>(null);
  const baseURL = process.env.NEXT_PUBLIC_API_URL ?? '';

  const {
    dashboardData,
    setDashboardData,
    slotsToRender,
    setSlotsToRender,
    dashboardIdParam,
  } = useDashboardData();
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
    callRenderEndpoint,
    handleReplaceReport,
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
  const {
    previewData: reportsPreviewData,
    openPopup: handleReportSelectionPopupOpen,
    fetchReportPreview,
    filteredReports,
    displayedReports,
    categories,
    hasMore,
    loadMore,
  } = useReportSelection(selectedReportID, isReportSelectionPopupOpen);
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
  const shareReport = async (
    id: string,
    title: string,
    selectedFilters?: { [key: string]: unknown } | null,
  ) => {
    setShareReportOpen(true);
    const selectedFiltersParsed: Record<string, string> | undefined =
      selectedFilters
        ? Object.fromEntries(
            Object.entries(selectedFilters).map(([k, v]) => [k, String(v)]),
          )
        : undefined;
    const data = await callRenderEndpoint({
      id: id,
      selectedFilters: selectedFiltersParsed,
      title: title,
    });
    if (data.uploadResult) {
      setShareReportData({
        data: data,
        reportID: id,
      });
    }
  };

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
                          title={report.displayName}
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
                          onShare={() =>
                            shareReport(
                              String(report.report.identifier),
                              report.report.title,
                              report.selectedFilters,
                            )
                          }
                          onReplace={async () => {
                            setReplaceReportID(report.identifier);
                            setActiveReportPlacementOrder(slotId);
                            await handleReportSelectionPopupOpen();
                            setIsReportSelectionPopupOpen(true);
                          }}
                        />
                      );
                    }

                    return (
                      <SortableAddReportButton
                        key={slotId}
                        slotId={slotId}
                        onClick={async () => {
                          await handleReportSelectionPopupOpen();
                          setActiveReportPlacementOrder(slotId);
                          setIsReportSelectionPopupOpen(true);
                        }}
                      />
                    );
                  })
                : Array.from(
                    [1, 2, 3, 4].map((i) => (
                      <ReportSectionSkeleton key={`skeleton-${i}`} />
                    )),
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

      {isReportSelectionPopupOpen && displayedReports && (
        <ReportSelectionPopup
          isOpen={isReportSelectionPopupOpen}
          onClose={() => setIsReportSelectionPopupOpen(false)}
          categories={categories ?? []}
          hasMore={hasMore}
          onLoadMore={loadMore}
          reports={displayedReports ?? []}
          filteredReports={filteredReports ?? []}
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
            if (!!replaceReportID) {
              handleReplaceReport(replaceReportID, String(selectedReportID));
              setReplaceReportID(null);
              setIsReportPreviewOpen(false);
            } else {
              handleAddNewReport(
                String(selectedReportID),
                activeReportPlacementOrder,
                options,
              );
            }
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
      <ShareReportPopUp
        isOpen={shareReportOpen}
        onClose={() => {
          setShareReportData(null);
          setShareReportOpen(false);
        }}
        message="گزارش‌ تخصصی از آرسس"
        platformNames={[
          'WhatsApp',
          'Email',
          'Instagram',
          'Linkedin',
          'Telegram',
        ]}
        url={`${typeof window !== 'undefined' ? window.location.origin : ''}/report/${shareReportData?.reportID}?queryId=${shareReportData?.data.uploadResult.queryId}`}
        image={
          shareReportData?.data.uploadResult.screenshotUrl
            ? baseURL + shareReportData?.data.uploadResult.screenshotUrl
            : null
        }
      />

      <ConfirmModal
        isOpen={isRemoveReportOpen.open}
        onConfirm={() => handleRemoveReport(isRemoveReportOpen.dashboardItemID)}
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
