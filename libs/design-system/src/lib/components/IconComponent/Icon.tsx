import React from 'react';
import { IconName, IconSize } from './Icon.types';
import { sizeValues, strokeValues } from './Icon.constants';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';

export interface IconProps {
  name: IconName;
  size?: IconSize;
}

export const Icon: React.FC<IconProps> = ({ name, size = 'md' }) => {
  // we do this because we want to say to TS that we know this is a react component dont be stricter than us :)
  const LucideIcon = dynamic(dynamicIconImports[name]) as React.ComponentType<{
    size?: number;
    stroke?: string;
    strokeWidth?: number;
  }>;

  return (
    <LucideIcon strokeWidth={strokeValues[size]} size={sizeValues[size]} />
  );
};
