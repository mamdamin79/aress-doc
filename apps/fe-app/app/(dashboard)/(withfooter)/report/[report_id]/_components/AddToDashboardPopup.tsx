'use client';

import React from 'react';
import { Dialog, Icon } from 'design-system';
import { useDashboardsServiceGetDashboards } from '@openapi';

interface AddToDashboardPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedDashboardID: number, dashboardName: string) => void;
}

export const AddToDashboardPopup: React.FC<AddToDashboardPopupProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const handleClose = () => {
    onClose();
  };
  const { data: dashboards } = useDashboardsServiceGetDashboards();

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      className="flex min-h-28 w-[514px] flex-col p-0"
    >
      <div className="text-text-neutral-primary border-border-neutral-primary w-full border-b-2 pb-4 pt-6 text-right text-lg font-medium">
        <span className="pr-6">داشبوردهای شما</span>
      </div>
      <div className="flex flex-col gap-2 px-4 pt-2">
        {dashboards?.map((dashboard, index) => (
          <React.Fragment key={`dashboard-${index}`}>
            <div
              className="bg-surface-neutral-primary hover:bg-surface-neutral-tertiary active:bg-surface-neutral-secondary flex h-[62px] w-full cursor-pointer items-center justify-between rounded-xl pl-3 transition-colors"
              onClick={() => {
                onSelect(dashboard.identifier, dashboard.name);
              }}
            >
              <div className="flex items-center gap-3 pr-4">
                <span className="text-md text-text-neutral-primary font-medium">
                  {dashboard.name}
                </span>
                <span className="text-text-neutral-secondary text-sm font-normal">
                  {dashboard.itemsCount}/{dashboard.itemsLimit}
                </span>
              </div>
              <Icon name="chevron-left" size="lg" />
            </div>
            <div className="border-border-neutral-tertiary w-full border"></div>
          </React.Fragment>
        ))}
      </div>
    </Dialog>
  );
};
