'use client';
import { cn, FundsSidebar } from 'design-system';
import React, { useEffect, useState, useCallback } from 'react';
import { useHeaderVisibility } from '@shared';
import { SidebarSkeleton } from './skeletons/SideBarSkeleton';
import { SidebarItemSkeleton } from './skeletons/SidebarItemSkeleton';
import { useDashboardData } from './hooks/useDashboardData';
import {
  DashboardFundApiModel,
  useDashboardsServicePostDashboardsByDashboardIdFunds,
} from '@openapi';

export const FundsSidebarWrapper: React.FC = () => {
  const { isHeaderVisible } = useHeaderVisibility();
  const { isDashboardLoading, dashboardData } = useDashboardData();

  const [fundsData, setFundsData] = useState<DashboardFundApiModel[]>([]);
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [activeSort, setActiveSort] = useState<number>(1);
  const [activeTimeframe, setActiveTimeframe] = useState<number>(1);

  const { mutateAsync: getFundsData, isPending: isFundsLoading } =
    useDashboardsServicePostDashboardsByDashboardIdFunds();

  // keep local state in sync with initial dashboard data
  useEffect(() => {
    if (!dashboardData) return;
    setFundsData(dashboardData.funds ?? []);
    setActiveCategory(dashboardData.selectedFundTypeId ?? 1);
    setActiveSort(dashboardData.selectedFundSortParameterId ?? 1);
    setActiveTimeframe(dashboardData.selectedFundSortPeriodId ?? 1);
  }, [dashboardData]);

  const handleFiltersChange = useCallback(
    async (
      category = activeCategory,
      sort = activeSort,
      timeframe = activeTimeframe,
    ) => {
      if (!dashboardData?.identifier) return;
      const res = await getFundsData({
        dashboardId: dashboardData.identifier,
        requestBody: {
          fundType: category,
          sortParameter: sort,
          sortPeriod: timeframe,
        },
      });
      setFundsData(res?.funds ?? []);
    },
    [
      dashboardData?.identifier,
      activeCategory,
      activeSort,
      activeTimeframe,
      getFundsData,
    ],
  );

  return (
    <div
      className={cn(
        '3xl:block 3xl:w-[380px] sticky hidden h-fit w-[296px] transition-all duration-300 lg:block xl:hidden',
      )}
      style={{
        top: isHeaderVisible ? `104px` : `24px`,
      }}
    >
      {isDashboardLoading || isFundsLoading ? (
        <SidebarSkeleton>
          {Array.from({ length: 12 }).map((_, idx) => (
            <SidebarItemSkeleton key={idx} />
          ))}
        </SidebarSkeleton>
      ) : (
        <FundsSidebar
          onCategoryChange={(categoryID) => {
            setActiveCategory(categoryID);
            handleFiltersChange(categoryID, activeSort, activeTimeframe);
          }}
          onSortOptionChange={(selectedSortID) => {
            setActiveSort(selectedSortID);
            handleFiltersChange(
              activeCategory,
              selectedSortID,
              activeTimeframe,
            );
          }}
          onTimeframeChange={(selectedTimeframeID) => {
            setActiveTimeframe(selectedTimeframeID);
            handleFiltersChange(
              activeCategory,
              activeSort,
              selectedTimeframeID,
            );
          }}
          selectedFundSortParameterId={activeSort - 1}
          selectedFundSortPeriodId={activeTimeframe - 1}
          selectedFundTypeId={activeCategory - 1}
          data={fundsData.map((fund) => ({
            title: fund.abbreviatedName,
            changeValue: fund.parameterValue ?? 0,
            chartData: {
              data: fund.sparklineValues ?? [],
              trend:
                fund.parameterValue && fund.parameterValue >= 0
                  ? 'positive'
                  : 'negative',
            },
          }))}
        />
      )}
    </div>
  );
};
