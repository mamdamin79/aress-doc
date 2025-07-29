'use client';
import Image from 'next/image';
import React from 'react';
import { ProfileSidebarOption } from './ProfileSidebarOption';
import { ReactComponent as UserSVG } from '../../../assets/icons/profile-vector-large.svg';
import { cn } from '../../../utils';
import { ProfileSidebarItem } from './ProfileSidebar.types';
export interface ProfileSidebarProps {
  image?: string | null;
  title?: string;
  subTitle?: string;
  onNavigation?: (section: string) => void;
  activeSection?: string;
  items: ProfileSidebarItem[];
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  image,
  subTitle,
  title,
  onNavigation,
  activeSection,
  items = [],
}) => {
  return (
    <div className="border-border-neutral-secondary bg-surface-neutral-primary flex h-fit w-full flex-col gap-4 rounded-3xl border-2 p-4">
      <div className="flex flex-row items-center gap-3">
        <div className="bg-surface-neutral-secondary flex h-14 w-14 items-center justify-center rounded-2xl p-1">
          <div className="bg-surface-neutral-background flex h-12 w-12 flex-col items-center justify-end overflow-hidden rounded-xl">
            <div className={cn('object-cover', `h-[120px] w-[120px]`)}>
              {image ? (
                <Image
                  alt="profile image"
                  src={image}
                  width={48}
                  height={48}
                  className={cn('object-cover', image && `h-[120px] w-[120px]`)}
                />
              ) : (
                <UserSVG width={48} height={48} />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-md font-semibold">{title}</span>
          <span className="text-text-neutral-secondary text-sm font-medium">
            {subTitle}
          </span>
        </div>
      </div>
      <div className="border-border-neutral-secondary w-full border-t"></div>
      <div className="flex w-full flex-col gap-2">
        {items.map((item) => (
          <ProfileSidebarOption
            key={item.key}
            text={item.text}
            icon={item.icon}
            isActive={activeSection === item.key}
            onClick={() => {
              item.onClick?.();
              onNavigation?.(item.key);
            }}
          />
        ))}
      </div>
    </div>
  );
};
