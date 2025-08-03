// generated with @7nohe/openapi-react-query-codegen@1.6.2

import { UseQueryResult } from '@tanstack/react-query';
import {
  DashboardsService,
  FundsService,
  HealthService,
  ReportsService,
  UsersService,
} from '../requests/services.gen';
import { CaptchaType } from '../requests/types.gen';
export type HealthServiceGetHealthDefaultResponse = Awaited<
  ReturnType<typeof HealthService.getHealth>
>;
export type HealthServiceGetHealthQueryResult<
  TData = HealthServiceGetHealthDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useHealthServiceGetHealthKey = 'HealthServiceGetHealth';
export const UseHealthServiceGetHealthKeyFn = (queryKey?: Array<unknown>) => [
  useHealthServiceGetHealthKey,
  ...(queryKey ?? []),
];
export type UsersServiceGetUsersLoginCaptchaDefaultResponse = Awaited<
  ReturnType<typeof UsersService.getUsersLoginCaptcha>
>;
export type UsersServiceGetUsersLoginCaptchaQueryResult<
  TData = UsersServiceGetUsersLoginCaptchaDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useUsersServiceGetUsersLoginCaptchaKey =
  'UsersServiceGetUsersLoginCaptcha';
export const UseUsersServiceGetUsersLoginCaptchaKeyFn = (
  {
    captchaHeight,
    captchaType,
    captchaWidth,
  }: {
    captchaHeight?: number;
    captchaType?: CaptchaType;
    captchaWidth?: number;
  } = {},
  queryKey?: Array<unknown>,
) => [
  useUsersServiceGetUsersLoginCaptchaKey,
  ...(queryKey ?? [{ captchaHeight, captchaType, captchaWidth }]),
];
export type UsersServiceGetUsersMeDefaultResponse = Awaited<
  ReturnType<typeof UsersService.getUsersMe>
>;
export type UsersServiceGetUsersMeQueryResult<
  TData = UsersServiceGetUsersMeDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useUsersServiceGetUsersMeKey = 'UsersServiceGetUsersMe';
export const UseUsersServiceGetUsersMeKeyFn = (queryKey?: Array<unknown>) => [
  useUsersServiceGetUsersMeKey,
  ...(queryKey ?? []),
];
export type UsersServiceGetUsersPasswordForgotCaptchaDefaultResponse = Awaited<
  ReturnType<typeof UsersService.getUsersPasswordForgotCaptcha>
>;
export type UsersServiceGetUsersPasswordForgotCaptchaQueryResult<
  TData = UsersServiceGetUsersPasswordForgotCaptchaDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useUsersServiceGetUsersPasswordForgotCaptchaKey =
  'UsersServiceGetUsersPasswordForgotCaptcha';
export const UseUsersServiceGetUsersPasswordForgotCaptchaKeyFn = (
  {
    captchaHeight,
    captchaType,
    captchaWidth,
  }: {
    captchaHeight?: number;
    captchaType?: CaptchaType;
    captchaWidth?: number;
  } = {},
  queryKey?: Array<unknown>,
) => [
  useUsersServiceGetUsersPasswordForgotCaptchaKey,
  ...(queryKey ?? [{ captchaHeight, captchaType, captchaWidth }]),
];
export type UsersServiceGetUsersProfilePasswordChangeOtpDefaultResponse =
  Awaited<ReturnType<typeof UsersService.getUsersProfilePasswordChangeOtp>>;
export type UsersServiceGetUsersProfilePasswordChangeOtpQueryResult<
  TData = UsersServiceGetUsersProfilePasswordChangeOtpDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useUsersServiceGetUsersProfilePasswordChangeOtpKey =
  'UsersServiceGetUsersProfilePasswordChangeOtp';
export const UseUsersServiceGetUsersProfilePasswordChangeOtpKeyFn = (
  queryKey?: Array<unknown>,
) => [useUsersServiceGetUsersProfilePasswordChangeOtpKey, ...(queryKey ?? [])];
export type ReportsServiceGetReportsDefaultResponse = Awaited<
  ReturnType<typeof ReportsService.getReports>
>;
export type ReportsServiceGetReportsQueryResult<
  TData = ReportsServiceGetReportsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useReportsServiceGetReportsKey = 'ReportsServiceGetReports';
export const UseReportsServiceGetReportsKeyFn = (
  {
    onlyFavorite,
    onlyHavingVideo,
    onlyNew,
  }: {
    onlyFavorite?: boolean;
    onlyHavingVideo?: boolean;
    onlyNew?: boolean;
  } = {},
  queryKey?: Array<unknown>,
) => [
  useReportsServiceGetReportsKey,
  ...(queryKey ?? [{ onlyFavorite, onlyHavingVideo, onlyNew }]),
];
export type ReportsServiceGetReportsCategoriesDefaultResponse = Awaited<
  ReturnType<typeof ReportsService.getReportsCategories>
>;
export type ReportsServiceGetReportsCategoriesQueryResult<
  TData = ReportsServiceGetReportsCategoriesDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useReportsServiceGetReportsCategoriesKey =
  'ReportsServiceGetReportsCategories';
export const UseReportsServiceGetReportsCategoriesKeyFn = (
  queryKey?: Array<unknown>,
) => [useReportsServiceGetReportsCategoriesKey, ...(queryKey ?? [])];
export type ReportsServiceGetReportsByReportIdDefaultResponse = Awaited<
  ReturnType<typeof ReportsService.getReportsByReportId>
>;
export type ReportsServiceGetReportsByReportIdQueryResult<
  TData = ReportsServiceGetReportsByReportIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useReportsServiceGetReportsByReportIdKey =
  'ReportsServiceGetReportsByReportId';
export const UseReportsServiceGetReportsByReportIdKeyFn = (
  {
    reportId,
    screenshotQueryId,
  }: {
    reportId: string;
    screenshotQueryId?: string;
  },
  queryKey?: Array<unknown>,
) => [
  useReportsServiceGetReportsByReportIdKey,
  ...(queryKey ?? [{ reportId, screenshotQueryId }]),
];
export type DashboardsServiceGetDashboardsDefaultResponse = Awaited<
  ReturnType<typeof DashboardsService.getDashboards>
>;
export type DashboardsServiceGetDashboardsQueryResult<
  TData = DashboardsServiceGetDashboardsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useDashboardsServiceGetDashboardsKey =
  'DashboardsServiceGetDashboards';
export const UseDashboardsServiceGetDashboardsKeyFn = (
  queryKey?: Array<unknown>,
) => [useDashboardsServiceGetDashboardsKey, ...(queryKey ?? [])];
export type DashboardsServiceGetDashboardsByDashboardIdDefaultResponse =
  Awaited<ReturnType<typeof DashboardsService.getDashboardsByDashboardId>>;
export type DashboardsServiceGetDashboardsByDashboardIdQueryResult<
  TData = DashboardsServiceGetDashboardsByDashboardIdDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useDashboardsServiceGetDashboardsByDashboardIdKey =
  'DashboardsServiceGetDashboardsByDashboardId';
export const UseDashboardsServiceGetDashboardsByDashboardIdKeyFn = (
  {
    dashboardId,
  }: {
    dashboardId: number;
  },
  queryKey?: Array<unknown>,
) => [
  useDashboardsServiceGetDashboardsByDashboardIdKey,
  ...(queryKey ?? [{ dashboardId }]),
];
export type DashboardsServiceGetDashboardsByDashboardIdPreviewDefaultResponse =
  Awaited<
    ReturnType<typeof DashboardsService.getDashboardsByDashboardIdPreview>
  >;
export type DashboardsServiceGetDashboardsByDashboardIdPreviewQueryResult<
  TData = DashboardsServiceGetDashboardsByDashboardIdPreviewDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useDashboardsServiceGetDashboardsByDashboardIdPreviewKey =
  'DashboardsServiceGetDashboardsByDashboardIdPreview';
export const UseDashboardsServiceGetDashboardsByDashboardIdPreviewKeyFn = (
  {
    dashboardId,
  }: {
    dashboardId: number;
  },
  queryKey?: Array<unknown>,
) => [
  useDashboardsServiceGetDashboardsByDashboardIdPreviewKey,
  ...(queryKey ?? [{ dashboardId }]),
];
export type FundsServiceGetFundsDefaultResponse = Awaited<
  ReturnType<typeof FundsService.getFunds>
>;
export type FundsServiceGetFundsQueryResult<
  TData = FundsServiceGetFundsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useFundsServiceGetFundsKey = 'FundsServiceGetFunds';
export const UseFundsServiceGetFundsKeyFn = (queryKey?: Array<unknown>) => [
  useFundsServiceGetFundsKey,
  ...(queryKey ?? []),
];
export type FundsServiceGetFundsTypeByFundTypeDefaultResponse = Awaited<
  ReturnType<typeof FundsService.getFundsTypeByFundType>
>;
export type FundsServiceGetFundsTypeByFundTypeQueryResult<
  TData = FundsServiceGetFundsTypeByFundTypeDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useFundsServiceGetFundsTypeByFundTypeKey =
  'FundsServiceGetFundsTypeByFundType';
export const UseFundsServiceGetFundsTypeByFundTypeKeyFn = (
  {
    fundType,
  }: {
    fundType: number;
  },
  queryKey?: Array<unknown>,
) => [
  useFundsServiceGetFundsTypeByFundTypeKey,
  ...(queryKey ?? [{ fundType }]),
];
export type FundsServiceGetFundsTableDefaultResponse = Awaited<
  ReturnType<typeof FundsService.getFundsTable>
>;
export type FundsServiceGetFundsTableQueryResult<
  TData = FundsServiceGetFundsTableDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useFundsServiceGetFundsTableKey = 'FundsServiceGetFundsTable';
export const UseFundsServiceGetFundsTableKeyFn = (
  {
    tab,
  }: {
    tab?: number;
  } = {},
  queryKey?: Array<unknown>,
) => [useFundsServiceGetFundsTableKey, ...(queryKey ?? [{ tab }])];
export type UsersServicePostUsersLoginMutationResult = Awaited<
  ReturnType<typeof UsersService.postUsersLogin>
>;
export type UsersServicePostUsersTokenMutationResult = Awaited<
  ReturnType<typeof UsersService.postUsersToken>
>;
export type UsersServicePostUsersPasswordForgotOtpMutationResult = Awaited<
  ReturnType<typeof UsersService.postUsersPasswordForgotOtp>
>;
export type UsersServicePostUsersPasswordForgotResetMutationResult = Awaited<
  ReturnType<typeof UsersService.postUsersPasswordForgotReset>
>;
export type UsersServicePostUsersProfilePasswordChangeMutationResult = Awaited<
  ReturnType<typeof UsersService.postUsersProfilePasswordChange>
>;
export type UsersServicePostUsersProfilePasswordValidateMutationResult =
  Awaited<ReturnType<typeof UsersService.postUsersProfilePasswordValidate>>;
export type UsersServicePostUsersProfilePhoneChangeOtpMutationResult = Awaited<
  ReturnType<typeof UsersService.postUsersProfilePhoneChangeOtp>
>;
export type UsersServicePostUsersProfilePhoneChangeMutationResult = Awaited<
  ReturnType<typeof UsersService.postUsersProfilePhoneChange>
>;
export type UsersServicePostUsersProfileEmailChangeOtpMutationResult = Awaited<
  ReturnType<typeof UsersService.postUsersProfileEmailChangeOtp>
>;
export type UsersServicePostUsersProfileEmailChangeMutationResult = Awaited<
  ReturnType<typeof UsersService.postUsersProfileEmailChange>
>;
export type UsersServicePostUsersProfileUsernameChangeMutationResult = Awaited<
  ReturnType<typeof UsersService.postUsersProfileUsernameChange>
>;
export type UsersServicePostUsersProfilePictureChangeMutationResult = Awaited<
  ReturnType<typeof UsersService.postUsersProfilePictureChange>
>;
export type UsersServicePostUsersLogoutMutationResult = Awaited<
  ReturnType<typeof UsersService.postUsersLogout>
>;
export type ReportsServicePostReportsRequestMutationResult = Awaited<
  ReturnType<typeof ReportsService.postReportsRequest>
>;
export type ReportsServicePostReportsByReportIdMutationResult = Awaited<
  ReturnType<typeof ReportsService.postReportsByReportId>
>;
export type ReportsServicePostReportsByReportIdFavoriteMutationResult = Awaited<
  ReturnType<typeof ReportsService.postReportsByReportIdFavorite>
>;
export type ReportsServicePostReportsByReportIdScreenshotMutationResult =
  Awaited<ReturnType<typeof ReportsService.postReportsByReportIdScreenshot>>;
export type DashboardsServicePostDashboardsByDashboardIdMutationResult =
  Awaited<ReturnType<typeof DashboardsService.postDashboardsByDashboardId>>;
export type DashboardsServicePostDashboardsByDashboardIdDuplicateMutationResult =
  Awaited<
    ReturnType<typeof DashboardsService.postDashboardsByDashboardIdDuplicate>
  >;
export type DashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdReplaceMutationResult =
  Awaited<
    ReturnType<
      typeof DashboardsService.postDashboardsByDashboardIdItemsByDashboardItemIdReplace
    >
  >;
export type DashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdScreenshotMutationResult =
  Awaited<
    ReturnType<
      typeof DashboardsService.postDashboardsByDashboardIdItemsByDashboardItemIdScreenshot
    >
  >;
export type DashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdCalculationsMutationResult =
  Awaited<
    ReturnType<
      typeof DashboardsService.postDashboardsByDashboardIdItemsByDashboardItemIdCalculations
    >
  >;
export type DashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdReorderMutationResult =
  Awaited<
    ReturnType<
      typeof DashboardsService.postDashboardsByDashboardIdItemsByDashboardItemIdReorder
    >
  >;
export type FundsServicePostFundsTablePinMutationResult = Awaited<
  ReturnType<typeof FundsService.postFundsTablePin>
>;
export type FundsServicePostFundsTableUnpinMutationResult = Awaited<
  ReturnType<typeof FundsService.postFundsTableUnpin>
>;
export type DashboardsServicePutDashboardsMutationResult = Awaited<
  ReturnType<typeof DashboardsService.putDashboards>
>;
export type DashboardsServicePutDashboardsByDashboardIdMutationResult = Awaited<
  ReturnType<typeof DashboardsService.putDashboardsByDashboardId>
>;
export type ReportsServiceDeleteReportsByReportIdFavoriteMutationResult =
  Awaited<ReturnType<typeof ReportsService.deleteReportsByReportIdFavorite>>;
export type DashboardsServiceDeleteDashboardsByDashboardIdMutationResult =
  Awaited<ReturnType<typeof DashboardsService.deleteDashboardsByDashboardId>>;
export type DashboardsServiceDeleteDashboardsByDashboardIdItemsByDashboardItemIdMutationResult =
  Awaited<
    ReturnType<
      typeof DashboardsService.deleteDashboardsByDashboardIdItemsByDashboardItemId
    >
  >;
