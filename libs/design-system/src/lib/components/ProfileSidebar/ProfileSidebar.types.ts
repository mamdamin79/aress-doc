import { IconProps } from '../Icon';

export interface ProfileSidebarItem {
  key: string;
  text: string;
  icon: IconProps;
  onClick?: () => void;
}
