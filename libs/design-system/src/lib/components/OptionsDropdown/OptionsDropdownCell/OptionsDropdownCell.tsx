import React from 'react';
import { dropDownCell } from '../OptionsDropdown.types';
import { cn } from '../../../../utils/index';
import { Icon } from '../../Icon';

export const OptionsDropdownCell: React.FC<dropDownCell> = ({
  text,
  tag,
  icon,
  isActive,
  withCheck,
}) => {
  return (
    <div
      className={cn(
        'flex w-fit cursor-pointer flex-row items-center gap-2 rounded-sm p-2 transition-colors',
        isActive
          ? 'bg-brand-100 text-brand-800'
          : 'hover:bg-brand-100 bg-baseBackground',
      )}
    >
      {icon && <Icon {...icon} size={icon?.size || 'md'} />}
      {tag && (
        <div className={cn('flex h-2.5 w-2.5 rounded-full', tag.color)}></div>
      )}
      {withCheck && isActive && <Icon name="check" size="md" />}

      {text}
    </div>
  );
};
