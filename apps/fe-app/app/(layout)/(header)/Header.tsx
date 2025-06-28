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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useThemeToggle } from '../../../hooks';
import {
  DashboardsService,
  OpenAPI,
  useDashboardsServiceGetDashboards,
} from '@openapi';
import { fetchToken } from '../../(auth)/auth.utils';
import { queryClient } from '../../lib/react-query';

export const Header: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const { isHeaderVisible } = useHeaderVisibility();
  const [{ y: scrollY }] = useWindowScroll();
  const currentScrollY = scrollY ?? 0;
  const htmlPaddingRight = useHtmlPaddingRight();
  const { toggleTheme, theme } = useThemeToggle();

  const router = useRouter();
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

  const query = useDashboardsServiceGetDashboards(undefined, {
    enabled: !!token,
  });

  // Inside your effect for setting active dashboard in URL:

  useEffect(() => {
    if (!query.data) return;

    const storedDashboard = localStorage.getItem('activeDashboard');
    // Try to get dashboardId from URL, fallback to stored, fallback to default 3
    const dashboardIdParam = searchParams.get('dashboardId');
    const dashboardNameParam = searchParams.get('dashboardName');

    // Find dashboard object matching dashboardIdParam or storedDashboard or default 3
    const activeDashboard =
      query.data.find((d) => String(d.identifier) === dashboardIdParam) ||
      query.data.find((d) => String(d.identifier) === storedDashboard) ||
      query.data.find((d) => d.identifier === 3);

    if (!activeDashboard) return;

    const activeId = String(activeDashboard.identifier);
    const activeName = activeDashboard.name;

    // If URL params don't match active dashboard, replace URL
    if (dashboardIdParam !== activeId || dashboardNameParam !== activeName) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('dashboardId', activeId);
      params.set('dashboardName', activeName);
      router.replace(`${window.location.pathname}?${params.toString()}`);
    }

    localStorage.setItem('activeDashboard', activeId);
  }, [query.data, router, searchParams]);

  const menuData = useMemo(() => {
    if (!query.data) return MenuData;

    const updatedMenuData = [...MenuData];
    const targetItem = updatedMenuData[0]?.dropdown?.[2];

    if (targetItem) {
      targetItem.children = query.data.map((dashboard) => {
        const isActive =
          pathname === '/' &&
          String(dashboard.identifier) ===
            (searchParams.get('dashboardId') ??
              localStorage.getItem('activeDashboard'));

        return {
          text: dashboard.name,
          // include both dashboardId and dashboardName in URL params
          link: `/?dashboardId=${dashboard.identifier}&dashboardName=${encodeURIComponent(dashboard.name)}`,
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
  if (typeof width !== 'number') return null;

  return (
    <ModalProvider
      onActions={{
        newDashboard: async ({ input, checked }) => {
          const t = await fetchToken();
          OpenAPI.HEADERS = { Authorization: `Bearer ${t}` };
          await DashboardsService.putDashboards({
            requestBody: { name: input ?? '' },
          });

          if (checked && window.open) window.open('/', '_blank');
          queryClient.invalidateQueries({
            queryKey: ['DashboardsServiceGetDashboards'],
          });
        },
        deleteDashboard: async () => {
          const t = await fetchToken();
          OpenAPI.HEADERS = { Authorization: `Bearer ${t}` };
          await DashboardsService.deleteDashboardsByDashboardId({
            dashboardId: Number(searchParams.get('dashboardId')),
          });
          queryClient.invalidateQueries({
            queryKey: ['DashboardsServiceGetDashboards'],
          });
          localStorage.removeItem('activeDashboard');
          window.location.replace('/');
        },
        changeDashboardName: async ({ input }) => {
          const t = await fetchToken();
          OpenAPI.HEADERS = { Authorization: `Bearer ${t}` };
          await DashboardsService.postDashboardsByDashboardId({
            dashboardId: Number(searchParams.get('dashboardId')),
            requestBody: { name: input ?? '' },
          });
          queryClient.invalidateQueries({
            queryKey: ['DashboardsServiceGetDashboards'],
          });
        },
        copyDashboard: async ({ input, checked }) => {
          console.log('copy', input, checked);
        },
      }}
    >
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
