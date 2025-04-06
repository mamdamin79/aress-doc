import React, { useMemo } from 'react';
import { IconName, IconSize } from './Icon.types';
import { SIZE_VALUES } from './Icon.constants';
import { Icon as Iconify } from '@iconify/react';
import { CustomIcon } from './CustomIcon';

export interface IconProps {
  name: IconName;
  size?: IconSize;
}

// Memoize the Icon component to avoid unnecessary re-renders
const IconComponent: React.FC<IconProps> = ({ name, size = 'md' }) => {
  const isCustomIcon = useMemo(() => name.includes('Custom'), [name]);
  const iconProps = useMemo(() => ({ name, size }), [name, size]);

  return isCustomIcon ? (
    <CustomIcon {...iconProps} />
  ) : (
    <Iconify
      icon={`lucide:${name}`}
      width={SIZE_VALUES[size]}
      height={SIZE_VALUES[size]}
    />
  );
};

export const Icon = React.memo(IconComponent);
