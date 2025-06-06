import React from 'react';
import { cn } from '../../../../utils/index';
import { Icon } from '../../Icon';
import { FundsTag } from '../../FundsTag';
import { DropdownCell } from '../OptionsDropdown.types';
export const OptionsDropdownOption: React.FC<DropdownCell> = ({
  text,
  tag,
  icon,
  isActive,
  withCheck,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex w-full cursor-pointer flex-row items-center gap-2 rounded-sm p-2 text-sm transition-colors',
        isActive
          ? 'bg-surface-brand-100 text-icon-onbrand-colored-primary-on200_100_50'
          : 'hover:bg-surface-brand-100 bg-surface-neutral-primary',
        className,
      )}
    >
      {icon && <Icon {...icon} size={icon?.size || 'md'} />}
      {tag && <FundsTag color={tag.color} />}
      {withCheck && isActive && <Icon name="check" size="md" />}

      {text}
    </div>
  );
};
