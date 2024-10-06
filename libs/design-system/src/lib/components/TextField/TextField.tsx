import React, { useRef, useState } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLabelClick = () => {
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClearInput = () => {
    setInputValue('');
  };

  const handleCharacterVisibility = () => {
    setIsVisibleCharacter(!visibleCharacter);
  };

  return (
    <div
      data-twe-input-wrapper-init
      className={cn(
        'relative w-full',
        {
          'pointer-events-none': disabled,
        },
        className
      )}
    >
      <div className="h-[26px]">
        {mergeTitleAndPlaceholder ? (
          isFocused && (
            <label className={cn('text-sm', { 'text-gray-400': disabled })}>
              {label}
            </label>
          )
        ) : (
          <label className={cn('text-sm', { 'text-gray-400': disabled })}>
            {label}
          </label>
        )}
      </div>

      {!isFocused && (
        <label
          onClick={handleLabelClick}
          className={cn(
            'text-sm hidden absolute top-9 pr-4 cursor-text',
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
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type={visibleCharacter ? 'text' : 'password'}
        value={inputValue}
        disabled={disabled}
        onChange={(e) => setInputValue(e.target.value)}
        className={cn(
          'font-normal rounded-xl p-2 w-full text-md outline-none border-[1.5px] transition-colors duration-150',
          {
            'placeholder:text-gray-400': disabled,
            'placeholder:text-gray-500': !disabled,
            'bg-gray-100': mode === 'filled' && !disabled,
            'hover:bg-gray-300': mode === 'filled' && !disabled && !isFocused,
            'text-transparent':
              mergeTitleAndPlaceholder && !isFocused && inputValue,
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
        {trailingIcons.map((icon) => (
          <button
            className={cn({ 'text-gray-400': disabled })}
            key={icon}
            onMouseDown={(e) => {
              e.preventDefault(); // we do this instead of onclick because it triggers sooner
              if (icon === 'eye') {
                handleCharacterVisibility();
              } else {
                handleClearInput();
              }
            }}
          >
            <Icon
              name={icon === 'x' ? icon : visibleCharacter ? 'eye-off' : icon}
              size="lg"
            />
          </button>
        ))}
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
