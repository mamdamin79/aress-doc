import { InputHTMLAttributes } from 'react';
import { IconProps } from '../Icon';

export type textFieldPropsType = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?: string;
  supportText?: string;
  isError?: boolean;
  mode: 'filled' | 'outline';
  mergeTitleAndPlaceholder: boolean;
  leadingIcon?: IconProps;
  trailingIcons: [] | ['x'] | ['x', 'eye'];
};
