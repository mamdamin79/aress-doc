import { cn } from 'libs/design-system/src/utils';
import { Heart } from 'lucide-react';
import React from 'react';
interface HeartProps {
  isLiked: boolean;
  onClick: () => void;
}
const HeartComponent = ({ isLiked, onClick }: HeartProps) => {
  return (
    <div
      className="w-8 h-8 cursor-pointer flex items-center justify-center p-2 rounded-full"
      onClick={onClick}
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
