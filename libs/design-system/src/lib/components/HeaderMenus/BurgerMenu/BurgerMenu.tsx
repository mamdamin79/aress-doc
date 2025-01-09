import { Popover, PopoverButton } from '@headlessui/react';
import React, { useState } from 'react';
import { Icon } from '../../Icon';
import { MenuTiles } from '../../MenuTiles';
import { cn } from '../../../../../src/utils/classNames.utils';
import { useClickAway } from '@uidotdev/usehooks';
import { HamburgerMenuIcon } from './HamburgerMenuIcon';
import { dropdownType, MenuItem } from '../HeaderMenus.types';
import { MultiLevelDropdown } from '../MultiLevelDropDown';

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
        <MultiLevelDropdown
          activeMenu={activeMenu}
          activeSubMenu={activeSubMenu}
          menuItems={menuItems}
          setActiveSubMenu={setActiveSubMenu}
        />
      </Popover>
    </div>
  );
};
