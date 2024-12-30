import { cn } from '../../../utils/classNames.utils';
import React, { useState } from 'react';
interface DotIndicator {
  totalLength: number;
  currentIndex: number;
  setIndex: (index:number)=>void
}
export const DotIndicator = ({ totalLength, currentIndex, setIndex }: DotIndicator) => {
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
          onClick={()=>setIndex(index)}
        ></div>
      ))}
    </div>
  );
};
