import React, { useEffect, useState } from 'react';
import { ProgressToastProps } from './ProgressToast.types';
import { Icon } from '../Icon';
import { Button } from '../Button';
export const ProgressToast: React.FC<ProgressToastProps> = ({
  title,
  trailingAction,
  leadingAction,
  timeout = 700,
}) => {
  const [progressWidth, setProgressWidth] = useState(`${100}%`);
  // this is a temporary functionality to see the animation through storybook
  const handleProgress = () => {
    setProgressWidth('100%');
    setTimeout(() => {
      setProgressWidth('0%');
    }, 2000);
  };
  // we run the animation when it first initializez
  useEffect(() => {
    handleProgress();
  }, []);
  return (
    <div
      className="bg-brand-1000 w-fit rounded-lg relative h-[50px] flex items-center justify-center overflow-hidden"
      onClick={handleProgress}
    >
      <div className="px-2 gap-2 w-full flex items-center">
        {/* handling the right side button */}
        {leadingAction ? (
          <span className="ml-2 h-[32px] flex items-center justify-center text-yellow-500">
            <Icon
              name={leadingAction.iconProps.name}
              size={leadingAction.iconProps.size}
            />
          </span>
        ) : (
          false
        )}
        <span className="text-white font-vazirmatn text-[16px]">{title}</span>
        {/* handling the left side button */}
        {trailingAction ? (
          <span className="bg-brand-600 rounded-sm gap-1 leading-6 h-[32px] flex items-center justify-center p-2 text-white">
            {trailingAction.ButtonProps}
          </span>
        ) : (
          false
        )}
      </div>

      <div className="w-full h-1 absolute bottom-0 rounded-lg">
        <div
          className="bg-brand-400 h-1"
          style={{
            width: progressWidth,
            transition: `width ${
              timeout / 1000
            }s cubic-bezier(0.1, 0.8, 0.2, 1.5)`,
          }}
        />
      </div>
    </div>
  );
};
