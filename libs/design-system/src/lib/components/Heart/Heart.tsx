import { cn } from 'libs/design-system/src/utils';
import { Heart } from 'lucide-react';
import React, { useState } from 'react';
interface HeartProps {
  initialIsliked: boolean;
  onClick: (isLiked: boolean) => void;
}
const HeartComponent = ({ initialIsliked, onClick }: HeartProps) => {
  const [isLiked, setIsLiked] = useState(initialIsliked);
  const handleClick = () => {
    onClick(isLiked);
    setIsLiked(!isLiked);
  };
  return (
    <div
      className="w-8 h-8 cursor-pointer flex items-center justify-center p-2 rounded-full"
      onClick={handleClick}
    >
      <Heart
        size={24}
        strokeWidth={1.8}
        className={cn(
          `fill-white text-red-600 transition-all`,
          isLiked ? 'fill-red-600' : 'hover:text-red-700 hover:fill-red-100',
        )}
      />
    </div>
  );
};
export { HeartComponent as Heart };
