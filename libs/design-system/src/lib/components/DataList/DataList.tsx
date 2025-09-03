import { cn } from '../../../utils/classNames.utils';
import React, { useState } from 'react';
import { Icon } from '../Icon';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

export type DataListProps = {
  className?: string;
  data: { key: string; value: string }[];
  mode?: 'vertical' | 'carousel';
};

export const GAP_WIDTH = 16;
export const MAX_SLIDES = 4;
export const CARD_WIDTH = 180;

export const DataList: React.FC<DataListProps> = ({
  className,
  data,
  mode = 'vertical',
}) => {
  const [slidesPerView] = useState<number>(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      rtl: true,
      slides: {
        perView: slidesPerView,
        spacing: 15,
      },
      slideChanged(s) {
        setCurrentIndex(s.track.details.rel);
      },
      created(s) {
        setCurrentIndex(s.track.details.rel);
      },
    },
    [],
  );

  const handleNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      instanceRef.current?.next();
    } else {
      instanceRef.current?.prev();
    }
  };

  const isPrevDisabled = currentIndex <= 0;
  const isNextDisabled =
    currentIndex >=
    (instanceRef.current?.track.details.slides.length || 0) -
      Math.ceil(slidesPerView);

  return mode === 'vertical' ? (
    <div
      className={cn(
        'rounded-4xl bg-surface-neutral-tertiary flex items-center justify-center',
        className,
      )}
    >
      <div
        className={cn(
          'bg-surface-neutral-background border-border-neutral-secondary flex h-[92%] w-[85%] flex-col rounded-2xl border px-4',
        )}
      >
        {data.map((item, idx) => (
          <React.Fragment key={item.key}>
            <div className="flex flex-1 items-center justify-between">
              <div className="text-text-neutral-primary text-sm font-medium">
                {item.key}
              </div>
              <div className="text-text-neutral-primary text-sm font-medium">
                {item.value}
              </div>
            </div>
            {idx < data.length - 1 && (
              <div className="bg-surface-neutral-secondary h-[2px] w-full rounded-2xl"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  ) : (
    <div className="rounded-4xl bg-surface-neutral-tertiary border-border-neutral-secondary relative h-[152px] w-full border p-5">
      <div
        ref={sliderRef}
        className="keen-slider bg-surface-neutral-background border-border-neutral-secondary flex h-full w-full items-center rounded-2xl border"
      >
        {/* Left Arrow */}
        <button
          onClick={() => handleNavigation('next')}
          disabled={isNextDisabled}
          className={cn(
            'shadow-4xl border-border-brand-primary-600 text-text-brand-primary-600 hover:bg-surface-brand-600-primary bg-surface-neutral-primary hover:text-text-neutral-white absolute left-0 top-[50%] z-20 -translate-y-1/2 rounded-full border-2 p-3 transition-all duration-500 focus:outline-none',
            isNextDisabled && 'opacity-0',
          )}
        >
          <Icon name="chevron-left" key="chevron-left" size="lg" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => handleNavigation('prev')}
          disabled={isPrevDisabled}
          className={cn(
            'shadow-4xl border-border-brand-primary-600 text-text-brand-primary-600 hover:bg-surface-brand-600-primary bg-surface-neutral-primary hover:text-text-neutral-white absolute -right-0 top-[50%] z-40 -translate-y-1/2 rounded-full border-2 p-3 transition-all duration-500 focus:outline-none',
            isPrevDisabled && 'opacity-0',
          )}
        >
          <Icon name="chevron-right" key="chevron-right" size="md" />
        </button>

        {data.map((item) => (
          <>
            <div
              key={item.key}
              className="keen-slider__slide border-border-neutral-secondary flex !h-[96px] !w-[180px] flex-col items-center justify-center gap-2 border-l px-2 text-center"
            >
              <div className="text-text-neutral-primary text-sm font-medium">
                {item.key}
              </div>
              <div className="text-text-neutral-primary text-sm font-medium">
                {item.value}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
