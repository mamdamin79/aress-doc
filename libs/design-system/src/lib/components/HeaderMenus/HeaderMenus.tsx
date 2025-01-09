import { Popover, PopoverButton } from '@headlessui/react';
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
    <div className="flex items-center gap-5 text-nowrap">
      {menuItems.map((item, index) => (
        <Popover key={index} className="group relative h-[40px]">
          <PopoverButton
            className={cn(
              'text-shadow-sm flex items-center gap-2 py-1 font-normal outline-none transition-colors',
              item.dropdown
                ? 'group-hover:text-brand-600'
                : activeTab === index
                  ? 'group-hover:text-gray-1000'
                  : 'group-hover:text-gray-700',
              activeTab === index
                ? 'text-gray-1000 font-medium'
                : 'text-gray-600',
            )}
          >
            <div className="relative">
              {item.dropdown && (
                <span className="absolute block h-0 overflow-hidden font-medium transition-all">
                  {item.text}
                </span>
              )}
              {item.link ? (
                <Link href={item.link}>{item.text}</Link>
              ) : (
                <span>{item.text}</span>
              )}
              <div
                className={`bg-brand-600 absolute bottom-0 left-0 right-0 mx-auto -mb-2 h-[6px] w-6 rounded-full ${
                  activeTab === index ? 'group-hover:block' : 'hidden'
                }`}
              />
            </div>
            {item.dropdown && (
              <div className="transform transition-transform duration-200 group-hover:rotate-180">
                <Icon name="chevron-down" size="lg" />
              </div>
            )}
          </PopoverButton>

          {/* Dropdown panel */}
          {item.dropdown && (
            <div className="bg-baseBackground shadow-offset-y-10 shadow-8xl absolute z-10 flex flex-row rounded-xl border-2 border-gray-300">
              <div className="flex hidden h-fit w-fit max-w-[272px] flex-col gap-2 py-4 text-right group-hover:block">
                {item.dropdown?.map((dropdownItem, dropdownItemIndex) => (
                  <div
                    key={dropdownItemIndex}
                    className={cn(
                      'flex flex-col',
                      dropdownItem.children[0]?.isDashboard ? 'gap-2' : '',
                    )}
                  >
                    <div className="flex flex-row items-center gap-2 pr-4 text-sm font-normal text-gray-600">
                      {dropdownItem.groupLabel}
                      {dropdownItem.counter && (
                        <>
                          <span> ({dropdownItem.children.length}/8) </span>
                          <Icon name="info" size="md" />
                        </>
                      )}
                    </div>
                    {dropdownItem.children.map(
                      (subItemChildren, subItemChildrenIndex) => (
                        <div
                          key={subItemChildrenIndex}
                          className="relative flex justify-center"
                        >
                          <MenuTiles
                            {...subItemChildren}
                            prefix={`${subItemChildrenIndex + 1}. `}
                          />
                        </div>
                      ),
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Popover>
      ))}
    </div>
  );
};
