import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import React, { ReactHTMLElement, useEffect, useRef, useState } from 'react';
import { OptionsDropdownCell } from './OptionsDropdownCell';
import { dropDownCell, triggerCell } from './OptionsDropdown.types';
import { OptionsDropdownTrigger } from './OptionsDropdownTrigger';
import { AnchorProps } from '@headlessui/react/dist/internal/floating';
import { cn } from '../../../utils/index';
export interface OptionsDropdownProps {
  trigger: triggerCell;
  dropDownList: dropDownCell[];
  anchor: AnchorProps;
}
export const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
  anchor,
  dropDownList,
  trigger,
}) => {
  const [buttonWidth, setButtonWidth] = useState<number | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (menuButtonRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect.width;
          setButtonWidth(width);
        }
      });

      observer.observe(menuButtonRef.current);
      // Cleanup observer on unmount
      return () => {
        observer.disconnect();
      };
    }
  }, []);
  const isFullWidth = (): boolean => {
    const maxLengthInList = dropDownList.reduce((maxLength, cell) => {
      return Math.max(maxLength, cell.text.length);
    }, 0);
    return maxLengthInList > trigger.text.length;
  };
  return (
    <Menu>
      <MenuButton className="outline-none" ref={menuButtonRef}>
        {({ active }) => (
          <OptionsDropdownTrigger {...trigger} isActive={active} />
        )}
      </MenuButton>
      <MenuItems
        anchor={anchor}
        className={cn(
          'shadow-7xl mt-1 gap-1 rounded-lg border border-gray-300 p-1 outline-none',
        )}
        style={{
          width:
            isFullWidth() && buttonWidth ? `${buttonWidth + 1}px` : 'w-fit',
        }}
      >
        {dropDownList.map((item) => (
          <MenuItem>
            {({ focus }) => <OptionsDropdownCell {...item} isActive={focus} />}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};
