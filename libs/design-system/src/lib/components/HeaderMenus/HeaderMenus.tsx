import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import React, { useState } from 'react';
import { Icon } from '../Icon';
import { MenuTiles } from '../MenuTiles';
import { MenuItem } from './HeaderMenus.types';
import { cn } from '../../../../src/utils/classNames.utils';

interface MenuProps {
  menuItems: MenuItem[];
}

const TabButton = ({
  name,
  link,
  isActive,
  hasSubMenu,
  onClick,
}: {
  name: string;
  link?: string;
  isActive: boolean;
  hasSubMenu: boolean;
  onClick: () => void;
}) => (
  <PopoverButton
    className={cn(
      'flex items-center gap-2 py-1 outline-none transition-colors',
      hasSubMenu
        ? 'hover:text-brand-600'
        : isActive
        ? 'hover:text-gray-1000'
        : 'hover:text-gray-700',
      isActive ? 'text-gray-1000 font-bold' : 'text-gray-600'
    )}
    onClick={onClick}
  >
    <div className="relative">
      {link ? <a href={link}>{name}</a> : <span>{name}</span>}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 mx-auto w-6 h-[6px] bg-brand-600 rounded-full -mb-2" />
      )}
    </div>
    {hasSubMenu && (
      <div className="transition-transform duration-200 group-hover:rotate-180">
        <Icon name="chevron-down" size="lg" />
      </div>
    )}
  </PopoverButton>
);

const SubMenuPanel = ({ subMenu }: { subMenu: MenuItem['subMenu'] }) => (
  <PopoverPanel
    anchor="bottom start"
    className="text-right shadow-md bg-baseBackground w-fit max-w-[272px] h-fit rounded-xl border-2 border-gray-300 z-10 py-4 gap-2 flex flex-col mt-2 shadow-offset-y-10"
  >
    {subMenu?.map((subMenuItem, subMenuItemIndex) => (
      <div
        key={subMenuItemIndex}
        className={cn(
          'flex flex-col',
          subMenuItem.border ? 'border-t-2 border-b-2 border-gray-200' : '',
          subMenuItem.children[0]?.isDashboard ? 'gap-2' : ''
        )}
      >
        <div className="text-gray-600 text-sm pr-4 font-normal flex flex-row gap-2 items-center">
          {subMenuItem.groupLabel}
          {subMenuItem.counter && (
            <>
              <span> ({subMenuItem.children.length}/8) </span>
              <Icon name="info" size="md" />
            </>
          )}
        </div>
        {subMenuItem.children.map((subItemChildren, subItemChildrenIndex) => (
          <div
            key={subItemChildrenIndex}
            className="flex relative justify-center"
          >
            <MenuTiles
              {...subItemChildren}
              prefix={`${subItemChildrenIndex + 1}. `}
            />
          </div>
        ))}
      </div>
    ))}
  </PopoverPanel>
);

export const HeaderMenus: React.FC<MenuProps> = ({ menuItems }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => setActiveTab(index);

  return (
    <div className="flex items-center gap-6 text-nowrap">
      {menuItems.map((item, index) => (
        <Popover key={index} className="relative group">
          <TabButton
            name={item.name}
            link={item.link}
            isActive={activeTab === index}
            hasSubMenu={!!item.subMenu}
            onClick={() => handleTabClick(index)}
          />
          {item.subMenu && <SubMenuPanel subMenu={item.subMenu} />}
        </Popover>
      ))}
    </div>
  );
};
