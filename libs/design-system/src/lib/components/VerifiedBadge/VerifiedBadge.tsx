import React from 'react';
import { cn } from '../../../utils';

export interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: 'brand' | 'success' | 'neutral';
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  size = 'md',
  className,
  color = 'brand',
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full',
        {
          'h-4 w-4': size === 'sm',
          'h-5 w-5': size === 'md',
          'h-6 w-6': size === 'lg',
        },
        {
          'bg-button-brand-surface-default': color === 'brand',
          'bg-button-success-surface-default': color === 'success',
          'bg-button-neutral-surface-default': color === 'neutral',
        },
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="text-button-brand-label-onsurface h-3/4 w-3/4"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.75 12.75L10 15.25L16.25 8.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
