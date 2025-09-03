'use client';
import { useState } from 'react';
import { Icon } from '../Icon';
import { cn } from './../../../utils/classNames.utils';

export function Bookmark({
  selectedColor,
  onColorChange,
}: {
  selectedColor: string;
  onColorChange: (color: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const colors = ['pink', 'yellow', 'green', 'blue', 'purple'];
  const toggleHandler = () => {
    setIsOpen((prev) => !prev);
    if (selectedColor) {
      onColorChange(selectedColor);
    }
  };

  return (
    <div
      dir="rtl"
      onMouseLeave={() => setIsOpen(false)}
      className="relative flex items-center gap-1 overflow-hidden py-2"
    >
      <div
        onClick={toggleHandler}
        onMouseEnter={() => {
          if (selectedColor) setIsOpen(true);
        }}
        className={cn(
          'fill-surface-neutral-secondarycontrast absolute -right-[5px] top-[13px] z-10 h-fit w-fit cursor-pointer border-none',
          {
            'fill-surface-accent-pink-600': selectedColor === 'pink',
            'fill-surface-accent-blue-600': selectedColor === 'blue',
            'fill-surface-accent-vividgreen-600': selectedColor === 'green',
            'fill-surface-accent-yellow-600': selectedColor === 'yellow',
            'fill-surface-accent-purple-600': selectedColor === 'purple',
            'invisible group-hover:visible': !selectedColor,
          },
        )}
      >
        <Icon size="md" name="CustomBookmark" />
      </div>

      <div
        style={{ transform: !isOpen ? `translateX(150%)` : `translateX(0)` }}
        className="bg-surface-neutral-primary mr-6 flex h-[27px] items-center justify-between gap-2 rounded px-2 shadow-2xl transition-all duration-300"
      >
        <div className="fill-surface-neutral-primary absolute -right-3 top-1 w-fit">
          <Icon name="CustomArrow" />
        </div>
        {colors.map((color, index) => (
          <div
            key={color ?? index}
            className={cn(
              'bg-icon-neutral-oninverse h-[18px] w-[18px] rounded-full',
              {
                'h-3 w-3': color !== selectedColor,
              },
            )}
          >
            <div
              onClick={() => {
                onColorChange(color);
                setIsOpen(false);
              }}
              className={cn(
                'group/color flex h-2.5 w-2.5 cursor-pointer items-center justify-center rounded-full',
                {
                  'mr-0.5 mt-1 ring-2 ring-offset-2': color === selectedColor,
                  hover: color !== selectedColor,
                  'bg-surface-accent-pink-600 ring-surface-accent-pink-600':
                    color === 'pink',
                  'bg-surface-accent-blue-600 ring-surface-accent-blue-600':
                    color === 'blue',
                  'bg-surface-accent-vividgreen-600 ring-surface-accent-vividgreen-600':
                    color === 'green',
                  'bg-surface-accent-yellow-600 ring-surface-accent-yellow-600':
                    color === 'yellow',
                  'bg-surface-accent-purple-600 ring-surface-accent-purple-600':
                    color === 'purple',
                },
              )}
            >
              <div
                className={cn(
                  'bg-surface-neutral-primary invisible h-1.5 w-1.5 rounded-full opacity-50',
                  {
                    'group-hover/color:visible': color !== selectedColor,
                  },
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
