import { useEffect, useState } from 'react';
import { ProgressToastProps } from './ProgressToast.types';
import { Icon } from 'libs/design-system/src/lib/components/Icon';
import { Button } from 'libs/design-system/src/lib/components/Button';

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
      className={`animate-toast bg-brand-1000 relative flex h-[50px] w-fit transform-gpu items-center justify-center overflow-hidden rounded-lg transition-all duration-500 ease-in-out`}
    >
      <div className="flex w-full items-center gap-2 px-2">
        {leadingAction && (
          <span
            className="flex h-[32px] items-center justify-center text-yellow-500"
            onClick={leadingAction?.onClick}
          >
            <Icon {...leadingAction.iconProps} key={'icon'} />
          </span>
        )}
        <span className="font-vazirmatn text-[16px] text-white">{title}</span>
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
          className="bg-brand-400 h-1"
          style={{
            width: progressWidth,
            transition: `width ${timeout / 1000}s`,
          }}
        />
      </div>
    </div>
  );
};
