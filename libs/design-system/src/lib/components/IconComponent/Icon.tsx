import * as LucideIcons from 'lucide-react';
import React from 'react';
import { IconName, IconSize } from './Icon.types';
import { sizeValues } from './Icon.constance';

export interface IconProps {
  name: IconName;
  size?: IconSize;
}

export const Icon: React.FC<IconProps> = ({ name, size = 'md' }) => {
  // we do this because we want to say to TS that we know this is a react component dont be stricter than us :)
  const LucideIcon = LucideIcons[name] as React.ComponentType<{
    size?: number;
    stroke?: string;
    strokeWidth?: number;
  }>;

  return (
    <LucideIcon
      strokeWidth={sizeValues[size].strokeWidth}
      size={sizeValues[size].size}
    />
  );
};
