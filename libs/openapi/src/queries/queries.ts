// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { DashboardService, UsersService } from "../requests/services.gen";
import { Body_login_for_access_token_users_login_post, Body_test_user_access_token_users_token_post, CaptchaType } from "../requests/types.gen";
import * as Common from "./common";
export const useUsersServiceGetUsersLoginCaptcha = <TData = Common.UsersServiceGetUsersLoginCaptchaDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ captchaHeight, captchaType, captchaWidth }: {
  captchaHeight?: number;
  captchaType?: CaptchaType;
  captchaWidth?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetUsersLoginCaptchaKeyFn({ captchaHeight, captchaType, captchaWidth }, queryKey), queryFn: () => UsersService.getUsersLoginCaptcha({ captchaHeight, captchaType, captchaWidth }) as TData, ...options });
export const useUsersServiceGetUsersMe = <TData = Common.UsersServiceGetUsersMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetUsersMeKeyFn(queryKey), queryFn: () => UsersService.getUsersMe() as TData, ...options });
export const useDashboardServiceGetDashboardReports = <TData = Common.DashboardServiceGetDashboardReportsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ onlyFavorite, onlyHavingVideo, onlyNew }: {
  onlyFavorite?: boolean;
  onlyHavingVideo?: boolean;
  onlyNew?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDashboardServiceGetDashboardReportsKeyFn({ onlyFavorite, onlyHavingVideo, onlyNew }, queryKey), queryFn: () => DashboardService.getDashboardReports({ onlyFavorite, onlyHavingVideo, onlyNew }) as TData, ...options });
export const useDashboardServiceGetDashboardReportsByReportId = <TData = Common.DashboardServiceGetDashboardReportsByReportIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ reportId }: {
  reportId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDashboardServiceGetDashboardReportsByReportIdKeyFn({ reportId }, queryKey), queryFn: () => DashboardService.getDashboardReportsByReportId({ reportId }) as TData, ...options });
export const useDashboardServiceGetDashboardReportsCategories = <TData = Common.DashboardServiceGetDashboardReportsCategoriesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDashboardServiceGetDashboardReportsCategoriesKeyFn(queryKey), queryFn: () => DashboardService.getDashboardReportsCategories() as TData, ...options });
export const useUsersServicePostUsersLogin = <TData = Common.UsersServicePostUsersLoginMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  captcha: string;
  captchaUid: number;
  formData: Body_login_for_access_token_users_login_post;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  captcha: string;
  captchaUid: number;
  formData: Body_login_for_access_token_users_login_post;
}, TContext>({ mutationFn: ({ captcha, captchaUid, formData }) => UsersService.postUsersLogin({ captcha, captchaUid, formData }) as unknown as Promise<TData>, ...options });
export const useUsersServicePostUsersToken = <TData = Common.UsersServicePostUsersTokenMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: Body_test_user_access_token_users_token_post;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: Body_test_user_access_token_users_token_post;
}, TContext>({ mutationFn: ({ formData }) => UsersService.postUsersToken({ formData }) as unknown as Promise<TData>, ...options });
export const useDashboardServicePostDashboardReportsByReportIdFavorite = <TData = Common.DashboardServicePostDashboardReportsByReportIdFavoriteMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  reportId: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  reportId: number;
}, TContext>({ mutationFn: ({ reportId }) => DashboardService.postDashboardReportsByReportIdFavorite({ reportId }) as unknown as Promise<TData>, ...options });
export const useDashboardServiceDeleteDashboardReportsByReportIdFavorite = <TData = Common.DashboardServiceDeleteDashboardReportsByReportIdFavoriteMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  reportId: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  reportId: number;
}, TContext>({ mutationFn: ({ reportId }) => DashboardService.deleteDashboardReportsByReportIdFavorite({ reportId }) as unknown as Promise<TData>, ...options });
