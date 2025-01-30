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
        'h-[34px] text-sm',
        isActive
          ? 'border-brand-600 border-2 bg-white'
          : 'bg-white hover:bg-gray-100',
      )}
    >
      <div className="flex flex-row items-center gap-1">{text}</div>
      <Icon name="chevron-down" size="md" />
    </div>
  );
};
