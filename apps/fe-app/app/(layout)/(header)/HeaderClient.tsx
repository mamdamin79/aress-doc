'use client';

import React, { useEffect, useMemo } from 'react';
import { ReactComponent as PRODUCT_LOGO } from '@aress-assets/icons/fullLogo.svg';
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
import { usePathname, useSearchParams } from 'next/navigation';
import {
  useDashboardsServiceGetDashboards,
  useUsersServiceGetUsersMe,
} from '@openapi';
import { buildDashboardUrl, useDashboardActions } from './header.utils';

export const HeaderClient: React.FC = () => {
  const { isHeaderVisible } = useHeaderVisibility();
  const [{ y: scrollY }] = useWindowScroll();
  const currentScrollY = scrollY ?? 0;
  const htmlPaddingRight = useHtmlPaddingRight();
  const { toggleTheme, theme } = useThemeToggle();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = useDashboardsServiceGetDashboards(undefined, {
    enabled: false,
  });

  const { data: user } = useUsersServiceGetUsersMe();

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
      (group: { id: string }) => group.id === 'userDashboards',
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
      updatedMenuData[0].link = buildDashboardUrl(
        query.data[0].identifier,
        query.data[0].name,
      );
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
  const baseURL = process.env.NEXT_PUBLIC_API_URL ?? '';
  const profilePicture = user?.profilePicture
    ? baseURL + user.profilePicture
    : null;

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
            <Link href="/">
              <div className="h-12 w-12 object-contain">
                <PRODUCT_LOGO />
              </div>
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
            <Link href="/profile">
              <HeadProfile profileImage={profilePicture} />
            </Link>
          </div>
        </div>
        <div className="invisible h-[80px]" />
      </div>
    </ModalProvider>
  );
};
