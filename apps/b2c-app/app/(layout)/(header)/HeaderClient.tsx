'use client';

import React, { useMemo } from 'react';
import { ReactComponent as PRODUCT_LOGO } from '../../../assets/images/logos/Logo.svg';
import { useWindowSize, useWindowScroll } from '@uidotdev/usehooks';
import {
  cn,
  HeadProfile,
  IconProps,
  ModalProvider,
  SquaredButton,
} from 'design-system';
import {
  useHeaderVisibility,
  useHtmlPaddingRight,
  useThemeToggle,
} from '@shared';
import { DESKTOP_BREAKPOINT } from './Header.constants';
import { BurgerMenu } from '@shared';
import { DesktopMenu } from '@shared';
import { MenuData } from './HeaderDataLite';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const HeaderClient: React.FC = () => {
  const { isHeaderVisible } = useHeaderVisibility();
  const [{ y: scrollY }] = useWindowScroll();
  const currentScrollY = scrollY ?? 0;
  const htmlPaddingRight = useHtmlPaddingRight();
  const { toggleTheme, theme } = useThemeToggle();

  const themeIcons: [IconProps, IconProps] | [IconProps] =
    theme === 'light'
      ? [{ name: 'sun' }, { name: 'moon' }]
      : [{ name: 'moon' }, { name: 'sun' }];

  const pathname = usePathname();
  const activeTabIndex = useMemo(() => {
    return MenuData.findIndex((menuItem) => menuItem.link === pathname);
  }, [MenuData, pathname]);
  const { width } = useWindowSize();

  if (typeof width !== 'number') return null;

  return (
    <ModalProvider>
      <div>
        <div
          className={cn(
            'bg-surface-neutral-background fixed right-0 top-0 z-[51] flex w-full flex-row items-center justify-between border-b-2 px-8 pb-3 pt-4 transition-transform duration-300',
            currentScrollY === 0
              ? 'border-border-neutral-primary'
              : 'border-border-neutral-secondary shadow-sm',
            isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
          )}
          style={{ right: htmlPaddingRight }}
        >
          <div className="flex flex-row items-center gap-6">
            <Link href="/">
              <div className="text-text-brand-primary-600 h-12 w-12 object-contain">
                <PRODUCT_LOGO />
              </div>
            </Link>
            <div className="pt-2">
              {width >= DESKTOP_BREAKPOINT ? (
                <DesktopMenu menuItems={MenuData} activeTab={activeTabIndex} />
              ) : (
                <BurgerMenu menuItems={MenuData} />
              )}
            </div>
          </div>
          <div
            className="flex flex-row gap-3"
            style={{ paddingLeft: htmlPaddingRight }}
          >
            <SquaredButton
              icons={themeIcons}
              badge={{ enabled: false }}
              onClick={toggleTheme}
            />
            <Link href="/profile">
              <HeadProfile />
            </Link>
          </div>
        </div>
        <div className="invisible h-[80px]" />
      </div>
    </ModalProvider>
  );
};
