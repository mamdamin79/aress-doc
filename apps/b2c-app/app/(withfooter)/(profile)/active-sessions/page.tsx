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
      gradientClass:
        'bg-gradient-to-b from-surface-accent-blue-400 to-surface-accent-blue-700',
    },
    {
      deviceType: 'iOS 16',
      browserIcon: { name: 'CustomSafari', size: 'md' },
      browserName: 'Safari 16',
      location: 'مونترال، کانادا',
      isCurrent: false,
      loginDate: '۱۴۰۴/۴/۷',
      loginTime: '۱۳:۰۴',
      gradientClass:
        'bg-gradient-to-b from-surface-accent-blue-300 to-surface-accent-blue-500',
    },
    {
      deviceType: 'Android 12',
      browserIcon: { name: 'globe', size: 'md' },
      browserName: 'Samsung Internet 25',
      location: 'مونترال، کانادا',
      isCurrent: false,
      loginDate: '۱۴۰۴/۴/۷',
      loginTime: '۱۳:۰۴',
      gradientClass:
        'bg-gradient-to-b from-surface-accent-green-300 to-surface-accent-green-500',
    },
    {
      deviceType: 'Mac 14 pro',
      browserIcon: { name: 'CustomEdge', size: 'md' },
      browserName: 'Microsoft Edge 138',
      location: 'مونترال، کانادا',
      isCurrent: false,
      loginDate: '۱۴۰۴/۴/۷',
      loginTime: '۱۳:۰۴',
      gradientClass:
        'bg-gradient-to-b from-surface-accent-gray-400 to-surface-accent-gray-700',
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

      <div className="border-border-neutral-tertiary mb-7 h-[1px] w-full border"></div>

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
            variant="b2c"
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
            <div className="mb-2" key={`session-${index}`}>
              <ActiveSession {...session} />
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
