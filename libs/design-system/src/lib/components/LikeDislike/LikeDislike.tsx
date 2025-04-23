"use client"
import React, { useState, useCallback } from 'react';
import { LikeDislikeProps } from './LikeDislike.types';
import { Icon } from '../Icon';
import { cn } from '../../../utils/classNames.utils';

// LikeDislike component receives an initial value, a reaction type, a flag to specify if the user has already reacted, and a function to call when the reaction is clicked.
export const LikeDislike: React.FC<LikeDislikeProps> = ({
  initialValue,
  reaction,
  reactedBefore,
  onReact,
}) => {
  // State to manage the current count of reactions
  const [value, setValue] = useState(initialValue);
  // State to determine if the user has already reacted
  const [reacted, setReacted] = useState(reactedBefore);

  // Function to handle reaction click event
  const handleReaction = useCallback(() => {
    setValue((prevValue) => (reacted ? prevValue - 1 : prevValue + 1));
    setReacted((prevReacted) => !prevReacted);
    onReact(reaction);
  }, [reacted, onReact, reaction]);

  return (
    <button
      onClick={handleReaction}
      className={`sizing hover:text-gray-1000 group flex w-fit items-center gap-2 text-gray-700 transition-all`}
    >
      <div className="font-vazirmatn bg-baseBackground flex h-[26px] w-[40px] items-center justify-center gap-8 rounded-sm text-[14px] transition-all group-hover:bg-gray-200">
        {value}
      </div>
      <div
        className={cn(
          reacted
            ? reaction === 'like'
              ? 'text-green-600 [&>*]:fill-green-600'
              : 'text-red-600 [&>*]:fill-red-600'
            : 'hover:text-gray-1000 text-gray-700',
        )}
      >
        {/* Displaying the appropriate reaction icon based on the Reaction prop */}
        <Icon
          name={reaction === 'like' ? 'thumbs-up' : 'thumbs-down'}
          key={reaction}
          size="sm"
        />
      </div>
    </button>
  );
};
