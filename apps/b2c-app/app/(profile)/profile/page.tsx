'use client';
import { ProfileSidebar } from 'design-system';
import { Toaster } from 'react-hot-toast';
export default function Profile() {
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
                onClick: () => alert('خروج انجام شد!'),
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
        {/* <div
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
          </div>
        </div> */}
      </div>
      {/* <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      /> */}
      <Toaster position="top-left" />
    </div>
  );
}
