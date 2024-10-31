import { IconProps } from '../Icon';
export interface MenuTilesProps {
  text: string;
  subText?: string;
  icon?: IconProps;
  badgeColor?: string;
  expandable?: boolean;
  onClick: () => void;
  isDashboard: boolean;
  isActive: boolean;
}
