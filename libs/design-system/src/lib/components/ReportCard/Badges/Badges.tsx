'use client';
import { useState } from 'react';
import { cn } from '../../../../utils/classNames.utils';
import { Icon as Iconify } from '@iconify/react';
import { Icon } from '../../Icon';

export const NewBadge = () => {
  return (
    <div className="flex h-[22px] w-[37px] items-center justify-center rounded-[100px] bg-red-600 p-2 text-xs font-medium text-white">
      جدید
    </div>
  );
};
export const VideoBadge = () => {
  return (
    <div className="bg-vividGreen-700 flex h-[22px] w-[37px] items-center justify-center rounded-[100px] p-2 text-xs font-medium text-white">
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
        'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-red-600 transition-colors',
        hasFrame && `bg-white p-2 hover:bg-red-100`,
      )}
      onClick={handleLiked}
    >
      <Iconify
        icon={'lucide:heart'}
        width={size == 'lg' ? 24 : 20}
        height={size == 'lg' ? 24 : 20}
        className={isLikedState ? '[&>*]:fill-red-600' : ''}
      />
    </div>
  );
};
