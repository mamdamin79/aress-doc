'use client';
import { cn } from '../../../utils';
import React, { JSXElementConstructor, ReactElement, useState } from 'react';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { DualSwitchItem, DualSwitchProps } from './DualSwitch.types';

export const DualSwitch: React.FC<DualSwitchProps> = ({
  initialIndex = 0,
  onChange,
  items,
  size = 'sm',
  disabled = false,
  bgWhite = false,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState(initialIndex);

  const handleSwitchClick = (itemIndex: number) => {
    setActiveItemIndex(itemIndex);
    onChange?.(itemIndex);
  };

  const Wrapper: React.FC<{
    item: DualSwitchItem;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<any, string | JSXElementConstructor<any>>;
  }> = ({ item, children }) => {
    return item.tooltip ? (
      <Tooltip {...item.tooltip}>{children}</Tooltip>
    ) : (
      <>{children}</>
    );
  };

  return (
    <div
      className={cn(
        'shadow-xs flex h-fit w-fit flex-row gap-1 rounded-[100px] p-1 text-xs',
        bgWhite
          ? 'bg-surface-neutral-primary'
          : 'bg-surface-neutral-secondary transition-colors',
        size === 'lg'
          ? disabled
            ? 'border-border-brand-disable-300 border'
            : 'border-border-brand-primary-600 border'
          : '',
      )}
      role="radiogroup"
      aria-label="Dual Switch"
    >
      {items.map((item, index) => (
        <Wrapper key={index} item={item}>
          <div
            role="radio"
            aria-checked={activeItemIndex === index}
            className={cn(
              'bg-surface-neutral-primary rounded-full p-[5px]',
              disabled
                ? activeItemIndex === index
                  ? 'bg-surface-brand-300-disable text-icon-neutral-oncoloreddisable cursor-default'
                  : 'text-icon-neutral-disable cursor-default'
                : activeItemIndex === index
                  ? 'bg-surface-brand-600-primary text-icon-onbrand-neutral-on600 transition-colors'
                  : '',
            )}
            onClick={() => !disabled && handleSwitchClick(index)}
          >
            <Icon name={item.icon.name} size={size} />
          </div>
        </Wrapper>
      ))}
    </div>
  );
};
