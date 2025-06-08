'use client';
import { cn } from '../../../utils/classNames.utils';
import React, { ReactElement } from 'react';
import { TooltipRow, TooltipRowProps } from './TooltipRow';

type Props = {
  children: ReactElement;
  title: string;
  items: TooltipRowProps[];
  className?: string;
};

export const ChartTooltip: React.FC<Props> = ({
  children,
  className,
  title,
  items,
}) => {
  return (
    <>
      {children}

      <div
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
      </div>
    </>
  );
};
