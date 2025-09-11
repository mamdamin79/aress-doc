// generated with @7nohe/openapi-react-query-codegen@1.6.2

import { UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';
import {
  DashboardsService,
  FundsService,
  HealthService,
  ReportsService,
  UsersService,
} from '../requests/services.gen';
import { CaptchaType } from '../requests/types.gen';
import * as Common from './common';
export const useHealthServiceGetHealthSuspense = <
  TData = Common.HealthServiceGetHealthDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseHealthServiceGetHealthKeyFn(queryKey),
    queryFn: () => HealthService.getHealth() as TData,
    ...options,
  });
export const useUsersServiceGetUsersLoginCaptchaSuspense = <
  TData = Common.UsersServiceGetUsersLoginCaptchaDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    captchaHeight,
    captchaType,
    captchaWidth,
  }: {
    captchaHeight?: number;
    captchaType?: CaptchaType;
    captchaWidth?: number;
  } = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseUsersServiceGetUsersLoginCaptchaKeyFn(
      { captchaHeight, captchaType, captchaWidth },
      queryKey,
    ),
    queryFn: () =>
      UsersService.getUsersLoginCaptcha({
        captchaHeight,
        captchaType,
        captchaWidth,
      }) as TData,
    ...options,
  });
export const useUsersServiceGetUsersMeSuspense = <
  TData = Common.UsersServiceGetUsersMeDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseUsersServiceGetUsersMeKeyFn(queryKey),
    queryFn: () => UsersService.getUsersMe() as TData,
    ...options,
  });
export const useUsersServiceGetUsersPasswordForgotCaptchaSuspense = <
  TData = Common.UsersServiceGetUsersPasswordForgotCaptchaDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    captchaHeight,
    captchaType,
    captchaWidth,
  }: {
    captchaHeight?: number;
    captchaType?: CaptchaType;
    captchaWidth?: number;
  } = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseUsersServiceGetUsersPasswordForgotCaptchaKeyFn(
      { captchaHeight, captchaType, captchaWidth },
      queryKey,
    ),
    queryFn: () =>
      UsersService.getUsersPasswordForgotCaptcha({
        captchaHeight,
        captchaType,
        captchaWidth,
      }) as TData,
    ...options,
  });
export const useUsersServiceGetUsersProfileSuspense = <
  TData = Common.UsersServiceGetUsersProfileDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseUsersServiceGetUsersProfileKeyFn(queryKey),
    queryFn: () => UsersService.getUsersProfile() as TData,
    ...options,
  });
export const useUsersServiceGetUsersProfilePasswordChangeOtpSuspense = <
  TData = Common.UsersServiceGetUsersProfilePasswordChangeOtpDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey:
      Common.UseUsersServiceGetUsersProfilePasswordChangeOtpKeyFn(queryKey),
    queryFn: () => UsersService.getUsersProfilePasswordChangeOtp() as TData,
    ...options,
  });
export const useReportsServiceGetReportsSuspense = <
  TData = Common.ReportsServiceGetReportsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    onlyFavorite,
    onlyHavingVideo,
    onlyNew,
  }: {
    onlyFavorite?: boolean;
    onlyHavingVideo?: boolean;
    onlyNew?: boolean;
  } = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseReportsServiceGetReportsKeyFn(
      { onlyFavorite, onlyHavingVideo, onlyNew },
      queryKey,
    ),
    queryFn: () =>
      ReportsService.getReports({
        onlyFavorite,
        onlyHavingVideo,
        onlyNew,
      }) as TData,
    ...options,
  });
export const useReportsServiceGetReportsCategoriesSuspense = <
  TData = Common.ReportsServiceGetReportsCategoriesDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseReportsServiceGetReportsCategoriesKeyFn(queryKey),
    queryFn: () => ReportsService.getReportsCategories() as TData,
    ...options,
  });
export const useReportsServiceGetReportsByReportIdSuspense = <
  TData = Common.ReportsServiceGetReportsByReportIdDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    reportId,
    screenshotQueryId,
  }: {
    reportId: string;
    screenshotQueryId?: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseReportsServiceGetReportsByReportIdKeyFn(
      { reportId, screenshotQueryId },
      queryKey,
    ),
    queryFn: () =>
      ReportsService.getReportsByReportId({
        reportId,
        screenshotQueryId,
      }) as TData,
    ...options,
  });
export const useDashboardsServiceGetDashboardsSuspense = <
  TData = Common.DashboardsServiceGetDashboardsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseDashboardsServiceGetDashboardsKeyFn(queryKey),
    queryFn: () => DashboardsService.getDashboards() as TData,
    ...options,
  });
export const useDashboardsServiceGetDashboardsByDashboardIdSuspense = <
  TData = Common.DashboardsServiceGetDashboardsByDashboardIdDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    dashboardId,
  }: {
    dashboardId: number;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseDashboardsServiceGetDashboardsByDashboardIdKeyFn(
      { dashboardId },
      queryKey,
    ),
    queryFn: () =>
      DashboardsService.getDashboardsByDashboardId({ dashboardId }) as TData,
    ...options,
  });
export const useDashboardsServiceGetDashboardsByDashboardIdPreviewSuspense = <
  TData = Common.DashboardsServiceGetDashboardsByDashboardIdPreviewDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    dashboardId,
  }: {
    dashboardId: number;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseDashboardsServiceGetDashboardsByDashboardIdPreviewKeyFn(
      { dashboardId },
      queryKey,
    ),
    queryFn: () =>
      DashboardsService.getDashboardsByDashboardIdPreview({
        dashboardId,
      }) as TData,
    ...options,
  });
export const useFundsServiceGetFundsSuspense = <
  TData = Common.FundsServiceGetFundsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseFundsServiceGetFundsKeyFn(queryKey),
    queryFn: () => FundsService.getFunds() as TData,
    ...options,
  });
export const useFundsServiceGetFundsTypeByFundTypeSuspense = <
  TData = Common.FundsServiceGetFundsTypeByFundTypeDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    fundType,
  }: {
    fundType: number;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseFundsServiceGetFundsTypeByFundTypeKeyFn(
      { fundType },
      queryKey,
    ),
    queryFn: () => FundsService.getFundsTypeByFundType({ fundType }) as TData,
    ...options,
  });
export const useFundsServiceGetFundsTableSuspense = <
  TData = Common.FundsServiceGetFundsTableDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    tab,
  }: {
    tab?: number;
  } = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseFundsServiceGetFundsTableKeyFn({ tab }, queryKey),
    queryFn: () => FundsService.getFundsTable({ tab }) as TData,
    ...options,
  });
export const useFundsServiceGetFundsTableTabByTabCsvSuspense = <
  TData = Common.FundsServiceGetFundsTableTabByTabCsvDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    tab,
  }: {
    tab: number;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseFundsServiceGetFundsTableTabByTabCsvKeyFn(
      { tab },
      queryKey,
    ),
    queryFn: () => FundsService.getFundsTableTabByTabCsv({ tab }) as TData,
    ...options,
  });
export const useFundsServiceGetFundsStockByFundIdSummarySuspense = <
  TData = Common.FundsServiceGetFundsStockByFundIdSummaryDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    fundId,
  }: {
    fundId: number;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseFundsServiceGetFundsStockByFundIdSummaryKeyFn(
      { fundId },
      queryKey,
    ),
    queryFn: () =>
      FundsService.getFundsStockByFundIdSummary({ fundId }) as TData,
    ...options,
  });
export const useFundsServiceGetFundsStockByFundIdReturnAnalysisSuspense = <
  TData = Common.FundsServiceGetFundsStockByFundIdReturnAnalysisDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    fundId,
  }: {
    fundId: number;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseFundsServiceGetFundsStockByFundIdReturnAnalysisKeyFn(
      { fundId },
      queryKey,
    ),
    queryFn: () =>
      FundsService.getFundsStockByFundIdReturnAnalysis({ fundId }) as TData,
    ...options,
  });
