import React from 'react';
import { Icon, IconProps } from '../../Icon';
import { cn } from 'libs/design-system/src/utils';
interface FieldProps {
  title: string;
  status: 'normal' | 'opened' | 'error';
  icon: IconProps;
  activeIcon?: IconProps;
  placeHolder?: string;
  selectedOption?: string;
  truncate?: boolean;
}
export const Field: React.FC<FieldProps> = ({
  title,
  status,
  icon,
  activeIcon,
  placeHolder,
  selectedOption,
}) => {
  return (
    <div
      className={cn(
        'h-10 w-full flex justify-between items-center rounded-md px-2 border border-gray-300',
        status === 'normal' && 'hover:border-1.5 hover:border-gray-500',
        status === 'error' && 'border-1.5 border-red-600',
        status === 'opened' && 'border-2 border-brand-600'
      )}
    >
      <div className="flex flex-row gap-2 items-center text-sm">
        <span className={cn('font-medium', status === 'error' && 'text-red-600')}>{title}</span>
        {placeHolder && !selectedOption && (
          <span className="font-normal text-gray-500">{placeHolder}</span>
        )}
         {selectedOption && (
          <span className="font-normal text-gray-1000 truncate">{selectedOption}</span>
        )}
      </div>
      {status === 'opened' && activeIcon ? (
        <Icon name={activeIcon?.name} size={icon?.size} />
      ) : (
        <Icon name={icon?.name} size={icon?.size} />
      )}
    </div>
  );
};
