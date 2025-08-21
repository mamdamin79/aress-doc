import React from 'react';
import { LoginHistoryItem } from './_components/LoginHistoryItem';

export default function LoginHistory() {
  const loginData = [
    {
      date: 'امروز',
      items: [
        {
          deviceType: 'Windows Chrome',
          ip: '۱۹۲.۱۶۸.۱۲.۱۰',
          loginTime: '۱۳:۰۴',
          loginDate: '۱۴۰۴/۴/۷',
          type: 'ورود',
        },
      ],
    },
    {
      date: 'دیروز',
      items: [
        {
          deviceType: 'Windows Chrome',
          ip: '۱۹۲.۱۶۸.۱۲.۱۰',
          loginTime: '۱۳:۰۴',
          loginDate: '۱۴۰۴/۴/۷',
          type: 'خروج',
        },
        {
          deviceType: 'Windows Chrome',
          ip: '۱۹۲.۱۶۸.۱۲.۱۰',
          loginTime: '۱۳:۰۴',
          loginDate: '۱۴۰۴/۴/۷',
          type: 'ورود',
        },
      ],
    },
    {
      date: '۶ تیر ۱۴۰۴',
      items: [
        {
          deviceType: 'Windows Chrome',
          ip: '۱۹۲.۱۶۸.۱۲.۱۰',
          loginTime: '۱۳:۰۴',
          loginDate: '۱۴۰۴/۴/۷',
          type: 'خروج',
        },
        {
          deviceType: 'Windows Chrome',
          ip: '۱۹۲.۱۶۸.۱۲.۱۰',
          loginTime: '۱۳:۰۴',
          loginDate: '۱۴۰۴/۴/۷',
          type: 'ورود',
        },
        {
          deviceType: 'Windows Chrome',
          ip: '۱۹۲.۱۶۸.۱۲.۱۰',
          loginTime: '۱۳:۰۴',
          loginDate: '۱۴۰۴/۴/۷',
          type: 'خروج',
        },
      ],
    },
  ];

  return (
    <div>
      {loginData.map((group, groupIndex) => (
        <div key={groupIndex}>
          <div className="text-text-neutral-secondary mb-2 text-right text-lg font-semibold">
            {group.date}
          </div>
          {group.items.map((item, itemIndex) => (
            <LoginHistoryItem
              key={itemIndex}
              deviceType={item.deviceType}
              ip={item.ip}
              loginTime={item.loginTime}
              loginDate={item.loginDate}
              type={item.type as 'ورود' | 'خروج'}
            />
          ))}
          <div className="bg-surface-neutral-tertiary mb-7 mt-1 h-[1px] w-full"></div>
        </div>
      ))}
    </div>
  );
}
