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
      prevIndex === 0 ? cards.length - 3 : Math.max(prevIndex - 3, 0)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex + 3 >= cards.length
        ? 0
        : Math.min(prevIndex + 3, cards.length - 3)
    );
  };

  return (
    <div
      className="relative w-[1440px] h-[358px] pr-[68px] pl-[40px] pt-4 pb-7 overflow-hidden flex justify-between items-center"
      dir="rtl"
    >
      {/* Left Arrow */}
      <button
        onClick={handleNext}
        className="absolute left-6 z-10 p-3 bg-white border-2 border-brand-600 rounded-full focus:outline-none text-brand-600 hover:bg-brand-600 hover:text-white transition-colors"
      >
        <Icon name="chevron-left" key="chevron-left" size="lg" />
      </button>

      {/* Cards */}
      <div
        className={cn(
          `flex flex-row transition-transform duration-300 ease-in-out w-full`,
          currentIndex
        )}
        style={{
          transform: `translateX(${currentIndex * (100 / 3)}%)`,
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className={cn(
              `flex-shrink-0 w-[calc(100%/3)] transition-opacity duration-300 ease-in-out`,
              index === currentIndex ||
                index === currentIndex + 1 ||
                index === currentIndex + 2
                ? 'opacity-100 '
                : 'opacity-0',
              index
            )}
          >
            <ReportCard {...card} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={handlePrev}
        className="absolute right-6 z-10 p-3 bg-white border-2 border-brand-600 rounded-full focus:outline-none text-brand-600 hover:bg-brand-600 hover:text-white transition-colors"
      >
        <Icon name="chevron-right" key="chevron-right" size="lg" />
      </button>
      <div className="absolute bottom-0 inset-x-0 mx-auto flex justify-center">
        <DotIndicator
          currentIndex={currentIndex / 3}
          totalLength={cards.length / 3}
        />
      </div>
      {currentIndex}
    </div>
  );
};
