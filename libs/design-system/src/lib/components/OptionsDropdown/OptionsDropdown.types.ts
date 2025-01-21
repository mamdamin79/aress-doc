import { IconProps } from '../Icon';

export interface dropDownCell {
  text: string;
  tag?: {
    color: string;
  };
  icon?: IconProps;
  isActive?: boolean;
  withCheck?: boolean;
}
export interface triggerCell {
  text: string;
  tag?: {
    color: string;
  };
  icon?: IconProps;
}
