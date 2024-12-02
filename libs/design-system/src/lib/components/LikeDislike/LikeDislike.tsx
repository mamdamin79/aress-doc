import React, { useState, useCallback } from 'react';
import { LikeDislikeProps } from './LikeDislike.types';
import { Icon } from '../Icon';
import { cn } from '../../../utils/classNames.utils';

// LikeDislike component receives an initial value, a reaction type, a flag to specify if the user has already reacted, and a function to call when the reaction is clicked.
const LikeDislike: React.FC<LikeDislikeProps> = ({
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
      className={`flex items-center gap-2 w-fit text-gray-700 sizing group hover:text-gray-1000 transition-all`}
    >
      <div className="font-vazirmatn w-[40px] h-[26px] bg-baseBackground flex justify-center items-center rounded-sm gap-8 group-hover:bg-gray-200 transition-all text-[14px]">
        {value}
      </div>
      <div
        className={cn(
          reacted
            ? reaction === 'like'
              ? 'text-green-600 [&>*]:fill-green-600'
              : 'text-red-600 [&>*]:fill-red-600'
            : 'text-gray-700 hover:text-gray-1000'
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

export default LikeDislike;
