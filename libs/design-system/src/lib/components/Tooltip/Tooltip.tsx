import { cn } from '../../../utils/classNames.utils';
import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

type TooltipProps = {
  id: string;
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
};

export const Tooltip: React.FC<TooltipProps> = ({
  id,
  children,
  content,
  position = 'top',
  className,
}) => {
  return (
    <>
      <span
        data-tooltip-id={id}
        className="relative inline-block cursor-pointer"
      >
        {children}
      </span>
      <ReactTooltip
        id={id}
        noArrow
        place={position}
        positionStrategy="fixed"
        // effect="solid"
        className={cn(
          'bg-gray-1000 shadow-5xl rounded-xs text-white font-medium font-vazirmatn  text-sm',
          className
        )}
      >
        {content}
      </ReactTooltip>
    </>
  );
};

export default Tooltip;
