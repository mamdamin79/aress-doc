// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { DashboardService, UsersService } from "../requests/services.gen";
import { CaptchaType } from "../requests/types.gen";
import * as Common from "./common";
export const useUsersServiceGetUsersLoginCaptchaSuspense = <TData = Common.UsersServiceGetUsersLoginCaptchaDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ captchaHeight, captchaType, captchaWidth }: {
  captchaHeight?: number;
  captchaType?: CaptchaType;
  captchaWidth?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetUsersLoginCaptchaKeyFn({ captchaHeight, captchaType, captchaWidth }, queryKey), queryFn: () => UsersService.getUsersLoginCaptcha({ captchaHeight, captchaType, captchaWidth }) as TData, ...options });
export const useUsersServiceGetUsersMeSuspense = <TData = Common.UsersServiceGetUsersMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetUsersMeKeyFn(queryKey), queryFn: () => UsersService.getUsersMe() as TData, ...options });
export const useDashboardServiceGetDashboardReportsSuspense = <TData = Common.DashboardServiceGetDashboardReportsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ onlyFavorite, onlyHavingVideo, onlyNew }: {
  onlyFavorite?: boolean;
  onlyHavingVideo?: boolean;
  onlyNew?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDashboardServiceGetDashboardReportsKeyFn({ onlyFavorite, onlyHavingVideo, onlyNew }, queryKey), queryFn: () => DashboardService.getDashboardReports({ onlyFavorite, onlyHavingVideo, onlyNew }) as TData, ...options });
export const useDashboardServiceGetDashboardReportsByReportIdSuspense = <TData = Common.DashboardServiceGetDashboardReportsByReportIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ reportId }: {
  reportId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDashboardServiceGetDashboardReportsByReportIdKeyFn({ reportId }, queryKey), queryFn: () => DashboardService.getDashboardReportsByReportId({ reportId }) as TData, ...options });
export const useDashboardServiceGetDashboardReportsCategoriesSuspense = <TData = Common.DashboardServiceGetDashboardReportsCategoriesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDashboardServiceGetDashboardReportsCategoriesKeyFn(queryKey), queryFn: () => DashboardService.getDashboardReportsCategories() as TData, ...options });
