import { cn } from '../../../utils';
import React from 'react';
export interface SlideFromLeftProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export const SlideFromLeft: React.FC<SlideFromLeftProps> = ({
  isOpen,
  children,
}) => {
  return (
    <div
      className={cn(
        'absolute left-0 top-0 z-10 h-full w-full bg-[rgba(0,0,0,0.15)] backdrop-blur-[1px] transition-all duration-300 ease-in-out',
        isOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0',
      )}
    >
      <div
        dir="rtl"
        className={cn(
          'bg-baseBackground absolute left-0 top-0 z-10 h-full shadow-lg transition-all duration-300 ease-in-out',
          isOpen
            ? 'translate-x-0 transform'
            : '-translate-x-full transform shadow-none',
        )}
      >
        {children}
      </div>
    </div>
  );
};
