import React from 'react';
interface HamburgerMenuIconProps {
  open: boolean;
}
export const HamburgerMenuIcon: React.FC<HamburgerMenuIconProps> = ({
  open,
}) => {
  return (
    <div className="relative mb-2 flex h-8 w-8 items-center justify-center">
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        id="menu-toggle"
        className={`relative h-[24px] w-[24px] outline-none`}
      >
        {['top', 'middle', 'bottom'].map((position) => (
          <span
            key={position}
            className={`bg-icon-neutral-primary absolute right-0 top-1/2 -mt-px block h-0.5 w-full rounded transition-all duration-300 ease-in-out ${
              open
                ? position === 'middle'
                  ? 'opacity-0'
                  : position === 'top'
                    ? 'rotate-45'
                    : '-rotate-45'
                : position === 'top'
                  ? '-translate-y-2'
                  : position === 'bottom'
                    ? 'translate-y-2'
                    : ''
            }`}
          />
        ))}
      </button>
    </div>
  );
};
