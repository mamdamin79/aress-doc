import { cn } from '../../../utils/classNames.utils';
import Image from 'next/image';
import React from 'react';
import USER_SVG from '../../../assets/icons/profile vector-large.svg';
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
        <Image
          src={profileImage ?? USER_SVG}
          className="h-8 w-8 rounded-lg object-contain shadow-sm"
          alt="profile picture"
          width={32}
          height={32}
        />
      </div>
    </div>
  );
};
