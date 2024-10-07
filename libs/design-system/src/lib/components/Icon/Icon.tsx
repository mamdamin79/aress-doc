import React from 'react';
import { IconName, IconSize } from './Icon.types';
import { sizeValues } from './Icon.constants';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';
import { CostumIcon } from '../IconComponent/CostumIcon/CostumIcon';
export interface IconProps {
  name: IconName;
  size?: IconSize;
}

export const Icon: React.FC<IconProps> = ({ name, size = 'md' }) => {
  // is it a lucide icon or custom icon ?
  if (name in dynamicIconImports) {
    // we do this because we want to say to TS that we know this is a react component dont be stricter than us :)
    const LucideIcon = dynamic(
      dynamicIconImports[name as keyof typeof dynamicIconImports]
    ) as React.ComponentType<{
      size?: number;
      stroke?: string;
      strokeWidth?: number;
    }>;

    return <LucideIcon size={sizeValues[size]} />;
  } else {
    return <CostumIcon name={name} size={size} />;
  }
};
