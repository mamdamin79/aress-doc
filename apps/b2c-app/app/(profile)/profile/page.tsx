'use client';
import { cn, LogoutModal, ProfileSidebar } from 'design-system';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AddressForm } from './components/AddressForm/AddressForm';
import { BankAccountInformation } from './components/BankAccountInformation/BankAccountInformation';
import { ProfileForm } from './components/ProfileForm/ProfileForm';
export default function Profile() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [activeSection] = useState<string>('profile');
  return (
    <div className="text-text-neutral-primary mx-auto flex w-full max-w-[1680px] justify-center">
      <div className="flex w-full flex-row px-8 pb-28 pt-12 md:gap-8 md:px-8 xl:gap-14 xl:px-20">
        <div className="flex w-[264px] justify-center">
          <ProfileSidebar
            items={[
              {
                key: 'profile',
                text: 'حساب کاربری',
                icon: { name: 'user' },
              },
              {
                key: 'messages',
                text: 'پیام‌های من',
                icon: { name: 'bell' },
              },
              {
                key: 'sessions',
                text: 'نشست‌های فعال',
                icon: { name: 'monitor-smartphone' },
              },
              {
                key: 'history',
                text: 'تاریخچه ورود و خروج',
                icon: { name: 'arrow-left-right' },
              },
              {
                key: 'logout',
                text: 'خروج از حساب کاربری',
                icon: { name: 'power' },
                onClick: () => setIsLogoutModalOpen(true),
              },
            ]}
            image={''}
            title={'ممدمین'}
            subTitle={'09392892633'}
            onNavigation={() => {
              // setActiveSection(section);
            }}
            // activeSection={isDesktop ? 'profile' : activeSection}
          />
        </div>
        <div
          className={cn(
            'hidden max-w-[1032px] flex-grow md:block',
            activeSection === 'profile' && 'block',
          )}
        >
          <div className="flex flex-col gap-6">
            <ProfileForm />
            <AddressForm />
            <BankAccountInformation />
          </div>
        </div>
      </div>
      <LogoutModal
        titleAlign="right"
        onLogout={() => alert('عملیات خروج انجام شد !')}
        title="خروج از حساب کاربری"
        isOpen={isLogoutModalOpen}
        subtitle="آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟"
        onClose={() => setIsLogoutModalOpen(false)}
      />
      <Toaster position="top-center" />
    </div>
  );
}
