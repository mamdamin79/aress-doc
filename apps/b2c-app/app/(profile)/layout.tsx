'use client';
import { LogoutModal, ProfileSidebar } from 'design-system';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const activeSection = pathname ?? 'profile';

  return (
    <div className="text-text-neutral-primary mx-auto flex w-full max-w-[1680px] justify-center">
      <div className="flex w-full flex-row px-8 pb-28 pt-12 md:gap-8 md:px-8 xl:gap-14 xl:px-20">
        <div className="flex w-[264px] justify-center">
          <ProfileSidebar
            items={[
              { key: 'profile', text: 'حساب کاربری', icon: { name: 'user' } },
              { key: 'messages', text: 'پیام‌های من', icon: { name: 'bell' } },
              {
                key: 'active-sessions',
                text: 'نشست‌های فعال',
                icon: { name: 'monitor-smartphone' },
              },
              {
                key: 'login-history',
                text: 'تاریخچه ورود و خروج',
                icon: { name: 'arrow-left-right' },
              },
              {
                key: 'logout',
                text: 'خروج از حساب کاربری',
                icon: { name: 'power' },
              },
            ]}
            image={''}
            title={'ممدمین'}
            subTitle={'09392892633'}
            activeSection={`${activeSection.slice(1)}`}
            onNavigation={(section) => {
              if (section === 'logout') {
                setIsLogoutModalOpen(true);
              } else {
                router.push(`/${section}`);
              }
            }}
          />
        </div>

        <div className="hidden max-w-[1032px] flex-grow md:block">
          {children}
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
