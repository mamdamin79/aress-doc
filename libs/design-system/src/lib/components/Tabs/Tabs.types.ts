import { FundsTagProps } from '../FundsTag';
import { IconProps } from '../Icon';

export interface Tab {
  title?: string;
  id: string;
  content?: React.ReactNode | string;
  icons?: IconProps[];
  tag?: FundsTagProps['color'];
}
