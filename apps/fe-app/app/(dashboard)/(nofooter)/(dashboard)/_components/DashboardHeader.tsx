import React from 'react';
import { AutoRotateSwitch } from 'design-system';
import { DashboardNumberAndName } from './DashboardNumberAndName';
import { DashboardDetailsApiModel } from '@openapi';

export const DashboardHeader = ({
  dashboardData,
  activeRotate,
  onRotateChange,
}: {
  dashboardData: DashboardDetailsApiModel;
  activeRotate: number | null;
  onRotateChange: (value: number | null) => void;
}) => (
  <div className="flex w-full justify-between">
    <DashboardNumberAndName
      number={dashboardData?.identifier}
      title={dashboardData?.name}
    />
    <AutoRotateSwitch
      onChange={onRotateChange}
      rotateOptions={[5, 10, 15]}
      initialValue={activeRotate}
    />
  </div>
);
