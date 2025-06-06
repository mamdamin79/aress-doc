'use client';
import React from 'react';
import { Icon } from '../Icon';
import { MenuTilesProps } from './MenuTiles.types';
import { cn } from '../../../utils/classNames.utils';
import Link from 'next/link';
import { useMenuModal } from './MenuModalsProvider';

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

const IconWithBadge = ({
  icon,
  badgeColor,
  isDisabled = false,
  active = false,
}: {
  icon?: any;
  badgeColor?: string;
  isDisabled: boolean;
  active: boolean;
}) => (
  <div
    className={cn(
      'relative flex h-fit flex-col items-start gap-2 pt-[3px]',
      isDisabled ? 'text-text-neutral-disable' : 'text-text-neutral-primary',
    )}
  >
    {icon && (
      <div
        className={cn(
          active && 'text-text-onbrand-colored-primary-on200_100_50',
          icon.color,
        )}
      >
        <Icon {...icon} />
      </div>
    )}
    {icon && badgeColor && (
      <div
        className={cn(
          'absolute -right-1 bottom-0 mr-1 h-2 w-2 rounded-full',
          badgeColor,
        )}
      />
    )}
  </div>
);

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
        'text-sm font-medium',
        isActive && !isDashboard
          ? 'text-text-onbrand-colored-primary-on200_100_50'
          : 'text-text-neutral-primary',
        !isActive &&
          (isDisabled
            ? 'text-text-neutral-disable'
            : 'text-text-neutral-primary'),
      )}
    >
      {prefix}
      {text}
    </p>
    {subText && (
      <p
        className={cn(
          'text-xs font-medium',
          isActive && !isDashboard
            ? 'text-text-onbrand-colored-secondary-on100_50'
            : 'text-text-neutral-secondary',
          isDisabled && 'text-text-neutral-disable',
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
  action,
  isDisabled = false,
  prefix = '',
  link,
  meta,
  onClick,
}) => {
  const wrapperClasses = `w-full min-w-[240px] max-w-[272px] flex items-center justify-between py-2 pr-3 transition-all 
    bg-surface-neutral-primary ${!isDisabled && 'hover:bg-surface-brand-100'}`;

  const dashboardClasses = `flex items-center justify-between gap-2 transition-all 
     bg-surface-neutral-primary min-w-52 w-[208px] h-10 rounded-md relative group
    ${
      isActive
        ? 'border-2 border-border-brand-primary-600 cursor-default'
        : 'border-0 cursor-pointer'
    }`;

  const { openModal } = useMenuModal();
  const handleOnClick = () => {
    if (action === 'openModal' && meta?.modalName) {
      openModal(meta?.modalName as any);
    }
  };

  return (
    <MenuTilesWrapper
      link={link}
      isDisabled={isDisabled}
      onClick={handleOnClick}
      className={isDashboard ? dashboardClasses : wrapperClasses}
    >
      {!isDashboard ? (
        <div className="relative flex w-full justify-start gap-2 pl-5">
          <IconWithBadge
            active={isActive}
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
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Icon name="chevron-left" size="md" />
            </div>
          )}
        </div>
      ) : (
        <div className="group/text">
          <div
            className={`absolute -right-[1.5px] bottom-0 top-0 my-auto transition-all ${
              isActive
                ? 'bg-surface-brand-600-primary h-5 w-1 rounded-bl-[3px] rounded-tl-[3px]'
                : 'bg-surface-brand-400 group-hover/text:bg-surface-brand-600-primary h-4 w-0.5 rounded-lg group-hover/text:h-5'
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
        </div>
      )}
    </MenuTilesWrapper>
  );
};
