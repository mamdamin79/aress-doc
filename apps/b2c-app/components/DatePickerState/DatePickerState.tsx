import React from 'react';
import { cn, Icon } from 'design-system';

interface Props {
  size: 'small' | 'larg';
  theme: 'default' | 'inverse';
  active: boolean;
}

export const DatePckerState: React.FC<Props> = ({ size, theme, active }) => {
  return (
    <div
      className={cn(
        'text-text-neutral-primary border-border-neutral-primary flex cursor-pointer items-center justify-center rounded-full border',
        {
          'h-9 w-9': size === 'small',
          'h-12 w-12': size === 'larg',
          'bg-surface-neutral-primary hover:text-icon-brand-primary-600':
            theme === 'default' && !active,
          'bg-surface-neutral-tertiary hover:text-icon-brand-primary-600':
            theme === 'inverse' && !active,
          'hover:border-border-brand-primary-600': active,
        },
      )}
    >
      <div
        className={cn('flex items-center justify-center rounded-full', {
          'h-7 w-7': size === 'small',
          'h-[34px] w-[34px]': size === 'larg',
          'text-icon-onbrand-neutral-on600 bg-icon-brand-primary-600': active,
        })}
      >
        <Icon name="calendar-range" size={size === 'larg' ? 'lg' : 'md'} />
      </div>
    </div>
  );
};
