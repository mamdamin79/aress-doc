import React, { useState, useRef } from 'react';
import { SearchFieldProps } from './SearchField.types';
import { cn, Icon } from 'design-system';

export const SearchField: React.FC<SearchFieldProps> = ({
  placeholder = 'جستجو',
  onChange,
  onClear,
}) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setValue('');
    onClear?.();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className="rounded-4xl relative flex w-[330px] items-center justify-start gap-2 pr-4"
      dir="rtl"
    >
      {/* Search icon */}
      <div className="relative flex shrink-0 items-center justify-start gap-2">
        <div
          className={cn('text-icon-neutral-tertiary relative size-6 shrink-0', {
            'text-icon-brand-primary-600': isFocused,
            'text-icon-neutral-primary': !isFocused && value,
          })}
        >
          <Icon name="search" size="lg" />
        </div>
      </div>
      {/* Input content area */}
      <div className="relative flex shrink-0 grow basis-0 items-center justify-end">
        <div className="relative flex w-full shrink-0 items-center justify-end">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={cn(
              'text-md text-text-neutral-primary placeholder:text-text-neutral-tertiary w-full text-right font-normal outline-none',
              {
                'caret-icon-brand-primary-600': isFocused,
              },
            )}
            dir="rtl"
          />
        </div>
      </div>
      {/* Clear/Close icon - only show when typing */}
      {value && (
        <div className="relative flex shrink-0 items-center justify-start">
          <button
            onClick={handleClear}
            className="text-icon-neutral-primary relative shrink-0 cursor-pointer"
            type="button"
          >
            <Icon name="x" size="lg" />
          </button>
        </div>
      )}
    </div>
  );
};
