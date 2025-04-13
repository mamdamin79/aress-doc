import Image from 'next/image';
import React from 'react';
import { OptionsDropdownOption } from '../OptionsDropdown';
const UserSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    fill="#CACDD3"
  >
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </svg>
);
export interface ProfileSidebarProps {
  image?: string;
  title?: string;
  subTitle?: string;
  activeIndex?: number | null;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  image,
  subTitle,
  title,
  activeIndex,
}) => {
  return (
    <div className="flex w-[264px] flex-col gap-4 rounded-3xl border-2 border-gray-100 p-4">
      <div className="flex flex-row items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 p-1">
          <div className="flex h-12 w-12 flex-col items-center justify-end overflow-hidden rounded-xl bg-white">
            {image ? (
              <Image
                alt="profile image"
                src={image}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            ) : (
              <UserSVG />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-md">{title}</span>
          <span className="text-sm text-gray-600">{subTitle}</span>
        </div>
      </div>
      <div className="w-full border border-gray-200"></div>
      <div className="flex w-full flex-col">
        <OptionsDropdownOption
          text="حساب کاربری"
          icon={{ name: 'user' }}
          isActive={activeIndex === 0}
        />
        <OptionsDropdownOption
          text="خروج از حساب کاربری"
          icon={{ name: 'power' }}
        />
      </div>
    </div>
  );
};
