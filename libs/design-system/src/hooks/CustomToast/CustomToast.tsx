import { toast } from 'react-hot-toast';
import { bgIcon, icons, styleToasts } from './CustomToast.constants';
import { cn } from '../../utils';
import React, { useState, useEffect } from 'react';
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

    return (
      <div
        className={`animate-toast  transition-all duration-500 ease-in-out transform-gpu bg-brand-1000 w-fit rounded-lg relative h-[50px] flex items-center justify-center overflow-hidden`}
      >
        <div className="px-2 gap-2 w-full flex items-center">
          {leadingAction && (
            <span className="h-[32px] flex items-center justify-center text-yellow-500">
              {/* we temporary use a fixed icon here
              The problem with our icon component was that it caused the browser a crash
              when clicking on leading action. This needs to be resolved later. */}
              <LucideUndo2 />
            </span>
          )}
          <span className="text-white font-vazirmatn text-[16px]">{title}</span>
          {trailingAction && (
            <div className="inline-block">
              <Button {...trailingAction.ButtonProps}></Button>
            </div>
          )}
        </div>

        <div className="w-full h-1 absolute bottom-0 rounded-lg">
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
      { duration: timeout }
    );

    return id;
  };

  return { showToast, showProgressToast };
}
