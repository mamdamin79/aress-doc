import { cn } from '../../../utils/classNames.utils';
import React from 'react';
export interface FundsTagProps {
  color: 'purple' | 'blue' | 'green' | 'yellow';
}
export const FundsTag: React.FC<FundsTagProps> = ({ color }) => {
  return (
    <div
      className={cn(
        'h-2 w-2 rounded-full',
        color === 'green' && 'bg-vividGreen-600',
        color === 'blue' && 'bg-blue-600',
        color === 'purple' && 'bg-purple-600',
        color === 'yellow' && 'bg-yellow-600',
      )}
    ></div>
  );
};
