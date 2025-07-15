import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDashboardsServiceGetDashboardsByDashboardId } from '@openapi';
import { calculateSlotsToRender } from '../utils';

export const useDashboardData = (tokenLoaded: boolean) => {
  const searchParams = useSearchParams();
  const dashboardIdParam = searchParams.get('dashboardId');

  const { data: dashboardDataFromApi, isLoading: isDashboardLoading } =
    useDashboardsServiceGetDashboardsByDashboardId(
      { dashboardId: Number(dashboardIdParam) },
      undefined,
      { enabled: tokenLoaded && !!dashboardIdParam },
    );

  const [dashboardData, setDashboardData] = useState(dashboardDataFromApi);
  const [slotsToRender, setSlotsToRender] = useState<number[]>([]);

  // sync when fetched
  useEffect(() => {
    if (dashboardDataFromApi) {
      setDashboardData(dashboardDataFromApi);
    }
  }, [dashboardDataFromApi]);

  useEffect(() => {
    const newSlots = calculateSlotsToRender(dashboardData?.items);
    setSlotsToRender(newSlots);
  }, [dashboardData?.items]);

  return {
    dashboardData,
    setDashboardData,
    isDashboardLoading,
    slotsToRender,
    setSlotsToRender,
    dashboardIdParam,
  };
};
