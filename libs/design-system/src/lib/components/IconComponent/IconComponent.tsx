import * as LucideIcons from 'lucide-react';
import React from 'react';
import { IconProps, IconSize } from './IconComponet.types';

// this is a type of all valid icon names
export type IconName = keyof typeof LucideIcons;

// values that define in figma for each size(sm,md,lg)
export const sizeValues: Record<
  IconSize,
  { size: number; strokeWidth: number }
> = {
  sm: { size: 16, strokeWidth: 1.2 },
  md: { size: 20, strokeWidth: 1.5 },
  lg: { size: 24, strokeWidth: 1.8 },
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 'lg',
  color = 'currentColor',
}) => {
  // we do this because we want to say to TS that we know this is a react component dont be stricter that us :)
  const LucideIcon = LucideIcons[name] as React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
  }>;

  return (
    <LucideIcon
      strokeWidth={sizeValues[size].strokeWidth}
      size={sizeValues[size].size}
      color={color}
    />
  );
};

export default Icon;
