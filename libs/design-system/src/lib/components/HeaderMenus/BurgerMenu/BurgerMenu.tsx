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
      <Popover className="relative group h-[40px]">
        <PopoverButton>
          <div className="w-8 h-8 flex justify-center items-center">
            <Icon name="align-justify" size="lg" />
          </div>
        </PopoverButton>
        <div
          onMouseLeave={() => setActiveSubMenu(null)}
          className="flex flex-row absolute  shadow-8xl bg-baseBackground rounded-xl z-10 shadow-offset-y-10 overflow-hidden"
        >
          <div className="hidden group-hover:block text-right w-fit max-w-[272px] h-fit gap-2 flex flex-col">
            {menuItems?.map((dropdownItem, dropdownItemIndex) => (
              <div
                key={dropdownItemIndex}
                className={cn(
                  'flex flex-col',
                  dropdownItem.children[0]?.isDashboard ? 'gap-2' : '',
                )}
              >
                <div className="text-gray-600 text-sm pr-4 font-normal flex flex-row gap-2 items-center">
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
                      className="flex relative justify-center"
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
            <div className="hidden group-hover:block text-right w-fit max-w-[272px] h-fit py-4 gap-2 flex flex-col bg-baseBackground rounded-xl shadow-md">
              {activeSubMenu?.map((dropdownItem, dropdownItemIndex) => (
                <div
                  key={dropdownItemIndex}
                  className={cn(
                    'flex flex-col',
                    dropdownItem.children[0]?.isDashboard ? 'gap-2' : '',
                  )}
                >
                  <div className="text-gray-600 text-sm pr-4 font-normal flex flex-row gap-2 items-center">
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
                        className="flex relative justify-center"
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
