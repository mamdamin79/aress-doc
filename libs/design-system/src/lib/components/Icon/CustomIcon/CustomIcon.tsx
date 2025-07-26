import React from 'react';
import { IconProps } from '../Icon';
import { SIZE_VALUES, STROKE_VALUES } from '../Icon.constants';
import { CUSTOM_ICONS } from './CustomIcon.constants';
import { cn } from '../../../../utils/classNames.utils';

export const CustomIcon: React.FC<IconProps> = ({ name, size = 'md' }) => {
  const CustomIconComponent = CUSTOM_ICONS[name as keyof typeof CUSTOM_ICONS];
  if (!CustomIconComponent) {
    console.error(`Icon component for name "${name}" not found`);
    return null;
  }
  return (
    <div
      className={cn('group relative inline-block', {
        'text-text-brand-primary-600': name === 'CustomCirlcleX',
      })}
    >
      <CustomIconComponent
        width={SIZE_VALUES[size]}
        height={SIZE_VALUES[size]}
        strokeWidth={
          name !== 'CustomBookmark' &&
          name !== 'CustomArrow' &&
          name !== 'CustomPin'
            ? STROKE_VALUES[size]
            : 0
        }
        className={cn(
          `transition-all duration-150 ease-in-out`,
          {
            'hover:-rotate-6': name === 'CustomBadge' || name === 'CustomBeta',
          },
          { 'hover:rotate-90': name === 'CustomClock' },
          {
            'hover:scale-105': name === 'CustomCircleSlice',
          },
          {
            'stroke-white': name === 'CustomBookmark' || name === 'CustomArrow',
          },
          {
            'hover:text-text-brand-primary-600 cursor-pointer':
              name !== 'CustomBookmark' &&
              name !== 'CustomArrow' &&
              name !== 'CustomPin',
          },
        )}
      />
    </div>
  );
};
