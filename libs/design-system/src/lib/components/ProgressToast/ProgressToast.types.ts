import { ReactNode } from 'react';
import { IconProps } from '../Icon';
export type ProgressToastProps = {
  title: string;
  timeout: number;
  progressWidth: string;
  trailingAction: {
    ButtonProps: ReactNode;
    onClick: () => void;
  };
  leadingAction: {
    iconProps: IconProps;
    onClick: () => void;
  };
};
