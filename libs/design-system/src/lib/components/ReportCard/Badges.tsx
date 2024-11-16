import React from 'react';
import { Icon } from '../Icon';
import { cn } from '../../../utils/classNames.utils';
import { Heart } from 'lucide-react';

export const NewBadge = () => {
  return (
    <div className="w-[37px] h-[22px] flex items-center justify-center text-white text-xs font-medium rounded-[100px] p-2 bg-gradient-to-b from-red-600 to-red-700">
      جدید
    </div>
  );
};
export const VideoBadge = () => {
  return (
    <div className=" w-[37px] h-[22px] flex items-center justify-center text-white text-xs font-medium rounded-[100px] p-2 bg-vividGreen-700">
      <Icon name="video" key="video" size="md" />
    </div>
  );
};
interface LikeBadgeProps {
  isLiked: boolean;
  onClick: () => void;
}
export const LikeBadge = ({ isLiked, onClick }: LikeBadgeProps) => {
  return (
    <div
      className={cn(
        `w-[36px] h-[36px] cursor-pointer flex items-center justify-center text-red-600 p-2 bg-white rounded-full
    hover:bg-red-100 transition-colors`,
        isLiked ? 'fill-red-600' : ''
      )}
      onClick={onClick}
    >
      <Heart width={16} height={16} fill={isLiked ? 'red-600' : 'white'} />
    </div>
  );
};
