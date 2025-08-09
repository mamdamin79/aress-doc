import { IconProps } from '../Icon';
interface iconPropsPlusColor extends IconProps {
  color?: string;
}
type metaType = {
  modalName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalProps?: any;
};
export interface MenuTilesProps {
  link?: string;
  text: string;
  subText?: string;
  icon?: iconPropsPlusColor;
  badgeColor?: string;
  expandable?: boolean;
  action?: string;
  isDashboard?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  prefix?: string;
  meta?: metaType;
  onClick?: (action?: string, meta?: metaType) => void;
}
