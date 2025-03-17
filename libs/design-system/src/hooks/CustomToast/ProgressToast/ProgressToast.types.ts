import { ReactNode } from 'react';
import { ButtonProps } from '../../../lib/components/Button';
import { IconProps } from '../../../lib/components/Icon/Icon';
export type ProgressToastProps = {
  title: string;
  timeout?: number;
  trailingAction?: {
    ButtonProps: ButtonProps;
    onClick?: () => void;
  };
  leadingAction?: {
    iconProps: IconProps;
    onClick?: () => void;
  };
};
