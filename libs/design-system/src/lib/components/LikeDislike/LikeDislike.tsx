import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { LikeDislikeProps } from './LikeDislike.types';
import { Icon } from '../Icon';
export type Reaction = 'like' | 'dislike';
// LikeDislike component receives an initial value, a reaction type, a flag to specify if the user has already reacted and a function to call when the reaction is clicked.
const LikeDislike: React.FC<LikeDislikeProps> = ({
  initialValue,
  Reaction,
  reactedBefore,
  onReact,
}) => {
  const [value, setValue] = useState(initialValue);
  const [reacted, setReacted] = useState(reactedBefore);
  // In here we handle the reaction which has been clicked. we update value and reacted states accordingly
  const handleReaction = () => {
    if (!reacted) {
      setValue((prevValue) => prevValue + 1);
      setReacted(true);
      onReact(Reaction);
    } else {
      setValue((prevValue) => prevValue - 1);
      setReacted(false);
      onReact(Reaction);
    }
  };
  const getBackgroundColor = (Reaction: Reaction) => {
    if (reacted) {
      switch (Reaction) {
        case 'like':
          // we use [&>*] syntax to access all direct childrens of specified parent element
          return 'text-green-600 [&>*]:fill-green-600';
        case 'dislike':
          return 'text-red-600 [&>*]:fill-red-600';
      }
    } else {
      return 'text-gray-700 hover:text-gray-1000';
    }
  };

  return (
    <button
      onClick={handleReaction}
      className={`flex items-center gap-2 w-fit text-gray-700 sizing group hover:text-gray-1000 transition-all`}
    >
      <div className="font-vazirmatn w-[40px] h-[26px] bg-baseBackground flex justify-center items-center rounded-sm gap-8 group-hover:bg-gray-200 transition-all text-[14px]">
        {value}
      </div>
      <div className={getBackgroundColor(Reaction)}>
        {/* showing the reaction icon based on the Reaction prop */}
        {Reaction === 'like' ? (
          <Icon name="thumbs-up" key="thumbs-up" size="sm" />
        ) : (
          <Icon name="thumbs-down" key="thumbs-up" size="sm" />
        )}
      </div>
    </button>
  );
};

export default LikeDislike;
