import React from 'react';
import { Shapes, ShapesProps } from './Shapes';
import { cn } from 'libs/design-system/src/utils';
export interface TooltipRowProps {
  tag: ShapesProps;
  text: string;
  subText?: {
    content: string;
    trend: 'positive' | 'negative';
  };
  number?: number;
}
export const TooltipRow: React.FC<TooltipRowProps> = ({
  tag,
  number,
  text,
  subText,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-row justify-between gap-3">
        <div className="flex items-center gap-1 font-normal">
          <Shapes color={tag.color} shape={tag.shape} />
          <span>{text}</span>
        </div>
        {number && <span className="font-medium">٪{number}</span>}
      </div>
      {subText && (
        <div
          className={cn(
            'text-text-message-success-oninverse text-xs font-medium',
            subText.trend === 'negative' && 'text-text-message-error-oninverse',
          )}
        >
          {subText.content}
        </div>
      )}
    </div>
  );
};
