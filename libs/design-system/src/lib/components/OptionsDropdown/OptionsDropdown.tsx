import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import React, { useState } from 'react';
import { OptionsDropdownOption } from './OptionsDropdownOption';
import { dropDownCell, dropDownStyle } from './OptionsDropdown.types';
import { OptionsDropdownTrigger } from './OptionsDropdownTrigger';
import { cn } from '../../../utils/classNames.utils';

export interface OptionsDropdownProps {
  dropDownStyles: dropDownStyle;
  dropDownList: dropDownCell[];
  customTriggerRender?: (props: {
    isActive: boolean;
    selectedItem: dropDownCell;
    dropDownStyles: dropDownStyle;
  }) => React.ReactNode;
  customOptionRender?: (props: dropDownCell) => React.ReactNode;
}
export const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
  dropDownList,
  dropDownStyles,
  customTriggerRender,
  customOptionRender,
}) => {
  const [selectedItem, setSelectedItem] = useState<dropDownCell>(
    dropDownList[0],
  );
  return (
    <Listbox value={selectedItem} onChange={setSelectedItem}>
      <ListboxButton
        className={cn('outline-none', !dropDownStyles.fixedWidth && 'w-fit')}
        style={
          dropDownStyles.fixedWidth
            ? { width: `${dropDownStyles.fixedWidth}px` }
            : undefined
        }
      >
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
        className={cn(
          'shadow-7xl mt-1 gap-1 rounded-lg border border-gray-300 p-1 outline-none',
          !dropDownStyles.fixedWidth && 'w-fit',
        )}
        style={
          dropDownStyles.fixedWidth
            ? { width: `${dropDownStyles.fixedWidth}px` }
            : undefined
        }
      >
        {dropDownList.map((item, index) => (
          <div onClick={() => setSelectedItem(item)} key={index}>
            <ListboxOption value={item}>
              {({ selected }) =>
                customOptionRender ? (
                  (customOptionRender({
                    text: item.text,
                    icon: item.icon,
                    isActive: selected,
                    tag: item.tag,
                    withCheck: dropDownStyles.checkSelected ? selected : false,
                  }) as React.ReactElement)
                ) : (
                  <OptionsDropdownOption
                    {...item}
                    withCheck={dropDownStyles.checkSelected ? selected : false}
                    isActive={selected}
                  />
                )
              }
            </ListboxOption>
          </div>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
