import React from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { DropDownPropsType } from './DropDown.types';
import { Icon } from '../Icon';
import { Check } from 'lucide-react';

export const DropDown: React.FC<DropDownPropsType> = ({
  menuItems,
  selectedItem,
  onSelect,
  width,
}) => {
  return (
    <Listbox value={selectedItem} onChange={onSelect}>
      {({ open }) => (
        <>
          <ListboxButton
            className={`font-vazirmatn text-lg shadow-xs rounded-md text-gray-1000 w-[${width}px] flex justify-between items-center bg-white px-6 py-2 ${
              open && 'border-[1.5px] border-brand-600'
            }`}
          >
            {selectedItem}{' '}
            {
              <span
                className={` transition-all duration-300 ${
                  open && 'rotate-180 text-brand-600'
                }`}
              >
                <Icon name="chevron-down" size="lg" />
              </span>
            }
          </ListboxButton>
          <ListboxOptions
            transition
            anchor="bottom start"
            className="z-10 drop-down bg-white h-60 border-[1.5px] shadow-7xl rounded-md border-gray-300"
          >
            {menuItems.map((Item) => (
              <ListboxOption
                key={Item}
                value={Item}
                className={`pr-4 text-lg py-2 pl-12 cursor-pointer transition-all duration-200 hover:text-brand-700`}
              >
                {Item}
                {
                  selectedItem === Item &&
                <Check />
                }
              </ListboxOption>
            ))}
          </ListboxOptions>
        </>
      )}
    </Listbox>
  );
};
