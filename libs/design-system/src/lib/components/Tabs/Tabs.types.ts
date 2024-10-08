import { IconName } from '../Icon/Icon.types';

export interface Tab {
  title?: string;
  content: React.ReactNode | string;
  icons?: IconName[];
}
