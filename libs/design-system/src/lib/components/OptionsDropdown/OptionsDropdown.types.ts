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
  id?: number;
  text: string;
  tag?: FundsTagProps;
  icon?: IconProps;
  isActive?: boolean;
  withCheck?: boolean;
}

export interface DropDownStyle {
  size?: DropdownSize;
  bg?: DropdownBg;
  emphasize?: DropdownEmphasize;
  checkSelected?: boolean;
  anchor?: AnchorProps;
  fixedWidth?: number;
}
