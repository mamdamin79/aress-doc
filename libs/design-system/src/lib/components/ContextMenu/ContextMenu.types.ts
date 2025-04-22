import { IconName } from '../Icon/Icon.types';

export type ContextMenuItem = {
  onClick: () => void;
  title: string;
  icon: IconName;
  disabled?: boolean;
  isActive?: boolean;
  dividerBefore?: boolean;
};
