'use client';
import { Popover, PopoverButton } from '@headlessui/react';
import React, { useState } from 'react';
import { useClickAway } from '@uidotdev/usehooks';
import { HamburgerMenuIcon } from './HamburgerMenuIcon';
import { dropdownType, MenuItem } from '../DesktopMenu/DesktopMenu.types';
import { MultiLevelDropdown } from '../DesktopMenu/MultiLevelDropDown';

interface MenuProps {
  menuItems: MenuItem[];
}

export const BurgerMenu: React.FC<MenuProps> = ({ menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = React.useState<null | dropdownType>(
    null,
  );
  const ref = useClickAway<HTMLDivElement>(() => {
    closeAll();
  });
  const closeAll = () => {
    setIsMenuOpen(false);
    setActiveSubMenu(null);
  };
  return (
    <div className="flex items-center text-nowrap bg-white">
      <Popover className="group relative h-10" ref={ref}>
        <PopoverButton
          as="div"
          className="outline-none"
          onClick={() => (isMenuOpen ? closeAll() : setIsMenuOpen(true))}
        >
          <HamburgerMenuIcon open={isMenuOpen} />
        </PopoverButton>
        <MultiLevelDropdown
          activeMenu={isMenuOpen}
          activeSubMenu={activeSubMenu}
          menuItems={menuItems}
          setActiveSubMenu={setActiveSubMenu}
        />
      </Popover>
    </div>
  );
};
