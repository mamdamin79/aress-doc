import React from 'react';
import { textFieldPropsType } from './TextField.types';
import { cn } from '../../../utils';

export const TextField: React.FC<textFieldPropsType> = ({
  label,
  placeholder,
  supportText,
  isError = false,
  mode = 'filled',
  mergeTitleAndPlaceholder = false,
  leadingIcon,
  trailingIcons,
}) => {
  return (
    <div>
      <label className={cn('text-sm block')}>{label}</label>
      <input type="text" placeholder={placeholder} />
      <p>{supportText}</p>
    </div>
  );
};
