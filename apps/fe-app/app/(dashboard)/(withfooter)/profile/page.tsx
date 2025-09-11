'use client';

import React, { useState } from 'react';
import { ProfileForm } from '../../../components';
import { cn, Icon, ProfileSidebar, useCustomToast } from 'design-system';
import { LogoutModal } from 'design-system';
import { useThrottle, useWindowSize } from '@uidotdev/usehooks';
import {
  AressApiUser,
  useUsersServiceGetUsersMe,
  useUsersServicePostUsersLogout,
} from '@openapi';
import { Toaster } from 'react-hot-toast';
import { ProfileSidebarSkeleton } from './_components/skeletons/ProfileSidebarSkeleton';
import { ProfileFormSkeleton } from './_components/skeletons/ProfileFormSkeleton';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState<undefined | string>(
    undefined,
  );
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { width } = useWindowSize();
  const throttledWidth = useThrottle(width, 200) ?? 0;
  const isDesktop = throttledWidth > 1024;
  const router = useRouter();
  const { showToast } = useCustomToast();

  const logoutMutation = useUsersServicePostUsersLogout({
    onSuccess: () => {
      localStorage.removeItem('access_token');
    },
    onError: (error) => {
      console.error('خطا در خروج از حساب:', error);
    },
  });

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();

      await fetch('/api/logout', { method: 'POST' });

      router.push('/login');
      showToast({
        message: 'خروج با موفقیت انجام شد!',
        type: 'success',
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const { data, refetch } = useUsersServiceGetUsersMe();
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const user = data as AressApiUser | undefined;
  const profilePicture = user?.profilePicture
    ? baseURL + user.profilePicture
    : null;
  const fullName = (user?.firstName ?? '') + ' ' + (user?.lastName ?? '');
  return (
    <div className="text-text-neutral-primary mx-auto flex w-full max-w-[1680px] justify-center">
      <div className="flex w-full flex-row gap-14 px-8 pb-28 pt-12 lg:px-20">
        {!(activeSection && !isDesktop) && (
          <div className="flex w-full justify-center lg:w-[264px]">
            {data ? (
              <ProfileSidebar
                items={[
                  {
                    key: 'profile',
                    text: 'حساب کاربری',
                    icon: { name: 'user' },
                  },
                  {
                    key: 'logout',
                    text: 'خروج از حساب کاربری',
                    icon: { name: 'power' },
                    onClick: () => setIsLogoutModalOpen(true),
                  },
                ]}
                image={profilePicture}
                title={fullName}
                subTitle={user?.phoneNumber ?? ''}
                onNavigation={(section) => {
                  setActiveSection(section);
                }}
                activeSection={isDesktop ? 'profile' : activeSection}
              />
            ) : (
              <ProfileSidebarSkeleton />
            )}
          </div>
        )}

        <div
          className={cn(
            'hidden flex-grow lg:block',
            activeSection === 'profile' && 'block',
          )}
        >
          <div>
            {!isDesktop && activeSection && (
              <button
                onClick={() => setActiveSection(undefined)}
                className="flex cursor-pointer items-center gap-1 text-right text-lg font-medium"
              >
                <Icon name="chevron-right" size="lg" />
                حساب کاربری
              </button>
            )}
            {data ? (
              <ProfileForm
                image={profilePicture}
                email={user?.email ?? ''}
                fnameAndLname={fullName}
                nationalID={
                  user?.nationalCode ? Number(user.nationalCode) : undefined
                }
                phoneNumber={user?.phoneNumber ?? ''}
                username={user?.username}
                refetch={refetch}
              />
            ) : (
              <ProfileFormSkeleton />
            )}
          </div>
        </div>
      </div>
      <LogoutModal
        onLogout={() => handleLogout()}
        title="خروج از حساب کاربری"
        titleAlign="center"
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
      <Toaster position="top-left" />
    </div>
  );
};

export default ProfilePage;
