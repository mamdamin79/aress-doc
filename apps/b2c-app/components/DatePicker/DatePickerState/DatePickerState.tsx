import React from 'react';
import { cn, Icon } from 'design-system';

interface DatePickerStateProps {
  size: 'small' | 'large';
  theme: 'default' | 'inverse';
  active: boolean;
}

export const DatePickerState: React.FC<DatePickerStateProps> = ({
  size,
  theme,
  active,
}) => {
  return (
    <button
      className={cn(
        'text-text-neutral-primary border-border-neutral-primary flex cursor-pointer items-center justify-center rounded-full border',
        {
          'h-9 w-9': size === 'small',
          'h-12 w-12': size === 'large',
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
          'h-[34px] w-[34px]': size === 'large',
          'text-icon-onbrand-neutral-on600 bg-icon-brand-primary-600': active,
        })}
      >
        <Icon name="calendar-range" size={size === 'large' ? 'lg' : 'md'} />
      </div>
    </button>
  );
};
