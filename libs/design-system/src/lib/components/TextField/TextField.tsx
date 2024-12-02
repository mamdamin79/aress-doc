import React, { MouseEvent, useId, useState } from 'react';
import { textFieldPropsType } from './TextField.types';
import { cn } from '../../../utils';
import { Icon } from '../Icon';

export const TextField: React.FC<textFieldPropsType> = ({
  label,
  placeholder,
  supportText,
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
    type !== 'password'
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
        'relative w-full font-vazirmatn',
        {
          'pointer-events-none': disabled,
        },
        className
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
            'text-sm hidden absolute top-9 pr-4 cursor-text font-medium',
            { 'right-8': leadingIcon },
            { block: mergeTitleAndPlaceholder },
            { 'text-gray-400': disabled }
          )}
        >
          {label}
        </label>
      )}

      {leadingIcon && (
        <div
          className={cn('absolute top-10 right-4 pointer-events-none', {
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
        onChange={(e) => setInputValue(e.target.value)}
        className={cn(
          'font-normal  w-full rounded-xl p-2 text-md outline-none border-[1.5px] transition-colors duration-150',
          {
            'bg-transparent border-inherit opacity-100 placeholder:text-gray-400':
              disabled,
            'placeholder:text-gray-500': !disabled,
            'pl-20': trailingIcons.length === 2,
            'pl-10': trailingIcons.length === 1,
            'bg-gray-100': mode === 'filled' && !disabled,
            'hover:bg-gray-300': mode === 'filled' && !disabled && !isFocused,
            'cursor-not-allowed !bg-gray-50': disabled && mode === 'filled',
            'border-red-600 focus:border-[2.5px]': isError && !disabled,
            'border-gray-300 focus:border-brand-600 focus:border-[2.5px]':
              !isError && !disabled,
            'pr-12': leadingIcon,
          }
        )}
        placeholder={mergeTitleAndPlaceholder ? '' : placeholder}
      />

      <div className="absolute z-20 left-4 top-10 flex justify-between gap-4 items-center">
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
          )
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
