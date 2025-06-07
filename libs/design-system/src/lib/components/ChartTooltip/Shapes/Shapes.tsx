import React from 'react';
import { cn } from '../../../../utils/classNames.utils';
import { bgClassMap, strokeClass, strokeWidth } from './Shapes.constants';

export interface ShapesProps {
  color: 'purple' | 'blue' | 'yellow' | 'red';
  shape: 'triangle' | 'circle' | 'rhombus' | 'square';
}

export const Shapes: React.FC<ShapesProps> = ({ color, shape }) => {
  const shapeProps = {
    className: cn('fill-current stroke-current', strokeClass),
    strokeWidth,
  };

  return (
    <div className={cn('h-fit w-fit', bgClassMap[color])}>
      <svg
        width={8}
        height={8}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {shape === 'triangle' && (
          <polygon points="50,10 90,90 10,90" {...shapeProps} />
        )}
        {shape === 'rhombus' && (
          <polygon points="50,0 100,50 50,100 0,50" {...shapeProps} />
        )}
        {shape === 'circle' && (
          <circle cx="50" cy="50" r="45" {...shapeProps} />
        )}
        {shape === 'square' && (
          <rect x="10" y="10" width="80" height="80" {...shapeProps} />
        )}
      </svg>
    </div>
  );
};
