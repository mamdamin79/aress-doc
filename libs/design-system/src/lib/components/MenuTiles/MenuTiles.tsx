'use client';
import React, { useState } from 'react';
import { Icon } from '../Icon';
import { MenuTilesProps } from './MenuTiles.types';
import { cn } from '../../../utils/classNames.utils';
import Link from 'next/link';
import {
  ChangeDashboardNameModal,
  CopyDashboardModal,
  DeleteDashboardModal,
  NewDashboardModal,
} from './MenuModals';

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
}: {
  icon?: any;
  badgeColor?: string;
  isDisabled: boolean;
}) => (
  <div
    className={cn(
      'relative flex h-fit flex-col items-start gap-2 pt-[3px]',
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
          'text-xs font-medium',
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
  action,
  isDisabled = false,
  prefix = '',
  link,
  meta,
  onClick,
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

  const [modalName, setModalName] = useState<null | string>(null);

  const handleOnClick = () => {
    if (action === 'openModal' && meta?.modalName) {
      setModalName(meta?.modalName);
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
      <ChangeDashboardNameModal
        isOpen={modalName == 'changeDashboardName'}
        onClose={() => setModalName(null)}
      />
      <CopyDashboardModal
        isOpen={modalName == 'copyDashboard'}
        onClose={() => setModalName(null)}
      />
      <NewDashboardModal
        isOpen={modalName == 'newDashboard'}
        onClose={() => setModalName(null)}
      />
      <DeleteDashboardModal
        isOpen={modalName == 'deleteDashboard'}
        onClose={() => setModalName(null)}
      />
    </MenuTilesWrapper>
  );
};
