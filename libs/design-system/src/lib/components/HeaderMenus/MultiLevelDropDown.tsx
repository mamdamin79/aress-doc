import React from 'react';
import { dropdownType, MenuItem } from './HeaderMenus.types';
import { cn } from 'libs/design-system/src/utils';
import { MenuTiles } from '../MenuTiles';
import { Icon } from '../Icon';
export interface MultiLevelDropdown {
  menuItems: MenuItem[];
  activeMenu: boolean;
  activeSubMenu: dropdownType | null;
  setActiveSubMenu: (dropdown: dropdownType | null) => void;
}
export const MultiLevelDropdown: React.FC<MultiLevelDropdown> = ({
  menuItems,
  activeMenu,
  activeSubMenu,
  setActiveSubMenu,
}) => {
  return (
    <div
      className={cn(
        'shadow-8xl shadow-offset-y-10 absolute z-10 flex flex-row overflow-hidden rounded-xl border border-gray-300',
        activeMenu ? '' : 'hidden',
      )}
    >
      <div
        className={
          'bg-baseBackground flex h-fit w-fit max-w-[272px] flex-col gap-2 border-r border-gray-300 py-2 text-right'
        }
      >
        {menuItems?.map((firstLayer, firstLayerIndex) => (
          <div key={firstLayerIndex} className={cn('flex flex-col')}>
            <div
              className="relative flex justify-center"
              onMouseEnter={() =>
                firstLayer.dropdown
                  ? setActiveSubMenu(firstLayer.dropdown)
                  : setActiveSubMenu(null)
              }
            >
              <MenuTiles
                {...firstLayer}
                prefix={`${firstLayerIndex + 1}. `}
                expandable={Boolean(firstLayer.dropdown)}
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
  );
};
