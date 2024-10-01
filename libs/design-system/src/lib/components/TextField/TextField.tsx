import React, { useState } from 'react';
import { textFieldPropsType } from './TextField.types';
import { cn } from '../../../utils';
import { Icon } from '../IconComponent';
import { IconName } from '../IconComponent/Icon.types';

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
  isDisable,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [visibleCharacter, setIsVisibleCharacter] = useState(
    type !== 'password'
  );

  const handleClearInput = () => {
    setInputValue('');
  };

  const handleCharacterVisibility = () => {
    setIsVisibleCharacter(!visibleCharacter);
  };

  return (
    <div
      data-twe-input-wrapper-init
      className={`relative w-[480px] ${isDisable && 'pointer-events-none'}`}
    >
      <div className="h-[26px]">
        {mergeTitleAndPlaceholder ? (
          isFocused && (
            <label className={cn(`text-sm  `, { 'text-gray-400': isDisable })}>
              {label}
            </label>
          )
        ) : (
          <label className={cn(`text-sm  `, { 'text-gray-400': isDisable })}>
            {label}
          </label>
        )}
      </div>
      {!isFocused && (
        <label
          className={cn(
            'text-sm hidden',
            { 'text-gray-400': isDisable },
            { 'block absolute top-9 right-12 ': mergeTitleAndPlaceholder }
          )}
        >
          {label}
        </label>
      )}
      {leadingIcon && (
        <div
          className={cn('absolute top-10 right-4 pointer-events-none', {
            'text-gray-400': isDisable,
          })}
        >
          <Icon size="lg" name={leadingIcon as IconName} />
        </div>
      )}
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type={visibleCharacter ? 'text' : 'password'}
        value={inputValue}
        disabled={isDisable}
        onChange={(e) => setInputValue(e.target.value)}
        className={cn(
          `placeholder:text-gray-500 ${
            isDisable
              ? 'placeholder:text-gray-400'
              : 'placeholder:text-gray-500'
          } font-normal rounded-xl p-2  w-full transition-all duration-150 outline-none  text-md ${
            leadingIcon && 'pr-12'
          } ${
            isError && isDisable === false
              ? 'border-red-600 focus:border-[2.5px]'
              : 'border-gray-300 focus:border-brand-600 focus:border-[2.5px]'
          } border-[1.5px] `,
          {
            'bg-gray-100 ': mode === 'filled' && isDisable === false,
          },
          {
            'hover:bg-gray-300':
              mode === 'filled' && isDisable === false && !isFocused,
          },
          { '!bg-gray-50 cursor-not-allowed': isDisable && mode === 'filled' }
        )}
        placeholder={mergeTitleAndPlaceholder ? '' : placeholder}
      />
      <div className="absolute z-20 left-4 top-10 flex justify-between gap-4 items-center">
        {trailingIcons.map((icon) => (
          <button
            className={cn({ 'text-gray-400': isDisable })}
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
              name={icon === 'x' ? icon : visibleCharacter ? icon : 'eye-off'}
              size="lg"
            />
          </button>
        ))}
      </div>
      <p
        className={cn(`${isError ? 'text-red-600' : 'text-gray-600'} text-xs`, {
          'text-gray-400': isDisable,
        })}
      >
        {supportText}
      </p>
    </div>
  );
};
