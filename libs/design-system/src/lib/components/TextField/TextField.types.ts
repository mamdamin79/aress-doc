import { InputHTMLAttributes } from 'react';
import { IconName } from '../Icon/Icon.types';

export type textFieldPropsType = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?: string;
  supportText?: string;
  isError?: boolean;
  mode: 'filled' | 'outline';
  mergeTitleAndPlaceholder: boolean;
  leadingIcon?: IconName;
  trailingIcons: [] | ['x'] | ['x', 'eye'];
};
