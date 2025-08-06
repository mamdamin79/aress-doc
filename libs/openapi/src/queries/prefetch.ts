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
export const prefetchUseHealthServiceGetHealth = (queryClient: QueryClient) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseHealthServiceGetHealthKeyFn(),
    queryFn: () => HealthService.getHealth(),
  });
export const prefetchUseUsersServiceGetUsersLoginCaptcha = (
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
  queryClient.prefetchQuery({
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
export const prefetchUseUsersServiceGetUsersMe = (queryClient: QueryClient) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseUsersServiceGetUsersMeKeyFn(),
    queryFn: () => UsersService.getUsersMe(),
  });
export const prefetchUseUsersServiceGetUsersPasswordForgotCaptcha = (
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
  queryClient.prefetchQuery({
    queryKey: Common.UseUsersServiceGetUsersPasswordForgotCaptchaKeyFn({
      captchaHeight,
      captchaType,
      captchaWidth,
    }),
    queryFn: () =>
      UsersService.getUsersPasswordForgotCaptcha({
        captchaHeight,
        captchaType,
        captchaWidth,
      }),
  });
export const prefetchUseUsersServiceGetUsersProfilePasswordChangeOtp = (
  queryClient: QueryClient,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseUsersServiceGetUsersProfilePasswordChangeOtpKeyFn(),
    queryFn: () => UsersService.getUsersProfilePasswordChangeOtp(),
  });
export const prefetchUseReportsServiceGetReports = (
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
  queryClient.prefetchQuery({
    queryKey: Common.UseReportsServiceGetReportsKeyFn({
      onlyFavorite,
      onlyHavingVideo,
      onlyNew,
    }),
    queryFn: () =>
      ReportsService.getReports({ onlyFavorite, onlyHavingVideo, onlyNew }),
  });
export const prefetchUseReportsServiceGetReportsCategories = (
  queryClient: QueryClient,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseReportsServiceGetReportsCategoriesKeyFn(),
    queryFn: () => ReportsService.getReportsCategories(),
  });
export const prefetchUseReportsServiceGetReportsByReportId = (
  queryClient: QueryClient,
  {
    reportId,
    screenshotQueryId,
  }: {
    reportId: string;
    screenshotQueryId?: string;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseReportsServiceGetReportsByReportIdKeyFn({
      reportId,
      screenshotQueryId,
    }),
    queryFn: () =>
      ReportsService.getReportsByReportId({ reportId, screenshotQueryId }),
  });
export const prefetchUseDashboardsServiceGetDashboards = (
  queryClient: QueryClient,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseDashboardsServiceGetDashboardsKeyFn(),
    queryFn: () => DashboardsService.getDashboards(),
  });
export const prefetchUseDashboardsServiceGetDashboardsByDashboardId = (
  queryClient: QueryClient,
  {
    dashboardId,
  }: {
    dashboardId: number;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseDashboardsServiceGetDashboardsByDashboardIdKeyFn({
      dashboardId,
    }),
    queryFn: () =>
      DashboardsService.getDashboardsByDashboardId({ dashboardId }),
  });
export const prefetchUseDashboardsServiceGetDashboardsByDashboardIdPreview = (
  queryClient: QueryClient,
  {
    dashboardId,
  }: {
    dashboardId: number;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseDashboardsServiceGetDashboardsByDashboardIdPreviewKeyFn(
      { dashboardId },
    ),
    queryFn: () =>
      DashboardsService.getDashboardsByDashboardIdPreview({ dashboardId }),
  });
export const prefetchUseFundsServiceGetFunds = (queryClient: QueryClient) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseFundsServiceGetFundsKeyFn(),
    queryFn: () => FundsService.getFunds(),
  });
export const prefetchUseFundsServiceGetFundsTypeByFundType = (
  queryClient: QueryClient,
  {
    fundType,
  }: {
    fundType: number;
  },
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseFundsServiceGetFundsTypeByFundTypeKeyFn({ fundType }),
    queryFn: () => FundsService.getFundsTypeByFundType({ fundType }),
  });
export const prefetchUseFundsServiceGetFundsTable = (
  queryClient: QueryClient,
  {
    tab,
  }: {
    tab?: number;
  } = {},
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseFundsServiceGetFundsTableKeyFn({ tab }),
    queryFn: () => FundsService.getFundsTable({ tab }),
  });
