'use client';

import {
  AddReportButton,
  AutoRotateSwitch,
  AutoRotationOff,
  cn,
  HorizontalScrollBar,
} from 'design-system';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DashboardNumberAndName } from './DashboardNumberAndName';
import { ReportSelectionPopup } from '../../../../components';
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
  useDashboardsServiceGetDashboardsByDashboardId,
  useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemId,
} from '@openapi';
import { fetchToken } from '../../../../(auth)/auth.utils';
import { DynamicReportRenderer } from './DynamicReportRenderer';
import { OptionItem } from 'libs/design-system/src/lib/components/OptionsListExplorer/OptionsListExplorer.types';
import { useAutoRotate } from './useAutoRotate';

const SortableReport: React.FC<{
  identifier: number;
  report: any;
  data: any;
  filters: FinancialReportFilterApiModel[] | undefined;
  onSubmit: (changedOptions: Record<string, OptionItem>) => Promise<boolean>;
}> = ({ identifier, report, data, filters, onSubmit }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: identifier });

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div
        className="absolute top-0 z-10 h-14 w-[550px] cursor-grab p-1"
        {...attributes}
        {...listeners}
      >
        {/* A handle icon could go here */}
      </div>
      <DynamicReportRenderer
        title={report.title}
        identifier={report.identifier}
        data={data}
        filters={filters}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export const SlidersBox: React.FC = () => {
  const [reportOrder, setReportOrder] = useState<number[]>([]);
  const [addReportBoxCount, setAddReportBoxCount] = useState(4);
  const [barsNumber, setBarsNumber] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReportSelectionPopupOpen, setIsReportSelectionPopupOpen] =
    useState(false);
  const [tokenLoaded, setTokenLoaded] = useState(false);

  const [reportDataMap, setReportDataMap] = useState<
    Record<number, { data: any; filters: FinancialReportFilterApiModel[] }>
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

  const searchParams = new URLSearchParams(window.location.search);
  const dashboardIdParam = searchParams.get('dashboardId');
  const { data: dashboardData } =
    useDashboardsServiceGetDashboardsByDashboardId(
      { dashboardId: Number(dashboardIdParam) },
      undefined,
      {
        enabled: tokenLoaded,
      },
    );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    const total = (dashboardData?.items?.length ?? 0) + addReportBoxCount;
    const cols = window.matchMedia('(min-width: 1280px)').matches ? 4 : 2;
    setSlidesPerView(cols);
    setBarsNumber(Math.ceil(total / cols));
  }, [dashboardData, addReportBoxCount]);

  useEffect(() => {
    if (dashboardData?.items) {
      const sorted = [...dashboardData.items].sort((a, b) => a.order - b.order);
      setReportOrder(sorted.map((item) => item.identifier));
      const dashboardItemsLength = dashboardData.items.length;
      const calculatedAddReportBoxCount =
        dashboardItemsLength >= 4 ? 1 : 4 - dashboardItemsLength;
      setAddReportBoxCount(calculatedAddReportBoxCount);
    }
  }, [dashboardData?.items]);

  const {
    currIndex,
    activeRotate,
    setActiveRotate,
    handleRotation,
    scrollToIndex: handleScroll,
  } = useAutoRotate({
    barsNumber,
    onRotate: () => {},
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setReportOrder((prev) => {
        const oldIndex = prev.findIndex((id) => id === active.id);
        const newIndex = prev.findIndex((id) => id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
      setActiveRotate(null);
    }
  };

  const htmlPaddingRight = useHtmlPaddingRight();
  const { showToast } = useCustomToast();

  const { mutateAsync } =
    useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemId();

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
          data: updatedReport.report.reportCalculation?.calculation,
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

  const generateTooltips = (totalSlides: number): string[] => {
    const groups = Math.ceil(totalSlides / slidesPerView);
    return Array.from({ length: groups }).map((_, i) => {
      const start = i * slidesPerView + 1;
      const end = Math.min((i + 1) * slidesPerView, totalSlides);
      return start !== end ? `اسلاید ${end}-${start}` : `اسلاید ${end}`;
    });
  };

  return (
    <div className="w-fit">
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <section className="mt-6 flex w-full justify-center">
          <SortableContext items={reportOrder} strategy={rectSortingStrategy}>
            <div
              ref={containerRef}
              className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2"
            >
              {reportOrder.map((identifier) => {
                const item = dashboardData?.items?.find(
                  (i) => i.identifier === identifier,
                );
                if (!item) return null;

                return (
                  <SortableReport
                    key={identifier}
                    identifier={identifier}
                    report={item.report}
                    data={
                      reportDataMap[identifier]?.data ??
                      item.report.reportCalculation?.calculation
                    }
                    filters={
                      reportDataMap[identifier]?.filters ??
                      item.report.reportCalculation?.filters
                    }
                    onSubmit={(changedOptions) =>
                      handleSubmit(identifier, changedOptions)
                    }
                  />
                );
              })}

              {[...Array(addReportBoxCount)].map((_, index) => (
                <AddReportButton
                  key={index}
                  onClick={() => setIsReportSelectionPopupOpen(true)}
                />
              ))}
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
            const total = reportOrder.length + addReportBoxCount;
            if (total >= 16) {
              showToast({
                message: 'حداکثر تعداد گزارش در هر داشبورد 16 عدد است',
                type: 'warning',
              });
              return;
            }
            setAddReportBoxCount((prev) => prev + 1);
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
    </div>
  );
};
