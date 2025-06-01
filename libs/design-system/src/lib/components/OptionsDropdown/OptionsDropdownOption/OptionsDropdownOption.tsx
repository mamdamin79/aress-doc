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
  className
}) => {
  return (
    <div
      className={cn(
        'flex w-full cursor-pointer flex-row items-center gap-2 rounded-sm p-2 text-sm transition-colors',
        isActive
          ? 'bg-brand-100 text-brand-800'
          : 'hover:bg-brand-100 bg-baseBackground',
          className
      )}
    >
      {icon && <Icon {...icon} size={icon?.size || 'md'} />}
      {tag && <FundsTag color={tag.color} />}
      {withCheck && isActive && <Icon name="check" size="md" />}

      {text}
    </div>
  );
};
