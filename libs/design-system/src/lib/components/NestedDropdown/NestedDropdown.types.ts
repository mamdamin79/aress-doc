import { IconProps } from "../Icon";

export interface NestedDropdownItemProps {
  title: string;
  status: 'normal' | 'opened' | 'error';
  icon: IconProps;
  onClick: () => void;
  activeIcon?: IconProps;
  placeHolder?: string;
  selectedOption?: string;
  hasTooltip?: boolean;
  hasChildren?: boolean;
}
  
  export interface NestedDropDownProps {
    title: string;
    items: NestedDropdownItemProps[]; // Ensure children is an array of NestedDropdownItem objects
  }
  