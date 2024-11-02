import React from 'react';
import { Icon } from '../Icon';
import { MenuTilesProps } from './MenuTiles.types';
import { cn } from '../../../utils/classNames.utils';

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
  link,
}) => {
  const wrapperSharedClasses = `w-full min-w-[240px] max-w-[272px] flex items-center justify-between py-2 pr-3 pl-5 transition-all 
    bg-baseBackground hover:bg-brand-100 ${
      isActive ? 'text-brand-700' : 'text-gray-1000'
    }`;
  const DashboardWrapperSharedClasses = `flex items-center justify-between gap-2 transition-all 
            bg-baseBackground min-w-52 w-full h-10 rounded-md relative group
            ${
              isActive
                ? 'border-2 border-brand-600 cursor-default'
                : 'border-0 cursor-pointer'
            }`;
  const MainWrapper = ({ children }: { children: React.ReactNode }) =>
    link ? (
      <a href={link} className={wrapperSharedClasses}>
        {children}
      </a>
    ) : (
      <button
        className={wrapperSharedClasses}
        onClick={leadingAction}
        disabled={isDisabled}
      >
        {children}
      </button>
    );
  const DashboardWrapper = ({ children }: { children: React.ReactNode }) =>
    link ? (
      <div className="w-52 flex justify-center items-center">
        <a href={link} className={DashboardWrapperSharedClasses}>
          {children}
        </a>
      </div>
    ) : (
      <div className="w-52 flex justify-center items-center">
        <button
          className={DashboardWrapperSharedClasses}
          onClick={leadingAction}
        >
          {children}
        </button>
      </div>
    );
  return !isDashboard ? (
    <MainWrapper>
      {/* Icon with conditional color on active and hover */}
      <div className="flex justify-start gap-2">
        <div
          className={`flex flex-col items-start gap-2 pt-[3px] h-fit relative`}
        >
          {icon && (
            <div className={cn(icon.color && icon.color)}>
              <Icon {...icon} />
            </div>
          )}
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
    </MainWrapper>
  ) : (
    <DashboardWrapper>
      <div
        className={`absolute  my-auto -right-[1.5px] top-0 bottom-0 transition-all ${
          isActive
            ? 'bg-brand-600 rounded-tl-[3px] rounded-bl-[3px] w-[4px] h-5'
            : 'bg-brand-400 rounded-lg w-[2px] h-4 group-hover:bg-brand-600 group-hover:h-5'
        }`}
      ></div>
      <div className="flex justify-start pr-2">
        {/* Text container */}
        <div className="text-right">
          <p className={`font-semibold text-sm text-gray-1000`}>
            {prefix}
            {text}
          </p>
        </div>
      </div>
    </DashboardWrapper>
  );
};
