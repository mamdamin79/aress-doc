'use client'
import React, { useEffect, useState } from 'react';
import { IconName, IconSize } from './Icon.types';
import { SIZE_VALUES } from './Icon.constants';
import { Icon as Iconify } from '@iconify/react';
import { iconExists } from '@iconify/react';
import { listIcons } from '@iconify/react';
import { CustomIcon } from './CustomIcon/CustomIcon';
export interface IconProps {
  name: IconName;
  size?: IconSize;
}


export const Icon: React.FC<IconProps> = ({ name, size = 'md' }) => {
  const [isLucidIcon, setIsLucidIcon] = useState<boolean | null>(null);
  const modifiedName = `lucide:${name}`;

  useEffect(() => {
    setIsLucidIcon(iconExists(modifiedName));
  }, [modifiedName]);
  if (isLucidIcon === null) {
    // While determining icon existence, render a placeholder
    return <span style={{ width: SIZE_VALUES[size], height: SIZE_VALUES[size] }} />;
  }
  // is it a lucide icon or custom icon ?
  if (isLucidIcon) {
    return (
      <Iconify
        icon={modifiedName}
        width={SIZE_VALUES[size]}
        height={SIZE_VALUES[size]}
      />
    );
  } else {
    return <p>hi</p>;
    ;
  }
};
