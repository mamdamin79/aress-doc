import { IconName } from './IconComponent';

// valid icon size you can pass to IconComponent
export type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: string;
}
