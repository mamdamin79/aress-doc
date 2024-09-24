import * as LucideIcons from 'lucide-react';
import React from 'react';

// this is a type of all valid icon names
export type IconName = keyof typeof LucideIcons;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
}) => {
  // we do this because we want to say to TS that we know this is a react component dont be stricter that us :)
  const LucideIcon = LucideIcons[name] as React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
  }>;

  return <LucideIcon strokeWidth={8} size={size} color={color} />;
};

export default Icon;
