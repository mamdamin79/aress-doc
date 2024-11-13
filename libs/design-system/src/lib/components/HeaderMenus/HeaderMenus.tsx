import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import React from 'react';
import { Icon } from '../Icon';
import { MenuTiles } from '../MenuTiles';
import { MenuItem } from './HeaderMenus.types';
import { cn } from '../../../../src/utils/classNames.utils';
import Link from 'next/link';

interface MenuProps {
  menuItems: MenuItem[];
}

export const HeaderMenus: React.FC<MenuProps> = ({ menuItems }) => {
  const activeTab = 0;
  return (
    <div className="flex items-center gap-6 text-nowrap">
      {menuItems.map((item, index) => (
        <Popover key={index} className="relative group h-[40px]">
          <PopoverButton
            className={cn(
              'flex items-center gap-2 py-1 outline-none transition-colors text-shadow-sm font-normal',
              item.subMenu
                ? 'group-hover:text-brand-600'
                : activeTab === index
                ? 'group-hover:text-gray-1000'
                : 'group-hover:text-gray-700',
              activeTab === index
                ? 'text-gray-1000 font-medium'
                : 'text-gray-600'
            )}
          >
            <div className="relative">
              {item.subMenu && (
                <span className="absolute block font-medium h-0 overflow-hidden transition-all">
                  {item.name}
                </span>
              )}
              {item.link ? (
                <Link href={item.link}>{item.name}</Link>
              ) : (
                <span>{item.name}</span>
              )}
              <div
                className={`absolute bottom-0 left-0 right-0 mx-auto w-6 h-[6px] bg-brand-600 rounded-full -mb-2 ${
                  activeTab === index ? 'group-hover:block' : 'hidden'
                }`}
              />
            </div>
            {item.subMenu && (
              <div className="transition-transform duration-200 transform group-hover:rotate-180">
                <Icon name="chevron-down" size="lg" />
              </div>
            )}
          </PopoverButton>

          {/* Dropdown panel */}
          {item.subMenu && (
            <div className="absolute hidden group-hover:block text-right shadow-md bg-baseBackground w-fit max-w-[272px] h-fit rounded-xl border-2 border-gray-300 z-10 py-4 gap-2 flex flex-col mt-2 shadow-offset-y-10">
              {item.subMenu?.map((subMenuItem, subMenuItemIndex) => (
                <div
                  key={subMenuItemIndex}
                  className={cn(
                    'flex flex-col',
                    subMenuItem.border
                      ? 'border-t-2 border-b-2 border-gray-200 mb-2'
                      : '',
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
                  {subMenuItem.children.map(
                    (subItemChildren, subItemChildrenIndex) => (
                      <div
                        key={subItemChildrenIndex}
                        className="flex relative justify-center"
                      >
                        <MenuTiles
                          {...subItemChildren}
                          prefix={`${subItemChildrenIndex + 1}. `}
                        />
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          )}
        </Popover>
      ))}
    </div>
  );
};
