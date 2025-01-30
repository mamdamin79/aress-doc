'use client';
import { cn } from '../../../utils/classNames.utils';
import React, { useId } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

type Props = {
  children: React.ReactNode;
  title: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  offset?: number;
};

export const Tooltip: React.FC<Props> = ({
  children,
  title,
  className,
  position = 'top',
  offset = 4,
}) => {
  const id = useId();
  return (
    <>
      {/* wrapper */}
      <div
        data-tooltip-id={id}
        className="relative cursor-pointer"
      >
        {/* here is the component that need a tooltip */}
        {children}
      </div>
      <ReactTooltip
        id={id}
        noArrow
        place={position}
        positionStrategy="fixed"
        offset={offset}
        content={title}
        style={{ padding: '0 8px' }}
        className={cn(
          'bg-gray-1000/85 shadow-5xl rounded-xs font-vazirmatn text-sm font-medium text-white',
          className,
        )}
      ></ReactTooltip>
    </>
  );
};

export default Tooltip;
