import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import React from 'react';
import { Icon } from '../../Icon';
import { MenuTiles } from '../../MenuTiles';
import { cn } from '../../../../../src/utils/classNames.utils';
import { BurgerMenuItems, BurgerSubMenu } from './BurgerMenu.types';

interface MenuProps {
  menuItems: BurgerMenuItems[];
}

export const BurgerMenu: React.FC<MenuProps> = ({ menuItems }) => {
  const [activeSubMenu, setActiveSubMenu] =
    React.useState<null | BurgerSubMenu>(null);

  return (
    <div className="flex items-center gap-6 text-nowrap">
      <Popover className="group relative h-[40px]">
        <PopoverButton>
          <div className="flex h-8 w-8 items-center justify-center">
            <Icon name="align-justify" size="lg" />
          </div>
        </PopoverButton>
        <div
          onMouseLeave={() => setActiveSubMenu(null)}
          className="shadow-8xl shadow-offset-y-10 absolute z-10 flex flex-row overflow-hidden rounded-xl"
        >
          <div className="bg-baseBackground flex hidden h-fit w-fit max-w-[272px] flex-col gap-2 text-right group-hover:block">
            {menuItems?.map((dropdownItem, dropdownItemIndex) => (
              <div
                key={dropdownItemIndex}
                className={cn(
                  'flex flex-col',
                  dropdownItem.border
                    ? 'mb-2 border-b border-t border-gray-200'
                    : '',
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
                      onMouseEnter={() =>
                        subItemChildren.subMenu
                          ? setActiveSubMenu(subItemChildren.subMenu)
                          : setActiveSubMenu(null)
                      }
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
          {activeSubMenu && (
            <div className="invisible flex h-fit w-fit max-w-[272px] flex-col gap-2 rounded-xl py-4 text-right shadow-md group-hover:visible">
              {activeSubMenu?.map((dropdownItem, dropdownItemIndex) => (
                <div
                  key={dropdownItemIndex}
                  className={cn(
                    'flex flex-col',
                    dropdownItem.border
                      ? 'mb-2 border-b border-t border-gray-200'
                      : '',
                    dropdownItem.children[0]?.isDashboard ? 'gap-2' : '',
                  )}
                >
                  <div className="bg-baseBackground flex flex-row items-center gap-2 pr-4 text-sm font-normal text-gray-600">
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
          )}
        </div>
      </Popover>
    </div>
  );
};
