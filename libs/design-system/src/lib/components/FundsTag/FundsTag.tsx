import { cn } from '../../../utils/classNames.utils';
import React from 'react';

export interface FundsTagProps {
  color?: 'purple' | 'blue' | 'green' | 'yellow' | 'pink' | 'disabled';
  size?: 'md' | 'lg';
}
export const FundsTag: React.FC<FundsTagProps> = ({
  color = 'green',
  size = 'md',
}) => {
  return (
    <div
      className={cn(
        'bg-surface-neutral-secondary flex items-center justify-center rounded-full',
        size === 'md' && 'h-3 w-3',
        size === 'lg' && 'h-3.5 w-3.5',
      )}
    >
      <div
        className={cn(
          'rounded-full',
          size === 'md' && 'h-2.5 w-2.5',
          size === 'lg' && 'h-3 w-3',
          color === 'green' && 'bg-surface-accent-vividgreen-600',
          color === 'blue' && 'bg-surface-accent-blue-600',
          color === 'purple' && 'bg-surface-accent-purple-600',
          color === 'yellow' && 'bg-surface-accent-yellow-600',
          color === 'pink' && 'bg-surface-accent-pink-600',
        )}
      />
    </div>
  );
};
