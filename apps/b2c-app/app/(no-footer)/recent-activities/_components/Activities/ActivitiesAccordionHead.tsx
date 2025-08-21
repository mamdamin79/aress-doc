import React from 'react';
import { ActivityType } from './Activities.types';
import { Badge, cn, formatNumber, Icon, IconProps } from 'design-system';
export interface ActivitiesAccordionHeadProps {
  title: string;
  type: ActivityType;
  description?: string;
  icon?: IconProps['name'];
  image?: string;
  price: number;
  status: 'success' | 'error' | 'pending';
  isOpen?: boolean;
}
const typeMappings: Record<ActivityType, string> = {
  ADJUSTMENT: 'پرداخت مابالاتفاوت',
  BUY: 'خرید',
  SELL: 'فروش',
  DIVIDEND: 'سود تقسیمی',
  ONLINE_DEPOSIT: 'واریز وجه',
  SLIP_DEPOSIT: 'واریز وجه',
  WITHDRAW: 'برداشت وجه',
};
export const ActivitiesAccordionHead: React.FC<
  ActivitiesAccordionHeadProps
> = ({ title, type, description, price, status, isOpen, icon, image }) => {
  return (
    <div className="text-text-neutral-primary bg-surface-neutral-background hover:bg-surface-neutral-tertiary flex w-full flex-row items-center justify-between p-3">
      <div className="flex flex-row gap-2">
        {icon && (
          <div className="bg-surface-neutral-primary border-border-neutral-secondary mt-1 flex h-8 w-8 items-center justify-center rounded-full border">
            <Icon name={icon} size="md" />
          </div>
        )}
        {image && (
          <div className="bg-surface-neutral-primary border-border-neutral-secondary mt-1 flex h-8 w-8 items-center justify-center rounded-full border">
            <img src={image} />
          </div>
        )}

        <div className="flex flex-col gap-1 text-right">
          <span className="text-md font-medium">{title}</span>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-text-neutral-secondary font-medium">
              {typeMappings[type]}
            </span>
            {description && (
              <span className="text-text-neutral-tertiary font-normal">
                - {description}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1">
            <span className="text-md font-medium">
              {formatNumber(price, {
                commaSeparated: true,
              })}
            </span>
            <span>ریال</span>
          </div>
          <Badge
            icon={{
              name:
                status === 'success'
                  ? 'check'
                  : status === 'pending'
                    ? 'clock'
                    : 'x',
              size: 'sm',
            }}
            theme={
              status === 'success'
                ? 'green'
                : status === 'pending'
                  ? 'blue'
                  : 'red'
            }
            title={
              type === 'BUY' || type === 'SELL'
                ? status === 'success'
                  ? 'انجام شده'
                  : status === 'pending'
                    ? 'در انتظار تایید'
                    : 'رد شده'
                : status === 'success'
                  ? 'موفق'
                  : status === 'pending'
                    ? 'در حال انجام'
                    : 'ناموفق'
            }
          />
        </div>

        <span
          className={cn(
            'text-icon-neutral-primary group-hover:text-icon-brand-primary-600 flex items-center justify-center transition-transform duration-300',
            {
              'rotate-0': !isOpen,
              'rotate-180': isOpen,
            },
          )}
        >
          <Icon name="chevron-down" size="lg" />
        </span>
      </div>
    </div>
  );
};
