import { cn } from '../../../utils/classNames.utils';
import React from 'react';
import { Icon, IconProps } from '../Icon';

export interface SquaredButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icons: [IconProps, IconProps] | [IconProps];
  badge: {
    enabled: boolean;
    text?: string;
  };
}

export const SquaredButton: React.FC<SquaredButtonProps> = ({
  badge,
  icons,
}) => {
  return (
    <button className="bg-brand-100 group relative flex h-10 w-10 items-center justify-center rounded-lg p-1 shadow-2xl">
      {/* Button content */}
      <div className="bg-brand-600 group-hover:bg-brand-700 flex h-8 w-8 cursor-pointer overflow-hidden rounded-md text-white transition-colors">
        <div
          className={cn(
            'flex h-fit w-8 origin-center translate-y-1 flex-col items-center gap-2 transition-transform duration-[400ms] group-hover:-translate-y-7',
            icons.length === 1 &&
              'h-full translate-y-0 justify-center group-hover:-translate-y-0',
          )}
        >
          {icons[0] && (
            <Icon name={icons[0].name} size={icons[0].size ?? 'lg'} />
          )}
          {icons[1] && (
            <Icon name={icons[1].name} size={icons[1].size ?? 'lg'} />
          )}{' '}
        </div>
      </div>

      {/* red badge */}
      {badge.enabled && (
        <div className="absolute left-5 top-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-red-600 text-white transition-all group-hover:left-6 group-hover:top-0 group-hover:h-5 group-hover:w-5">
          <span className="invisible text-xs font-semibold opacity-0 transition-all group-hover:visible group-hover:opacity-100">
            {badge.text}
          </span>
        </div>
      )}
    </button>
  );
};
