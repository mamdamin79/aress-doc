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
}
export const LikeBadge = ({ isLiked, onClick }: LikeBadgeProps) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const handleLiked = () => {
    const nextState = !isLikedState;
    setIsLikedState(nextState);
    onClick(nextState);
  };
  return (
    <div
      className={cn(
        `flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full bg-white p-2 text-red-600 transition-colors hover:bg-red-100`,
        isLikedState ? 'fill-red-600' : '',
      )}
      onClick={handleLiked}
    >
      <Iconify
        icon={'lucide:heart'}
        width={16}
        height={16}
        className={isLikedState ? '[&>*]:fill-red-600' : ''}
      />
    </div>
  );
};
