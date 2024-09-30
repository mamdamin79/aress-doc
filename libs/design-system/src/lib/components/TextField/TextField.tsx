import React from 'react';
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
  ...rest
}) => {
  return (
    <div className="relative w-[480px]">
      <label className={cn('text-sm block')}>{label}</label>
      <div className="absolute flex items-center inset-y-0 start-0 pr-4 right-4 pointer-events-none">
        <Icon size="lg" name={leadingIcon as IconName} />
      </div>
      <input
        type={type}
        className={cn(
          `placeholder:text-gray-500 font-normal rounded-xl p-2  w-full transition-all duration-150 outline-none  text-md ${
            leadingIcon && 'pr-12'
          } ${
            isError
              ? 'border-red-600 focus:border-[2.5px]'
              : 'border-gray-300 focus:border-brand-600'
          } border-[1.5px] `,
          { 'bg-gray-100 hover:bg-gray-300': mode === 'filled' }
        )}
        placeholder={placeholder}
      />
      <div className="absolute  left-4 top-10 flex justify-between gap-4 items-center">
        {trailingIcons.map((icon) => (
          <Icon name={icon} size="lg" />
        ))}
      </div>
      <p
        className={cn(`${isError ? 'text-red-600' : 'text-gray-600'} text-xs`)}
      >
        {supportText}
      </p>
    </div>
  );
};
