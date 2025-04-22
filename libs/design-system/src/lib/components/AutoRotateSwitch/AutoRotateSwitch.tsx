'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Icon } from '../Icon';
import { cn } from 'libs/design-system/src/utils';
import { AutoRotateProps } from './AutoRotateSwitch.types';
import { Tooltip } from '../Tooltip';

export const AutoRotateSwitch: React.FC<AutoRotateProps> = ({
  rotateOptions,
  initialValue,
  onChange,
  disabled = false,
}) => {
  const [activeRotateOption, setActiveRotateOption] = useState<number | null>(
    initialValue ?? null,
  );
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (!disabled && !activeRotateOption) setIsOptionsMenuOpen(true);
  }, [disabled, activeRotateOption]);

  const handleMouseLeave = () => {
    if (!disabled) setIsOptionsMenuOpen(false);
  };

  const changeActiveOption = useCallback(
    (option: number | null) => {
      setIsOptionsMenuOpen(false);
      setActiveRotateOption(option);
      onChange(option);
    },
    [onChange],
  );

  useEffect(() => {
    setActiveRotateOption(initialValue ?? null);
  }, [initialValue]);

  const renderOption = (option: number) => (
    <div
      key={option}
      className={cn(
        'hover:bg-brand-200 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors',
        activeRotateOption === option &&
          'bg-brand-600 hover:bg-brand-600 text-white',
      )}
      onClick={() => changeActiveOption(option)}
    >
      {option}s
    </div>
  );

  return (
    <div
      className="group flex h-10 flex-row gap-1 rounded-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          'invisible flex h-full -translate-x-7 select-none flex-row-reverse items-center justify-center gap-1 rounded-full border border-gray-400 p-1 font-medium opacity-0 transition-all duration-300',
          isOptionsMenuOpen &&
            'group-hover:visible group-hover:translate-x-0 group-hover:opacity-100',
        )}
      >
        {rotateOptions.map(renderOption)}
      </div>
      <div
        className={cn(
          'border-brand-600 flex h-10 flex-row items-center justify-center gap-1 rounded-full border px-[6px] transition-all',
          activeRotateOption ? 'bg-brand-600 p-1 text-white' : 'w-10',
          isOptionsMenuOpen &&
            activeRotateOption &&
            'border-red-600 bg-red-600',
        )}
      >
        {activeRotateOption && !disabled && !isOptionsMenuOpen && (
          <div className="bg-brand-600 hover:bg-brand-600 flex h-8 w-8 items-center justify-center rounded-full text-white">
            {activeRotateOption}s
          </div>
        )}
        <Tooltip title="گردش خودکار" position="bottom" offset={10}>
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center transition-all duration-300',
              !activeRotateOption && 'group-hover:rotate-90',
            )}
          >
            <Icon name="refresh-cw" size="md" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
