import { toast } from 'react-hot-toast';
import { bgIcon, icons, styleToasts } from './CustomToast.constants';
import { cn } from '../../utils';
import React, { useState, useEffect, useId } from 'react';
import { ProgressToastProps } from './ProgressToast.types';
import { Icon } from '../../lib/components/Icon';
import { Button } from '../../lib/components/Button';
import { LucideUndo2 } from 'lucide-react';

interface Props {
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
}

export function CustomToast() {
  const showToast = ({ message, type }: Props) => {
    toast.custom((t) => (
      <div
        onClick={() => toast.dismiss(t.id)}
        className={cn(
          'text-gray-1000 relative -top-96 scale-0 transform-gpu rounded-xl border-[1.5px] p-3 font-medium transition-all duration-500 ease-in-out',
          t.visible ? 'animate-toast top-0 scale-95' : 'opacity-0',
          styleToasts[type],
        )}
      >
        <div className="flex items-center gap-2">
          <div className={cn('rounded-lg p-1.5 text-white', bgIcon[type])}>
            {icons[type]}
          </div>
          <span className="text-sm">{message}</span>
        </div>
      </div>
    ));
  };

  const ProgressToast = ({
    title,
    trailingAction,
    leadingAction,
    timeout = 700,
  }: ProgressToastProps) => {
    const [progressWidth, setProgressWidth] = useState(`${100}%`);
    useEffect(() => {
      setProgressWidth('0%');
    }, []);
    // we run the animation when it first initializez
    console.log(leadingAction);
    return (
      <div
        className={`animate-toast bg-brand-1000 relative flex h-[50px] w-fit transform-gpu items-center justify-center overflow-hidden rounded-lg transition-all duration-500 ease-in-out`}
      >
        <div className="flex w-full items-center gap-2 px-2">
          {leadingAction && (
            <span className="flex h-[32px] items-center justify-center text-yellow-500">
              <Icon {...leadingAction.iconProps} key={'icon'} />
            </span>
          )}
          <span className="font-vazirmatn text-[16px] text-white">{title}</span>
          {trailingAction && (
            <div className="inline-block">
              <Button {...trailingAction.ButtonProps}></Button>
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

  const showProgressToast = ({
    title,
    trailingAction,
    leadingAction,
    timeout = 700,
  }: ProgressToastProps) => {
    const id = toast.custom(
      (t) => (
        <ProgressToast
          title={title}
          trailingAction={trailingAction}
          leadingAction={leadingAction}
          timeout={timeout}
        />
      ),
      { duration: timeout },
    );

    return id;
  };

  return { showToast, showProgressToast };
}
