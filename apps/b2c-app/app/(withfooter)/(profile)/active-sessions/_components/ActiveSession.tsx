'use client';
import { Icon, IconProps } from 'design-system';
import React from 'react';

export interface ActiveSessionProps {
  deviceType: string;
  browserIcon: IconProps;
  browserName: string;
  location?: string;
  isCurrent: boolean;
  loginTime: string;
  loginDate: string;
  onTerminate?: () => void;
}

export const ActiveSession: React.FC<ActiveSessionProps> = ({
  browserName,
  deviceType,
  isCurrent,
  location,
  loginDate,
  loginTime,
  browserIcon,
  onTerminate,
}) => {
  return (
    <div className="flex min-h-[84px] items-center justify-between p-3">
      <div className="flex items-start gap-2">
        <div className="border-border-neutral-secondary flex h-8 w-8 shrink-0 items-center justify-center rounded-full border">
          <Icon name={browserIcon.name} size={browserIcon.size} />
        </div>
        <div>
          <div className="text-md text-text-neutral-primary font-medium">
            {browserName}
          </div>
          <div className="text-text-neutral-secondary text-sm font-medium">
            {deviceType}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-text-neutral-primary text-md font-medium">
          <div>
            <span>{loginTime}</span> | <span>{loginDate}</span>
          </div>
          <div className="text-text-neutral-secondary text-left text-sm font-medium">
            {location}
          </div>
        </div>

        {!isCurrent && (
          <span
            onClick={onTerminate}
            className="text-text-message-error-primary-600"
          >
            <Icon name="x" size="lg" />
          </span>
        )}
      </div>
    </div>
  );
};
