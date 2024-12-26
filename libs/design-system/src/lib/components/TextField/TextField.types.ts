import { InputHTMLAttributes } from 'react';
import { IconProps } from '../Icon';
import { IconSize } from '../Icon/Icon.types';

type TrailingIconType = {
  name: 'x' | 'eye';
  size?: IconSize;
};
export type TrailingIcons =
  | []
  | [TrailingIconType]
  | [TrailingIconType, TrailingIconType];

export type textFieldPropsType = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?: string;
  supportText?: string;
  onSearchInput?: (value: string) => void;
  isError?: boolean;
  mode: 'filled' | 'outline';
  mergeTitleAndPlaceholder: boolean;
  leadingIcon?: IconProps;
  trailingIcons: TrailingIcons;
};
