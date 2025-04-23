// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { DashboardService, UsersService } from "../requests/services.gen";
import { CaptchaType } from "../requests/types.gen";
import * as Common from "./common";
export const prefetchUseUsersServiceGetUsersLoginCaptcha = (queryClient: QueryClient, { captchaHeight, captchaType, captchaWidth }: {
  captchaHeight?: number;
  captchaType?: CaptchaType;
  captchaWidth?: number;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetUsersLoginCaptchaKeyFn({ captchaHeight, captchaType, captchaWidth }), queryFn: () => UsersService.getUsersLoginCaptcha({ captchaHeight, captchaType, captchaWidth }) });
export const prefetchUseUsersServiceGetUsersMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetUsersMeKeyFn(), queryFn: () => UsersService.getUsersMe() });
export const prefetchUseDashboardServiceGetDashboardReports = (queryClient: QueryClient, { onlyFavorite, onlyHavingVideo, onlyNew }: {
  onlyFavorite?: boolean;
  onlyHavingVideo?: boolean;
  onlyNew?: boolean;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseDashboardServiceGetDashboardReportsKeyFn({ onlyFavorite, onlyHavingVideo, onlyNew }), queryFn: () => DashboardService.getDashboardReports({ onlyFavorite, onlyHavingVideo, onlyNew }) });
export const prefetchUseDashboardServiceGetDashboardReportsByReportId = (queryClient: QueryClient, { reportId }: {
  reportId: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseDashboardServiceGetDashboardReportsByReportIdKeyFn({ reportId }), queryFn: () => DashboardService.getDashboardReportsByReportId({ reportId }) });
export const prefetchUseDashboardServiceGetDashboardReportsCategories = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseDashboardServiceGetDashboardReportsCategoriesKeyFn(), queryFn: () => DashboardService.getDashboardReportsCategories() });
