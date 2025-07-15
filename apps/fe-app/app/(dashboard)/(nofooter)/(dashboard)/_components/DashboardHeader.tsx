import React from 'react';
import { AutoRotateSwitch } from 'design-system';
import { DashboardNumberAndName } from './DashboardNumberAndName';

export const DashboardHeader = ({
  dashboardData,
  activeRotate,
  onRotateChange,
}: {
  dashboardData: any;
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
