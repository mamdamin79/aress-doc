import React from 'react';
import { cn } from '../../../../utils/index';
import { Icon } from '../../Icon';
import {
  DropdownBg,
  DropdownCell,
  DropdownEmphasize,
  DropdownSize,
} from '../OptionsDropdown.types';
import { FundsTag } from '../../FundsTag';
export interface triggerCell extends Omit<DropdownCell, 'withCheck'> {
  size?: DropdownSize;
  bg?: DropdownBg;
  emphasize?: DropdownEmphasize;
}
export const OptionsDropdownTrigger: React.FC<triggerCell> = ({
  text,
  tag,
  icon,
  isActive,
  bg = 'primary',
  emphasize = 'medium',
  size = 'md',
}) => {
  const detectBgStylings = () => {
    if (bg === 'primary') {
      if (emphasize === 'medium') {
        return isActive
          ? 'bg-white border-2 border-brand-600'
          : 'bg-white hover:bg-gray-100';
      } else if (emphasize === 'high') {
        return isActive
          ? 'bg-white border-2 border-brand-600'
          : 'bg-gray-100 hover:bg-gray-200';
      }
    } else if (bg === 'secondary') {
      if (emphasize === 'medium') {
        return isActive
          ? 'bg-white border-2 border-brand-600'
          : 'bg-transparent hover:bg-white';
      } else if (emphasize === 'high') {
        return isActive
          ? 'bg-white border-2 border-brand-600'
          : 'bg-white hover:border-gray-300';
      }
    }
  };
  return (
    <div
      className={cn(
        'flex w-full cursor-pointer flex-row items-center justify-between gap-1 rounded-md border-2 border-transparent px-2 transition-colors',
        size === 'sm' && 'h-[34px] text-sm',
        size === 'md' && 'h-[40px] text-sm',
        size === 'lg' && 'text-md h-[46px]',
        detectBgStylings(),
      )}
    >
      <div className="flex flex-row items-center gap-1">
        {tag && <FundsTag color={tag.color} />}
        {icon && <Icon {...icon} size={icon?.size || 'md'} />}
        {text}
      </div>
      <Icon name="chevron-down" size="md" />
    </div>
  );
};
