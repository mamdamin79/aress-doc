import { cn } from '../../../utils/classNames.utils';
import React from 'react';
export interface FundsTagProps {
  color: 'purple' | 'blue' | 'green' | 'yellow' | 'pink' | 'neutral';
}
export const FundsTag: React.FC<FundsTagProps> = ({ color }) => {
  return (
    <div className="bg-surface-neutral-secondary flex h-3 w-3 items-center justify-center rounded-full">
      <div
        className={cn(
          'h-2.5 w-2.5 rounded-full',
          color === 'green' && 'bg-surface-accent-vividgreen-600',
          color === 'blue' && 'bg-surface-accent-blue-600',
          color === 'purple' && 'bg-surface-accent-purple-600',
          color === 'yellow' && 'bg-surface-accent-yellow-600',
          color === 'pink' && 'bg-surface-accent-pink-600',
        )}
      ></div>
    </div>
  );
};
