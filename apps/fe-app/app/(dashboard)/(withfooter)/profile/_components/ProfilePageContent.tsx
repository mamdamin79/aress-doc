'use client';
import { AressApiUser } from '@openapi';
import React, { useState } from 'react';
import { ProfileForm } from '../../../../components';
import { cn, Icon, ProfileSidebar } from 'design-system';
import { LogoutModal } from './LogoutModal';
import { useThrottle, useWindowSize } from '@uidotdev/usehooks';

export const ProfilePageContent: React.FC<AressApiUser> = (user) => {
  const [activeSection, setActiveSection] = useState<undefined | string>(
    undefined,
  );
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { width } = useWindowSize();
  const throttledWidth = useThrottle(width, 200) ?? 0;
  const isDesktop = throttledWidth > 1024;
  return (
    <div className="mx-auto flex w-full max-w-[1680px] justify-center">
      <div className="flex w-full flex-row gap-14 px-8 pb-28 pt-12 lg:px-20">
        {!(activeSection && !isDesktop) && (
          <ProfileSidebar
            title="علی محمدی"
            subTitle="09339133898"
            onLogoutBtn={() => setIsLogoutModalOpen(true)}
            onNavigation={(section) => setActiveSection(section)}
            activeSection={isDesktop ? 'profile' : activeSection}
          />
        )}

        <div
          className={cn(
            'hidden w-full lg:block',
            activeSection == 'profile' && 'block',
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
              email={user.email}
              fnameAndLname=""
              nationalID={
                user.nationalCode ? Number(user.nationalCode) : undefined
              }
              phoneNumber={
                user.phoneNumber?.startsWith('+')
                  ? user.phoneNumber
                  : `+${user.phoneNumber}`
              }
              username={user.username}
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
