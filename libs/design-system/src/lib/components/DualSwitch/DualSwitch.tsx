import { cn } from 'libs/design-system/src/utils';
import React from 'react';
import { Icon } from '../Icon';

interface DualSwitchProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  disabled: boolean;
  bgWhite?: boolean;
}

export const DualSwitch: React.FC<DualSwitchProps> = ({
  activeIndex,
  setActiveIndex,
  disabled = false,
  bgWhite,
}) => {
  const handleSwitchClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      className={cn(
        'rounded-[100px] h-fit w-fit border p-1 gap-1 flex flex-row shadow-xs text-xs',
        bgWhite ? 'bg-white' : 'bg-gray-100 transition-colors',
        disabled ? 'border-brand-300' : 'border-brand-600'
      )}
    >
      <div
        className={cn(
          'rounded-full bg-white p-[6px]',
          disabled
            ? activeIndex === 0
              ? 'bg-brand-300 text-white'
              : ''
            : activeIndex === 0
            ? 'bg-brand-600 text-white  transition-colors'
            : ''
        )}
        onClick={() => !disabled && handleSwitchClick(0)}
      >
        <Icon name="presentation" size="md" />
      </div>
      <div
        className={cn(
          'rounded-full bg-white p-[6px]',
          disabled
            ? activeIndex === 1
              ? 'bg-brand-300 text-white'
              : ''
            : activeIndex === 1
            ? 'bg-brand-600 text-white  transition-colors'
            : ''
        )}
        onClick={() => !disabled && handleSwitchClick(0)}
      >
        <Icon name="layout-grid" size="md" />
      </div>
    </div>
  );
};
