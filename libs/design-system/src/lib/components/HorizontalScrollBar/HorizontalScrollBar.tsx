'use client';
import { cn } from 'libs/design-system/src/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';

export interface HorizontalScrollBarProps {
  barsNumber: number;
  autoRotate: boolean;
  onChangeIndex: (index: number) => void;
  autoRotateDuration?: 5000 | 10000 | 15000 | number;
  hasArrows?: boolean;
}

export const HorizontalScrollBar: React.FC<HorizontalScrollBarProps> = ({
  barsNumber,
  autoRotate,
  onChangeIndex,
  autoRotateDuration = 5000,
  hasArrows = false,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      const newIndex =
        prevIndex === barsNumber - 1 ? 0 : (prevIndex as number) + 1;
      onChangeIndex(newIndex);
      return newIndex;
    });
    resetTimer(); // Reset timer when manually changing the index
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => {
      const newIndex =
        prevIndex === 0 ? barsNumber - 1 : (prevIndex as number) - 1;
      onChangeIndex(newIndex);
      return newIndex;
    });
    resetTimer();
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (autoRotate) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, autoRotateDuration);
    }
  };
  useEffect(() => {
    setActiveIndex(0);
    resetTimer();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [barsNumber, autoRotate, autoRotateDuration, onChangeIndex]);

  return (
    <div className="relative flex w-fit flex-col items-center justify-center">
      {hasArrows && (
        <div className="flex flex-col items-center justify-center">
          <span className="text-sm font-medium">(W)</span>
          <div onClick={handlePrev} className="cursor-pointer text-center">
            <Icon name="chevron-up" size="md" />
          </div>
        </div>
      )}

      {Array.from({ length: barsNumber }, (_, index) => (
        <div className="p-1" key={index}>
          <div
            onClick={() => setActiveIndex(index)}
            className={cn(
              'bg-brand-400 h-4 w-4 cursor-pointer overflow-hidden rounded-[100px] transition-all ease-in-out',
              activeIndex === index ? 'h-14 duration-500' : 'duration-100',
            )}
          >
            <div
              className={cn(
                'bg-brand-600 h-full w-full -translate-y-full transition-all delay-500 ease-in-out',
                activeIndex === index
                  ? `translate-y-0 duration-[5000ms]`
                  : '-translate-y-full delay-0 duration-100',
                !autoRotate && activeIndex === index && 'translate-y-0 delay-0',
              )}
              style={{
                transitionDuration:
                  activeIndex === index
                    ? !autoRotate
                      ? '100ms'
                      : `${autoRotateDuration}ms`
                    : '100ms',
              }}
            ></div>
          </div>
        </div>
      ))}
      {hasArrows && (
        <div
          className={cn('fixed flex flex-col items-center justify-center')}
          style={{ top: `${barsNumber * 25 + 100}px` }}
        >
          <div onClick={handleNext} className="cursor-pointer text-center">
            <Icon name="chevron-down" size="md" />
          </div>
          <span className="text-sm font-medium">(S)</span>
        </div>
      )}
    </div>
  );
};
