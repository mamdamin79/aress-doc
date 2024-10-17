import { IconProps } from '../Icon';

export interface Tab {
  title?: string;
  content: React.ReactNode | string;
  icons?: IconProps[];
}
