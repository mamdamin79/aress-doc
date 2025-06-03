import React from 'react';
import { cn } from '../../../utils/index';
import { Icon } from '../Icon';
export const CustomTriggerWithoutLogo: React.FC<{
  text: string;
  isActive: boolean;
}> = ({ text, isActive }) => {
  return (
    <div
      className={cn(
        'flex w-full cursor-pointer flex-row items-center justify-between gap-1 rounded-md border-2 border-transparent px-2 transition-colors',
        'h-[34px] text-sm font-medium',
        isActive
          ? 'border-border-brand-primary-600 bg-surface-neutral-primary'
          : 'bg-surface-neutral-primary hover:bg-surface-accent-gray-100',
      )}
    >
      <div className="flex flex-row items-center gap-1">{text}</div>
      <Icon name="chevron-down" size="md" />
    </div>
  );
};
