'use client';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  AddReportButton,
  AutoRotateSwitch,
  AutoRotationOff,
  cn,
  ConfirmModal,
  HorizontalScrollBar,
} from 'design-system';
import React, { useEffect, useRef, useState } from 'react';
import { DashboardNumberAndName } from './DashboardNumberAndName';
import { ReportSelectionPopup } from '../../../../components';
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useHtmlPaddingRight } from '../../../../../hooks';
import { useCustomToast } from 'libs/design-system/src/hooks/CustomToast/CustomToast';
import {
  FinancialReportFilterApiModel,
  OpenAPI,
  useDashboardsServiceDeleteDashboardsByDashboardId,
  useDashboardsServiceDeleteDashboardsByDashboardIdItemsByDashboardItemId,
  useDashboardsServiceGetDashboardsByDashboardId,
  useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdCalculations,
  useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdReorder,
} from '@openapi';
import {
  Report13Dot1CalculationResult,
  Report13Dot2CalculationResult,
  Report13Dot3CalculationResult,
  Report15CalculationResult,
  Report2CalculationResult,
  Report6CalculationResult,
} from '@openapi';
import { fetchToken } from '../../../../(auth)/auth.utils';
import { DynamicReportRenderer } from './DynamicReportRenderer';
import { OptionItem } from 'libs/design-system/src/lib/components/OptionsListExplorer/OptionsListExplorer.types';
import { useAutoRotate } from './useAutoRotate';
import { ReportTitleSkeleton } from './skeletons/ReportTitleSkeleton';
import { ReportSectionSkeleton } from './skeletons/ReportSectionSkeleton';

const MAX_INITIAL_SLOTS = 4;
const MAX_TOTAL_SLOTS = 16;

const SortableReport: React.FC<{
  slotId: string;
  identifier: number;
  report: any;
  data: any;
  filters: FinancialReportFilterApiModel[] | undefined;
  onSubmit: (changedOptions: Record<string, OptionItem>) => Promise<boolean>;
  onRemoveReport: () => void;
}> = ({
  slotId,
  identifier,
  report,
  data,
  filters,
  onSubmit,
  onRemoveReport,
}) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: slotId });

    const style: React.CSSProperties = {
      transition,
      transform: CSS.Translate.toString(transform),
      zIndex: isDragging ? 10 : 'auto',
    };

    return (
      <div ref={setNodeRef} style={style} className="relative">
        <div
          className="absolute right-0 top-0 z-10 h-14 w-[550px] cursor-grab"
          {...attributes}
          {...listeners}
        />
        <DynamicReportRenderer
          title={report.title}
          identifier={identifier}
          data={data}
          filters={filters}
          onSubmit={onSubmit}
          onRemove={onRemoveReport}
        />
      </div>
    );
  };

const SortableAddReportButton: React.FC<{
  slotId: string;
  onClick: () => void;
}> = ({ slotId, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slotId });

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 10 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div
        className="absolute left-0 top-0 z-10 h-14 w-full cursor-grab"
        {...attributes}
        {...listeners}
      />
      <AddReportButton onClick={onClick} />
    </div>
  );
};

export const SlidersBox: React.FC = () => {
  const [slotsToRender, setSlotsToRender] = useState<number[]>([]);
  const [barsNumber, setBarsNumber] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [isReportSelectionPopupOpen, setIsReportSelectionPopupOpen] =
    useState(false);
  const [isRemoveReportOpen, setIsRemoveReportOpen] = useState({
    open: false,
    dashboardName: '',
    dashboardItemID: 0,
  });

  const [reportDataMap, setReportDataMap] = useState<
    Record<
      number,
      {
        data:
        | Report2CalculationResult
        | Report6CalculationResult
        | Report13Dot1CalculationResult
        | Report13Dot2CalculationResult
        | Report13Dot3CalculationResult
        | Report15CalculationResult;
        filters: FinancialReportFilterApiModel[];
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
  const dashboardIdParam = searchParams.get('dashboardId');
  const { data: dashboardData, isLoading: isDashboardLoading } =
    useDashboardsServiceGetDashboardsByDashboardId(
      { dashboardId: Number(dashboardIdParam) },
      undefined,
      { enabled: tokenLoaded && !!dashboardIdParam },
    );

  useEffect(() => {
    const total = dashboardData?.items?.length ?? 0;
    const cols = window.matchMedia('(min-width: 1280px)').matches ? 4 : 2;
    setSlidesPerView(cols);
    setBarsNumber(Math.ceil(slotsToRender.length / cols));
  }, [dashboardData, slotsToRender]);

  useEffect(() => {
    if (!dashboardData?.items) {
      setSlotsToRender(Array.from({ length: MAX_INITIAL_SLOTS }, (_, i) => i));
      return;
    }

    const reports = dashboardData.items;
    const filledOrders = new Set(reports.map((r) => r.order));
    let slots: number[] = [];

    const maxOrder = Math.max(
      ...Array.from(filledOrders),
      MAX_INITIAL_SLOTS - 1,
    );

    for (let i = 0; i <= maxOrder; i++) slots.push(i);

    if (slots.length < MAX_INITIAL_SLOTS) {
      for (let i = slots.length; i < MAX_INITIAL_SLOTS; i++) {
        slots.push(i);
      }
    }

    if (reports.length >= MAX_INITIAL_SLOTS && slots.length < MAX_TOTAL_SLOTS) {
      slots.push(slots.length);
    }

    setSlotsToRender(slots);
  }, [dashboardData]);

  const {
    currIndex,
    activeRotate,
    setActiveRotate,
    handleRotation,
    scrollToIndex: handleScroll,
  } = useAutoRotate({ barsNumber, onRotate: () => { } });

  const { showToast } = useCustomToast();
  const htmlPaddingRight = useHtmlPaddingRight();

  const { mutateAsync } =
    useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdCalculations();
  const { mutate: removeReport } =
    useDashboardsServiceDeleteDashboardsByDashboardIdItemsByDashboardItemId();

  const handleSubmit = async (
    dashboardItemId: number,
    changedOptions: Record<string, OptionItem>,
  ) => {
    try {
      const updatedReport = await mutateAsync({
        dashboardId: dashboardData?.identifier ?? 1,
        dashboardItemId,
        requestBody: {
          selectedFilters: Object.fromEntries(
            Object.entries(changedOptions).map(([key, { id }]) => [
              key,
              String(id),
            ]),
          ),
        },
      });

      setReportDataMap((prev) => ({
        ...prev,
        [dashboardItemId]: {
          data: updatedReport.report.reportCalculation?.calculation as any,
          filters: updatedReport.report.reportCalculation
            ?.filters as FinancialReportFilterApiModel[],
        },
      }));

      return true;
    } catch (error) {
      console.error('Error submitting report update', error);
      return false;
    }
  };
  const handleRemoveReport = () => {
    removeReport(
      {
        dashboardId: Number(dashboardIdParam),
        dashboardItemId: isRemoveReportOpen.dashboardItemID,
      },
      {
        onSuccess: async () => {
          setIsRemoveReportOpen({
            open: false,
            dashboardName: '',
            dashboardItemID: 0,
          });

          setReportDataMap((prev) => {
            const newMap = { ...prev };
            delete newMap[isRemoveReportOpen.dashboardItemID];
            return newMap;
          });

          if (dashboardData) {
            const updatedItems = dashboardData.items?.filter(
              (item) => item.identifier !== isRemoveReportOpen.dashboardItemID,
            );

            dashboardData.items = updatedItems ?? [];
            setSlotsToRender((prev) => {
              const removedOrder = dashboardData.items?.find(
                (item) =>
                  item.identifier === isRemoveReportOpen.dashboardItemID,
              )?.order;
              if (removedOrder === undefined) return prev;
              return prev.filter((order) => order !== removedOrder);
            });
          }
        },
      },
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const { mutate: updateOrder } =
    useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdReorder();
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const from = parseInt(active.id.toString().replace('slot-', ''), 10);
    const to = parseInt(over.id.toString().replace('slot-', ''), 10);

    const fromReport = dashboardData?.items?.find((r) => r.order === from);
    const toReport = dashboardData?.items?.find((r) => r.order === to);

    if (!fromReport) return;

    // Update orders
    const updatedItems = dashboardData?.items?.map((item) => {
      if (item.identifier === fromReport.identifier) {
        return { ...item, order: to };
      }
      if (toReport && item.identifier === toReport.identifier) {
        return { ...item, order: from };
      }
      return item;
    });

    if (!updatedItems) return;

    // Get list of changed reports
    const changedReports = updatedItems.filter((updated) => {
      const original = dashboardData?.items?.find(
        (originalItem) => originalItem.identifier === updated.identifier,
      );
      return original?.order !== updated.order;
    });

    changedReports.map((changedReport) => {
      updateOrder({
        dashboardId: Number(dashboardIdParam),
        dashboardItemId: changedReport.identifier,
        requestBody: {
          order: changedReport.order,
        },
      });
    });

    // Update slot render order visually
    setSlotsToRender((prev) => {
      const fromIdx = prev.indexOf(from);
      const toIdx = prev.indexOf(to);
      return arrayMove(prev, fromIdx, toIdx);
    });
  };

  const generateTooltips = (totalSlides: number): string[] => {
    const groups = Math.ceil(totalSlides / slidesPerView);
    return Array.from({ length: groups }).map((_, i) => {
      const start = i * slidesPerView + 1;
      const end = Math.min((i + 1) * slidesPerView, totalSlides);
      return start !== end ? `اسلاید ${end}-${start}` : `اسلاید ${end}`;
    });
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
      {
        dashboardData ?
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
          </div> : <ReportTitleSkeleton />
      }

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
                        identifier={report.report.identifier}
                        report={report.report}
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
                      onClick={() => setIsReportSelectionPopupOpen(true)}
                    />
                  );
                })
                : Array.from(
                  [1, 2, 3, 4].map((i) => (
                    <ReportSectionSkeleton />
                  )),
                )
              }
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
          tooltips={generateTooltips(barsNumber * slidesPerView)}
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

      {/* {isReportSelectionPopupOpen && (
        <ReportSelectionPopup
          isOpen={isReportSelectionPopupOpen}
          onClose={() => setIsReportSelectionPopupOpen(false)}
        />
      )} */}
      <ConfirmModal
        isOpen={isRemoveReportOpen.open}
        onConfirm={() => handleRemoveReport()}
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
