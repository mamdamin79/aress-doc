import React from 'react';
import { Icon } from '../../Icon';
import { cn } from '../../../../utils/classNames.utils';

export const SuccessOrFail = ({ status }: { status: 'done' | 'rejected' }) => {
  return (
    <div
      className={cn(
        'text-text-neutral-primary flex h-14 w-14 items-center justify-center rounded-full',
        status === 'done' && 'bg-surface-accent-vividgreen-100',
        status === 'rejected' && 'bg-surface-accent-red-100',
      )}
    >
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-full',
          status === 'done' && 'bg-surface-accent-vividgreen-300',
          status === 'rejected' && 'bg-surface-accent-red-300',
        )}
      >
        <div
          className={cn(
            'text-icon-onaccent-neutral-on600 flex h-10 w-10 items-center justify-center rounded-full',
            status === 'done' && 'bg-surface-accent-vividgreen-600',
            status === 'rejected' && 'bg-surface-accent-red-600',
          )}
        >
          {status === 'done' && <Icon name="check" size="lg" />}
          {status === 'rejected' && <Icon name="x" size="lg" />}
        </div>
      </div>
    </div>
  );
};
