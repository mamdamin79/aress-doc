import React from 'react';
import { cn } from '../../../utils';
import { VerifiedBadge } from '../VerifiedBadge';

export interface VerifiedProfileProps {
  name: string;
  image?: string;
  className?: string;
  badgeSize?: 'sm' | 'md' | 'lg';
  badgeColor?: 'brand' | 'success' | 'neutral';
  textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  onClick?: () => void;
}

export const VerifiedProfile: React.FC<VerifiedProfileProps> = ({
  name,
  image,
  className,
  badgeSize = 'sm',
  badgeColor = 'brand',
  textSize = 'md',
  showBadge = true,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2',
        { 'cursor-pointer': !!onClick },
        className,
      )}
      onClick={onClick}
    >
      {image ? (
        <div className="relative">
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
          {showBadge && (
            <div className="absolute -bottom-1 -right-1">
              <VerifiedBadge size={badgeSize} color={badgeColor} />
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <div className="bg-button-neutral-surface-default flex h-8 w-8 items-center justify-center rounded-full">
            <span className="text-button-neutral-label-plain-default text-sm font-medium">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
          {showBadge && (
            <div className="absolute -bottom-1 -right-1">
              <VerifiedBadge size={badgeSize} color={badgeColor} />
            </div>
          )}
        </div>
      )}
      <div className="flex items-center gap-1">
        <span
          className={cn('font-medium', {
            'text-xs': textSize === 'xs',
            'text-sm': textSize === 'sm',
            'text-md': textSize === 'md',
            'text-lg': textSize === 'lg',
            'text-xl': textSize === 'xl',
          })}
        >
          {name}
        </span>
        {showBadge && (
          <div className="inline-flex">
            <VerifiedBadge size={badgeSize} color={badgeColor} />
          </div>
        )}
      </div>
    </div>
  );
};
