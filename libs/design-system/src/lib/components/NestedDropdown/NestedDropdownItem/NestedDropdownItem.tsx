import React, { JSXElementConstructor, ReactElement } from 'react';
import { Icon, IconProps } from '../../Icon';
import { cn } from 'libs/design-system/src/utils';
import { Tooltip } from '../../Tooltip';
import { NestedDropdownItemProps } from '../NestedDropdown.types';

interface WrapperProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
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
  status = 'normal',
  icon,
  onClick,
  activeIcon,
  placeHolder,
  selectedOption,
  hasTooltip = false,
  hasChildren = false,
  optionsListProps,
}) => {
  return (
    <Wrapper hasTooltip={hasTooltip} selectedOption={selectedOption}>
      <div
        className={cn(
          'border-border-neutral-primary flex h-10 w-full cursor-pointer items-center justify-between rounded-md border px-2 transition-colors',
          status === 'normal' && 'hover:border-border-neutral-highcontrast',
          status === 'error' && 'border-border-message-error-primary-600',
          status === 'opened' && 'border-border-brand-primary-600 border-2',
        )}
        onClick={() => onClick?.(optionsListProps)}
      >
        <div className="flex flex-row items-center gap-2 text-sm">
          <span
            className={cn(
              'font-medium',
              status === 'error' &&
                !hasChildren &&
                'text-text-message-error-primary-600',
            )}
          >
            {title}
          </span>
          {placeHolder && !selectedOption && (
            <span className="text-text-neutral-tertiary font-normal">
              {placeHolder}
            </span>
          )}
          {selectedOption && (
            <span className="text-text-neutral-primary max-w-[190px] overflow-hidden truncate whitespace-nowrap font-normal">
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
