import { ReactNode } from 'react';
import { ButtonProps } from '../Button';
import { IconProps } from '../Icon/Icon';
export type ProgressToastProps = {
  title: string;
  timeout?: number;
  progressWidth: string;
  trailingAction: {
    ButtonProps: ButtonProps;
    onClick: () => void;
  };
  leadingAction: {
    iconProps: IconProps;
    onClick: () => void;
  };
};
