'use client';
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
  onChange,
  value,
  className,
  inputSize = 'default',
  longText = false,
  captchaValue,
  onRefreshCaptcha,
  maxLength,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [visibleCharacter, setIsVisibleCharacter] = useState(
    type !== 'password',
  );
  const id = useId();

  const inputValue = value ?? internalValue;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInternalValue(e.target.value);
    onChange?.(e as React.ChangeEvent<HTMLInputElement>); // if you want to use the value in the parent component
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

  // Height and icon position classes based on inputSize
  const heightClass =
    inputSize === 'sm' ? 'h-10' : inputSize === 'md' ? 'h-12' : 'h-14'; // default

  return (
    <div
      data-twe-input-wrapper-init
      className={cn(
        'relative w-full',
        {
          'pointer-events-none': disabled,
        },
        className,
      )}
    >
      {label && (
        <div className="mb-1 h-[26px]">
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
              className={cn('text-sm font-medium', {
                'text-gray-400': disabled,
              })}
            >
              {label}
            </label>
          )}
        </div>
      )}

      {!isFocused && !inputValue && (
        <label
          htmlFor={id}
          className={cn(
            'absolute top-9 hidden cursor-text pr-4 text-sm font-medium',
            { 'right-8': leadingIcon },
            {
              'top-11 block':
                mergeTitleAndPlaceholder && inputSize === 'default',
            },
            { 'top-10 block': mergeTitleAndPlaceholder && inputSize === 'md' },
            { 'top-9 block': mergeTitleAndPlaceholder && inputSize === 'sm' },
            { 'text-gray-400': disabled },
            { 'top-10': leadingIcon?.size === 'md' },
          )}
        >
          {label}
        </label>
      )}

      {leadingIcon && (
        <div
          className={cn(
            'absolute right-4',
            {
              'top-[46px]': label && inputSize === 'default',
              'top-[16px]': !label && inputSize === 'default',
            },
            {
              'top-[42px]': label && inputSize === 'md',
              'top-[12px]': !label && inputSize === 'md',
            },
            {
              'top-[38px]': label && inputSize === 'sm',
              'top-[8px]': !label && inputSize === 'sm',
            },
            {
              'text-gray-400': disabled,
              'text-gray-500': leadingIcon.color === 'secondary',
              'cursor-pointer': leadingIcon.onClick,
              'top-10': leadingIcon?.size === 'md' && label,
            },
          )}
        >
          <div
            onClick={() =>
              leadingIcon.onClick && leadingIcon?.onClick(inputValue)
            }
          >
            <Icon name={leadingIcon.name} size={leadingIcon.size || 'lg'} />
          </div>
        </div>
      )}
      {longText ? (
        <textarea
          id={id}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleInputChange}
          value={inputValue}
          disabled={disabled}
          className={cn(
            'text-md h-12 w-full resize-none rounded-xl border p-2 font-normal outline-none transition-colors duration-150',
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
              'h-[134px]': longText,
            },
          )}
          placeholder={mergeTitleAndPlaceholder ? '' : placeholder}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        ></textarea>
      ) : (
        <input
          id={id}
          {...rest}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type={visibleCharacter ? 'text' : 'password'}
          value={inputValue}
          disabled={disabled}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' &&
              leadingIcon &&
              typeof leadingIcon.onClick === 'function'
            ) {
              leadingIcon.onClick(inputValue);
            }
          }}
          className={cn(
            'text-md w-full rounded-xl border p-2 font-normal outline-none transition-colors duration-150',
            heightClass,
            {
              'border-inherit bg-transparent opacity-100 placeholder:text-gray-400':
                disabled,
              'placeholder:text-gray-500': !disabled,
              'pl-[112px]': captchaValue, // extra padding for captcha image
              'pl-20': !captchaValue && trailingIcons.length === 2,
              'pl-10': !captchaValue && trailingIcons.length === 1,
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
          maxLength={maxLength ?? 300}
        />
      )}

      {/* Captcha image, if provided */}
      {captchaValue && (
        <div
          className={cn(
            'absolute left-0.5 z-20 flex items-center justify-center',
            {
              'top-[32px]':
                label &&
                (inputSize === 'default' ||
                  inputSize === 'md' ||
                  inputSize === 'sm'),
              'top-[2px]':
                !label && (inputSize === 'default' || inputSize === 'md'),
              'top-[8px]': !label && inputSize === 'sm',
            },
          )}
        >
          <img
            src={`data:image/png;base64,${captchaValue}`}
            alt="captcha"
            className={cn('rounded-bl-xl rounded-tl-xl object-fill', {
              'h-[52px] w-[120px]': inputSize === 'default',
              'h-[44px] w-[110px]': inputSize === 'md',
              'h-[36px] w-[100px]': label && inputSize === 'sm',
              'top-[8px]': !label && inputSize === 'sm',
            })}
            draggable={false}
          />
        </div>
      )}

      <div
        className={cn(
          'absolute left-4 z-10 flex items-center justify-between gap-4',
          {
            'top-[46px]': label && inputSize === 'default',
            'top-[16px]': !label && inputSize === 'default',
          },
          {
            'top-[42px]': label && inputSize === 'md',
            'top-[12px]': !label && inputSize === 'md',
          },
          {
            'top-[38px]': label && inputSize === 'sm',
            'top-[8px]': !label && inputSize === 'sm',
          },
          {
            'top-10':
              trailingIcons.length > 0 &&
              trailingIcons[1]?.size === 'md' &&
              label,
          },
        )}
        style={{
          left: captchaValue
            ? inputSize === 'sm'
              ? '100px'
              : inputSize === 'md'
                ? '110px'
                : '120px'
            : '16px', // shift trailing icons if captcha present
        }}
      >
        {trailingIcons.map((icon) => {
          const isDisabled = cn({
            'text-gray-400': disabled,
            'text-gray-500': icon.color === 'secondary',
          });

          if (icon.name === 'eye') {
            return (
              <button
                type="button"
                className={isDisabled}
                onMouseDown={(e) => handleCharacterVisibility(e)}
              >
                <Icon
                  size={icon.size}
                  name={visibleCharacter ? 'eye-off' : icon.name}
                />
              </button>
            );
          } else if (icon.name === 'x') {
            return inputValue ? (
              <button
                type="button"
                className={isDisabled}
                onMouseDown={(e) => {
                  icon.onClick && icon.onClick();
                  handleClearInput(e);
                }}
              >
                <Icon size={icon.size} name={icon.name} />
              </button>
            ) : null;
          } else {
            return (
              <button
                type="button"
                className={isDisabled}
                onMouseDown={icon.onClick}
              >
                <Icon size={icon.size} name={icon.name} />
              </button>
            );
          }
        })}
      </div>
      {supportText && (
        <div
          className={cn('flex h-[22px] justify-between pt-1 text-xs', {
            'text-red-600': isError,
            'text-gray-600': !isError,
            'text-gray-400': disabled,
            '-mt-2': longText,
          })}
        >
          <span>{supportText}</span>

          {captchaValue && (
            <button
              className="text-brand-500"
              onClick={() => onRefreshCaptcha()}
            >
              <Icon size="lg" name="rotate-cw" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
