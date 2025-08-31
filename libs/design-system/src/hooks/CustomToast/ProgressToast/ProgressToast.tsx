'use client';
import { useEffect, useState } from 'react';
import { ProgressToastProps } from './ProgressToast.types';
import { Icon } from '../../../lib/components';
import { Button } from '../../../lib/components';

export const ProgressToast = ({
  title,
  trailingAction,
  leadingAction,
  timeout = 700,
}: ProgressToastProps) => {
  const [progressWidth, setProgressWidth] = useState(`${100}%`);
  useEffect(() => {
    setProgressWidth('0%');
  }, []);

  return (
    <div
      className={`animate-toast relative flex h-[50px] w-fit transform-gpu items-center justify-center overflow-hidden rounded-lg bg-black transition-all duration-500 ease-in-out`}
    >
      <div className="flex w-full items-center gap-2 px-2">
        {leadingAction && (
          <span
            className="text-icon-message-warning-oninverse flex h-[32px] items-center justify-center"
            onClick={leadingAction?.onClick}
          >
            <Icon {...leadingAction.iconProps} key={'icon'} />
          </span>
        )}
        <span className="text-text-neutral-oninverse text-[16px]">{title}</span>
        {trailingAction && (
          <div className="inline-block">
            <Button
              {...trailingAction.ButtonProps}
              onClick={trailingAction?.onClick}
            ></Button>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 h-1 w-full rounded-lg">
        <div
          className="bg-surface-brand-400 h-1"
          style={{
            width: progressWidth,
            transition: `width ${timeout / 1000}s`,
          }}
        />
      </div>
    </div>
  );
};
