'use client';
import React, { useState } from 'react';
import { ActiveSession, ActiveSessionProps } from './_components/ActiveSession'; // Assuming the component is in the same folder
import { Button, LogoutModal } from 'design-system';
import { OldSessionLogout } from './_components/OldSessionLogout';

export default function ActiveSessionsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const sessionsData: ActiveSessionProps[] = [
    {
      deviceType: 'Windows 10',
      browserIcon: { name: 'chrome', size: 'md' },
      browserName: 'Chrome 138',
      location: undefined, // The image does not show a location for the current device
      isCurrent: true,
      loginDate: '۱۴۰۴/۴/۷',
      loginTime: '۱۳:۰۴',
      onTerminate: () =>
        console.log('Current session cannot be terminated from UI'),
    },
    {
      deviceType: 'iOS 16',
      browserIcon: { name: 'search-check', size: 'md' },
      browserName: 'Safari 16',
      location: 'مونترال، کانادا',
      isCurrent: false,
      loginDate: '۱۴۰۴/۴/۷',
      loginTime: '۱۳:۰۴',
      onTerminate: () => console.log('Terminate iOS session'),
    },
    {
      deviceType: 'Android 12',
      browserIcon: { name: 'search-code', size: 'md' },
      browserName: 'Samsung Internet 25',
      location: 'مونترال، کانادا',
      isCurrent: false,
      loginDate: '۱۴۰۴/۴/۷',
      loginTime: '۱۳:۰۴',
      onTerminate: () => console.log('Terminate Android session'),
    },
    {
      deviceType: 'Mac 14 pro',
      browserIcon: { name: 'search-slash', size: 'md' },
      browserName: 'Microsoft Edge 138',
      location: 'مونترال، کانادا',
      isCurrent: false,
      loginDate: '۱۴۰۴/۴/۷',
      loginTime: '۱۳:۰۴',
      onTerminate: () => console.log('Terminate Mac session'),
    },
  ];

  const currentSession = sessionsData.find((session) => session.isCurrent);
  const otherSessions = sessionsData.filter((session) => !session.isCurrent);

  return (
    <div className="">
      <h2 className="text-text-neutral-primary mb-4 text-lg font-medium">
        این دستگاه
      </h2>
      {currentSession && (
        <div className="mb-5">
          <ActiveSession {...currentSession} />
        </div>
      )}

      <div className="bg-surface-neutral-tertiary mb-7 h-[1px] w-full"></div>

      <div>
        <div className="flex items-start justify-between">
          <div className="text-text-neutral-primary mb-4 text-lg font-medium">
            سایر دستگاه‌های فعال
          </div>
          <Button
            onClick={() => setIsOpen(true)}
            theme="error"
            mode="secondary"
            className="h-[34px] w-[148px] text-sm"
          >
            خروج از سایر دستگاه‌ها
          </Button>
          <LogoutModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onLogout={() => alert('در دست ساخت !')}
            title="خروج از حساب در سایر دستگاه‌ها"
            subtitle="آیا مطمئن هستید که می‌خواهید از حساب کاربری خود در سایر دستگاه‌ها خارج شوید؟"
            titleAlign="right"
          />
        </div>
        {otherSessions.length > 0 ? (
          otherSessions.map((session, index) => (
            <div className="mb-2">
              <ActiveSession
                key={index} // Using index is okay for static lists
                {...session}
              />
            </div>
          ))
        ) : (
          <p>هیچ دستگاه فعال دیگری وجود ندارد.</p>
        )}
      </div>

      <OldSessionLogout />
    </div>
  );
}
