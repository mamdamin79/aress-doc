import { InputHTMLAttributes } from 'react';
import { IconProps } from '../Icon';
import { IconName, IconSize } from '../Icon/Icon.types';

type TrailingIconType = {
  name: 'x' | 'eye' | IconName;
  size?: IconSize;
  onClick?: () => void;
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
  leadingIcon?: IconProps;
  trailingIcons: TrailingIcons;
};
