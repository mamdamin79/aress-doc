import React from 'react';
import { Icon, IconProps } from '../Icon';
import { cn } from '../../../utils/classNames.utils';

export interface NotificationProps {
  isNew: boolean;
  title: string;
  subtitle: string;
  icon: IconProps;
}

export const Notification: React.FC<NotificationProps> = ({
  icon,
  isNew,
  subtitle,
  title,
}) => {
  return (
    <div
      className={cn('h-[84px] w-full bg-transparent p-3', {
        'bg-surface-brand-100 rounded-2xl': isNew,
      })}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-2">
          <div className="border-border-neutral-primary bg-surface-neutral-primary flex h-8 w-8 items-center justify-center rounded-full border">
            <Icon name={icon.name} size={icon.size} />
          </div>
          <div>
            <div className="text-text-neutral-primary text-md font-medium">
              {title}
            </div>
            <div className="text-text-neutral-secondary text-sm font-medium">
              {subtitle}
            </div>
          </div>
        </div>
        {isNew && (
          <div className="bg-surface-brand-600-primary h-2.5 w-2.5 rounded-full"></div>
        )}
      </div>
    </div>
  );
};
