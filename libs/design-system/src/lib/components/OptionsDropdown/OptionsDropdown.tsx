import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import React from 'react';
import { IconProps } from '../Icon';
import { OptionsDropdownCell } from './OptionsDropdownCell';
import { dropDownCell, triggerCell } from './OptionsDropdown.types';
export interface OptionsDropdownProps {
  trigger: triggerCell;
  dropDownList: dropDownCell[];
}
export const OptionsDropdown: React.FC<OptionsDropdownProps> = () => {
  return (
    // <Menu>
    //   <MenuButton>My account</MenuButton>
    //   <MenuItems anchor="bottom">
    //     <MenuItem>
    //       <a className="block data-[focus]:bg-blue-100" href="/settings">
    //         Settings
    //       </a>
    //     </MenuItem>
    //     <MenuItem>
    //       <a className="block data-[focus]:bg-blue-100" href="/support">
    //         Support
    //       </a>
    //     </MenuItem>
    //     <MenuItem>
    //       <a className="block data-[focus]:bg-blue-100" href="/license">
    //         License
    //       </a>
    //     </MenuItem>
    //   </MenuItems>
    // </Menu>
    <OptionsDropdownCell
      text="متن نمونه"
      icon={{ name: 'a-arrow-down', size: 'lg' }}
      tag={{ color: 'bg-green-600' }}
    />
  );
};
