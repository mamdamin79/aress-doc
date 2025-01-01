'use client';
import React, { useState } from 'react';
import { cn } from '../../../utils/classNames.utils';
import { CardComponentProps, ReportCard } from '../ReportCard';
import { Icon } from '../Icon';
import { DotIndicator } from './DotIndicator';

interface ReportsCarouselProps {
  cards: CardComponentProps[];
}

export const ReportsCarousel: React.FC<ReportsCarouselProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === 0 ? cards.length - 3 : Math.max(prevIndex - 3, 0),
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex + 3 >= cards.length
        ? 0
        : Math.min(prevIndex + 3, cards.length - 3),
    );
  };

  return (
    <div
      className="relative flex h-[358px] w-full max-w-[1440px] items-center justify-between overflow-hidden pb-7 pl-[40px] pr-[68px] pt-4"
      dir="rtl"
    >
      {/* Left Arrow */}
      <button
        onClick={handleNext}
        className="border-brand-600 text-brand-600 hover:bg-brand-600 absolute left-6 z-10 rounded-full border-2 bg-white p-3 transition-colors hover:text-white focus:outline-none"
      >
        <Icon name="chevron-left" key="chevron-left" size="lg" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handlePrev}
        className="border-brand-600 text-brand-600 hover:bg-brand-600 absolute right-6 z-10 rounded-full border-2 bg-white p-3 transition-colors hover:text-white focus:outline-none"
      >
        <Icon name="chevron-right" key="chevron-right" size="lg" />
      </button>
      {/* Cards */}
      <div
        className={cn(
          `flex w-full flex-row transition-transform duration-300 ease-in-out`,
          currentIndex,
        )}
        style={{
          transform: `translateX(${currentIndex * (100 / 3)}%)`,
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className={cn(
              `w-[calc(100%/3)] flex-shrink-0 transition-opacity duration-300 ease-in-out`,
              index === currentIndex ||
                index === currentIndex + 1 ||
                index === currentIndex + 2
                ? 'opacity-100'
                : 'opacity-0',
              index,
            )}
          >
            <ReportCard {...card} />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 mx-auto flex justify-center">
        <DotIndicator
          setIndex={(index) => setCurrentIndex(index * 3)}
          currentIndex={currentIndex / 3}
          totalLength={cards.length / 3}
        />
      </div>
      {currentIndex}
    </div>
  );
};
