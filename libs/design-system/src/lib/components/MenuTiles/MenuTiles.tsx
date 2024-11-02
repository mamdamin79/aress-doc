import React from 'react';
import { Icon } from '../Icon';
import { MenuTilesProps } from './MenuTiles.types';
import { cn } from '../../../utils/classNames.utils';

const MenuTilesWrapper = ({
  children,
  link,
  isDisabled,
  onClick,
  className,
}: {
  children: React.ReactNode;
  link?: string;
  isDisabled?: boolean;
  onClick?: () => void;
  className: string;
}) =>
  link ? (
    <a href={link} className={className}>
      {children}
    </a>
  ) : (
    <button className={className} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );

const IconWithBadge = ({
  icon,
  badgeColor,
}: {
  icon?: any;
  badgeColor?: string;
}) => (
  <div className="flex flex-col items-start gap-2 pt-[3px] h-fit relative">
    {icon && (
      <div className={cn(icon.color)}>
        <Icon {...icon} />
      </div>
    )}
    {icon && badgeColor && (
      <div
        className={`w-2 h-2 rounded-full mr-1 ${badgeColor} absolute bottom-0 -right-1`}
      />
    )}
  </div>
);

const TextContainer = ({
  text,
  subText,
  isActive,
  prefix = '',
}: {
  text: string;
  subText?: string;
  isActive: boolean;
  prefix?: string;
}) => (
  <div className="text-right">
    <p
      className={`font-semibold text-sm ${
        isActive ? 'text-brand-700' : 'text-gray-1000'
      }`}
    >
      {prefix}
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
);

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
  const wrapperClasses = `w-full min-w-[240px] max-w-[272px] flex items-center justify-between py-2 pr-3 pl-5 transition-all 
    bg-baseBackground hover:bg-brand-100 ${
      isActive ? 'text-brand-700' : 'text-gray-1000'
    }`;

  const dashboardClasses = `flex items-center justify-between gap-2 transition-all 
    bg-baseBackground min-w-52 w-[208px] h-10 rounded-md relative group
    ${
      isActive
        ? 'border-2 border-brand-600 cursor-default'
        : 'border-0 cursor-pointer'
    }`;

  return (
    <MenuTilesWrapper
      link={link}
      isDisabled={isDisabled}
      onClick={leadingAction}
      className={isDashboard ? dashboardClasses : wrapperClasses}
    >
      {!isDashboard ? (
        <div className="flex justify-start gap-2">
          <IconWithBadge icon={icon} badgeColor={badgeColor} />
          <TextContainer text={text} subText={subText} isActive={isActive} />
        </div>
      ) : (
        <>
          <div
            className={`absolute my-auto -right-[1.5px] top-0 bottom-0 transition-all ${
              isActive
                ? 'bg-brand-600 rounded-tl-[3px] rounded-bl-[3px] w-[4px] h-5'
                : 'bg-brand-400 rounded-lg w-[2px] h-4 group-hover:bg-brand-600 group-hover:h-5'
            }`}
          />
          <div className="flex justify-start pr-2">
            <TextContainer text={text} isActive={isActive} prefix={prefix} />
          </div>
        </>
      )}
    </MenuTilesWrapper>
  );
};
