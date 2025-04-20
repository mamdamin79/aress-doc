import { IconProps } from '../Icon';
interface iconPropsPlusColor extends IconProps {
  color?: string;
}
export interface MenuTilesProps {
  link?: string;
  text: string;
  subText?: string;
  icon?: iconPropsPlusColor;
  badgeColor?: string;
  expandable?: boolean;
  leadingAction?: () => void;
  isDashboard?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  prefix?: string;
}
