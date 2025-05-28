import { InputHTMLAttributes } from 'react';
import { IconProps } from '../Icon';
import { IconName, IconSize } from '../Icon/Icon.types';

type TrailingIconType = {
  name: 'x' | 'eye' | IconName;
  size?: IconSize;
  color?: 'primary' | 'secondary'; 
  onClick?: () => void;
};

type leadingIconType = IconProps & {
  color?: 'primary' | 'secondary';
  onClick?: (value?: string | number | readonly string[]) => void;
};
export type TrailingIcons =
  | []
  | [TrailingIconType]
  | [TrailingIconType, TrailingIconType];

export type textFieldPropsType = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?: string;
  supportText?: string;
  isError?: boolean;
  mode: 'filled' | 'outline';
  mergeTitleAndPlaceholder: boolean;
  leadingIcon?: leadingIconType;
  trailingIcons: TrailingIcons;
  longText?: boolean;
  inputSize?: TextFieldInputSize;
};

export type TextFieldInputSize = 'default' | 'md' | 'sm';