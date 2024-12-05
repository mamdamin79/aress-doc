import React from 'react';
import { IconName, IconSize } from './Icon.types';
import { SIZE_VALUES } from './Icon.constants';
import { Icon as Iconify } from '@iconify/react';
import { CustomIcon } from './CustomIcon';

export interface IconProps {
  name: IconName;
  size?: IconSize;
}

export const Icon: React.FC<IconProps> = ({ name, size = 'md' }) => {
  const isCustomIcon = name.includes('Custom');

  return isCustomIcon ? (
    <CustomIcon name={name} size={size} />
  ) : (
    <Iconify
      icon={`lucide:${name}`}
      width={SIZE_VALUES[size]}
      height={SIZE_VALUES[size]}
    />
  );
};
