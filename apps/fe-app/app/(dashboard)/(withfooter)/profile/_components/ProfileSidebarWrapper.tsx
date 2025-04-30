'use client';
import { ProfileSidebar } from 'design-system';
import React, { useState } from 'react';
import { LogoutModal } from './LogoutModal';
interface ProfileSidebarWrapperProps {
  title?: string;
  subTitle?: string;
}
export const ProfileSidebarWrapper: React.FC<ProfileSidebarWrapperProps> = ({
  title,
  subTitle,
}) => {
  const [isLogoutModalOpen, setisLogoutModalOpen] = useState(false);
  return (
    <>
      <ProfileSidebar
        title={title}
        subTitle={subTitle}
        onLogoutBtn={() => setisLogoutModalOpen(true)}
      />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setisLogoutModalOpen(false)}
      />
    </>
  );
};
