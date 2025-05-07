import React from 'react';
import { Icon, IconProps } from '../Icon';
import { cn } from 'libs/design-system/src/utils';
interface ProfileSidebarOptionProps {
  text: string;
  icon: IconProps;
  isActive?: boolean;
  onClick?: () => void;
}
export const ProfileSidebarOption: React.FC<ProfileSidebarOptionProps> = ({
  text,
  icon,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full cursor-pointer flex-row items-center gap-2 rounded-sm p-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-brand-100 text-brand-800'
          : 'hover:bg-brand-100 bg-baseBackground',
      )}
    >
      <Icon name={icon.name} />
      {text}
    </button>
  );
};
