// generated with @7nohe/openapi-react-query-codegen@1.6.2

import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  DashboardsService,
  FundsService,
  HealthService,
  ReportsService,
  UsersService,
} from '../requests/services.gen';
import {
  AddReportToDashboardForUserBody,
  Body_change_profile_picture_users_profile_picture_change_post,
  Body_login_for_access_token_users_login_post,
  Body_save_dashboard_item_screenshot_dashboards__dashboard_id__items__dashboard_item_id__screenshot_post,
  Body_save_screenshot_reports__report_id__screenshot_post,
  Body_test_user_access_token_users_token_post,
  CaptchaType,
  ChangeDashboardReportItemSortOrderBody,
  ChangeEmailByOtpBody,
  ChangeEmailGetOtpBody,
  ChangePasswordByOtpBody,
  ChangePhoneByOtpBody,
  ChangePhoneGetOtpBody,
  ChangeUsernameBody,
  CreateDashboardForUserBody,
  DuplicateDashboardForUserBody,
  ForgotPasswordResetByOtpBody,
  GetDashboardItemCalculationsBody,
  GetForgotPasswordOtpBody,
  GetReportCalculationsBody,
  PinFundInTableTabBody,
  RenameDashboardForUserBody,
  ReplaceDashboardItemCalculationsBody,
  UnpinFundInTableTabBody,
  ValidatePasswordForUserBody,
} from '../requests/types.gen';
import * as Common from './common';
export const useHealthServiceGetHealth = <
  TData = Common.HealthServiceGetHealthDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseHealthServiceGetHealthKeyFn(queryKey),
    queryFn: () => HealthService.getHealth() as TData,
    ...options,
  });
export const useUsersServiceGetUsersLoginCaptcha = <
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
  useQuery<TData, TError>({
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
export const useUsersServiceGetUsersMe = <
  TData = Common.UsersServiceGetUsersMeDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseUsersServiceGetUsersMeKeyFn(queryKey),
    queryFn: () => UsersService.getUsersMe() as TData,
    ...options,
  });
export const useUsersServiceGetUsersPasswordForgotCaptcha = <
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
  useQuery<TData, TError>({
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
export const useUsersServiceGetUsersProfilePasswordChangeOtp = <
  TData = Common.UsersServiceGetUsersProfilePasswordChangeOtpDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseUsersServiceGetUsersProfilePasswordChangeOtpKeyFn(queryKey),
    queryFn: () => UsersService.getUsersProfilePasswordChangeOtp() as TData,
    ...options,
  });
export const useReportsServiceGetReports = <
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
  useQuery<TData, TError>({
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
export const useReportsServiceGetReportsCategories = <
  TData = Common.ReportsServiceGetReportsCategoriesDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseReportsServiceGetReportsCategoriesKeyFn(queryKey),
    queryFn: () => ReportsService.getReportsCategories() as TData,
    ...options,
  });
export const useReportsServiceGetReportsByReportId = <
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
  useQuery<TData, TError>({
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
export const useDashboardsServiceGetDashboards = <
  TData = Common.DashboardsServiceGetDashboardsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseDashboardsServiceGetDashboardsKeyFn(queryKey),
    queryFn: () => DashboardsService.getDashboards() as TData,
    ...options,
  });
export const useDashboardsServiceGetDashboardsByDashboardId = <
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
  useQuery<TData, TError>({
    queryKey: Common.UseDashboardsServiceGetDashboardsByDashboardIdKeyFn(
      { dashboardId },
      queryKey,
    ),
    queryFn: () =>
      DashboardsService.getDashboardsByDashboardId({ dashboardId }) as TData,
    ...options,
  });
export const useDashboardsServiceGetDashboardsByDashboardIdPreview = <
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
  useQuery<TData, TError>({
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
export const useFundsServiceGetFunds = <
  TData = Common.FundsServiceGetFundsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseFundsServiceGetFundsKeyFn(queryKey),
    queryFn: () => FundsService.getFunds() as TData,
    ...options,
  });
export const useFundsServiceGetFundsTypeByFundType = <
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
  useQuery<TData, TError>({
    queryKey: Common.UseFundsServiceGetFundsTypeByFundTypeKeyFn(
      { fundType },
      queryKey,
    ),
    queryFn: () => FundsService.getFundsTypeByFundType({ fundType }) as TData,
    ...options,
  });
export const useFundsServiceGetFundsTable = <
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
  useQuery<TData, TError>({
    queryKey: Common.UseFundsServiceGetFundsTableKeyFn({ tab }, queryKey),
    queryFn: () => FundsService.getFundsTable({ tab }) as TData,
    ...options,
  });
export const useUsersServicePostUsersLogin = <
  TData = Common.UsersServicePostUsersLoginMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        captcha: string;
        captchaUid: number;
        formData: Body_login_for_access_token_users_login_post;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      captcha: string;
      captchaUid: number;
      formData: Body_login_for_access_token_users_login_post;
    },
    TContext
  >({
    mutationFn: ({ captcha, captchaUid, formData }) =>
      UsersService.postUsersLogin({
        captcha,
        captchaUid,
        formData,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUsersServicePostUsersToken = <
  TData = Common.UsersServicePostUsersTokenMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        formData: Body_test_user_access_token_users_token_post;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      formData: Body_test_user_access_token_users_token_post;
    },
    TContext
  >({
    mutationFn: ({ formData }) =>
      UsersService.postUsersToken({ formData }) as unknown as Promise<TData>,
    ...options,
  });
export const useUsersServicePostUsersPasswordForgotOtp = <
  TData = Common.UsersServicePostUsersPasswordForgotOtpMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: GetForgotPasswordOtpBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: GetForgotPasswordOtpBody;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      UsersService.postUsersPasswordForgotOtp({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUsersServicePostUsersPasswordForgotReset = <
  TData = Common.UsersServicePostUsersPasswordForgotResetMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ForgotPasswordResetByOtpBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ForgotPasswordResetByOtpBody;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      UsersService.postUsersPasswordForgotReset({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUsersServicePostUsersProfilePasswordChange = <
  TData = Common.UsersServicePostUsersProfilePasswordChangeMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ChangePasswordByOtpBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ChangePasswordByOtpBody;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      UsersService.postUsersProfilePasswordChange({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUsersServicePostUsersProfilePasswordValidate = <
  TData = Common.UsersServicePostUsersProfilePasswordValidateMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ValidatePasswordForUserBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ValidatePasswordForUserBody;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      UsersService.postUsersProfilePasswordValidate({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUsersServicePostUsersProfilePhoneChangeOtp = <
  TData = Common.UsersServicePostUsersProfilePhoneChangeOtpMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ChangePhoneGetOtpBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ChangePhoneGetOtpBody;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      UsersService.postUsersProfilePhoneChangeOtp({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUsersServicePostUsersProfilePhoneChange = <
  TData = Common.UsersServicePostUsersProfilePhoneChangeMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ChangePhoneByOtpBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ChangePhoneByOtpBody;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      UsersService.postUsersProfilePhoneChange({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUsersServicePostUsersProfileEmailChangeOtp = <
  TData = Common.UsersServicePostUsersProfileEmailChangeOtpMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ChangeEmailGetOtpBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ChangeEmailGetOtpBody;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      UsersService.postUsersProfileEmailChangeOtp({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUsersServicePostUsersProfileEmailChange = <
  TData = Common.UsersServicePostUsersProfileEmailChangeMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ChangeEmailByOtpBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ChangeEmailByOtpBody;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      UsersService.postUsersProfileEmailChange({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUsersServicePostUsersProfileUsernameChange = <
  TData = Common.UsersServicePostUsersProfileUsernameChangeMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: ChangeUsernameBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: ChangeUsernameBody;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      UsersService.postUsersProfileUsernameChange({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useUsersServicePostUsersProfilePictureChange = <
  TData = Common.UsersServicePostUsersProfilePictureChangeMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        formData: Body_change_profile_picture_users_profile_picture_change_post;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      formData: Body_change_profile_picture_users_profile_picture_change_post;
    },
    TContext
  >({
    mutationFn: ({ formData }) =>
      UsersService.postUsersProfilePictureChange({
        formData,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useReportsServicePostReportsByReportId = <
  TData = Common.ReportsServicePostReportsByReportIdMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        reportId: string;
        requestBody: GetReportCalculationsBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      reportId: string;
      requestBody: GetReportCalculationsBody;
    },
    TContext
  >({
    mutationFn: ({ reportId, requestBody }) =>
      ReportsService.postReportsByReportId({
        reportId,
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useReportsServicePostReportsByReportIdFavorite = <
  TData = Common.ReportsServicePostReportsByReportIdFavoriteMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        reportId: string;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      reportId: string;
    },
    TContext
  >({
    mutationFn: ({ reportId }) =>
      ReportsService.postReportsByReportIdFavorite({
        reportId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useReportsServicePostReportsByReportIdScreenshot = <
  TData = Common.ReportsServicePostReportsByReportIdScreenshotMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        formData: Body_save_screenshot_reports__report_id__screenshot_post;
        reportId: string;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      formData: Body_save_screenshot_reports__report_id__screenshot_post;
      reportId: string;
    },
    TContext
  >({
    mutationFn: ({ formData, reportId }) =>
      ReportsService.postReportsByReportIdScreenshot({
        formData,
        reportId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useDashboardsServicePostDashboardsByDashboardId = <
  TData = Common.DashboardsServicePostDashboardsByDashboardIdMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        dashboardId: number;
        requestBody: RenameDashboardForUserBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      dashboardId: number;
      requestBody: RenameDashboardForUserBody;
    },
    TContext
  >({
    mutationFn: ({ dashboardId, requestBody }) =>
      DashboardsService.postDashboardsByDashboardId({
        dashboardId,
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useDashboardsServicePostDashboardsByDashboardIdDuplicate = <
  TData = Common.DashboardsServicePostDashboardsByDashboardIdDuplicateMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        dashboardId: number;
        requestBody: DuplicateDashboardForUserBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      dashboardId: number;
      requestBody: DuplicateDashboardForUserBody;
    },
    TContext
  >({
    mutationFn: ({ dashboardId, requestBody }) =>
      DashboardsService.postDashboardsByDashboardIdDuplicate({
        dashboardId,
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdReplace =
  <
    TData = Common.DashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdReplaceMutationResult,
    TError = unknown,
    TContext = unknown,
  >(
    options?: Omit<
      UseMutationOptions<
        TData,
        TError,
        {
          dashboardId: number;
          dashboardItemId: number;
          requestBody: ReplaceDashboardItemCalculationsBody;
        },
        TContext
      >,
      'mutationFn'
    >,
  ) =>
    useMutation<
      TData,
      TError,
      {
        dashboardId: number;
        dashboardItemId: number;
        requestBody: ReplaceDashboardItemCalculationsBody;
      },
      TContext
    >({
      mutationFn: ({ dashboardId, dashboardItemId, requestBody }) =>
        DashboardsService.postDashboardsByDashboardIdItemsByDashboardItemIdReplace(
          { dashboardId, dashboardItemId, requestBody },
        ) as unknown as Promise<TData>,
      ...options,
    });
export const useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdScreenshot =
  <
    TData = Common.DashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdScreenshotMutationResult,
    TError = unknown,
    TContext = unknown,
  >(
    options?: Omit<
      UseMutationOptions<
        TData,
        TError,
        {
          dashboardId: number;
          dashboardItemId: number;
          formData: Body_save_dashboard_item_screenshot_dashboards__dashboard_id__items__dashboard_item_id__screenshot_post;
        },
        TContext
      >,
      'mutationFn'
    >,
  ) =>
    useMutation<
      TData,
      TError,
      {
        dashboardId: number;
        dashboardItemId: number;
        formData: Body_save_dashboard_item_screenshot_dashboards__dashboard_id__items__dashboard_item_id__screenshot_post;
      },
      TContext
    >({
      mutationFn: ({ dashboardId, dashboardItemId, formData }) =>
        DashboardsService.postDashboardsByDashboardIdItemsByDashboardItemIdScreenshot(
          { dashboardId, dashboardItemId, formData },
        ) as unknown as Promise<TData>,
      ...options,
    });
export const useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdCalculations =
  <
    TData = Common.DashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdCalculationsMutationResult,
    TError = unknown,
    TContext = unknown,
  >(
    options?: Omit<
      UseMutationOptions<
        TData,
        TError,
        {
          dashboardId: number;
          dashboardItemId: number;
          requestBody: GetDashboardItemCalculationsBody;
        },
        TContext
      >,
      'mutationFn'
    >,
  ) =>
    useMutation<
      TData,
      TError,
      {
        dashboardId: number;
        dashboardItemId: number;
        requestBody: GetDashboardItemCalculationsBody;
      },
      TContext
    >({
      mutationFn: ({ dashboardId, dashboardItemId, requestBody }) =>
        DashboardsService.postDashboardsByDashboardIdItemsByDashboardItemIdCalculations(
          { dashboardId, dashboardItemId, requestBody },
        ) as unknown as Promise<TData>,
      ...options,
    });
export const useDashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdReorder =
  <
    TData = Common.DashboardsServicePostDashboardsByDashboardIdItemsByDashboardItemIdReorderMutationResult,
    TError = unknown,
    TContext = unknown,
  >(
    options?: Omit<
      UseMutationOptions<
        TData,
        TError,
        {
          dashboardId: number;
          dashboardItemId: number;
          requestBody: ChangeDashboardReportItemSortOrderBody;
        },
        TContext
      >,
      'mutationFn'
    >,
  ) =>
    useMutation<
      TData,
      TError,
      {
        dashboardId: number;
        dashboardItemId: number;
        requestBody: ChangeDashboardReportItemSortOrderBody;
      },
      TContext
    >({
      mutationFn: ({ dashboardId, dashboardItemId, requestBody }) =>
        DashboardsService.postDashboardsByDashboardIdItemsByDashboardItemIdReorder(
          { dashboardId, dashboardItemId, requestBody },
        ) as unknown as Promise<TData>,
      ...options,
    });
export const useFundsServicePostFundsTablePin = <
  TData = Common.FundsServicePostFundsTablePinMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: PinFundInTableTabBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: PinFundInTableTabBody;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      FundsService.postFundsTablePin({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useFundsServicePostFundsTableUnpin = <
  TData = Common.FundsServicePostFundsTableUnpinMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: UnpinFundInTableTabBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: UnpinFundInTableTabBody;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      FundsService.postFundsTableUnpin({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useDashboardsServicePutDashboards = <
  TData = Common.DashboardsServicePutDashboardsMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: CreateDashboardForUserBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: CreateDashboardForUserBody;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      DashboardsService.putDashboards({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useDashboardsServicePutDashboardsByDashboardId = <
  TData = Common.DashboardsServicePutDashboardsByDashboardIdMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        dashboardId: number;
        requestBody: AddReportToDashboardForUserBody;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      dashboardId: number;
      requestBody: AddReportToDashboardForUserBody;
    },
    TContext
  >({
    mutationFn: ({ dashboardId, requestBody }) =>
      DashboardsService.putDashboardsByDashboardId({
        dashboardId,
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useReportsServiceDeleteReportsByReportIdFavorite = <
  TData = Common.ReportsServiceDeleteReportsByReportIdFavoriteMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        reportId: string;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      reportId: string;
    },
    TContext
  >({
    mutationFn: ({ reportId }) =>
      ReportsService.deleteReportsByReportIdFavorite({
        reportId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useDashboardsServiceDeleteDashboardsByDashboardId = <
  TData = Common.DashboardsServiceDeleteDashboardsByDashboardIdMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        dashboardId: number;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      dashboardId: number;
    },
    TContext
  >({
    mutationFn: ({ dashboardId }) =>
      DashboardsService.deleteDashboardsByDashboardId({
        dashboardId,
      }) as unknown as Promise<TData>,
    ...options,
  });
export const useDashboardsServiceDeleteDashboardsByDashboardIdItemsByDashboardItemId =
  <
    TData = Common.DashboardsServiceDeleteDashboardsByDashboardIdItemsByDashboardItemIdMutationResult,
    TError = unknown,
    TContext = unknown,
  >(
    options?: Omit<
      UseMutationOptions<
        TData,
        TError,
        {
          dashboardId: number;
          dashboardItemId: number;
        },
        TContext
      >,
      'mutationFn'
    >,
  ) =>
    useMutation<
      TData,
      TError,
      {
        dashboardId: number;
        dashboardItemId: number;
      },
      TContext
    >({
      mutationFn: ({ dashboardId, dashboardItemId }) =>
        DashboardsService.deleteDashboardsByDashboardIdItemsByDashboardItemId({
          dashboardId,
          dashboardItemId,
        }) as unknown as Promise<TData>,
      ...options,
    });
