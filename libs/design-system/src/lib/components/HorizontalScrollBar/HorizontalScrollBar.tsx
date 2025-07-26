'use client';
import { cn } from '../../../utils';
import React, { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

export interface HorizontalScrollBarProps {
  onAddReportClick?: () => void;
  barsNumber: number;
  autoRotate?: boolean;
  onChangeIndex?: (index: number) => void;
  autoRotateDuration?: 5 | 10 | 15 | number;
  hasArrows?: boolean;
  externalIndex?: number;
  tooltips?: string[];
}

export const HorizontalScrollBar: React.FC<HorizontalScrollBarProps> = ({
  barsNumber,
  autoRotate,
  onChangeIndex,
  autoRotateDuration = 5,
  hasArrows = false,
  externalIndex,
  tooltips,
  onAddReportClick,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      const newIndex =
        prevIndex === barsNumber - 1 ? 0 : (prevIndex as number) + 1;
      onChangeIndex?.(newIndex);
      return newIndex;
    });
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => {
      const newIndex =
        prevIndex === 0 ? barsNumber - 1 : (prevIndex as number) - 1;
      onChangeIndex?.(newIndex);
      return newIndex;
    });
  };
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
  }, [
    barsNumber,
    autoRotate,
    autoRotateDuration,
    onChangeIndex,
    externalIndex,
  ]);
  const [animationKey, setAnimationKey] = useState<number>(Date.now());
  useEffect(() => {
    // Update the animation key when auto-rotation is toggled
    if (autoRotate) {
      setAnimationKey(Date.now());
    }
  }, [autoRotate]);
  return (
    <div className="group/scroll relative flex w-fit flex-col items-center justify-center">
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
          <Tooltip
            title={tooltips ? tooltips[index] : String(index)}
            position="left"
          >
            <div
              onClick={() => handleClick(index)}
              className={cn(
                'bg-surface-brand-400 h-4 w-4 cursor-pointer overflow-hidden rounded-[100px] transition-all ease-in-out',
                activeIndex === index
                  ? 'h-14 duration-500'
                  : 'hover:bg-surface-brand-600-primary duration-100',
              )}
            >
              {autoRotate && (
                <div
                  key={animationKey} // Use animation key here
                  className={cn(
                    'bg-surface-brand-600-primary h-full w-full -translate-y-full transition-all delay-500 ease-in-out',
                    activeIndex === index
                      ? `translate-y-0 duration-[5000ms]`
                      : '-translate-y-full delay-0 duration-100',
                  )}
                  style={{
                    transitionDuration:
                      activeIndex === index
                        ? !autoRotate
                          ? '100ms'
                          : `${autoRotateDuration * 1000}ms`
                        : '100ms',
                  }}
                ></div>
              )}
              {activeIndex === index && !autoRotate && (
                <div
                  className={cn(
                    'bg-surface-brand-600-primary h-full w-full -translate-y-full transition-all delay-500 ease-in-out',
                    activeIndex === index
                      ? `translate-y-0 duration-[5000ms]`
                      : '-translate-y-full delay-0 duration-100',
                  )}
                ></div>
              )}
            </div>
          </Tooltip>
        </div>
      ))}
      {!autoRotate && (
        <Tooltip title="افزودن گزارش جدید" position="left">
          <button
            onClick={onAddReportClick}
            className="bg-surface-brand-100 hover:bg-surface-brand-200 text-icon-onbrand-colored-primary-on200_100_50 mt-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm opacity-0 transition-all group-hover/scroll:opacity-100"
          >
            <Icon name="plus" size="md" />
          </button>
        </Tooltip>
      )}

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
