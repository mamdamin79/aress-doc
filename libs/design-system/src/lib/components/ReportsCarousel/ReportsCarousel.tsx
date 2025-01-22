'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../../utils/classNames.utils';
import { CardComponentProps, ReportCard } from '../ReportCard';
import { Icon } from '../Icon';
import { DotIndicator } from './DotIndicator';

interface ReportsCarouselProps {
  cards: CardComponentProps[];
}

export const ReportsCarousel: React.FC<ReportsCarouselProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 416;
  const GAP_WIDTH = 16;
  const MAX_SLIDES = 4;

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const availableWidth = containerWidth - 136; // Subtract padding (68px * 2)
        const possibleSlides = Math.floor(
          (availableWidth + GAP_WIDTH) / (CARD_WIDTH + GAP_WIDTH),
        );
        setSlidesPerView(Math.max(1, Math.min(MAX_SLIDES, possibleSlides)));
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const handleNavigation = (direction: 'prev' | 'next') => {
    setCurrentIndex((prevIndex) => {
      const offset = direction === 'next' ? slidesPerView : -slidesPerView;
      const newIndex = prevIndex + offset;
      const maxIndex = cards.length - slidesPerView;
      return Math.max(0, Math.min(maxIndex, newIndex));
    });
  };

  const canGoNext = currentIndex < cards.length - slidesPerView;
  const canGoPrev = currentIndex > 0;

  return (
    <div className="flex w-full justify-center">
      <div className="mx-auto w-full max-w-[1680px]">
        <div
          ref={containerRef}
          className="carousel-container relative flex h-[358px] w-full items-center justify-between overflow-hidden px-[68px] pb-7 pt-4"
          dir="rtl"
        >
          {/* Gradient Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

          {/* Navigation Buttons */}
          <button
            onClick={() => handleNavigation('next')}
            className={cn(
              'border-brand-600 text-brand-600 hover:bg-brand-600 absolute left-6 z-20 rounded-full border-2 bg-white p-3 transition-colors hover:text-white focus:outline-none',
              !canGoNext && 'invisible',
            )}
            disabled={!canGoNext}
          >
            <Icon name="chevron-left" size="lg" />
          </button>

          <button
            onClick={() => handleNavigation('prev')}
            className={cn(
              'border-brand-600 text-brand-600 hover:bg-brand-600 absolute right-6 z-20 rounded-full border-2 bg-white p-3 transition-colors hover:text-white focus:outline-none',
              !canGoPrev && 'invisible',
            )}
            disabled={!canGoPrev}
          >
            <Icon name="chevron-right" size="lg" />
          </button>

          <div
            className="flex w-full flex-row transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(${currentIndex * (CARD_WIDTH + GAP_WIDTH)}px)`,
              gap: `${GAP_WIDTH}px`,
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{ width: `${CARD_WIDTH}px` }}
              >
                <ReportCard {...card} />
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="absolute inset-x-0 bottom-0 mx-auto flex justify-center">
            <DotIndicator
              setIndex={(index) => setCurrentIndex(index * slidesPerView)}
              currentIndex={Math.ceil(currentIndex / slidesPerView)}
              totalLength={Math.ceil(cards.length / slidesPerView)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
