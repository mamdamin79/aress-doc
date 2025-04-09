import { IconProps } from "../Icon";

export interface NestedDropdownItemProps {
    title: string;
    icon: IconProps
    status: 'normal' | 'opened' | 'error';
    selectedOption?: string;
    placeHolder?: string;
    onClick: () => void;
  }
  
  export interface NestedDropDownProps {
    title: string;
    items: NestedDropdownItemProps[]; // Ensure children is an array of NestedDropdownItem objects
  }
  