import { cn } from 'design-system';
import React from 'react';

export interface LoginHistoryItemProps {
  deviceType: string;
  ip: string;
  loginTime: string;
  loginDate: string;
  type: 'ورود' | 'خروج';
}
export const LoginHistoryItem: React.FC<LoginHistoryItemProps> = ({
  deviceType,
  ip,
  loginDate,
  loginTime,
  type,
}) => {
  return (
    <div className="flex min-h-[84px] items-center justify-between p-3">
      <div className="flex items-start gap-2">
        <div>
          <div
            className={cn(
              'text-md text-text-accent-blue-primary-600 mb-1 font-medium',
              { 'text-text-accent-red-primary-600': type === 'خروج' },
            )}
          >
            {type}
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
            {ip}
          </div>
        </div>
      </div>
    </div>
  );
};
