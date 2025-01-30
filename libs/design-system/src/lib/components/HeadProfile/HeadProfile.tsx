import { cn } from '../../../utils/classNames.utils';
import Image from 'next/image';
import React from 'react';

interface HeadProfileProps {
  profileImage: string;
}

export const HeadProfile: React.FC<HeadProfileProps> = ({ profileImage }) => {
  return (
    <div dir="ltr" className={cn('relative flex items-center')}>
      {/* Static Container */}
      <div
        className={cn(
          'bg-brand-100 flex h-10 items-center gap-3 rounded-lg p-1 shadow-2xl',
        )}
      >
        <Image
          src={profileImage}
          className="h-8 w-8 rounded-lg object-cover shadow-sm"
          alt="profile picture"
          width={32}
          height={32}
        />
      </div>
    </div>
  );
};
