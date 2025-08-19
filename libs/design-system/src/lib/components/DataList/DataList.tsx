import { cn } from '../../../utils/classNames.utils';
import React from 'react';

export type DataListProps = {
  className?: string;
  data: { key: string; value: string }[];
};

export const DataList: React.FC<DataListProps> = ({ className, data }) => {
  return (
    <div
      className={cn(
        'rounded-4xl bg-surface-neutral-tertiary flex items-center justify-center',
        className,
      )}
    >
      <div className="bg-surface-neutral-background border-border-neutral-secondary flex h-[92%] w-[85%] flex-col rounded-2xl border px-4">
        {data.map((item, idx) => (
          <React.Fragment key={item.key}>
            <div className="flex flex-1 items-center justify-between">
              <div className="text-text-neutral-primary text-sm font-medium">
                {item.key}
              </div>
              <div className="text-text-neutral-primary text-sm font-medium">
                {item.value}
              </div>
            </div>
            {idx < data.length - 1 && (
              <div className="bg-surface-neutral-secondary h-[2px] w-full rounded-2xl"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
