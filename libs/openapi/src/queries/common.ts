// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseQueryResult } from "@tanstack/react-query";
import { DashboardService, UsersService } from "../requests/services.gen";
import { CaptchaType } from "../requests/types.gen";
export type UsersServiceGetUsersLoginCaptchaDefaultResponse = Awaited<ReturnType<typeof UsersService.getUsersLoginCaptcha>>;
export type UsersServiceGetUsersLoginCaptchaQueryResult<TData = UsersServiceGetUsersLoginCaptchaDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceGetUsersLoginCaptchaKey = "UsersServiceGetUsersLoginCaptcha";
export const UseUsersServiceGetUsersLoginCaptchaKeyFn = ({ captchaHeight, captchaType, captchaWidth }: {
  captchaHeight?: number;
  captchaType?: CaptchaType;
  captchaWidth?: number;
} = {}, queryKey?: Array<unknown>) => [useUsersServiceGetUsersLoginCaptchaKey, ...(queryKey ?? [{ captchaHeight, captchaType, captchaWidth }])];
export type UsersServiceGetUsersMeDefaultResponse = Awaited<ReturnType<typeof UsersService.getUsersMe>>;
export type UsersServiceGetUsersMeQueryResult<TData = UsersServiceGetUsersMeDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceGetUsersMeKey = "UsersServiceGetUsersMe";
export const UseUsersServiceGetUsersMeKeyFn = (queryKey?: Array<unknown>) => [useUsersServiceGetUsersMeKey, ...(queryKey ?? [])];
export type DashboardServiceGetDashboardReportsDefaultResponse = Awaited<ReturnType<typeof DashboardService.getDashboardReports>>;
export type DashboardServiceGetDashboardReportsQueryResult<TData = DashboardServiceGetDashboardReportsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDashboardServiceGetDashboardReportsKey = "DashboardServiceGetDashboardReports";
export const UseDashboardServiceGetDashboardReportsKeyFn = ({ onlyFavorite, onlyHavingVideo, onlyNew }: {
  onlyFavorite?: boolean;
  onlyHavingVideo?: boolean;
  onlyNew?: boolean;
} = {}, queryKey?: Array<unknown>) => [useDashboardServiceGetDashboardReportsKey, ...(queryKey ?? [{ onlyFavorite, onlyHavingVideo, onlyNew }])];
export type DashboardServiceGetDashboardReportsByReportIdDefaultResponse = Awaited<ReturnType<typeof DashboardService.getDashboardReportsByReportId>>;
export type DashboardServiceGetDashboardReportsByReportIdQueryResult<TData = DashboardServiceGetDashboardReportsByReportIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDashboardServiceGetDashboardReportsByReportIdKey = "DashboardServiceGetDashboardReportsByReportId";
export const UseDashboardServiceGetDashboardReportsByReportIdKeyFn = ({ reportId }: {
  reportId: number;
}, queryKey?: Array<unknown>) => [useDashboardServiceGetDashboardReportsByReportIdKey, ...(queryKey ?? [{ reportId }])];
export type DashboardServiceGetDashboardReportsCategoriesDefaultResponse = Awaited<ReturnType<typeof DashboardService.getDashboardReportsCategories>>;
export type DashboardServiceGetDashboardReportsCategoriesQueryResult<TData = DashboardServiceGetDashboardReportsCategoriesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDashboardServiceGetDashboardReportsCategoriesKey = "DashboardServiceGetDashboardReportsCategories";
export const UseDashboardServiceGetDashboardReportsCategoriesKeyFn = (queryKey?: Array<unknown>) => [useDashboardServiceGetDashboardReportsCategoriesKey, ...(queryKey ?? [])];
export type UsersServicePostUsersLoginMutationResult = Awaited<ReturnType<typeof UsersService.postUsersLogin>>;
export type UsersServicePostUsersTokenMutationResult = Awaited<ReturnType<typeof UsersService.postUsersToken>>;
export type DashboardServicePostDashboardReportsByReportIdFavoriteMutationResult = Awaited<ReturnType<typeof DashboardService.postDashboardReportsByReportIdFavorite>>;
export type DashboardServiceDeleteDashboardReportsByReportIdFavoriteMutationResult = Awaited<ReturnType<typeof DashboardService.deleteDashboardReportsByReportIdFavorite>>;
