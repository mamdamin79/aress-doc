import React from 'react';
import { Icon, IconProps } from '../../Icon';
import { cn } from 'libs/design-system/src/utils';
import { Tooltip } from '../../Tooltip';

export interface NestedDropdownItemProps {
  title: string;
  status: 'normal' | 'opened' | 'error';
  icon: IconProps;
  onClick: () => void;
  activeIcon?: IconProps;
  placeHolder?: string;
  selectedOption?: string;
  hasTooltip?: boolean;
  hasChildren?: boolean;
}

interface WrapperProps {
  children: React.ReactNode;
  hasTooltip?: boolean;
  selectedOption?: string;
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  hasTooltip = false,
  selectedOption = '',
}) => {
  if (hasTooltip && selectedOption) {
    return (
      <div className="w-full [&>*:first-child]:w-full">
        <Tooltip title={selectedOption} className="w-full" position="bottom">
          {children}
        </Tooltip>
      </div>
    );
  }
  return <div className="w-full">{children}</div>;
};

export const NestedDropdownItem: React.FC<NestedDropdownItemProps> = ({
  title,
  status,
  icon,
  onClick,
  activeIcon,
  placeHolder,
  selectedOption,
  hasTooltip = false,
  hasChildren = false,
}) => {
  return (
    <Wrapper hasTooltip={hasTooltip} selectedOption={selectedOption}>
      <div
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 px-2 transition-colors',
          status === 'normal' && 'hover:border-1.5 hover:border-gray-500',
          status === 'error' && 'border-1.5 border-red-600',
          status === 'opened' && 'border-brand-600 border-2',
        )}
        onClick={onClick}
      >
        <div className="flex flex-row items-center gap-2 text-sm">
          <span
            className={cn(
              'font-medium',
              status === 'error' && !hasChildren && 'text-red-600',
            )}
          >
            {title}
          </span>
          {placeHolder && !selectedOption && (
            <span className="font-normal text-gray-500">{placeHolder}</span>
          )}
          {selectedOption && (
            <span className="text-gray-1000 truncate font-normal">
              {selectedOption}
            </span>
          )}
        </div>
        {status === 'opened' && activeIcon ? (
          <Icon name={activeIcon.name} size={activeIcon.size} />
        ) : (
          <Icon name={icon.name} size={icon.size} />
        )}
      </div>
    </Wrapper>
  );
};
