// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { DashboardService, UsersService } from "../requests/services.gen";
import { CaptchaType } from "../requests/types.gen";
import * as Common from "./common";
export const ensureUseUsersServiceGetUsersLoginCaptchaData = (queryClient: QueryClient, { captchaHeight, captchaType, captchaWidth }: {
  captchaHeight?: number;
  captchaType?: CaptchaType;
  captchaWidth?: number;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseUsersServiceGetUsersLoginCaptchaKeyFn({ captchaHeight, captchaType, captchaWidth }), queryFn: () => UsersService.getUsersLoginCaptcha({ captchaHeight, captchaType, captchaWidth }) });
export const ensureUseUsersServiceGetUsersMeData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseUsersServiceGetUsersMeKeyFn(), queryFn: () => UsersService.getUsersMe() });
export const ensureUseDashboardServiceGetDashboardReportsData = (queryClient: QueryClient, { onlyFavorite, onlyHavingVideo, onlyNew }: {
  onlyFavorite?: boolean;
  onlyHavingVideo?: boolean;
  onlyNew?: boolean;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseDashboardServiceGetDashboardReportsKeyFn({ onlyFavorite, onlyHavingVideo, onlyNew }), queryFn: () => DashboardService.getDashboardReports({ onlyFavorite, onlyHavingVideo, onlyNew }) });
export const ensureUseDashboardServiceGetDashboardReportsByReportIdData = (queryClient: QueryClient, { reportId }: {
  reportId: number;
}) => queryClient.ensureQueryData({ queryKey: Common.UseDashboardServiceGetDashboardReportsByReportIdKeyFn({ reportId }), queryFn: () => DashboardService.getDashboardReportsByReportId({ reportId }) });
export const ensureUseDashboardServiceGetDashboardReportsCategoriesData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseDashboardServiceGetDashboardReportsCategoriesKeyFn(), queryFn: () => DashboardService.getDashboardReportsCategories() });
