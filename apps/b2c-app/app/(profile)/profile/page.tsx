'use client';
import { cn, LogoutModal, ProfileSidebar } from 'design-system';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AddressForm } from './components/AddressForm/AddressForm';
import { BankAccountInformation } from './components/BankAccountInformation/BankAccountInformation';
export default function Profile() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  return (
    <div className="text-text-neutral-primary mx-auto flex w-full max-w-[1680px] justify-center">
      <div className="flex w-full flex-row gap-14 px-8 pb-28 pt-12 lg:px-20">
        <div className="flex w-full justify-center lg:w-[264px]">
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
            'hidden flex-grow lg:block',
            // activeSection === 'profile' && 'block',
          )}
        >
          <div className="flex flex-col gap-6">
            {/* {(
              <button
                // onClick={() => setActiveSection(undefined)}
                className="flex cursor-pointer items-center gap-1 text-right text-lg font-medium"
              >
                <Icon name="chevron-right" size="lg" />
                حساب کاربری
              </button>
            )} */}
            {/* <ProfileForm
              image={"https://placehold.co/600x600"}
              email={"mohammadaminsaheb@gmail.com"}
              fnameAndLname={"محمدامین صاحب"}
              nationalID={"1234567890"}
              phoneNumber={"09392892633"}
              username={"test"}
              // refetch={refetch}
            /> */}
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
      <Toaster position="top-left" />
    </div>
  );
}
