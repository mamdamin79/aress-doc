import { Popover, PopoverButton } from '@headlessui/react';
import React, { useState } from 'react';
import { Icon } from '../../Icon';
import { MenuTiles } from '../../MenuTiles';
import { cn } from '../../../../../src/utils/classNames.utils';
import { useClickAway } from '@uidotdev/usehooks';
import { HamburgerMenuIcon } from '../../HamburgerMenuIcon';
import { dropdownType, MenuItem } from '../HeaderMenus.types';

interface MenuProps {
  menuItems: MenuItem[];
}

export const BurgerMenu: React.FC<MenuProps> = ({ menuItems }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = React.useState<null | dropdownType>(
    null,
  );
  const ref = useClickAway(() => {
    closeAll();
  });
  const closeAll = () => {
    setActiveMenu(false);
    setActiveSubMenu(null);
  };
  return (
    <div className="flex items-center text-nowrap">
      <Popover className="group relative h-[40px]" ref={ref}>
        <PopoverButton
          as="div"
          className="outline-none"
          onClick={() => (activeMenu ? closeAll() : setActiveMenu(true))}
        >
          <HamburgerMenuIcon open={activeMenu} />
        </PopoverButton>
        <div
          className={cn(
            'shadow-8xl shadow-offset-y-10 absolute z-10 flex flex-row overflow-hidden rounded-xl border border-gray-300',
            activeMenu ? '' : 'hidden',
          )}
        >
          <div
            className={
              'bg-baseBackground flex h-fit w-fit max-w-[272px] flex-col gap-2 py-2 text-right'
            }
          >
            {menuItems?.map((firstLayer, firstLayerIndex) => (
              <div key={firstLayerIndex} className={cn('flex flex-col')}>
                <div
                  className="relative flex justify-center"
                  onClick={() =>
                    firstLayer.dropdown
                      ? setActiveSubMenu(firstLayer.dropdown)
                      : setActiveSubMenu(null)
                  }
                >
                  <MenuTiles
                    {...firstLayer}
                    prefix={`${firstLayerIndex + 1}. `}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            className={cn(
              'flex h-fit w-fit max-w-[272px] flex-col gap-2 rounded-l-xl border-r border-gray-300 py-2 text-right',
              activeSubMenu ? 'visible' : 'visible',
              activeSubMenu && activeSubMenu[0].groupLabel && 'py-4',
            )}
          >
            {activeSubMenu?.map((dropdownItem, dropdownItemIndex) => (
              <div
                key={dropdownItemIndex}
                className={cn(
                  'flex flex-col',
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
                {dropdownItem?.children.map(
                  (subItemChildren, subItemChildrenIndex) => (
                    <div
                      key={subItemChildrenIndex}
                      className="relative flex justify-center"
                    >
                      <MenuTiles {...subItemChildren} />
                    </div>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </Popover>
    </div>
  );
};
