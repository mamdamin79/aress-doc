import { cn } from './../../../utils';
import React from 'react';

interface Props {
  mode: 'active' | 'passed' | 'inactive';
  status?: 'error' | 'success';
  children?: React.ReactNode;
}

export function ProgressCircle({ mode, children, status }: Props) {
  if (mode === 'active')
    return (
      <div className="bg-surface-brand-300-disable absolute -top-5 flex h-8 w-8 items-center justify-center rounded-full">
        <div className="border-border-brand-primary-600 bg-surface-neutral-background flex h-6 w-6 items-center justify-center rounded-full border-2">
          <div className="bg-surface-brand-600-primary h-2.5 w-2.5 rounded-full" />
        </div>
      </div>
    );

  if (mode === 'inactive')
    return (
      <div
        className={cn(
          'text-icon-neutral-white absolute -top-4 flex h-6 w-6 items-center justify-center rounded-full',
          {
            'bg-surface-brand-600-primary': status === 'success',
            'bg-surface-message-error-600-primary': status === 'error',
          },
        )}
      >
        {children}
      </div>
    );

  if (mode === 'passed')
    return (
      <div className="border-border-neutral-primary bg-surface-neutral-background absolute -top-4 flex h-6 w-6 items-center justify-center rounded-full border-2">
        <div className="bg-surface-accent-gray-300 h-2.5 w-2.5 rounded-full" />
      </div>
    );
}
