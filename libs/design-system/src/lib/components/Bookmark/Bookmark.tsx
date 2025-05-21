import { useState } from 'react';
import BOOKMARK_ICON from '@aress-assets/icons/bookmark.svg';
import { cn } from 'libs/design-system/src/utils';
import Image from 'next/image';

export function Bookmark() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];

  const toggleHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative py-2 flex items-center gap-1 overflow-x-hidden">
      <div
        onClick={toggleHandler}
        className="h-fit absolute z-10 w-fit cursor-pointer"
      >
        {/* <BOOKMARK_ICON className="text-red-500" /> */}
        <Image width={100} height={100} className='w-5 h-5 fill-red-400 text-red-400' src={BOOKMARK_ICON} alt="bookmark" />
      </div>
      <div
        style={{ transform: !isOpen ? `translateX(150%)` : `translateX(0)` }}
        className="flex h-[26px] mr-6 items-center justify-between gap-2 rounded px-2 shadow-2xl transition-all duration-300"
      >
        {colors.map((color) => (
          <div
            className={cn(
              'flex h-2.5 w-2.5 items-center justify-center rounded-full',
              {
                'h-4 w-4': color === selectedColor,
                'bg-red-600': color === 'red',
                'bg-blue-600': color === 'blue',
                'bg-green-600': color === 'green',
                'bg-yellow-600': color === 'yellow',
                'bg-purple-600': color === 'purple',
              },
            )}
          >
            <div
              className={cn(
                'flex items-center justify-center rounded-full bg-white',
                {
                  'h-3.5 w-3.5': color === selectedColor,
                },
              )}
            >
              <div
                onClick={() => {
                  setSelectedColor(color);
                  setIsOpen(false);
                }}
                className={cn('h-2.5 w-2.5 cursor-pointer rounded-full', {
                  'bg-red-600': color === 'red',
                  'bg-blue-600': color === 'blue',
                  'bg-green-600': color === 'green',
                  'bg-yellow-600': color === 'yellow',
                  'bg-purple-600': color === 'purple',
                })}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
