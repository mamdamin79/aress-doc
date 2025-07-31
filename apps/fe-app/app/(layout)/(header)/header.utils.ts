import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function sanitizeDashboardName(name: string) {
  return name.replace(/[\s\u200C]+/g, '-');
}

export function buildDashboardUrl(identifier: number | string, name: string) {
  return `/?dashboardId=${identifier}&dashboardName=${sanitizeDashboardName(name)}`;
}

export const handleRedirect = (
  checked: boolean,
  identifier: string | number | undefined,
  name: string | undefined,
  searchParams: URLSearchParams,
  router: AppRouterInstance,
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set('dashboardId', String(identifier));

  const safeName = name ? name.replace(/[\s\u200C]+/g, '-') : '';
  params.set('dashboardName', safeName);

  const url = `${window.location.pathname}?${params.toString()}`;

  if (checked) {
    window.open(url, '_blank');
  } else {
    router.replace(url);
  }
};

// components/Header/useDashboardActions.ts
import { useCallback } from 'react';
import { DashboardsService } from '@openapi';
import { queryClient } from '../../lib/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDashboardsServiceGetDashboards } from '@openapi';
import { useCustomToast } from 'design-system';

export function useDashboardActions() {
  const { showToast } = useCustomToast();

  const searchParams = useSearchParams();
  const router = useRouter();

  const query = useDashboardsServiceGetDashboards(undefined, {
    enabled: true,
  });

  const newDashboard = useCallback(
    async (data?: { input?: string; checked?: boolean }) => {
      const input = data?.input ?? '';
      const checked = data?.checked ?? false;

      const { createdDashboardId, dashboards } =
        await DashboardsService.putDashboards({
          requestBody: { name: input },
        });
      queryClient.invalidateQueries({
        queryKey: ['DashboardsServiceGetDashboards'],
      });
      const newDashboard = dashboards.find(
        (d) => d.identifier === createdDashboardId,
      );
      handleRedirect(
        checked,
        newDashboard?.identifier,
        newDashboard?.name,
        searchParams,
        router,
      );
      showToast({ message: 'داشبورد جدید ساخته شد.', type: 'success' });
    },
    [router, searchParams],
  );

  const deleteDashboard = useCallback(async () => {
    const dashboardID = Number(searchParams.get('dashboardId'));
    console.log(dashboardID);
    await DashboardsService.deleteDashboardsByDashboardId({
      dashboardId: dashboardID,
    });

    queryClient.invalidateQueries({
      queryKey: ['DashboardsServiceGetDashboards'],
    });

    localStorage.removeItem('activeDashboard');

    const currentIndex =
      query.data?.findIndex((d) => Number(d.identifier) === dashboardID) ?? 1;

    const indexToRedirectTo = currentIndex === 0 ? 1 : currentIndex - 1;

    const fallback = query.data?.[indexToRedirectTo];
    if (!fallback) return;
    handleRedirect(
      false,
      fallback.identifier,
      fallback.name,
      searchParams,
      router,
    );
    showToast({ message: 'داشبورد حذف شد.', type: 'info' });
  }, [searchParams, query.data, router]);

  const changeDashboardName = useCallback(
    async (data?: { input?: string }) => {
      await DashboardsService.postDashboardsByDashboardId({
        dashboardId: Number(searchParams.get('dashboardId')),
        requestBody: { name: data?.input ?? '' },
      });

      queryClient.invalidateQueries({
        queryKey: ['DashboardsServiceGetDashboards'],
      });

      showToast({ message: 'نام داشبورد تغییر یافت.', type: 'info' });
    },
    [searchParams],
  );

  const copyDashboard = useCallback(
    async (data?: { input?: string; checked?: boolean }) => {
      const copiedDashboard =
        await DashboardsService.postDashboardsByDashboardIdDuplicate({
          dashboardId: Number(searchParams.get('dashboardId')),
          requestBody: { name: data?.input ?? '' },
        });

      queryClient.invalidateQueries({
        queryKey: ['DashboardsServiceGetDashboards'],
      });
      handleRedirect(
        data?.checked ?? false,
        copiedDashboard.identifier,
        copiedDashboard?.name,
        searchParams,
        router,
      );

      showToast({ message: 'داشبورد کپی شد.', type: 'info' });
    },
    [],
  );

  return {
    newDashboard,
    deleteDashboard,
    changeDashboardName,
    copyDashboard,
  };
}
