'use client';
import { cn } from 'design-system';
import React, { useEffect, useState } from 'react';

export interface IndicatorProps {
  barsNumber: number;
  onChangeIndex?: (index: number) => void;
  externalIndex?: number;
}

export const Indicator: React.FC<IndicatorProps> = ({
  barsNumber,
  onChangeIndex,
  externalIndex,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const handleClick = (index: number) => {
    setActiveIndex(index);
    onChangeIndex?.(index);
  };

  useEffect(() => {
    if (externalIndex !== undefined) {
      setActiveIndex(externalIndex);
    } else {
      setActiveIndex(0);
    }
  }, [barsNumber, onChangeIndex, externalIndex]);
  return (
    <div className="group/scroll relative flex w-fit flex-row items-center justify-center">
      {Array.from({ length: barsNumber }, (_, index) => (
        <div className="p-1" key={index}>
          <div
            onClick={() => handleClick(index)}
            className={cn(
              'bg-surface-brand-400 h-4 w-4 cursor-pointer overflow-hidden rounded-[100px] transition-all ease-in-out',
              activeIndex === index
                ? 'w-14 duration-500'
                : 'hover:bg-surface-brand-600-primary duration-100',
            )}
          >
            <div
              className={cn(
                'bg-surface-brand-600-primary h-full w-full translate-x-full transition-all delay-500 ease-in-out',
                activeIndex === index
                  ? `translate-x-0 duration-[5000ms]`
                  : 'translate-x-full delay-0 duration-100',
              )}
              style={{
                transitionDuration: activeIndex === index ? '4500ms' : '100ms',
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};
