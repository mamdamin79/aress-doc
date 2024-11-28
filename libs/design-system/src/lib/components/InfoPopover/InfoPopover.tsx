import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Icon } from '../Icon';

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
        className="shadow-lg mt-4 !overflow-visible relative max-w-96 p-6 rounded-2xl transition bg-white duration-300 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        {({ close }) => (
          <div className="max-w-md min-w-sm">
            <span className="text-gray-1000 font-vazirmatn font-semibold text-lg text-right">
              {title}
            </span>
            <p className="text-gray-600 pt-4 text-sm font-vazirmatn text-right">
              {message}
            </p>
            <div
              onClick={() => close()}
              className="absolute -top-2 -left-2 cursor-pointer"
            >
              <Icon name="CustomCirlcleX" size="lg_plus" />
            </div>
          </div>
        )}
      </PopoverPanel>
    </Popover>
  );
}
