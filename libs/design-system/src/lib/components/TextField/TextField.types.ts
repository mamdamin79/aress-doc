import { InputHTMLAttributes } from 'react';
import { IconName } from '../Icon/Icon.types';

export type textFieldPropsType = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?: string;
  supportText?: string;
  isError?: boolean; // default false
  mode: 'filled' | 'outline'; // default filled
  mergeTitleAndPlaceholder: boolean; // default false
  leadingIcon?: IconName;
  trailingIcons: [] | ['x'] | ['x', 'eye'];
  isDisable: boolean; // default false
};
