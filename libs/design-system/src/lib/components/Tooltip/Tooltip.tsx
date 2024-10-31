'use client'
import { cn } from '../../../utils/classNames.utils';
import React, { useId } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

type Props = {
  children: React.ReactNode;
  title: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
};

export const Tooltip: React.FC<Props> = ({
  children,
  title,
  className,
  position = 'top',
}) => {
  const id = useId();
  return (
    <>
      {/* wrapper */}
      <div
        data-tooltip-id={id}
        className="relative inline-block cursor-pointer"
      >
        {/* here is the component that need a tooltip */}
        {children}
      </div>
      <ReactTooltip
        id={id}
        noArrow
        place={position}
        positionStrategy="fixed"
        offset={4}
        content={title}
        className={cn(
          'bg-gray-1000 shadow-5xl rounded-xs text-white font-medium font-vazirmatn text-sm',
          className
        )}
      ></ReactTooltip>
    </>
  );
};

export default Tooltip;
