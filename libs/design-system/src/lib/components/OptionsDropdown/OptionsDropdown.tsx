import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import React, { ReactHTMLElement, useEffect, useRef, useState } from 'react';
import { OptionsDropdownOption } from './OptionsDropdownOption';
import { dropDownCell, dropDownStyle } from './OptionsDropdown.types';
import { OptionsDropdownTrigger } from './OptionsDropdownTrigger';

export interface OptionsDropdownProps {
  dropDownStyles: dropDownStyle;
  dropDownList: dropDownCell[];
  customTriggerRender?: (props: {
    isActive: boolean;
    selectedItem: dropDownCell;
    dropDownStyles: dropDownStyle;
  }) => React.ReactNode;
}
export const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
  dropDownList,
  dropDownStyles,
  customTriggerRender,
}) => {
  const [selectedItem, setSelectedItem] = useState<dropDownCell>(
    dropDownList[0],
  );
  return (
    <Listbox value={selectedItem} onChange={setSelectedItem}>
      <ListboxButton className="outline-none">
        {({ open }) =>
          customTriggerRender ? (
            (customTriggerRender({
              isActive: open,
              selectedItem,
              dropDownStyles,
            }) as React.ReactElement)
          ) : (
            <OptionsDropdownTrigger
              {...dropDownStyles}
              {...selectedItem}
              isActive={open}
            />
          )
        }
      </ListboxButton>
      <ListboxOptions
        anchor={dropDownStyles.anchor}
        className={
          'shadow-7xl mt-1 gap-1 rounded-lg border border-gray-300 p-1 outline-none'
        }
      >
        {dropDownList.map((item, index) => (
          <div onClick={() => setSelectedItem(item)} key={index}>
            <ListboxOption value={item}>
              {({ selected }) => (
                <OptionsDropdownOption
                  {...item}
                  isActive={selected}
                  withCheck={dropDownStyles.checkSelected ? selected : false}
                />
              )}
            </ListboxOption>
          </div>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
