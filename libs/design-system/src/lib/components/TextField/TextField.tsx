import React, { MouseEvent, useId, useState } from 'react';
import { textFieldPropsType } from './TextField.types';
import { cn } from '../../../utils';
import { Icon } from '../Icon';

export const TextField: React.FC<textFieldPropsType> = ({
  label,
  placeholder,
  supportText,
  onSearchInput,
  isError = false,
  mode = 'filled',
  mergeTitleAndPlaceholder = false,
  leadingIcon,
  trailingIcons,
  type,
  disabled,
  className,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [visibleCharacter, setIsVisibleCharacter] = useState(
    type !== 'password',
  );

  const id = useId();

  const handleClearInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputValue('');
  };

  const handleCharacterVisibility = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisibleCharacter(!visibleCharacter);
  };

  return (
    <div
      data-twe-input-wrapper-init
      className={cn(
        'font-vazirmatn relative w-full',
        {
          'pointer-events-none': disabled,
        },
        className,
      )}
    >
      <div className="h-[26px]">
        {mergeTitleAndPlaceholder ? (
          (isFocused || inputValue) && (
            <label
              className={cn('text-sm font-medium', {
                'text-gray-400': disabled,
              })}
            >
              {label}
            </label>
          )
        ) : (
          <label
            className={cn('text-sm font-medium', { 'text-gray-400': disabled })}
          >
            {label}
          </label>
        )}
      </div>

      {!isFocused && !inputValue && (
        <label
          htmlFor={id}
          className={cn(
            'absolute top-9 hidden cursor-text pr-4 text-sm font-medium',
            { 'right-8': leadingIcon },
            { block: mergeTitleAndPlaceholder },
            { 'text-gray-400': disabled },
          )}
        >
          {label}
        </label>
      )}

      {leadingIcon && (
        <div
          className={cn('pointer-events-none absolute right-4 top-10', {
            'text-gray-400': disabled,
          })}
        >
          {leadingIcon && <Icon size="lg" name={leadingIcon} />}
        </div>
      )}

      <input
        id={id}
        {...rest}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type={visibleCharacter ? 'text' : 'password'}
        value={inputValue}
        disabled={disabled}
        onChange={(e) => {
          setInputValue(e.target.value);
          onSearchInput(e.target.value);
        }}
        className={cn(
          'text-md w-full rounded-xl border-[1.5px] p-2 font-normal outline-none transition-colors duration-150',
          {
            'border-inherit bg-transparent opacity-100 placeholder:text-gray-400':
              disabled,
            'placeholder:text-gray-500': !disabled,
            'pl-20': trailingIcons.length === 2,
            'pl-10': trailingIcons.length === 1,
            'bg-gray-100': mode === 'filled' && !disabled,
            'hover:bg-gray-300': mode === 'filled' && !disabled && !isFocused,
            'cursor-not-allowed !bg-gray-50': disabled && mode === 'filled',
            'border-red-600 focus:border-[2.5px]': isError && !disabled,
            'focus:border-brand-600 border-gray-300 focus:border-[2.5px]':
              !isError && !disabled,
            'pr-12': leadingIcon,
          },
        )}
        placeholder={mergeTitleAndPlaceholder ? '' : placeholder}
      />

      <div className="absolute left-4 top-10 z-20 flex items-center justify-between gap-4">
        {trailingIcons.map((icon) =>
          icon === 'eye' ? (
            <button
              className={cn({ 'text-gray-400': disabled })}
              onMouseDown={(e) => handleCharacterVisibility(e)}
            >
              <Icon size="lg" name={visibleCharacter ? 'eye-off' : icon} />
            </button>
          ) : (
            inputValue && (
              <button
                className={cn({ 'text-gray-400': disabled })}
                onMouseDown={(e) => handleClearInput(e)}
              >
                <Icon size="lg" name={icon} />
              </button>
            )
          ),
        )}
      </div>
      <span
        className={cn('text-xs', {
          'text-red-600': isError,
          'text-gray-600': !isError,
          'text-gray-400': disabled,
        })}
      >
        {supportText}
      </span>
    </div>
  );
};
