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
        'hover:bg-surface-brand-200 hover:text-text-onbrand-neutral-primary-onbelow600 bg-surface-neutral-primary text-text-neutral-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors',
        activeRotateOption === option &&
          'bg-surface-brand-600-primary text-text-onbrand-neutral-primary-on600',
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
          'border-border-neutral-contrast bg-surface-neutral-primary invisible flex h-full -translate-x-7 select-none flex-row-reverse items-center justify-center gap-1 rounded-full border p-1 font-medium opacity-0 transition-all duration-300',
          isOptionsMenuOpen &&
            'group-hover:visible group-hover:translate-x-0 group-hover:opacity-100',
        )}
      >
        {rotateOptions.map(renderOption)}
      </div>
      <div
        className={cn(
          'border-border-brand-primary-600 bg-surface-neutral-primary flex h-10 flex-row items-center justify-center gap-1 rounded-full border px-[6px] font-medium transition-all',
          activeRotateOption
            ? 'bg-surface-brand-600-primary text-text-onbrand-neutral-primary-on600 p-1'
            : 'w-10',
        )}
      >
        {activeRotateOption && !disabled && !isOptionsMenuOpen && (
          <div className="bg-surface-brand-600-primary text-text-neutral-white flex h-8 w-8 items-center justify-center rounded-full">
            {activeRotateOption}s
          </div>
        )}
        <Tooltip title="گردش خودکار" position="bottom" offset={10}>
          <div
            className={cn(
              'text-icon-neutral-primary flex h-8 w-8 items-center justify-center transition-all duration-300',
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
