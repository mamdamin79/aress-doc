import { ReactNode } from 'react';
import { IconName } from '../Icon/Icon.types';
export type ProgressToastProps = {
  title: string;
  timeout: number;
  progressWidth: string;
  trailingAction: {
    ButtonProps: ReactNode;
    onClick: () => void;
  };
  leadingAction: {
    iconProps: IconName;
    onClick: () => void;
  };
};
