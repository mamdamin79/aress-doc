'use client';
import { Popover, PopoverButton } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import { MenuTiles } from '../MenuTiles';
import { dropdownType, MenuItem } from './HeaderMenus.types';
import { cn } from '../../../../src/utils/classNames.utils';
import Link from 'next/link';
import { MultiLevelDropdown } from './MultiLevelDropDown';
import { useClickAway, useWindowSize } from '@uidotdev/usehooks';
import { BurgerMenu } from './BurgerMenu';

interface MenuProps {
  menuItems: MenuItem[];
}

export const HeaderMenus: React.FC<MenuProps> = ({ menuItems }) => {
  const [activeSubMenu, setActiveSubMenu] = useState<null | dropdownType>(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [menus, setMenus] = useState<{
    main: MenuItem[];
    more: MenuItem[];
  }>({ main: menuItems, more: [] });
  const [activeTab, setActiveTab] = useState(0);

  const ref = useClickAway<HTMLDivElement>(() => {
    setActiveSubMenu(null);
    setShowMoreMenu(false);
  });

  const { width } = useWindowSize();

  useEffect(() => {
    if (!width) return;

    const itemsToRemove = width <= 1440 ? Math.floor((1440 - width) / 90) : 0;
    if (itemsToRemove === 0) {
      setMenus({ main: menuItems, more: [] });
    } else {
      const removedItems = menuItems.slice(-itemsToRemove);
      setMenus({
        main: menuItems.slice(0, -itemsToRemove),
        more: removedItems,
      });
    }
  }, [width, menuItems]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const renderDropdownMenu = (item: MenuItem, index: number) => (
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
  );

  const renderMenuItem = (item: MenuItem, index: number) => (
    <Popover key={item.text} className="group relative h-[40px]">
      <PopoverButton
        className={cn(
          'text-shadow-sm flex items-center gap-2 py-1 font-normal outline-none transition-colors',
          item.dropdown
            ? 'group-hover:text-brand-600'
            : activeTab === index
              ? 'group-hover:text-gray-1000'
              : 'group-hover:text-gray-700',
          activeTab === index ? 'text-gray-1000 font-medium' : 'text-gray-600',
        )}
        onClick={() => handleTabClick(index)}
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

      {item.dropdown && renderDropdownMenu(item, index)}
    </Popover>
  );

  return (
    <>
      {width && width >= 1024 ? (
        <div className="flex items-center gap-5 text-nowrap">
          {menus.main.map((item, index) => renderMenuItem(item, index))}
          {menus.more.length > 0 && (
            <div className="relative flex flex-col" ref={ref}>
              <div
                className={cn(
                  'mb-2 h-8 select-none rounded-full p-1 text-lg font-extrabold transition-colors',
                  showMoreMenu ? 'text-gray-1000 bg-gray-100' : 'text-gray-600',
                )}
                onClick={() => setShowMoreMenu(!showMoreMenu)}
              >
                <div className="flex h-6 w-6 items-center justify-center pb-1">
                  ...
                </div>
              </div>
              <div className={cn(showMoreMenu ? 'block' : 'hidden')}>
                <MultiLevelDropdown
                  fixedropDown={true}
                  activeMenu={true}
                  setActiveSubMenu={setActiveSubMenu}
                  activeSubMenu={activeSubMenu}
                  menuItems={menus.more}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <BurgerMenu menuItems={menuItems} />
      )}
    </>
  );
};
