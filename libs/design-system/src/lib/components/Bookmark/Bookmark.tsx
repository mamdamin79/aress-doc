import { useState } from "react";
import { Icon } from "../Icon";
import { cn } from "./../../../utils/classNames.utils";

export function Bookmark({
  selectedColor,
  onColorChange,
}: {
  selectedColor: string;
  onColorChange: (color: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  const toggleHandler = () => {
    setIsOpen((prev) => !prev);
    onColorChange('');
  };


  return (
    <div onMouseLeave={() => setIsOpen(false)}
      className="relative py-2 flex overflow-hidden items-center gap-1">
      <div
        onClick={toggleHandler}
        onMouseEnter={() => {
          if (selectedColor) setIsOpen(true);
        }}
        className={cn("h-fit absolute border-none top-[13px] z-10 fill-[#D1D3D7] w-fit cursor-pointer", {
          'fill-red-600': selectedColor === 'red',
          'fill-blue-600': selectedColor === 'blue',
          'fill-green-600': selectedColor === 'green',
          'fill-yellow-600': selectedColor === 'yellow',
          'fill-purple-600': selectedColor === 'purple',
          'invisible group-hover:visible': !selectedColor
        })}
      >
        <Icon size='sm' name='CustomBookmark' />
      </div>

      <div
        style={{ transform: !isOpen ? `translateX(150%)` : `translateX(0)` }}
        className="flex h-[27px] mr-6 items-center justify-between gap-2 rounded bg-white px-2 shadow-2xl transition-all duration-300"
      >
        <div className='fill-white -right-3 top-1 w-fit absolute'>
          <Icon name='CustomArrow' />
        </div>
        {colors.map((color) => (
          <div
            key={color}
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
                  onColorChange(color);
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
