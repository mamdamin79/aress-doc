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
          ? 'bg-surface-brand-100 text-text-onbrand-colored-primary-on200_100_50'
          : 'hover:bg-surface-brand-100 bg-surface-neutral-primary text-text-neutral-primary',
      )}
    >
      <Icon name={icon.name} />
      {text}
    </button>
  );
};
