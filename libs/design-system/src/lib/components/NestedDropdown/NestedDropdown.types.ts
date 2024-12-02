import { IconProps } from "../Icon";

export interface NestedDropdownItem {
    title: string;
    icon: IconProps
    status: 'normal' | 'opened' | 'error';
    selectedOption?: string;
    placeHolder?: string;
    onClick: () => void;
  }
  
  export interface NestedDropDownProps {
    title: string;
    subFields: NestedDropdownItem[]; // Ensure children is an array of NestedDropdownItem objects
  }
  