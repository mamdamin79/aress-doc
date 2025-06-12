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
      <PopoverButton className="border-none outline-none active:border-none">
        {button}
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="relative mt-4 max-w-96 !overflow-visible rounded-2xl bg-surface-neutral-primary p-6 shadow-lg transition duration-300 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        {({ close }) => (
          <div className="min-w-sm max-w-md">
            <span className="text-text-neutral-primary text-right text-lg font-semibold">
              {title}
            </span>
            <p className="font-vazirmatn pt-4 text-right text-sm text-text-neutral-secondary">
              {message}
            </p>
            <div
              onClick={() => close()}
              className="absolute -left-2 -top-2 cursor-pointer"
            >
              <Icon name="CustomCirlcleX" size="lg_plus" />
            </div>
          </div>
        )}
      </PopoverPanel>
    </Popover>
  );
}
