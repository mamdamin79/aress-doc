import React from 'react';
import { IconProps } from '../Icon';
import { SIZE_VALUES, STROKE_VALUES } from '../Icon.constants';
import { CUSTOM_ICONS } from './CustomIcon.contants';
import { cn } from '../../../../utils/classNames.utils';

export const CustomIcon: React.FC<IconProps> = ({ name, size = 'md' }) => {
  const CustomIconComponent = CUSTOM_ICONS[name as keyof typeof CUSTOM_ICONS];
  return (
    <div className="relative hover:text-brand-600 group inline-block">
      <CustomIconComponent
        width={SIZE_VALUES[size]}
        height={SIZE_VALUES[size]}
        strokeWidth={STROKE_VALUES[size]}
        className={cn(
          `stroke-current transition-all duration-150 ease-in-out cursor-pointer`,
          { 'hover:text-brand-600 hover:rotate-90': name === 'CustomClock' },
          { 'hover:text-brand-600': name === 'CustomBag' },
          { 'hover:text-brand-600 hover:-rotate-6': name === 'CustomBadge' },
          { 'hover:text-brand-600 hover:-rotate-6': name === 'CustomBeta' },
          {
            'hover:text-brand-600 hover:scale-105':
              name === 'CustomCircleSlice',
          },
          { 'hover:text-brand-600 group': name === 'CustomWallet' },
          { 'hover:text-brand-600': name === 'CustomScalesOfJustice' },
          { 'hover:text-brand-600': name === 'CustomcircularUser' },
          { 'hover:text-brand-600': name === 'CustomAlpha' },
          { 'hover:text-brand-600': name === 'CustomCalendar' },
          { 'text-brand-600': name === 'CustomClose' }
        )}
      />
    </div>
  );
};
