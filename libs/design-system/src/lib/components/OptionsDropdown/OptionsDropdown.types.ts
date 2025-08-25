import { AnchorProps } from '@headlessui/react/dist/internal/floating';
import { IconProps } from '../Icon';
import { FundsTagProps } from '../FundsTag';
export type DropdownBg = 'primary' | 'secondary';
export type DropdownSize = 'sm' | 'md' | 'lg';
export type DropdownEmphasize = 'medium' | 'high';
export interface TriggerProps {
  isActive: boolean;
  selectedItem: DropdownCell;
  dropDownStyles?: DropDownStyle;
}
export interface DropdownCell {
  id?: undefined | number;
  text: string;
  tag?: FundsTagProps;
  icon?: IconProps;
  isActive?: boolean;
  withCheck?: boolean;
  className?:string;
}

export interface DropDownStyle {
  maxHeight?: number;
  scrollable?: boolean;
  shadow?: boolean;
  size?: DropdownSize;
  bg?: DropdownBg;
  emphasize?: DropdownEmphasize;
  checkSelected?: boolean;
  anchor?: AnchorProps;
  fixedWidth?: number;
}
