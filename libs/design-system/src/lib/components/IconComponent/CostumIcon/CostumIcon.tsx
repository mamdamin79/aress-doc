import React from 'react';
import { IconProps } from '../Icon';
import { sizeValues, strokeValues } from '../Icon.constants';
import { customIcons, hoverClasses } from './CostumIcon.contants';

export const CostumIcon: React.FC<IconProps> = ({ name, size = 'md' }) => {
  const CustomIconComponent = customIcons[name as keyof typeof customIcons];
  return (
    <CustomIconComponent
      width={sizeValues[size]}
      height={sizeValues[size]}
      strokeWidth={strokeValues[size]}
      className={`stroke-current transition-all duration-150  ease-in-out ${hoverClasses[name]} cursor-pointer`}
    />
  );
};
