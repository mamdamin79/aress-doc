'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FooterLite } from '../(layout)/(footer-lite)';
import PRODUCT_LOGO from '@aress-assets/icons/product_logo.svg';
import {
  Breadcrumb,
  cn,
  HeaderMenus,
  HeadProfile,
  SquaredButton,
} from 'design-system';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if the user is scrolling down or up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div className="flex w-full flex-col gap-2 pt-4">
        {/* Always fixed top header */}
        <div
          className={cn(
            'fixed right-0 top-0 z-40 flex w-full flex-row items-center justify-between bg-white px-20 pb-2 pt-4',
            !isVisible && 'shadow-sm',
          )}
        >
          <Image
            src={PRODUCT_LOGO}
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            alt="product logo"
          />
          <div className="flex flex-row gap-3">
            <HeadProfile
              name="سینا محمدی"
              profileImage="https://picsum.photos/200"
            />
            <SquaredButton
              icons={[{ name: 'bell' }]}
              badge={{ enabled: true, text: '3' }}
            />
            <SquaredButton
              icons={[{ name: 'moon' }, { name: 'sun' }]}
              badge={{ enabled: false }}
            />
          </div>
        </div>

        {/* Hideable menu */}
        <div
          id="hideable"
          className={cn(
            isVisible ? 'translate-y-0' : '-translate-y-full',
            'fixed top-16 z-[35] flex w-full flex-row justify-between border-b border-gray-300 bg-white px-20 pb-4 pt-6 transition-transform duration-300',
          )}
        >
          <HeaderMenus
            menuItems={[
              {
                name: 'داشبورد مدیریتی',
                subMenu: [{ groupLabel: 'تست', children: [] }],
              },
              { name: 'گزارش‌ها' },
            ]}
          />
          <div className="flex flex-row gap-1">
            <span className="text-gray-600">تاریخ امروز: </span>
            <span className="font-medium">
              {new Date().toLocaleDateString('fa-IR')}
            </span>
          </div>
        </div>
        {/* hidden div */}
        <div className="h-32"></div>
        {/* Breadcrumb */}
        <div className="px-20 pt-3">
          <Breadcrumb
            items={[
              { title: 'گزارش ها' },
              {
                title:
                  'ورود و خروج تجمعی سرمایه‌گذاران حقیقی به سهام و درآمد ثابت',
              },
            ]}
          />
        </div>
      </div>
      {children}
      <FooterLite />
    </>
  );
}
