'use client';
import { useState } from 'react';
import { cn } from '../../../../utils/classNames.utils';
import { Icon as Iconify } from '@iconify/react';
import { Icon } from '../../Icon';

export const NewBadge = () => {
  return (
    <div className="bg-icon-accent-red-primary-600 text-text-neutral-white flex h-[22px] w-[37px] items-center justify-center rounded-[100px] p-2 text-xs font-medium">
      جدید
    </div>
  );
};
export const VideoBadge = () => {
  return (
    <div className="bg-surface-accent-vividgreen-600 text-text-neutral-white flex h-[22px] w-[37px] items-center justify-center rounded-[100px] p-2 text-xs font-medium">
      <Icon name="video" size="md" />
    </div>
  );
};
interface LikeBadgeProps {
  isLiked: boolean;
  onClick: (isLiked: boolean) => void;
  hasFrame?: boolean;
  size?: 'md' | 'lg';
}
export const LikeBadge: React.FC<LikeBadgeProps> = ({
  isLiked,
  onClick,
  hasFrame = false,
  size,
}) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const handleLiked = () => {
    const nextState = !isLikedState;
    setIsLikedState(nextState);
    onClick(nextState);
  };

  return (
    <div
      className={cn(
        'text-text-accent-red-primary-600 bg-surface-neutral-primary flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors',
        hasFrame && `hover:bg-surface-accent-red-100 p-2`,
      )}
      onClick={handleLiked}
    >
      <Iconify
        icon={'lucide:heart'}
        width={size === 'lg' ? 24 : 20}
        height={size === 'lg' ? 24 : 20}
        className={isLikedState ? '[&>*]:fill-red-600' : ''}
      />
    </div>
  );
};
