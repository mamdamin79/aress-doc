import { IconProps } from '../Icon';

export interface Tab {
  title?: string;
  id: number;
  content: React.ReactNode | string;
  icons?: IconProps[];
}
