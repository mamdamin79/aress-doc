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
  onChange,
  value,
  className,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [visibleCharacter, setIsVisibleCharacter] = useState(
    type !== 'password',
  );
  const id = useId();

  const inputValue = value ?? internalValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e); // if you want to use the value in the parent component
  };

  const handleClearInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInternalValue('');
    onChange?.({ target: { value: '' } } as any); // event simulation
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
            { 'top-10': leadingIcon?.size === 'md' },
          )}
        >
          {label}
        </label>
      )}

      {leadingIcon && (
        <div
          className={cn('pointer-events-none absolute right-4 top-10', {
            'text-gray-400': disabled,
            'top-[42px]': leadingIcon?.size === 'md',
          })}
        >
          {leadingIcon && (
            <Icon name={leadingIcon.name} size={leadingIcon.size || 'lg'} />
          )}
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
        onChange={handleInputChange}
        className={cn(
          'text-md h-[50px] w-full rounded-xl border p-2 font-normal outline-none transition-colors duration-150',
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
            'focus:border-brand-600 border-gray-300 focus:border-2 focus:outline-none':
              !isError && !disabled,
            'pr-12': leadingIcon,
          },
        )}
        placeholder={mergeTitleAndPlaceholder ? '' : placeholder}
      />

      <div
        className={cn(
          'absolute left-4 top-10 z-20 flex items-center justify-between gap-4',
          {
            'top-[42px]':
              trailingIcons.length > 0 && trailingIcons[1]?.size === 'md',
          },
        )}
      >
        {trailingIcons.map((icon) =>
          icon.name === 'eye' ? (
            <button
              type="button"
              className={cn({ 'text-gray-400': disabled })}
              onMouseDown={(e) => handleCharacterVisibility(e)}
            >
              <Icon
                size={icon.size}
                name={visibleCharacter ? 'eye-off' : icon.name}
              />
            </button>
          ) : (
            inputValue && (
              <button
                type="button"
                className={cn({ 'text-gray-400': disabled })}
                onMouseDown={(e) => handleClearInput(e)}
              >
                <Icon size={icon.size} name={icon.name} />
              </button>
            )
          ),
        )}
      </div>
      <div
        className={cn('h-[22px] pt-1 text-xs', {
          'text-red-600': isError,
          'text-gray-600': !isError,
          'text-gray-400': disabled,
        })}
      >
        {supportText}
      </div>
    </div>
  );
};
