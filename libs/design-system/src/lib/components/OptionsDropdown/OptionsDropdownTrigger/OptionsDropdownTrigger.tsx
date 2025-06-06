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
  className?: string;
}
export const OptionsDropdownTrigger: React.FC<triggerCell> = ({
  text,
  tag,
  icon,
  isActive,
  bg = 'primary',
  emphasize = 'medium',
  size = 'md',
  className
}) => {
  const detectBgStylings = () => {
    if (bg === 'primary') {
      if (emphasize === 'medium') {
        return isActive
          ? 'bg-surface-neutral-primary border-2 border-border-brand-primary-600'
          : 'bg-surface-neutral-primary hover:bg-surface-neutral-secondary';
      } else if (emphasize === 'high') {
        return isActive
          ? 'bg-surface-neutral-primary border-2 border-border-brand-primary-600'
          : 'bg-surface-neutral-secondary hover:bg-surface-neutral-secondarycontrast';
      }
    } else if (bg === 'secondary') {
      if (emphasize === 'medium') {
        return isActive
          ? 'bg-surface-neutral-primary border-2 border-border-brand-primary-600'
          : 'bg-transparent hover:bg-surface-neutral-primary';
      } else if (emphasize === 'high') {
        return isActive
          ? 'bg-surface-neutral-primary border-2 border-border-brand-primary-600'
          : 'bg-surface-neutral-primary hover:border-border-neutral-primary';
      }
    }
  };
  return (
    <div
      className={cn(
        'flex w-full cursor-pointer flex-row  items-center justify-between gap-1 rounded-md border-2 border-transparent px-2 transition-colors',
        size === 'sm' && 'h-[34px] text-sm',
        size === 'md' && 'h-[40px] text-sm',
        size === 'lg' && 'text-md h-[46px]',
        detectBgStylings(),
        className
      )}
    >
      <div className="flex  flex-row items-center gap-1">
        {tag && <FundsTag color={tag.color} />}
        {icon && <Icon {...icon} size={icon?.size || 'md'} />}
        {text}
      </div>
      <Icon name="chevron-down" size="md" />
    </div>
  );
};
