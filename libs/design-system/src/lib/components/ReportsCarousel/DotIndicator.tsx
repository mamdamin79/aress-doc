import { cn } from '../../../utils/classNames.utils';
import React from 'react';
interface DotIndicator {
  totalLength: number;
  currentIndex: number;
}
export const DotIndicator = ({ totalLength, currentIndex }: DotIndicator) => {
  const tempArr = new Array(totalLength).fill(null);
  return (
    <div className="flex flex-row gap-1">
      {tempArr.map((_, index) => (
        <div
          key={index}
          className={cn(
            `h-3 bg-brand-500 rounded-full transition-all`,
            index === currentIndex ? 'w-8' : 'w-3'
          )}
        ></div>
      ))}
    </div>
  );
};
