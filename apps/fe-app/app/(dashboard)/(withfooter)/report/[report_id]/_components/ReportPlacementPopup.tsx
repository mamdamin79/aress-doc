'use client';

import React from 'react';
import {
  AddReportButton,
  Button,
  Dialog,
  Icon,
  useCustomToast,
} from 'design-system';
import {
  useDashboardsServiceGetDashboardsByDashboardId,
  useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdReplace,
  useDashboardsServicePutDashboardsByDashboardId,
} from '@openapi';
import { DynamicReportRenderer } from '../../../../(nofooter)/(dashboard)/_components/DynamicReportRenderer';
import { ReportSectionSkeleton } from './skeletons/ReportSectionSkeleton';
import { queryClient } from '../../../../../lib/react-query';
import { useRouter } from 'next/navigation';

interface ReportPlacementPopupProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: number;
  dashboardName?: string;
  capacityText?: string;
  reportId: string;
}

export const ReportPlacementPopup: React.FC<ReportPlacementPopupProps> = ({
  isOpen,
  onClose,
  dashboardId,
  dashboardName = 'داشبورد',
  capacityText = '0/16',
  reportId,
}) => {
  const handleClose = () => {
    onClose();
  };
  const router = useRouter();

  // Get dashboard details with reports
  const { data: dashboardData, isLoading } =
    useDashboardsServiceGetDashboardsByDashboardId(
      { dashboardId: dashboardId! },
      undefined,
      { enabled: !!dashboardId && isOpen },
    );
  const { showProgressToast, showToast } = useCustomToast();

  const { mutateAsync: addReportToDashboard } =
    useDashboardsServicePutDashboardsByDashboardId();
  const { mutateAsync: replaceReport } =
    useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdReplace();

  const handleAddNew = () => {
    addReportToDashboard({
      dashboardId: dashboardId,
      requestBody: {
        order:
          dashboardData?.items &&
          dashboardData?.items.length > 0 &&
          dashboardData?.items[dashboardData?.items.length - 1].order
            ? dashboardData?.items[dashboardData?.items.length - 1].order + 1
            : 0,
        reportIdentifier: reportId,
      },
    })
      .catch(() => {
        showToast({
          message: 'خطایی رخ داد',
          type: 'error',
        });
      })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ['DashboardsServiceGetDashboardsByDashboardId'],
        });
        showProgressToast({
          title: 'گزارش جایگذاری شد',
          trailingAction: {
            ButtonProps: {
              align: 'center',
              isLoading: false,
              mode: 'primary',
              size: 'sm',
              children: 'برو به داشبورد',
            },
            onClick: () => router.push(`/`),
          },
          timeout: 3000,
        });
      });
    onClose();
  };
  const handleReplace = (oldItemId: number) => {
    replaceReport({
      dashboardId: dashboardId,
      dashboardItemId: oldItemId,
      requestBody: {
        newReportIdentifier: reportId,
      },
    })
      .catch(() => {
        showToast({
          message: 'خطایی رخ داد',
          type: 'error',
        });
      })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ['DashboardsServiceGetDashboardsByDashboardId'],
        });
        showProgressToast({
          title: 'گزارش جایگذاری شد',
          trailingAction: {
            ButtonProps: {
              align: 'center',
              isLoading: false,
              mode: 'primary',
              size: 'sm',
              children: 'برو به داشبورد',
            },
            onClick: () => router.push(`/`),
          },
          timeout: 3000,
        });
      });

    onClose();
  };
  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      className="relative flex max-h-[722px] min-h-96 w-fit min-w-[684px] max-w-[1315px] flex-col p-8 pr-[23px]"
    >
      <div className="text-text-neutral-primary text-md to-surface-neutral-primary flex w-full items-center gap-2 bg-gradient-to-t from-transparent pb-5 text-right font-medium">
        <span className="pr-2">{dashboardName}</span>
        <span className="text-text-neutral-secondary text-xs font-normal">
          {capacityText}
        </span>
      </div>

      <div className="scrollbar-md flex-1 overflow-y-auto pb-5 pr-4" dir="ltr">
        {isLoading && (
          <div className="grid grid-cols-1 gap-2.5 pb-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <ReportSectionSkeleton key={index} />
            ))}
          </div>
        )}
        {dashboardData?.items && dashboardData.items.length > 0 ? (
          <div className="grid grid-cols-1 gap-2.5 pb-3">
            {dashboardData.items.map((item) => (
              <div
                key={item.identifier}
                dir="rtl"
                className="group relative h-fit"
              >
                <div className="bg-button-brand-surface-default text-button-brand-label-onsurface text-md absolute left-4 top-0 z-20 rounded-bl-md rounded-br-md px-3 py-0.5 font-medium opacity-0 shadow-2xl transition-opacity group-hover:opacity-100">
                  گزارش {item.report.identifier}
                </div>
                <div
                  className="bg-button-brand-surface-default text-button-brand-label-onsurface text-md absolute bottom-4 right-4 z-20 flex cursor-pointer items-center rounded-[100px] px-4 py-1 font-medium opacity-0 shadow-2xl transition-opacity group-hover:opacity-100"
                  onClick={() => handleReplace(item.identifier)}
                >
                  <span>جایگزینی</span>
                  <Icon name="repeat" size="md" />
                </div>
                <div className="pointer-events-none">
                  <DynamicReportRenderer
                    title={item.displayName}
                    identifier={item.report.identifier}
                    data={item.report.reportCalculation?.calculation}
                    filters={item.report.reportCalculation?.filters}
                    onSubmit={undefined}
                    onRemove={undefined}
                    onShare={undefined}
                    onReplace={undefined}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
        {(dashboardData?.items?.length ?? 0) < 16 && (
          <AddReportButton variant="place" onClick={handleAddNew} />
        )}
      </div>

      <div className="to-surface-neutral-primary w-full bg-gradient-to-t from-transparent">
        <div className="flex w-full justify-end pt-5">
          <Button
            size="sm"
            mode="secondary"
            theme="brand"
            className="w-[113px] gap-2 font-medium"
          >
            <div className="flex flex-row gap-2">
              <span>بازگشت</span>
              <Icon name="undo-2" size="md" />
            </div>
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
