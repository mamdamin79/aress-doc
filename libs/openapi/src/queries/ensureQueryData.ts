// generated with @7nohe/openapi-react-query-codegen@1.6.2

import { type QueryClient } from '@tanstack/react-query';
import {
  DashboardsService,
  FundsService,
  HealthService,
  ReportsService,
  UsersService,
} from '../requests/services.gen';
import { CaptchaType } from '../requests/types.gen';
import * as Common from './common';
export const ensureUseHealthServiceGetHealthData = (queryClient: QueryClient) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseHealthServiceGetHealthKeyFn(),
    queryFn: () => HealthService.getHealth(),
  });
export const ensureUseUsersServiceGetUsersLoginCaptchaData = (
  queryClient: QueryClient,
  {
    captchaHeight,
    captchaType,
    captchaWidth,
  }: {
    captchaHeight?: number;
    captchaType?: CaptchaType;
    captchaWidth?: number;
  } = {},
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseUsersServiceGetUsersLoginCaptchaKeyFn({
      captchaHeight,
      captchaType,
      captchaWidth,
    }),
    queryFn: () =>
      UsersService.getUsersLoginCaptcha({
        captchaHeight,
        captchaType,
        captchaWidth,
      }),
  });
export const ensureUseUsersServiceGetUsersMeData = (queryClient: QueryClient) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseUsersServiceGetUsersMeKeyFn(),
    queryFn: () => UsersService.getUsersMe(),
  });
export const ensureUseUsersServiceGetUsersProfilePasswordChangeOtpData = (
  queryClient: QueryClient,
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseUsersServiceGetUsersProfilePasswordChangeOtpKeyFn(),
    queryFn: () => UsersService.getUsersProfilePasswordChangeOtp(),
  });
export const ensureUseReportsServiceGetReportsData = (
  queryClient: QueryClient,
  {
    onlyFavorite,
    onlyHavingVideo,
    onlyNew,
  }: {
    onlyFavorite?: boolean;
    onlyHavingVideo?: boolean;
    onlyNew?: boolean;
  } = {},
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseReportsServiceGetReportsKeyFn({
      onlyFavorite,
      onlyHavingVideo,
      onlyNew,
    }),
    queryFn: () =>
      ReportsService.getReports({ onlyFavorite, onlyHavingVideo, onlyNew }),
  });
export const ensureUseReportsServiceGetReportsByReportIdData = (
  queryClient: QueryClient,
  {
    reportId,
  }: {
    reportId: string;
  },
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseReportsServiceGetReportsByReportIdKeyFn({ reportId }),
    queryFn: () => ReportsService.getReportsByReportId({ reportId }),
  });
export const ensureUseReportsServiceGetReportsCategoriesData = (
  queryClient: QueryClient,
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseReportsServiceGetReportsCategoriesKeyFn(),
    queryFn: () => ReportsService.getReportsCategories(),
  });
export const ensureUseDashboardsServiceGetDashboardsData = (
  queryClient: QueryClient,
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseDashboardsServiceGetDashboardsKeyFn(),
    queryFn: () => DashboardsService.getDashboards(),
  });
export const ensureUseDashboardsServiceGetDashboardsByDashboardIdData = (
  queryClient: QueryClient,
  {
    dashboardId,
  }: {
    dashboardId: number;
  },
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseDashboardsServiceGetDashboardsByDashboardIdKeyFn({
      dashboardId,
    }),
    queryFn: () =>
      DashboardsService.getDashboardsByDashboardId({ dashboardId }),
  });
export const ensureUseDashboardsServiceGetDashboardsByDashboardIdPreviewData = (
  queryClient: QueryClient,
  {
    dashboardId,
  }: {
    dashboardId: number;
  },
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseDashboardsServiceGetDashboardsByDashboardIdPreviewKeyFn(
      { dashboardId },
    ),
    queryFn: () =>
      DashboardsService.getDashboardsByDashboardIdPreview({ dashboardId }),
  });
export const ensureUseFundsServiceGetFundsData = (queryClient: QueryClient) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseFundsServiceGetFundsKeyFn(),
    queryFn: () => FundsService.getFunds(),
  });
export const ensureUseFundsServiceGetFundsTypeByFundTypeData = (
  queryClient: QueryClient,
  {
    fundType,
  }: {
    fundType: number;
  },
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseFundsServiceGetFundsTypeByFundTypeKeyFn({ fundType }),
    queryFn: () => FundsService.getFundsTypeByFundType({ fundType }),
  });
export const ensureUseFundsServiceGetFundsTableData = (
  queryClient: QueryClient,
  {
    tab,
  }: {
    tab?: number;
  } = {},
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseFundsServiceGetFundsTableKeyFn({ tab }),
    queryFn: () => FundsService.getFundsTable({ tab }),
  });
