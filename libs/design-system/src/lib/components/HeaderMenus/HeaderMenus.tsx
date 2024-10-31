import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import React, { useState } from 'react';
import { Icon } from '../Icon';
import { MenuTiles } from '../MenuTiles';
import { MenuItem } from './HeaderMenus.types';
interface MenuProps {
  menuItems: MenuItem[];
}

export const HeaderMenus: React.FC<MenuProps> = ({ menuItems }: MenuProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="flex items-center gap-6 text-nowrap">
      {menuItems.map((item, index) => (
        <Popover key={index} className="relative group">
          {/* Apply dynamic text colors based on tab state and submenu presence
          - If tab is active and has no submenu, text turns gray-1000 on hover
          - If tab is active, text is gray-1000 and bold
          - If tab is not active, text is gray-600
          - If tab has a submenu, text turns brand-600 on hover */}
          <PopoverButton
            className={`flex items-center gap-2 py-1 outline-none transition-colors ${
              item.subMenu
                ? 'hover:text-brand-600'
                : activeTab === index
                ? 'hover:text-gray-1000'
                : 'hover:text-gray-700'
            } ${
              activeTab === index
                ? 'text-gray-1000 font-bold '
                : 'text-gray-600'
            } `}
            onClick={() => handleTabClick(index)}
          >
            <div className="relative">
              {item.name}
              {activeTab === index && (
                <div className="absolute bottom-0 left-0  right-0 mx-auto w-6 h-[6px] bg-brand-600 rounded-full -mb-2" />
              )}
            </div>
            {item.subMenu && (
              <div className="transition-transform duration-200 group-hover:rotate-180">
                <Icon name="chevron-down" size="lg" />
              </div>
            )}
          </PopoverButton>

          {item.subMenu && (
            <PopoverPanel
              anchor="bottom start"
              className="overflow-hidden text-right shadow-md bg-baseBackground w-60 h-fit rounded-xl border-2 border-gray-300 z-10 py-4 gap-2 flex flex-col mt-2 shadow-offset-y-10"
            >
              {item.subMenu.map((subMenuItem) => (
                <div
                  className={`flex flex-col overflow-hidden ${
                    subMenuItem.border
                      ? 'border-t-2 border-b-2 border-gray-200'
                      : ''
                  } ${subMenuItem.children[0]?.isDashboard ? 'gap-2' : ''}`}
                >
                  <div className="text-gray-600 text-sm pr-4 font-normal flex flex-row gap-2 items-center">
                    {subMenuItem.groupLabel}
                    {subMenuItem.counter && (
                      <>
                        <span> ({subMenuItem.children.length}/8) </span>
                        <Icon
                          name="info"
                          key={subMenuItem.groupLabel}
                          size="md"
                        />
                      </>
                    )}
                  </div>
                  {subMenuItem.children.map(
                    (subItemChildren, subItemChildrenIndex) => (
                      <div className="relative">
                        <MenuTiles
                          {...subItemChildren}
                          prefix={`${subItemChildrenIndex + 1}. `}
                        />
                      </div>
                    )
                  )}
                </div>
              ))}
            </PopoverPanel>
          )}
        </Popover>
      ))}
    </div>
  );
};
