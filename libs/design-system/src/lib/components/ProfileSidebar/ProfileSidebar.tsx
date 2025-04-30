import Image from 'next/image';
import React from 'react';
import { ProfileSidebarOption } from './ProfileSidebarOption';
import UserSVG from '../../../assets/icons/profile-vector-large.svg';
import { cn } from 'libs/design-system/src/utils';
export interface ProfileSidebarProps {
  image?: string;
  title?: string;
  subTitle?: string;
  onLogoutBtn?: () => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  image,
  subTitle,
  title,
  onLogoutBtn,
}) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl border-2 border-gray-100 p-4 lg:w-[264px]">
      <div className="flex flex-row items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 p-1">
          <div className="flex h-12 w-12 flex-col items-center justify-end overflow-hidden rounded-xl bg-white">
            <Image
              alt="profile image"
              src={image ? image : UserSVG}
              width={48}
              height={48}
              className={cn(
                'h-12 w-12 object-contain',
                !image && 'translate-y-2',
              )}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-md font-semibold">{title}</span>
          <span className="text-sm font-medium text-gray-600">{subTitle}</span>
        </div>
      </div>
      <div className="w-full border-t border-gray-200"></div>
      <div className="flex w-full flex-col gap-2">
        <ProfileSidebarOption
          text="حساب کاربری"
          icon={{ name: 'user' }}
          isActive
        />
        <ProfileSidebarOption
          onClick={onLogoutBtn}
          text="خروج از حساب کاربری"
          icon={{ name: 'power' }}
        />
      </div>
    </div>
  );
};
