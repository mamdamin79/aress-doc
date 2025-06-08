'use client';
import { cn } from '../../../utils/classNames.utils';
import React, { useId, cloneElement, ReactElement } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { TooltipRow, TooltipRowProps } from './TooltipRow';

type Props = {
  children: ReactElement;
  title: string;
  items: TooltipRowProps[];
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  offset?: number;
};

export const ChartTooltip: React.FC<Props> = ({
  children,
  className,
  position = 'top',
  offset = 4,
  title,
  items,
}) => {
  const id = useId();

  return (
    <>
      {cloneElement(children, {
        'data-tooltip-id': id,
      })}

      <ReactTooltip
        id={id}
        place={position}
        offset={offset}
        style={{ padding: '8px 16px' }}
        className={cn(
          'bg-surface-neutral-invers text-text-neutral-oninverse z-50 flex flex-col gap-1 rounded-lg text-sm font-medium',
          className,
        )}
      >
        <div className="text-sm font-medium">{title}</div>
        {items.map((item, index) => (
          <TooltipRow key={`tooltip-row-${index}`} {...item} />
        ))}
      </ReactTooltip>
    </>
  );
};

export default ChartTooltip;
