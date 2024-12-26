import { cn } from '../../../utils/classNames.utils';
import Image from 'next/image';
import React, { useState } from 'react';

interface HeadProfileProps {
  name: string;
  profileImage: string;
}

export const HeadProfile: React.FC<HeadProfileProps> = ({
  name,
  profileImage,
}) => {
  const [username, setUsername] = useState('');

  return (
    <div
      dir="ltr"
      className={cn('relative flex items-center transition-all duration-300')}
      onMouseEnter={() => setUsername(name)}
      onMouseLeave={() => setUsername('')}
    >
      {/* Expandable Container */}
      <div
        className={cn(
          'bg-brand-100 flex h-10 items-center gap-3 overflow-hidden rounded-lg p-1 shadow-2xl transition-all duration-300',
        )}
        style={{
          width: username ? `${40 + name.length * 7}px` : '40px', // Base width + dynamic text width
        }}
      >
        <Image
          src={profileImage}
          className="h-8 w-8 rounded-lg object-cover shadow-sm"
          alt="profile picture"
          width={32}
          height={32}
        />
        <span
          className={cn(
            'whitespace-nowrap text-sm font-normal text-gray-800 opacity-0 transition-all duration-500',
            username && 'opacity-100',
          )}
        >
          {username}
        </span>
      </div>
    </div>
  );
};
