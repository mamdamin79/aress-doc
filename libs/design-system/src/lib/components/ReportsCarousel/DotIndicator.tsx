import { cn } from '../../../utils/classNames.utils';
import React from 'react';

interface DotIndicatorProps {
  totalLength: number;
  currentIndex: number;
  setIndex: (index: number) => void;
}

export const DotIndicator: React.FC<DotIndicatorProps> = ({
  totalLength,
  currentIndex,
  setIndex,
}) => {
  const dots = Array.from({ length: totalLength }, (_, i) => i);

  return (
    <div
      className="flex flex-row gap-1"
      role="tablist"
      aria-label="Carousel navigation"
    >
      {dots.map((index) => (
        <button
          key={index}
          role="tab"
          aria-selected={index === currentIndex}
          aria-label={`Go to slide ${index + 1}`}
          className={cn(
            `bg-brand-500 h-3 cursor-pointer rounded-full outline-none transition-all`,
            index === currentIndex ? 'bg-brand-600 w-8' : 'w-3',
          )}
          onClick={() => setIndex(index)}
          tabIndex={0}
        />
      ))}
    </div>
  );
};
