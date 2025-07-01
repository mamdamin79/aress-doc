'use client';

import React, { useEffect, useState } from 'react';
import { ProfileForm } from '../../../components';
import { cn, Icon, ProfileSidebar } from 'design-system';
import { LogoutModal } from './_components/LogoutModal';
import { useThrottle, useWindowSize } from '@uidotdev/usehooks';
import { AressApiUser, OpenAPI, useUsersServiceGetUsersMe } from '@openapi';
import { fetchToken } from '../../../(auth)/auth.utils';

const ProfilePage = () => {
  const [isApiReady, setIsApiReady] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState<undefined | string>(
    undefined,
  );
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { width } = useWindowSize();
  const throttledWidth = useThrottle(width, 200) ?? 0;
  const isDesktop = throttledWidth > 1024;

  // Fetch token and set OpenAPI header once
  useEffect(() => {
    const setupApi = async () => {
      try {
        const token = await fetchToken();
        if (!token) throw new Error('Failed to fetch access token');
        OpenAPI.HEADERS = {
          Authorization: `Bearer ${token}`,
        };
        setIsApiReady(true);
      } catch (err) {
        console.error('API setup failed:', err);
      }
    };

    setupApi();
  }, []);

  const { data, refetch } = useUsersServiceGetUsersMe(undefined, {
    enabled: isApiReady,
  });

  const user = data as AressApiUser | undefined;
  const userPhoneNumber = user?.phoneNumber
    ? `${user.phoneNumber.replace('+', '')}+`
    : '';
  const fullName = (user?.firstName ?? '') + ' ' + (user?.lastName ?? '');
  return (
    <div className="text-text-neutral-primary mx-auto flex w-full max-w-[1680px] justify-center">
      <div className="flex w-full flex-row gap-14 px-8 pb-28 pt-12 lg:px-20">
        {!(activeSection && !isDesktop) && (
          <div className="flex w-full justify-center lg:w-[264px]">
            <ProfileSidebar
              image={user?.profilePicture}
              title={fullName}
              subTitle={userPhoneNumber}
              onLogoutBtn={() => setIsLogoutModalOpen(true)}
              onNavigation={(section) => setActiveSection(section)}
              activeSection={isDesktop ? 'profile' : activeSection}
            />
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

            <ProfileForm
              image={user?.profilePicture}
              onImageChange={setImage}
              email={user?.email ?? ''}
              fnameAndLname={fullName}
              nationalID={
                user?.nationalCode ? Number(user.nationalCode) : undefined
              }
              phoneNumber={userPhoneNumber}
              username={user?.username}
              refetch={refetch}
            />
          </div>
        </div>
      </div>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
};

export default ProfilePage;
