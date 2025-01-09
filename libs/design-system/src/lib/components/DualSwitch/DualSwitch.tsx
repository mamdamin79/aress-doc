import { cn } from 'libs/design-system/src/utils';
import React, { useState } from 'react';
import { Icon, IconProps } from '../Icon';
import { Tooltip } from '../Tooltip';

type TooltipProps = {
  children?: React.ReactNode;
  title: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
};

type DualSwitchItem = {
  tooltip?: TooltipProps;
  icon: IconProps;
};

interface DualSwitchProps {
  initialIndex?: number;
  onChange: (value: number) => void;
  items: DualSwitchItem[];
  size: 'sm' | 'lg';
  disabled?: boolean;
  bgWhite?: boolean;
}

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
        'rounded-[100px] h-fit w-fit border p-1 gap-1 flex flex-row shadow-xs text-xs',
        bgWhite ? 'bg-white' : 'bg-gray-100 transition-colors',
        size === 'lg'
          ? disabled
            ? 'border-brand-300'
            : 'border-brand-600'
          : '',
      )}
    >
      {items.map((item, index) => (
        <Wrapper key={index} item={item}>
          <div
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
