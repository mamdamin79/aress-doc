import { cn } from 'libs/design-system/src/utils';
import React, { useState } from 'react';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { DualSwitchItem, DualSwitchProps } from './DualSwitch.types';

export const DualSwitch: React.FC<DualSwitchProps> = ({
  initialIndex = 0,
  onChange,
  items,
  size,
  disabled = false,
  bgWhite = false,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState(initialIndex);

  const handleSwitchClick = (itemIndex: number) => {
    setActiveItemIndex(itemIndex);
    onChange(itemIndex);
  };

  const Wrapper: React.FC<{
    item: DualSwitchItem;
    children: React.ReactNode;
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
        bgWhite ? 'bg-white' : 'bg-gray-100 transition-colors',
        size === 'lg'
          ? disabled
            ? 'border-brand-300 border'
            : 'border-brand-600 border'
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
              'rounded-full bg-white p-[6px]',
              disabled
                ? activeItemIndex === index
                  ? 'bg-brand-300 text-white'
                  : 'text-gray-400'
                : activeItemIndex === index
                  ? 'bg-brand-600 text-white transition-colors'
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
