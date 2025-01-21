import { AnchorProps } from '@headlessui/react/dist/internal/floating';
import { IconProps } from '../Icon';

export interface dropDownCell {
  text: string;
  tag?: {
    color: string;
  };
  icon?: IconProps;
  isActive?: boolean;
  withCheck?: boolean;
}

export interface dropDownStyle {
  size: 'sm' | 'md' | 'lg';
  bg: 'primary' | 'secondary';
  emphasize: 'medium' | 'high';
  checkSelected?: boolean;
  anchor: AnchorProps;
}
