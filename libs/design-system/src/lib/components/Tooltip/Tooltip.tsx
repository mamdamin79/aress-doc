'use client';
import { cn } from '../../../utils/classNames.utils';
import React, { useId, cloneElement, ReactElement } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

type Props = {
  children: ReactElement; // Ensure children is a single React element
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
      {/* Apply tooltip ID directly to the child element */}
      {cloneElement(children, { 'data-tooltip-id': id })}
      <ReactTooltip
        id={id}
        noArrow
        place={position}
        offset={offset}
        content={title}
        style={{ padding: '0 8px' }}
        className={cn(
          'bg-gray-1000/85 shadow-5xl z-50 rounded-xs font-vazirmatn text-sm font-medium text-white',
          className,
        )}
      ></ReactTooltip>
    </>
  );
};

export default Tooltip;
