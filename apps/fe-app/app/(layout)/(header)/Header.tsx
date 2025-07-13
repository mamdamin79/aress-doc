'use client';
import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import PRODUCT_LOGO from '@aress-assets/icons/fullLogo.svg';
import { useWindowSize, useWindowScroll } from '@uidotdev/usehooks';
import {
  cn,
  HeadProfile,
  IconProps,
  ModalProvider,
  SquaredButton,
} from 'design-system';
import { useHeaderVisibility, useHtmlPaddingRight } from '../../../hooks';
import { DESKTOP_BREAKPOINT } from './Header.constants';
import { BurgerMenu } from './BurgerMenu';
import { DesktopMenu } from './DesktopMenu';
import { MenuData } from './HeaderDataLite';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useThemeToggle } from '../../../hooks';
import { OpenAPI, useDashboardsServiceGetDashboards } from '@openapi';
import { fetchToken } from '../../(auth)/auth.utils';
import { buildDashboardUrl, useDashboardActions } from './header.utils';

export const Header: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const { isHeaderVisible } = useHeaderVisibility();
  const [{ y: scrollY }] = useWindowScroll();
  const currentScrollY = scrollY ?? 0;
  const htmlPaddingRight = useHtmlPaddingRight();
  const { toggleTheme, theme } = useThemeToggle();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchToken()
      .then((t) => {
        if (!t) throw new Error('Failed to fetch token');
        OpenAPI.HEADERS = { Authorization: `Bearer ${t}` };
        setToken(t);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchToken()
      .then((t) => {
        if (!t) throw new Error('Failed to fetch token');
        OpenAPI.HEADERS = { Authorization: `Bearer ${t}` };
        setToken(t);
      })
      .catch(console.error);
  }, []);

  const query = useDashboardsServiceGetDashboards(undefined, {
    enabled: false, // prevent auto-fetch
  });

  useEffect(() => {
    if (token) {
      query.refetch();
    }
  }, [token]);

  useEffect(() => {
    if (!query.data || pathname !== '/') return;

    const searchParams = new URLSearchParams(window.location.search);
    const dashboardIdParam = searchParams.get('dashboardId');
    const dashboardNameParam = searchParams.get('dashboardName');

    const storedDashboard = localStorage.getItem('activeDashboard');

    const activeDashboard =
      query.data.find((d) => String(d.identifier) === dashboardIdParam) ||
      query.data.find((d) => String(d.identifier) === storedDashboard) ||
      query.data[0];

    if (!activeDashboard) return;

    const activeId = String(activeDashboard.identifier);
    const activeName = activeDashboard.name;
    const safeName = activeName.replace(/[\s\u200C]+/g, '-');

    if (dashboardIdParam !== activeId || dashboardNameParam !== safeName) {
      const newParams = new URLSearchParams(window.location.search);
      newParams.set('dashboardId', activeId);
      newParams.set('dashboardName', safeName);

      const newUrl = `${window.location.pathname}?${newParams.toString()}`;
      window.history.replaceState(null, '', newUrl);
    }

    localStorage.setItem('activeDashboard', activeId);
  }, [query.data, pathname]);
  useEffect(() => {
    const dashboardIdParam = searchParams.get('dashboardId');
    const current = localStorage.getItem('activeDashboard');
    if (dashboardIdParam && dashboardIdParam !== current) {
      localStorage.setItem('activeDashboard', dashboardIdParam);
    }
  }, [searchParams]);
  const menuData = useMemo(() => {
    if (!query.data) return MenuData;

    const updatedMenuData = [...MenuData];
    const dashboardSection = updatedMenuData[0]?.dropdown?.find(
      (group) => group.id === 'userDashboards',
    );
    if (dashboardSection) {
      dashboardSection.children = query.data.map((dashboard) => {
        const isActive =
          pathname === '/' &&
          String(dashboard.identifier) ===
            (searchParams.get('dashboardId') ??
              localStorage.getItem('activeDashboard'));

        return {
          text: dashboard.name,
          link: buildDashboardUrl(dashboard.identifier, dashboard.name),
          isDashboard: true,
          isActive,
        };
      });
    }

    return updatedMenuData;
  }, [query.data, pathname, searchParams]);

  const activeTabIndex = useMemo(() => {
    return menuData.findIndex((menuItem) => menuItem.link === pathname);
  }, [menuData, pathname]);

  const themeIcons: [IconProps, IconProps] | [IconProps] =
    theme === 'light'
      ? [{ name: 'sun' }, { name: 'moon' }]
      : [{ name: 'moon' }, { name: 'sun' }];

  const { width } = useWindowSize();
  const dashboardActions = useDashboardActions();
  if (typeof width !== 'number') return null;

  return (
    <ModalProvider onActions={dashboardActions}>
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
              {width >= DESKTOP_BREAKPOINT ? (
                <DesktopMenu menuItems={menuData} activeTab={activeTabIndex} />
              ) : (
                <BurgerMenu menuItems={menuData} />
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
            <Link href={'/profile'}>
              <HeadProfile profileImage="https://picsum.photos/200" />
            </Link>
          </div>
        </div>
        <div className="invisible h-[80px]" />
      </div>
    </ModalProvider>
  );
};
