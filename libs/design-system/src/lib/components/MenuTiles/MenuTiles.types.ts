import { IconProps } from '../Icon';
export interface MenuTilesProps {
  text: string;
  subText?: string;
  icon?: IconProps;
  badgeColor?: string;
  expandable?: boolean;
  leadingAction: () => void;
  isDashboard?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  prefix?: string;
}
