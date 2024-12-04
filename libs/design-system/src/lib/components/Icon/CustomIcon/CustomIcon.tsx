import React from 'react';
import { IconProps } from '../Icon';
import { SIZE_VALUES, STROKE_VALUES } from '../Icon.constants';
import { CUSTOM_ICONS } from './CustomIcon.constants';
import { cn } from '../../../../utils/classNames.utils';

export const CustomIcon: React.FC<IconProps> = ({ name, size = 'md' }) => {
  const CustomIconComponent = CUSTOM_ICONS[name as keyof typeof CUSTOM_ICONS];
  return (
    <div
      className={cn('relative hover:text-brand-600 group inline-block', {
        'text-brand-600': name === 'CustomCirlcleXcustomc',
      })}
    >
      <CustomIconComponent
        width={SIZE_VALUES[size]}
        height={SIZE_VALUES[size]}
        strokeWidth={STROKE_VALUES[size]}
        className={cn(
          `stroke-current transition-all duration-150 ease-in-out cursor-pointer hover:text-brand-600`,
          {
            'hover:-rotate-6': name === 'CustomBadge' || name === 'CustomBeta',
          },
          { 'hover:rotate-90': name === 'CustomClock' },
          {
            'hover:scale-105': name === 'CustomCircleSlice',
          }
        )}
      />
    </div>
  );
};
