import { ReactNode } from 'react';
import { IconProps } from '../Icon';
import { ButtonProps } from '../Button';
import { IconName, IconSize } from '../Icon/Icon.types';
export type ProgressToastProps = {
  title: string;
  timeout: number;
  progressWidth: string;
  trailingAction: {
    ButtonProps: ButtonProps;
    onClick: () => void;
  };
  leadingAction: {
    iconProps: {
      name: IconName;
      size?: IconSize;
    };
    onClick: () => void;
  };
};
