import { cn } from '../../../utils/classNames.utils';
import React from 'react';
import { ReactComponent as USER_SVG } from '../../../assets/icons/profile vector-large.svg';
import { Icon } from '../Icon';
interface HeadProfileProps {
  profileImage?: string | null;
}

export const HeadProfile: React.FC<HeadProfileProps> = ({ profileImage }) => {
  return (
    <div dir="ltr" className={cn('relative flex items-center')}>
      {/* Static Container */}
      <div
        className={cn(
          'bg-surface-brand-100 flex h-10 items-center gap-3 rounded-lg p-1 shadow-2xl',
        )}
      >
        {profileImage ? (
          <img
            src={profileImage ?? USER_SVG}
            alt="profile picture"
            width={32}
            height={32}
          />
        ) : (
          <div className="bg bg-surface-brand-600-primary text-text-onbrand-neutral-primary-on600 flex h-8 w-8 items-center justify-center rounded-md object-contain shadow-sm">
            <Icon size="lg" name="user-round" />
          </div>
        )}
      </div>
    </div>
  );
};
