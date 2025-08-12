import React from 'react';
import { dropdownType, MenuItem } from './DesktopMenu.types';
import { cn } from 'design-system';
import { Icon, MenuTiles } from 'design-system';

export interface MultiLevelDropdownProps {
  menuItems: MenuItem[];
  activeMenu: boolean;
  activeSubMenu: dropdownType | null;
  setActiveSubMenu: (dropdown: dropdownType | null) => void;
  fixedDropdown?: boolean;
}

export const MultiLevelDropdown: React.FC<MultiLevelDropdownProps> = ({
  menuItems,
  activeMenu,
  activeSubMenu,
  setActiveSubMenu,
  fixedDropdown,
}) => {
  const handleMouseEnter = (dropdown: dropdownType | undefined) => {
    setActiveSubMenu(dropdown || null);
  };

  return (
    <div
      className={cn(
        'shadow-8xl shadow-offset-y-10 border-border-neutral-primary bg-surface-neutral-primary absolute z-10 flex flex-row overflow-hidden rounded-xl border',
        { hidden: !activeMenu, '-right-52': fixedDropdown },
      )}
    >
      <div className="bg-surface-neutral-primary border-border-neutral-primary flex h-full w-fit max-w-[272px] flex-col gap-2 border-r py-2 text-right">
        {menuItems.map((firstLayer, index) => (
          <div key={index} className="flex flex-col">
            <div
              className="relative flex justify-center"
              onMouseEnter={() => handleMouseEnter(firstLayer.dropdown)}
            >
              <MenuTiles
                {...firstLayer}
                prefix={`${index + 1}. `}
                expandable={Boolean(firstLayer.dropdown)}
              />
            </div>
          </div>
        ))}
      </div>

      {activeSubMenu && (
        <div
          className={cn(
            'border-border-neutral-primary flex w-fit max-w-[272px] flex-col gap-2 rounded-l-xl border-r py-2 text-right',
            activeSubMenu ? 'visible' : 'invisible',
            activeSubMenu[0]?.groupLabel && 'py-4',
          )}
        >
          {activeSubMenu.map((dropdownItem, dropdownItemIndex) => (
            <div key={dropdownItemIndex} className="flex flex-col">
              <div className="bg-baseBackground text-text-neutral-secondary flex flex-row items-center gap-2 pr-4 text-sm font-normal">
                {dropdownItem.groupLabel && dropdownItem.groupLabel}
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
                    <MenuTiles {...subItemChildren} />
                  </div>
                ),
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
