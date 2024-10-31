import React from 'react';
import { Icon } from '../Icon';
import { MenuTilesProps } from './MenuTiles.types';

export const MenuTiles: React.FC<MenuTilesProps> = ({
  text,
  subText,
  icon,
  badgeColor,
  expandable = false,
  isDashboard = false,
  isActive = false,
  leadingAction,
  isDisabled = false,
  prefix = '',
}) => {
  const handleClick = () => {
    leadingAction();
  };

  return !isDashboard ? (
    <button
      className={`flex items-center justify-between w-60 py-2 px-3 transition-colors 
        bg-baseBackground hover:bg-brand-100
        ${isActive ? 'text-brand-700' : 'text-gray-1000'} ${
        isDisabled && 'opacity-30 cursor-not-allowed'
      }`}
      onClick={handleClick}
    >
      {/* Icon with conditional color on active and hover */}
      <div className="flex justify-start gap-2">
        <div className="flex flex-col items-start gap-2 pt-[3px] h-fit relative">
          {icon && <Icon {...icon} />}
          {/* Badge */}
          {icon && badgeColor && (
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
  ) : (
    <button
      className={`flex items-center justify-between w-fit p-2 gap-2 transition-all 
    bg-baseBackground min-w-52 h-10 rounded-md relative group mr-4
    ${
      isActive
        ? 'border-2 border-brand-600 cursor-default'
        : 'border-0 cursor-pointer'
    }`}
      onClick={handleClick}
    >
      <div
        className={`absolute  my-auto -right-[1.5px] top-0 bottom-0 transition-all ${
          isActive
            ? 'bg-brand-600 rounded-tl-[3px] rounded-bl-[3px] w-[4px] h-5'
            : 'bg-brand-400 rounded-lg w-[2px] h-4 group-hover:bg-brand-600 group-hover:h-5'
        }`}
      ></div>
      {/* Icon with conditional color on active and hover */}
      <div className="flex justify-start gap-2">
        {/* Text container */}
        <div className="text-right">
          <p className={`font-semibold text-sm text-gray-1000`}>
            {prefix}
            {text}
          </p>
        </div>
      </div>
    </button>
  );
};
