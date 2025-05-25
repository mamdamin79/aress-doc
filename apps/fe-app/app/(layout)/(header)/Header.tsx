'use client';
import React from 'react';
import Image from 'next/image';
import PRODUCT_LOGO from '@aress-assets/icons/fullLogo.svg';
import { useWindowSize } from '@uidotdev/usehooks';
import { cn, HeadProfile, ModalProvider, SquaredButton } from 'design-system';
import { useHeaderVisibility, useHtmlPaddingRight } from '../../../hooks';
import { DESKTOP_BREAKPOINT } from './Header.constants';
import { BurgerMenu } from './BurgerMenu';
import { DesktopMenu } from './DesktopMenu';
import { MenuData } from './HeaderDataLite';
import { useWindowScroll } from '@uidotdev/usehooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const HeaderMenu: React.FC = () => {
  const { width } = useWindowSize();
  const pathname = usePathname();
  const activeTabIndex = MenuData.map((menuItem) => menuItem.link).indexOf(
    pathname,
  );

  if (typeof width !== 'number') return null;
  return width >= DESKTOP_BREAKPOINT ? (
    <DesktopMenu menuItems={MenuData} activeTab={activeTabIndex} />
  ) : (
    <BurgerMenu menuItems={MenuData} />
  );
};
export const Header: React.FC = () => {
  const { isHeaderVisible } = useHeaderVisibility();
  const [{ y: scrollY }] = useWindowScroll();
  const currentScrollY = scrollY ?? 0;
  const htmlPaddingRight = useHtmlPaddingRight();

  return (
    <ModalProvider>
      <div>
        {/* Always fixed top header */}
        <div
          className={cn(
            'fixed right-0 top-0 z-[51] flex w-full flex-row items-center justify-between border-b-2 bg-white px-8 pb-3 pt-4 transition-transform duration-300',
            currentScrollY === 0
              ? 'border-gray-300'
              : 'border-gray-200 shadow-sm',
            isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
          )}
          style={{
            right: htmlPaddingRight,
          }}
        >
          <div className="flex flex-row items-center gap-6">
            <Link href={'/'}>
              <Image
                src={PRODUCT_LOGO}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
                alt="product logo"
              />
            </Link>
            <div className="pt-2">
              <HeaderMenu />
            </div>
          </div>

          <div
            className="flex flex-row gap-3"
            style={{
              paddingLeft: htmlPaddingRight,
            }}
          >
            <SquaredButton
              icons={[{ name: 'sun' }, { name: 'moon' }]}
              badge={{ enabled: false }}
            />
            <Link href={'/profile'}>
              <HeadProfile profileImage="https://picsum.photos/200" />
            </Link>
          </div>
        </div>
        <div className={cn('invisible', `h-[80px]`)}></div>
      </div>
    </ModalProvider>
  );
};
