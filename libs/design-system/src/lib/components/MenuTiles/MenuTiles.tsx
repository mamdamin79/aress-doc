import React from 'react';
import { Icon } from '../Icon';
import { MenuTilesProps } from './MenuTiles.types';
import { cn } from '../../../utils/classNames.utils';
import Link from 'next/link';

// We define a wrapper around each item in the menu to have
// the correct semantic. for example for links and user dashboards wrap
// all elements inside an a tag. and for a element that modified dashboard
// and has a leading action instead of a link we wrap it inside a button
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
}) => {
  const handleClick = () => {
    if (!isDisabled && onClick) onClick();
  };
  return link ? (
    <Link href={link} className={className}>
      {children}
    </Link>
  ) : (
    <button className={className} onClick={handleClick} disabled={isDisabled}>
      {children}
    </button>
  );
};

// In this part we handle icon and logos, also some logos in the menu
// have a colorful badge that we define it using the badgeColor prop
// All logos and Icons should be implemented inside Our custom icon component
const IconWithBadge = ({
  icon,
  badgeColor,
  isDisabled = false,
}: {
  icon?: any;
  badgeColor?: string;
  isDisabled: boolean;
}) => (
  <div
    className={cn(
      'flex flex-col items-start gap-2 pt-[3px] h-fit relative',
      isDisabled ? 'text-gray-400' : 'text-gray-1000',
    )}
  >
    {icon && (
      <div className={cn(icon.color)}>
        <Icon {...icon} />
      </div>
    )}
    {icon && badgeColor && (
      <div
        className={cn(
          'w-2 h-2 rounded-full mr-1 absolute bottom-0 -right-1',
          badgeColor,
        )}
      />
    )}
  </div>
);

// Based on the design text elements in the menu tiles contain
// title only or title with subTexts that are under out main title(optional)
// Also there is a prefix which can be used to add to each tile title
// eg: counter of the number of dashboards
// note: we only render the prefix if the type of tile is dashboard
const TextContainer = ({
  text,
  subText,
  isActive,
  prefix = '',
  isDashboard = false,
  isDisabled = false,
}: {
  text: string;
  subText?: string;
  isActive: boolean;
  prefix?: string;
  isDashboard: boolean;
  isDisabled?: boolean;
}) => (
  <div className="text-right">
    <p
      className={cn(
        'text-sm font-semibold',
        isActive && !isDashboard ? 'text-brand-700' : 'text-gray-1000',
        !isActive && (isDisabled ? 'text-gray-400' : 'text-gray-1000'),
      )}
    >
      {prefix}
      {text}
    </p>
    {subText && (
      <p
        className={cn(
          'font-semibold text-xs',
          isActive && !isDashboard ? 'text-brand-600' : 'text-gray-600',
        )}
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
  const wrapperClasses = `w-full min-w-[240px] max-w-[272px] flex items-center justify-between py-2 pr-3 transition-all 
    bg-baseBackground ${!isDisabled && 'hover:bg-brand-100'} ${
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
      {/* Elements of dashboard are limited and we conditionally render two type of components based
      on the value of the isDashboard prop */}
      {!isDashboard ? (
        <div className="flex justify-start gap-2 relative w-full pl-5">
          <IconWithBadge
            icon={icon}
            badgeColor={badgeColor}
            isDisabled={isDisabled}
          />
          <TextContainer
            text={text}
            subText={subText}
            isActive={isActive}
            isDashboard={false}
            isDisabled={isDisabled}
          />
          {expandable && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 ">
              <Icon name="chevron-left" size="md" />
            </div>
          )}
        </div>
      ) : (
        <>
          <div
            className={`absolute -right-[1.5px] bottom-0 top-0 my-auto transition-all ${
              isActive
                ? 'bg-brand-600 h-5 w-[4px] rounded-bl-[3px] rounded-tl-[3px]'
                : 'bg-brand-400 group-hover:bg-brand-600 h-4 w-[2px] rounded-lg group-hover:h-5'
            }`}
          />

          <div className="flex justify-start pr-2">
            <TextContainer
              text={text}
              isActive={isActive}
              prefix={prefix}
              isDashboard={true}
            />
          </div>
        </>
      )}
    </MenuTilesWrapper>
  );
};
