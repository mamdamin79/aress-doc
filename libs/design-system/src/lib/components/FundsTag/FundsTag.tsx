import { cn } from '../../../utils/classNames.utils';
import React from 'react';
export interface FundsTagProps {
  color: 'purple' | 'blue' | 'green' | 'yellow' | 'pink' | 'neutral';
  size?: 'md' | 'lg';
}
export const FundsTag: React.FC<FundsTagProps> = ({ color, size = 'md' }) => {
  const sizeClasses = {
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
  };
  return (
    <div
      className={cn(
        'bg-surface-neutral-secondary flex h-3 w-3 items-center justify-center rounded-full',
        { 'h-3.5 w-3.5': size === 'lg' },
      )}
    >
      <div
        className={cn(
          `${sizeClasses[size]} rounded-full`,
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
