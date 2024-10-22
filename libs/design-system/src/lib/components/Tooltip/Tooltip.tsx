import { cn } from '../../../utils/classNames.utils';
import React, { useId } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

type Props = {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
};

export const Tooltip: React.FC<Props> = ({
  children,
  content,
  position = 'top',
  className,
}) => {
  const id = useId();
  return (
    <>
      <span
        data-tooltip-id={id}
        className="relative inline-block cursor-pointer"
      >
        {/* here is the component that need a tooltip */}
        {children}
      </span>
      <ReactTooltip
        id={id}
        noArrow
        place={position}
        positionStrategy="fixed"
        offset={4}
        className={cn(
          'bg-gray-1000 shadow-5xl rounded-xs text-white font-medium font-vazirmatn  text-sm',
          className
        )}
      >
        {/* here is the tooltip content - it can be a component also */}
        {content}
      </ReactTooltip>
    </>
  );
};

export default Tooltip;
