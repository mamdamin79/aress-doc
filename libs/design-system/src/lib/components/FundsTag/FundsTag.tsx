import { cn } from '../../../utils/classNames.utils';
import React from 'react';
export interface FundsTagProps {
  color: 'purple' | 'blue' | 'green' | 'yellow' | 'pink';
}
export const FundsTag: React.FC<FundsTagProps> = ({ color }) => {
  return (
    <div className='w-3 rounded-full h-3 bg-white flex items-center justify-center'>
      <div
        className={cn(
          'h-2.5 w-2.5 rounded-full',
          color === 'green' && 'bg-vividGreen-600',
          color === 'blue' && 'bg-blue-600',
          color === 'purple' && 'bg-purple-600',
          color === 'yellow' && 'bg-yellow-600',
          color === 'yellow' && 'bg-yellow-600',
          color === 'pink' && 'bg-pink-600',
        )}
      ></div>
    </div>
  );
};
