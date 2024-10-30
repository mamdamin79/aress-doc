import React, { useState } from 'react';
import { Icon } from '../Icon';
import { MenuTilesProps } from './MenuTiles.types';

export const MenuTiles: React.FC<MenuTilesProps> = ({
  text,
  subText,
  icon,
  badgeColor,
  expandable = false,
}) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <button
      className={`flex items-center justify-between w-60 py-2 px-3 transition-colors 
        bg-baseBackground hover:bg-brand-100
        ${isActive ? 'text-brand-700' : 'text-gray-1000'}`}
      onClick={() => handleClick}
    >
      {/* Icon with conditional color on active and hover */}
      <div className="flex justify-start gap-2">
        <div className="flex flex-col items-start gap-2 pt-[3px] h-fit relative">
          <Icon {...icon} />

          {/* Badge */}
          {badgeColor && (
            <div
              className={`w-2 h-2 rounded-full mr-1 ${badgeColor} absolute bottom-0 -right-1`}
            />
          )}
        </div>

        {/* Text container */}
        <div className="text-right">
          <p
            className={`font-semibold text-sm ${
              isActive ? 'text-brand-700' : 'text-gray-1000'
            }`}
          >
            {text}
          </p>
          {subText && (
            <p
              className={`font-semibold text-xs ${
                isActive ? 'text-brand-700' : 'text-gray-600'
              }`}
            >
              {subText}
            </p>
          )}
        </div>
      </div>
    </button>
  );
};
