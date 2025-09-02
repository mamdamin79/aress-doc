'use client';
import React, { useEffect, useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { cn } from '../../../utils/classNames.utils';
import { Icon } from '../Icon';
import { debounce } from '../../../utils/debounce.utils';
import { SummaryCell, SummaryCellProps } from '../SummaryCell/SummaryCell';
interface SummaryCellCarouselProps {
  cells: SummaryCellProps[];
}

export const GAP_WIDTH = 16;
export const MAX_SLIDES = 4;
export const CARD_WIDTH = 209;

export const SummaryCellCarousel: React.FC<SummaryCellCarouselProps> = ({
  cells,
}) => {
  const [slidesPerView, setSlidesPerView] = useState<number>(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      rtl: true,
      slides: {
        perView: slidesPerView,
        spacing: GAP_WIDTH,
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

  useEffect(() => {
    const updateSlidesPerView = () => {
      const containerWidth = instanceRef.current?.container.clientWidth || 0;
      const possibleSlides = containerWidth / (CARD_WIDTH + GAP_WIDTH / 2);
      setSlidesPerView(Math.max(1, Math.min(MAX_SLIDES, possibleSlides)));
    };

    // Initial calculation
    updateSlidesPerView();

    // Create debounced resize handler
    const debouncedResizeHandler = debounce(updateSlidesPerView, 250);

    // Add resize event listener
    window.addEventListener('resize', debouncedResizeHandler);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', debouncedResizeHandler);
    };
  }, [instanceRef]);

  const handleNavigation = (direction: 'next' | 'prev') => {
    const slides = instanceRef.current?.track.details.slides || [];
    const maxIndex = slides.length - Math.ceil(slidesPerView);

    if (direction === 'next' && currentIndex < maxIndex) {
      instanceRef.current?.moveToIdx(currentIndex + Math.floor(slidesPerView));
    }
    if (direction === 'prev' && currentIndex > 0) {
      instanceRef.current?.moveToIdx(currentIndex - Math.floor(slidesPerView));
    }
  };

  // Determine if navigation buttons should be disabled
  const isPrevDisabled = currentIndex <= 0;
  const isNextDisabled =
    currentIndex >=
    (instanceRef.current?.track.details.slides.length || 0) -
      Math.ceil(slidesPerView);

  return (
    <div
      ref={sliderRef}
      className="keen-slider relative w-full max-w-[1680px] pb-8"
    >
      {/* Left Arrow */}
      <button
        onClick={() => handleNavigation('next')}
        disabled={isNextDisabled}
        className={cn(
          'shadow-4xl border-border-brand-primary-600 text-text-brand-primary-600 hover:bg-surface-brand-600-primary bg-surface-neutral-primary hover:text-text-neutral-white absolute left-6 top-[40%] z-20 -translate-y-1/2 rounded-full border-2 p-3 transition-all duration-500 focus:outline-none',
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
          'shadow-4xl border-border-brand-primary-600 text-text-brand-primary-600 hover:bg-surface-brand-600-primary bg-surface-neutral-primary hover:text-text-neutral-white absolute right-6 top-[40%] z-20 -translate-y-1/2 rounded-full border-2 p-3 transition-all duration-500 focus:outline-none',
          isPrevDisabled && 'opacity-0',
        )}
      >
        <Icon name="chevron-right" key="chevron-right" size="lg" />
      </button>

      {/* Gradient Overlays */}
      <div className="from-surface-neutral-background pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r to-transparent" />
      <div className="from-surface-neutral-background pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l to-transparent" />

      {/* Cards */}
      {cells.map((cell, index) => (
        <div
          className={cn('keen-slider__slide', index === 0 && '-ml-16')}
          key={index}
        >
          <SummaryCell {...cell} />
          {/* Spacer for the last card */}
          {index === cells.length - 1 && (
            <div className="keen-slider__slide w-16" />
          )}
        </div>
      ))}
    </div>
  );
};
