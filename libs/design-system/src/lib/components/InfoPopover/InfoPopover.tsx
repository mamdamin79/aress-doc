import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Icon } from '../IconComponent';

interface Props {
  title: string;
  message: string;
  button: React.ReactNode;
}

export function InfoPopover({ title, message, button }: Props) {
  return (
    <Popover>
      <PopoverButton className="border-none active:border-none outline-none">
        {button}
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="shadow-lg mt-4 !overflow-visible relative max-w-96 p-6 rounded-2xl transition duration-300 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        {({ close }) => (
          <div className="max-w-md min-w-sm">
            <span className="text-gray-1000 font-semibold text-lg text-right">
              {title}
            </span>
            <p className="text-gray-600 pt-4 text-sm text-right">{message}</p>
            <div
              onClick={() => close()}
              className="rounded-full absolute -top-2 -left-2 bg-brand-600 cursor-pointer flex items-center justify-center w-8 h-8"
            >
              <div className="rounded-full flex items-center justify-center w-6 h-6 bg-white">
                <Icon name="x" size="sm" />
              </div>
            </div>
          </div>
        )}
      </PopoverPanel>
    </Popover>
  );
}
