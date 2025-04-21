import { cn } from '../../../utils/classNames.utils';
import React from 'react';
import { Icon, IconProps } from '../Icon';

export interface SquaredButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icons: [IconProps, IconProps] | [IconProps];
  badge?: {
    enabled: boolean;
    text?: string;
  };
  onClick?: () => void;
}

export const SquaredButton: React.FC<SquaredButtonProps> = ({
  badge = {
    enabled: false,
  },
  icons,
  onClick,
  ...props
}) => {
  const [currentIcons, setCurrentIcons] = React.useState(icons);

  const handleClick = () => {
    if (currentIcons.length === 2) {
      setCurrentIcons([currentIcons[1], currentIcons[0]]);
    }
    onClick?.();
  };
  return (
    <button
      {...props}
      onClick={handleClick}
      className="bg-brand-100 group relative flex h-10 w-10 items-center justify-center rounded-lg p-1 shadow-2xl"
    >
      {/* Button content */}
      <div className="bg-brand-600 group-hover:bg-brand-700 flex h-8 w-8 cursor-pointer overflow-hidden rounded-md text-white transition-colors">
        <div
          className={cn(
            'flex h-fit w-8 translate-y-1 flex-col items-center gap-2 transition-transform duration-[400ms] will-change-transform group-hover:-translate-y-7',
            icons.length === 1 &&
              'h-full translate-y-0 justify-center group-hover:-translate-y-0',
          )}
        >
          {currentIcons[0] && (
            <Icon
              name={currentIcons[0].name}
              size={currentIcons[0].size ?? 'lg'}
            />
          )}
          {currentIcons[1] && (
            <Icon
              name={currentIcons[1].name}
              size={currentIcons[1].size ?? 'lg'}
            />
          )}
        </div>
      </div>

      {/* red badge */}
      {badge.enabled && (
        <div className="absolute left-5 top-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-red-600 text-white transition-all group-hover:top-0 group-hover:h-5 group-hover:w-5">
          <span className="invisible text-xs font-semibold opacity-0 transition-all group-hover:visible group-hover:opacity-100">
            {badge.text}
          </span>
        </div>
      )}
    </button>
  );
};
