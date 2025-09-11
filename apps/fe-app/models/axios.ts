/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** TopLeftFilterTimeSeparation */
export enum TopLeftFilterTimeSeparation {
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
}

/** TopLeftFilterSeasonalityEffectTableCriteria */
export enum TopLeftFilterSeasonalityEffectTableCriteria {
  Value1 = 1,
  Value2 = 2,
}

/** TopLeftFilterRiskCriteria */
export enum TopLeftFilterRiskCriteria {
  Value1 = 1,
  Value2 = 2,
}

/** TopLeftFilterBaseCurrency */
export enum TopLeftFilterBaseCurrency {
  Value1 = 1,
  Value2 = 2,
}

/** FundTableTabColumnSort */
export enum FundTableTabColumnSort {
  NO = 'NO',
  ASC = 'ASC',
  DESC = 'DESC',
}

/** FundTableTabColumnColorFormat */
export enum FundTableTabColumnColorFormat {
  NOT_COLORED = 'NOT_COLORED',
  COLORED = 'COLORED',
}

/** FundTableColumnFilterType */
export enum FundTableColumnFilterType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
}

/** FundCalculationPeriod */
export enum FundCalculationPeriod {
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
  Value6 = 6,
}

/** CaptchaType */
export enum CaptchaType {
  Image = 'image',
  Audio = 'audio',
}

/** AddFundToWatchListResponseApiModel */
export interface AddFundToWatchListResponseApiModel {
  /** Success */
  success: boolean;
}

/** AddReportToDashboardForUserBody */
export interface AddReportToDashboardForUserBody {
  /** Reportidentifier */
  reportIdentifier: string;
  /** Order */
  order: number;
  /** Selectedfilters */
  selectedFilters?: Record<string, any> | null;
}

/** AnonymousApiUser */
export type AnonymousApiUser = object;

/** ApiExceptionResponse */
export interface ApiExceptionResponse {
  /** Code */
  code: number;
  /** Domain */
  domain: number;
  /** Message */
  message: string;
}

/** AressApiUser */
export interface AressApiUser {
  /**
   * Identifier
   * Unique identifier of user
   */
  identifier: number;
  /**
   * Username
   * Username for the user
   */
  username: string;
  /**
   * Email
   * Email for the user.
   */
  email: string;
  /**
   * Phonenumber
   * Phone number of the user.
   */
  phoneNumber: string | null;
  /**
   * Nationalcode
   * National code of the user.
   */
  nationalCode: string | null;
  /**
   * Active
   * Whether this user is active or not, is always "true" for logged in user.
   */
  active: boolean;
  /**
   * Firstname
   * First name of user.
   */
  firstName: string | null;
  /**
   * Lastname
   * Last name the user.
   */
  lastName: string | null;
  /**
   * Profilepicture
   * Profile picture url of the user.
   */
  profilePicture: string | null;
}

/** Body_change_profile_picture_users_profile_picture_change_post */
export interface BodyChangeProfilePictureUsersProfilePictureChangePost {
  /**
   * File
   * @format binary
   */
  file: File;
}

/** Body_login_for_access_token_users_login_post */
export interface BodyLoginForAccessTokenUsersLoginPost {
  /** Grant Type */
  grant_type?: string | null;
  /** Username */
  username: string;
  /**
   * Password
   * @format password
   */
  password: string;
  /**
   * Scope
   * @default ""
   */
  scope?: string;
  /** Client Id */
  client_id?: string | null;
  /**
   * Client Secret
   * @format password
   */
  client_secret?: string | null;
}

/** Body_request_new_report_reports_request_post */
export interface BodyRequestNewReportReportsRequestPost {
  /** Request Form */
  request_form: RequestReportForm;
  /** File */
  file?: File | null;
}

/** Body_save_dashboard_item_screenshot_dashboards__dashboard_id__items__dashboard_item_id__screenshot_post */
export interface BodySaveDashboardItemScreenshotDashboardsDashboardIdItemsDashboardItemIdScreenshotPost {
  /**
   * File
   * @format binary
   */
  file: File;
  /** Selected Filters */
  selected_filters: string | null;
}

/** Body_save_screenshot_reports__report_id__screenshot_post */
export interface BodySaveScreenshotReportsReportIdScreenshotPost {
  /** Selected Filters */
  selected_filters: string | null;
  /**
   * File
   * @format binary
   */
  file: File;
}

/** Body_test_user_access_token_users_token_post */
export interface BodyTestUserAccessTokenUsersTokenPost {
  /** Grant Type */
  grant_type?: string | null;
  /** Username */
  username: string;
  /**
   * Password
   * @format password
   */
  password: string;
  /**
   * Scope
   * @default ""
   */
  scope?: string;
  /** Client Id */
  client_id?: string | null;
  /**
   * Client Secret
   * @format password
   */
  client_secret?: string | null;
}

/** CaptchaApiModel */
export interface CaptchaApiModel {
  /** Value */
  value: string | null;
  /** Uid */
  uid: number | null;
  /** Required */
  required: boolean;
}

/** ChangeDashboardReportItemSortOrderBody */
export interface ChangeDashboardReportItemSortOrderBody {
  /** Order */
  order: number;
}

/** ChangeEmailByOtpBody */
export interface ChangeEmailByOtpBody {
  /** Otp */
  otp: string;
}

/** ChangeEmailByOtpResponseApiModel */
export interface ChangeEmailByOtpResponseApiModel {
  /** Success */
  success: boolean;
}

/** ChangeEmailGetOtpBody */
export interface ChangeEmailGetOtpBody {
  /** Newemail */
  newEmail: string;
  /** Passwordverificationtoken */
  passwordVerificationToken: string;
}

/** ChangeEmailGetOtpResponseApiModel */
export interface ChangeEmailGetOtpResponseApiModel {
  /** Retryseconds */
  retrySeconds: number;
  /** Email */
  email: string;
}

/** ChangePasswordByOtpApiModel */
export interface ChangePasswordByOtpApiModel {
  /** Success */
  success: boolean;
}

/** ChangePasswordByOtpBody */
export interface ChangePasswordByOtpBody {
  /** Otp */
  otp: string;
  /** Newpassword */
  newPassword: string;
}

/** ChangePhoneByOtpBody */
export interface ChangePhoneByOtpBody {
  /** Otp */
  otp: string;
}

/** ChangePhoneByOtpResponseApiModel */
export interface ChangePhoneByOtpResponseApiModel {
  /** Success */
  success: boolean;
}

/** ChangePhoneGetOtpBody */
export interface ChangePhoneGetOtpBody {
  /** Newphonenumber */
  newPhoneNumber: string;
  /** Passwordverificationtoken */
  passwordVerificationToken: string;
}

/** ChangePhoneGetOtpResponseApiModel */
export interface ChangePhoneGetOtpResponseApiModel {
  /** Retryseconds */
  retrySeconds: number;
  /** Phonenumber */
  phoneNumber: string;
}

/** ChangeProfilePictureResponseApiModel */
export interface ChangeProfilePictureResponseApiModel {
  /** Success */
  success: boolean;
}

/** ChangeUsernameBody */
export interface ChangeUsernameBody {
  /** Newusername */
  newUsername: string;
  /** Passwordverificationtoken */
  passwordVerificationToken: string;
}

/** ChangeUsernameResponseApiModel */
export interface ChangeUsernameResponseApiModel {
  /** Success */
  success: boolean;
}

/** CreateDashboardForUserBody */
export interface CreateDashboardForUserBody {
  /** Name */
  name: string;
}

/** CreateDashboardResponseApiModel */
export interface CreateDashboardResponseApiModel {
  /** Createddashboardid */
  createdDashboardId: number;
  /** Dashboards */
  dashboards: DashboardListItemApiModel[];
}

/** DashboardDetailsApiModel */
export interface DashboardDetailsApiModel {
  /** Identifier */
  identifier: number;
  /** Name */
  name: string;
  /** Items */
  items: DashboardItemApiModel[];
  /** Funds */
  funds: DashboardFundApiModel[];
  /** Fundtypes */
  fundTypes: DashboardFundTypeApiModel[];
  /** Fundsortparameters */
  fundSortParameters: DashboardFundSortParameterApiModel[];
  /** Fundsortperiods */
  fundSortPeriods: DashboardFundSortPeriodApiModel[];
  /** Selectedfundtypeid */
  selectedFundTypeId: number;
  /** Selectedfundsortparameterid */
  selectedFundSortParameterId: number;
  /** Selectedfundsortperiodid */
  selectedFundSortPeriodId: number;
}

/** DashboardFundApiModel */
export interface DashboardFundApiModel {
  /** Identifier */
  identifier: number;
  /** Registrationnumber */
  registrationNumber: number;
  /** Name */
  name: string;
  /** Abbreviatedname */
  abbreviatedName: string;
  /** Parametervalue */
  parameterValue: number | null;
  /** Sparklinevalues */
  sparklineValues: number[] | null;
}

/** DashboardFundSortParameterApiModel */
export interface DashboardFundSortParameterApiModel {
  /** Identifier */
  identifier: number;
  /** Title */
  title: string;
}

/** DashboardFundSortPeriodApiModel */
export interface DashboardFundSortPeriodApiModel {
  /** Identifier */
  identifier: number;
  /** Title */
  title: string;
}

/** DashboardFundTypeApiModel */
export interface DashboardFundTypeApiModel {
  /** Identifier */
  identifier: number;
  /** Title */
  title: string;
}

/** DashboardItemApiModel */
export interface DashboardItemApiModel {
  /** Identifier */
  identifier: number;
  /** Order */
  order: number;
  /** Displayname */
  displayName: string;
  report: DashboardItemReportApiModel;
  /** Selectedfilters */
  selectedFilters: Record<string, any> | null;
}

/** DashboardItemPreviewApiModel */
export interface DashboardItemPreviewApiModel {
  /** Identifier */
  identifier: number;
  /** Order */
  order: number;
  reportPreview: DashboardReportPreviewApiModel;
}

/** DashboardItemReportApiModel */
export interface DashboardItemReportApiModel {
  /**
   * Identifier
   * Unique identifier of report
   */
  identifier: number;
  /** Title */
  title: string;
  category: FinancialReportCategoryApiModel;
  reportCalculation: FinancialReportCalculationApiModel | null;
}

/** DashboardItemScreenshotResponseApiModel */
export interface DashboardItemScreenshotResponseApiModel {
  /** Queryid */
  queryId: string;
  /** Screenshoturl */
  screenshotUrl: string;
}

/** DashboardListItemApiModel */
export interface DashboardListItemApiModel {
  /** Identifier */
  identifier: number;
  /** Name */
  name: string;
  /** Itemscount */
  itemsCount: number;
  /** Itemslimit */
  itemsLimit: number;
}

/** DashboardReportPreviewApiModel */
export interface DashboardReportPreviewApiModel {
  /** Identifier */
  identifier: number;
  /** Title */
  title: string;
  /** Image */
  image: string;
}

/** DeleteDashboardItemResponseApiModel */
export type DeleteDashboardItemResponseApiModel = object;

/** DuplicateDashboardForUserBody */
export interface DuplicateDashboardForUserBody {
  /** Name */
  name: string;
}

/** FinancialReportCalculationApiModel */
export interface FinancialReportCalculationApiModel {
  /** Calculation */
  calculation:
    | Report2CalculationResult
    | Report6CalculationResult
    | Report13Dot1CalculationResult
    | Report13Dot2CalculationResult
    | Report13Dot3CalculationResult
    | Report15CalculationResult
    | Report36CalculationResult
    | Report39CalculationResult;
  /** Filters */
  filters: FinancialReportFilterApiModel[];
}

/** FinancialReportCategoryApiModel */
export interface FinancialReportCategoryApiModel {
  /** Title */
  title: string;
  /**
   * Identifier
   * Unique identifier of report category
   */
  identifier: number;
}

/** FinancialReportDetailsApiModel */
export interface FinancialReportDetailsApiModel {
  /**
   * Identifier
   * Unique identifier of report
   */
  identifier: string;
  /** Title */
  title: string;
  category: FinancialReportCategoryApiModel;
  /** Image */
  image: string | null;
  /** Summary */
  summary: string;
  /** Markdowndescription */
  markdownDescription: string | null;
  video: VideoApiModel | null;
  /**
   * Userfavorite
   * @default false
   */
  userFavorite?: boolean;
  /**
   * Isnew
   * @default false
   */
  isNew?: boolean;
  /** Relatedreports */
  relatedReports: FinancialReportListItemApiModel[];
  reportCalculation: FinancialReportCalculationApiModel | null;
  /** Screenshoturl */
  screenshotUrl: string | null;
}

/** FinancialReportFilterApiModel */
export interface FinancialReportFilterApiModel {
  /** Parenttitle */
  parentTitle: string | null;
  /** Title */
  title: string;
  /** Searchable */
  searchable: boolean;
  /** Options */
  options: FinancialReportFilterOptionDto[];
  selectedOption: FinancialReportFilterOptionDto;
  /** Optiontype */
  optionType: string;
}

/** FinancialReportFilterOptionDto */
export interface FinancialReportFilterOptionDto {
  /** Identifier */
  identifier: string;
  /** Title */
  title: string;
}

/** FinancialReportListItemApiModel */
export interface FinancialReportListItemApiModel {
  /**
   * Identifier
   * Unique identifier of report
   */
  identifier: string;
  /** Title */
  title: string;
  category: FinancialReportCategoryApiModel;
  /** Image */
  image: string | null;
  /** Summary */
  summary: string;
  /**
   * Hasvideo
   * @default false
   */
  hasVideo?: boolean;
  /**
   * Userfavorite
   * @default false
   */
  userFavorite?: boolean;
  /**
   * Isnew
   * @default false
   */
  isNew?: boolean;
}

/** ForgotPasswordResetByOtpBody */
export interface ForgotPasswordResetByOtpBody {
  /** Otp */
  otp: string;
  /** Newpassword */
  newPassword: string;
  /** Userid */
  userId: number;
}

/** FundBaseInfoApiModel */
export interface FundBaseInfoApiModel {
  /**
   * Name
   * نام کامل صندوق
   */
  name: string;
  /**
   * Abbreviatedname
   * نام صندوق
   */
  abbreviatedName: string;
  /** نوع صندوق */
  fundType: FundTypeApiModel;
  /**
   * Logothumbnail
   * آدرس لوگوی صندوق - سایز کوچک
   */
  logoThumbnail: string | null;
  /**
   * Iswatched
   * افزده شده به دیده بان
   */
  isWatched: boolean;
}

/** FundComparisonOptions */
export interface FundComparisonOptions {
  /**
   * Comparedfunds
   * صندوق‌های مقایسه شده
   */
  comparedFunds: FundBaseInfoApiModel[];
  /** Comparisonenabled */
  comparisonEnabled: boolean;
}

/** FundListItemApiModel */
export interface FundListItemApiModel {
  /**
   * Identifier
   * شناسه صندوق
   */
  identifier: number;
  /**
   * Registrationnumber
   * شماره ثبت نزد سازمان بورس
   */
  registrationNumber: number;
  /**
   * Name
   * نام کامل صندوق
   */
  name: string;
  /**
   * Abbreviatedname
   * نام صندوق
   */
  abbreviatedName: string;
  /** نوع صندوق */
  fundType: FundTypeApiModel;
  /**
   * Logomedium
   * آدرس لوگوی صندوق - سایز متوسط
   */
  logoMedium: string | null;
  /**
   * Logothumbnail
   * آدرس لوگوی صندوق - سایز کوچک
   */
  logoThumbnail: string | null;
  /**
   * Website
   * وبسایت صندوق
   */
  website: string | null;
  /**
   * Statuteurl
   * اساسنامه صندوق
   */
  statuteUrl: string;
  /**
   * Prospectusurl
   * امیدنامه صندوق
   */
  prospectusUrl: string;
  /**
   * Isetf
   * آیا صندوق etf است
   */
  isEtf: boolean;
  /**
   * Ischarity
   * آیا صندوق نیکوکاری است
   */
  isCharity: boolean;
  /**
   * Hasvideo
   * دارای ویدیو بررسی
   */
  hasVideo: boolean;
  /**
   * Manager
   * مدیر صندوق
   */
  manager: string | null;
  /**
   * Custodian
   * متولی صندوق
   */
  custodian: string | null;
  /**
   * Auditor
   * حسابرس صندوق
   */
  auditor: string | null;
  /**
   * Liquidityguarantor
   * ضامن نقد شوندگی صندوق
   */
  liquidityGuarantor: string | null;
  /**
   * Marketmaker
   * بازارگردان
   */
  marketMaker: string | null;
  /**
   * Initiationdate
   * تاریخ آغاز فعالیت میلادی
   */
  initiationDate: string;
  /**
   * Initiationjdate
   * تاریخ آغاز فعالیت
   */
  initiationJdate: string;
  /**
   * Returnlastmonthpercent
   * بازده ماهانه
   */
  returnLastMonthPercent: number | null;
  /**
   * Redeemnavrials
   * قیمت ابطال (ریال)
   */
  redeemNavRials: number;
}

/** FundReturnAnalysisResponseApiModel */
export interface FundReturnAnalysisResponseApiModel {
  /** روند بازدهی */
  returnTrend: FundReturnAnalysisReturnTrendApiModel | null;
  /** مقایسه بازدهی */
  returnComparison: FundReturnAnalysisReturnComparisonApiModel | null;
  /** رتبه بازدهی */
  returnRank: FundReturnAnalysisReturnRankApiModel | null;
  /** رتبه بازدهی */
  riskReturnAnalysis: FundReturnAnalysisRiskReturnAnalysisApiModel | null;
  /** تحلیل اثر فصلی */
  seasonalityEffectAnalysis: FundReturnAnalysisSeasonalityEffectAnalysisApiModel | null;
}

/** FundReturnAnalysisReturnChartApiModel */
export interface FundReturnAnalysisReturnChartApiModel {
  /**
   * Title
   * عنوان
   */
  title: string;
  /**
   * Relatedfundid
   * شناسه صندوق مرتبط
   */
  relatedFundId: number | null;
  /**
   * Returninperiodpercent
   * بازده
   */
  returnInPeriodPercent: number | null;
  /**
   * History
   * روند بازده
   */
  history: FundReturnAnalysisReturnChartHistoryItemApiModel[];
}

/** FundReturnAnalysisReturnChartHistoryItemApiModel */
export interface FundReturnAnalysisReturnChartHistoryItemApiModel {
  /**
   * Returnpercent
   * بازده روز
   */
  returnPercent: number;
  /**
   * Jdtlabel
   * لیبل تاریخ
   */
  jdtLabel: string;
  /**
   * Jdt
   * تاریخ شمسی به فرمت YYYY-mm-dd
   */
  jdt: string;
  /**
   * Dt
   * تاریخ میلادی به فرمت YYYY-mm-dd
   */
  dt: string;
}

/** FundReturnAnalysisReturnComparisonApiModel */
export interface FundReturnAnalysisReturnComparisonApiModel {
  /** تفکیک زمانی */
  topLeftFilterOptions: TopLeftFilterOptions;
  /**
   * Tablecolumns
   * ستون‌های جدول مقایسه بازدهی
   */
  tableColumns: FundReturnAnalysisReturnComparisonTableColumnApiModel[];
  /**
   * Fundaveragereturnpercent
   * متوسط صندوق
   */
  fundAverageReturnPercent: number;
  /**
   * Stockfundsaveragereturnpercent
   * متوسط صندوق‌های سهامی
   */
  stockFundsAverageReturnPercent: number;
  /**
   * Tedpixaveragereturnpercent
   * متوسط شاخص کل
   */
  tedpixAverageReturnPercent: number;
}

/** FundReturnAnalysisReturnComparisonBody */
export interface FundReturnAnalysisReturnComparisonBody {
  /** تفکیک زمانی */
  selectedTopLeftFilterOption: TopLeftFilterTimeSeparation;
}

/** FundReturnAnalysisReturnComparisonTableColumnApiModel */
export interface FundReturnAnalysisReturnComparisonTableColumnApiModel {
  /**
   * Columnlabel
   * عنوان ستون
   */
  columnLabel: string;
  /**
   * Fundreturnpercent
   * صندوق
   */
  fundReturnPercent: number;
  /**
   * Stockfundsreturnpercent
   * صندوق‌های سهامی
   */
  stockFundsReturnPercent: number;
  /**
   * Tedpixreturnpercent
   * شاخص کل
   */
  tedpixReturnPercent: number;
}

/** FundReturnAnalysisReturnRankApiModel */
export interface FundReturnAnalysisReturnRankApiModel {
  /** تفکیک زمانی */
  topLeftFilterOptions: TopLeftFilterOptions;
  /**
   * Tablecolumns
   * ستون‌های جدول رتبه بازدهی
   */
  tableColumns: FundReturnAnalysisReturnRankTableColumnApiModel[];
  /**
   * Quarteraveragereturnrank
   * متوسط چارکی
   */
  quarterAverageReturnRank: number;
  /**
   * Percentaveragereturnrank
   * متوسط درصدی
   */
  percentAverageReturnRank: number;
  /**
   * Relativeaveragereturnrank
   * متوسط نسبی
   */
  relativeAverageReturnRank: string;
}

/** FundReturnAnalysisReturnRankBody */
export interface FundReturnAnalysisReturnRankBody {
  /** تفکیک زمانی */
  selectedTopLeftFilterOption: TopLeftFilterTimeSeparation;
}

/** FundReturnAnalysisReturnRankTableColumnApiModel */
export interface FundReturnAnalysisReturnRankTableColumnApiModel {
  /**
   * Columnlabel
   * عنوان ستون
   */
  columnLabel: string;
  /**
   * Quarterrank
   * رتبه چارکی (۱ - ۴)
   */
  quarterRank: number;
  /**
   * Percentrank
   * رتبه درصدی
   */
  percentRank: number;
  /**
   * Relativerank
   * رتبه نسبی
   */
  relativeRank: string;
}

/** FundReturnAnalysisReturnTrendApiModel */
export interface FundReturnAnalysisReturnTrendApiModel {
  /** بازه زمانی */
  timeRangeFilterOptions: FundTimeRangeFilterOptions;
  /** ارز مبنای بازده */
  topLeftFilterOptions: TopLeftFilterOptions;
  /** صندوق‌های مقایسه شده */
  fundComparisonOptions: FundComparisonOptions;
  /**
   * Fundreturninperiodpercent
   * بازده صندوق
   */
  fundReturnInPeriodPercent: number | null;
  /**
   * Stockfundsreturninperiodpercent
   * بازده صندوق‌های سهامی
   */
  stockFundsReturnInPeriodPercent: number | null;
  /**
   * Tedpixreturninperiodpercent
   * بازده شاخص کل
   */
  tedpixReturnInPeriodPercent: number | null;
  /**
   * Fundreturnvsstockfundsinperiodpercent
   * بازده اضافه صندوق نسبت به صندوق‌های سهامی
   */
  fundReturnVsStockFundsInPeriodPercent: number | null;
  /**
   * Fundreturnvstedpixinperiodpercent
   * بازده اضافه صندوق نسبت به شاخص کل
   */
  fundReturnVsTedpixInPeriodPercent: number | null;
  /**
   * Fundaverageleveragepercent
   * میانگین اهرم
   */
  fundAverageLeveragePercent: number | null;
  /**
   * Stockfundsaverageleveragepercent
   * میانگین اهرم صندوق‌های سهامی
   */
  stockFundsAverageLeveragePercent: number | null;
  /**
   * Returnchart
   * نمودار روند بازدهی
   */
  returnChart: FundReturnAnalysisReturnChartApiModel[];
}

/** FundReturnAnalysisReturnTrendBody */
export interface FundReturnAnalysisReturnTrendBody {
  selectedTimeRangeFilterOption: SelectedFundTimeRangeFilterOption;
  /** ارز مبنای بازده */
  selectedTopLeftFilterOption: TopLeftFilterBaseCurrency;
  /**
   * Comparedfundids
   * شناسه صندوق‌های مقایسه
   */
  comparedFundIds: number[];
}

/** FundReturnAnalysisRiskReturnAnalysisApiModel */
export interface FundReturnAnalysisRiskReturnAnalysisApiModel {
  /** معیار ریسک */
  topLeftFilterOptions: TopLeftFilterOptions;
  /** بازه زمانی */
  timeRangeFilterOptions: FundTimeRangeFilterOptions;
  /** صندوق‌های مقایسه شده */
  fundComparisonOptions: FundComparisonOptions;
  /**
   * Chartitems
   * نمودار تحلیل ریسک
   */
  chartItems: FundReturnAnalysisRiskReturnAnalysisChartItemApiModel[];
}

/** FundReturnAnalysisRiskReturnAnalysisBody */
export interface FundReturnAnalysisRiskReturnAnalysisBody {
  /** معیار ریسک */
  selectedTopLeftFilterOption: TopLeftFilterRiskCriteria;
  selectedTimeRangeFilterOption: SelectedFundTimeRangeFilterOption;
  /**
   * Comparedfundids
   * شناسه صندوق‌های مقایسه
   */
  comparedFundIds: number[];
}

/** FundReturnAnalysisRiskReturnAnalysisChartItemApiModel */
export interface FundReturnAnalysisRiskReturnAnalysisChartItemApiModel {
  /** Fundid */
  fundId: number;
  /** Abbreviatedname */
  abbreviatedName: string;
  /** Risk */
  risk: number;
  /** Returnpercent */
  returnPercent: number;
  /** Netassetsrials */
  netAssetsRials: number;
  /** Colorhex */
  colorHex: string;
}

/** FundReturnAnalysisSeasonalityEffectAnalysisApiModel */
export interface FundReturnAnalysisSeasonalityEffectAnalysisApiModel {
  /** جدول بر مبنای */
  topLeftFilterOptions: TopLeftFilterOptions;
  /**
   * Rows
   * سال‌ها
   */
  rows: FundReturnAnalysisSeasonalityEffectTableRowApiModel[];
  /** میانگین */
  averageRow: FundReturnAnalysisSeasonalityEffectTableAverageRowApiModel;
  /** انحراف معیار */
  standardDeviation: FundReturnAnalysisSeasonalityEffectTableStandardDeviationRowApiModel;
}

/** FundReturnAnalysisSeasonalityEffectAnalysisBody */
export interface FundReturnAnalysisSeasonalityEffectAnalysisBody {
  /** جدول بر مبنای */
  selectedTopLeftFilterOption: TopLeftFilterSeasonalityEffectTableCriteria;
}

/** FundReturnAnalysisSeasonalityEffectTableAverageRowApiModel */
export interface FundReturnAnalysisSeasonalityEffectTableAverageRowApiModel {
  /**
   * Return1Percent
   * فروردین
   */
  return1Percent: number | null;
  /**
   * Return2Percent
   * اردیبهشت
   */
  return2Percent: number | null;
  /**
   * Return3Percent
   * خرداد
   */
  return3Percent: number | null;
  /**
   * Return4Percent
   * تیر
   */
  return4Percent: number | null;
  /**
   * Return5Percent
   * مرداد
   */
  return5Percent: number | null;
  /**
   * Return6Percent
   * شهریور
   */
  return6Percent: number | null;
  /**
   * Return7Percent
   * مهر
   */
  return7Percent: number | null;
  /**
   * Return8Percent
   * آبان
   */
  return8Percent: number | null;
  /**
   * Return9Percent
   * آذر
   */
  return9Percent: number | null;
  /**
   * Return10Percent
   * دی
   */
  return10Percent: number | null;
  /**
   * Return11Percent
   * بهمن
   */
  return11Percent: number | null;
  /**
   * Return12Percent
   * اسفند
   */
  return12Percent: number | null;
}

/** FundReturnAnalysisSeasonalityEffectTableRowApiModel */
export interface FundReturnAnalysisSeasonalityEffectTableRowApiModel {
  /** Year */
  year: number;
  /**
   * Return1Percent
   * فروردین
   */
  return1Percent: number | null;
  /**
   * Return2Percent
   * اردیبهشت
   */
  return2Percent: number | null;
  /**
   * Return3Percent
   * خرداد
   */
  return3Percent: number | null;
  /**
   * Return4Percent
   * تیر
   */
  return4Percent: number | null;
  /**
   * Return5Percent
   * مرداد
   */
  return5Percent: number | null;
  /**
   * Return6Percent
   * شهریور
   */
  return6Percent: number | null;
  /**
   * Return7Percent
   * مهر
   */
  return7Percent: number | null;
  /**
   * Return8Percent
   * آبان
   */
  return8Percent: number | null;
  /**
   * Return9Percent
   * آذر
   */
  return9Percent: number | null;
  /**
   * Return10Percent
   * دی
   */
  return10Percent: number | null;
  /**
   * Return11Percent
   * بهمن
   */
  return11Percent: number | null;
  /**
   * Return12Percent
   * اسفند
   */
  return12Percent: number | null;
}

/** FundReturnAnalysisSeasonalityEffectTableStandardDeviationRowApiModel */
export interface FundReturnAnalysisSeasonalityEffectTableStandardDeviationRowApiModel {
  /**
   * Std1Percent
   * فروردین
   */
  std1Percent: number | null;
  /**
   * Std2Percent
   * اردیبهشت
   */
  std2Percent: number | null;
  /**
   * Std3Percent
   * خرداد
   */
  std3Percent: number | null;
  /**
   * Std4Percent
   * تیر
   */
  std4Percent: number | null;
  /**
   * Std5Percent
   * مرداد
   */
  std5Percent: number | null;
  /**
   * Std6Percent
   * شهریور
   */
  std6Percent: number | null;
  /**
   * Std7Percent
   * مهر
   */
  std7Percent: number | null;
  /**
   * Std8Percent
   * آبان
   */
  std8Percent: number | null;
  /**
   * Std9Percent
   * آذر
   */
  std9Percent: number | null;
  /**
   * Std10Percent
   * دی
   */
  std10Percent: number | null;
  /**
   * Std11Percent
   * بهمن
   */
  std11Percent: number | null;
  /**
   * Std12Percent
   * اسفند
   */
  std12Percent: number | null;
}

/** FundSummaryBaseInfoApiModel */
export interface FundSummaryBaseInfoApiModel {
  /**
   * Manager
   * مدیر صندوق
   */
  manager: string;
  /**
   * Investmentstrategy
   * سیاست سرمایه‌گذاری
   */
  investmentStrategy: string;
  /**
   * Assetundermanagementrials
   * ارزش خالص دارایی
   */
  assetUnderManagementRials: number;
  /**
   * Alphasinceinitiationpercent
   * بازده اضافه
   */
  alphaSinceInitiationPercent: number | null;
  /**
   * Betasinceinitiationpercent
   * بتای صندوق
   */
  betaSinceInitiationPercent: number | null;
  /**
   * Leveragesinceinitiationpercent
   * اهرم صندوق
   */
  leverageSinceInitiationPercent: number | null;
  /**
   * Investedunits
   * تعداد واحد سرمایه‌گذاری
   */
  investedUnits: number;
  /**
   * Initiationdate
   * تاریخ آغاز فعالیت میلادی
   */
  initiationDate: string;
  /**
   * Initiationjdate
   * تاریخ آغاز فعالیت شمسی
   */
  initiationJdate: string;
  /**
   * Lastupdatedate
   * تاریخ به روز رسانی میلادی
   */
  lastUpdateDate: string;
  /**
   * Lastupdatejdate
   * تاریخ به روز رسانی شمسی
   */
  lastUpdateJdate: string;
  /**
   * Timesinceinitiation
   * سابقه صندوق
   */
  timeSinceInitiation: string;
}

/** FundSummaryCaseByCaseApiModel */
export interface FundSummaryCaseByCaseApiModel {
  /** بازه زمانی */
  timeRangeFilterOptions: FundTimeRangeFilterOptions;
  /**
   * Navendofperiodrials
   * مقدار nav در آخرین روز بازه زمانی
   */
  navEndOfPeriodRials: number;
  /**
   * Returnendofperiodrials
   * سود ریالی در آخرین روز بازه زمانی
   */
  returnEndOfPeriodRials: number;
  /**
   * Returnendofperiodpercent
   * سود درصدی در آخرین روز بازه زمانی
   */
  returnEndOfPeriodPercent: number;
  /**
   * Returninperiodpercent
   * بازده صندوق
   */
  returnInPeriodPercent: number;
  /**
   * Betainperiodpercent
   * بتا صندوق
   */
  betaInPeriodPercent: number;
  /**
   * Revokedunitsinperiod
   * واحدهای ابطال شده
   */
  revokedUnitsInPeriod: number;
  /**
   * Issuedunitsinperiod
   * واحدهای صادر شده
   */
  issuedUnitsInPeriod: number;
  /**
   * Pricerangeminimumrials
   * کمینه قیمت
   */
  priceRangeMinimumRials: number;
  /**
   * Pricerangemaximumrials
   * بیشینه قیمت
   */
  priceRangeMaximumRials: number;
  /**
   * Assetturnoverratiopercent
   * گردش دارایی
   */
  assetTurnoverRatioPercent: number;
  /**
   * Averagenavinperiod
   * میانگین قیمت
   */
  averageNavInPeriod: number;
  /**
   * Navhistory
   * نمودار تاریخچه قیمت
   */
  navHistory: FundSummaryCaseByCaseNavHistoryItemApiModel[];
}

/** FundSummaryCaseByCaseBody */
export interface FundSummaryCaseByCaseBody {
  selectedTimeRangeFilterOption: SelectedFundTimeRangeFilterOption;
}

/** FundSummaryCaseByCaseNavHistoryItemApiModel */
export interface FundSummaryCaseByCaseNavHistoryItemApiModel {
  /**
   * Revokenavrials
   * nav ابطال
   */
  revokeNavRials: number;
  /**
   * Jdtlabel
   * لیبل تاریخ
   */
  jdtLabel: string;
  /**
   * Jdt
   * تاریخ شمسی به فرمت YYYY-mm-dd
   */
  jdt: string;
  /**
   * Dt
   * تاریخ میلادی به فرمت YYYY-mm-dd
   */
  dt: string;
}

/** FundSummaryResponseApiModel */
export interface FundSummaryResponseApiModel {
  /** بالای تب ها */
  fundBasicInfo: FundBaseInfoApiModel;
  /** ردیف ابتدای تب خلاصه */
  fundSummaryBasicInfo: FundSummaryBaseInfoApiModel | null;
  /** خلاصه موردی */
  fundSummaryCaseByCase: FundSummaryCaseByCaseApiModel | null;
  /**
   * Fundvideoplaylist
   * فهرست مصاحبه‌های ویدئویی
   */
  fundVideoPlaylist: FundVideoPlaylistItemApiModel[];
}

/** FundTableItemInfoApiModel */
export interface FundTableItemInfoApiModel {
  /**
   * Identifier
   * شناسه صندوق
   */
  identifier: number;
  /**
   * Registrationnumber
   * شماره ثبت نزد سازمان بورس
   */
  registrationNumber: number;
  /**
   * Name
   * نام کامل صندوق
   */
  name: string;
  /**
   * Abbreviatedname
   * نام صندوق
   */
  abbreviatedName: string;
  /**
   * Investmentstrategy
   * سیاست سرمایه‌گذاری
   */
  investmentStrategy: string;
  /** نوع صندوق */
  fundType: FundTypeApiModel;
  /**
   * Logomedium
   * آدرس لوگوی صندوق - سایز متوسط
   */
  logoMedium: string | null;
  /**
   * Logothumbnail
   * آدرس لوگوی صندوق - سایز کوچک
   */
  logoThumbnail: string | null;
  /**
   * Website
   * وبسایت صندوق
   */
  website: string | null;
  /**
   * Statuteurl
   * اساسنامه صندوق
   */
  statuteUrl: string;
  /**
   * Prospectusurl
   * امیدنامه صندوق
   */
  prospectusUrl: string;
  /**
   * Isetf
   * آیا صندوق etf است
   */
  isEtf: boolean;
  /**
   * Ischarity
   * آیا صندوق نیکوکاری است
   */
  isCharity: boolean;
  /**
   * Hasvideo
   * دارای ویدیو بررسی
   */
  hasVideo: boolean;
  /**
   * Manager
   * مدیر صندوق
   */
  manager: string | null;
  /**
   * Custodian
   * متولی صندوق
   */
  custodian: string | null;
  /**
   * Auditor
   * حسابرس صندوق
   */
  auditor: string | null;
  /**
   * Liquidityguarantor
   * ضامن نقد شوندگی صندوق
   */
  liquidityGuarantor: string | null;
  /**
   * Marketmaker
   * بازارگردان
   */
  marketMaker: string | null;
  /**
   * Initiationdate
   * تاریخ آغاز فعالیت میلادی
   */
  initiationDate: string;
  /**
   * Initiationjdate
   * تاریخ آغاز فعالیت
   */
  initiationJdate: string;
  /**
   * Issuenavrials
   * قیمت صدور (ریال)
   */
  issueNavRials: number;
  /**
   * Redeemnavrials
   * قیمت ابطال (ریال)
   */
  redeemNavRials: number;
  /**
   * Statisticalnavrials
   * قیمت آماری (ریال)
   */
  statisticalNavRials: number;
  /**
   * Assetundermanagementrials
   * کل ارزش خالص دارایی‌ها (ریال)
   */
  assetUnderManagementRials: number;
  /**
   * Numberofunits
   * تعداد واحد
   */
  numberOfUnits: number;
  /**
   * Returnlastdaypercent
   * بازده روزانه
   */
  returnLastDayPercent: number | null;
  /**
   * Returnlastweekpercent
   * بازده هفتگی
   */
  returnLastWeekPercent: number | null;
  /**
   * Returnlastmonthpercent
   * بازده ماهانه
   */
  returnLastMonthPercent: number | null;
  /**
   * Returnlast3Monthspercent
   * بازده سه‌ماهه
   */
  returnLast3MonthsPercent: number | null;
  /**
   * Returnlast6Monthspercent
   * بازده شش‌ماهه
   */
  returnLast6MonthsPercent: number | null;
  /**
   * Returnlastyearpercent
   * بازده یک‌ساله
   */
  returnLastYearPercent: number | null;
  /**
   * Returncustomperiodpercent
   * بازده بازه دلخواه
   */
  returnCustomPeriodPercent: number | null;
  /**
   * Returnvstedpixlastdaypercent
   * بازده نسبت به شاخص روزانه
   */
  returnVsTedpixLastDayPercent: number | null;
  /**
   * Returnvstedpixlastweekpercent
   * بازده نسبت به شاخص هفتگی
   */
  returnVsTedpixLastWeekPercent: number | null;
  /**
   * Returnvstedpixlastmonthpercent
   * بازده نسبت به شاخص ماهانه
   */
  returnVsTedpixLastMonthPercent: number | null;
  /**
   * Returnvstedpixlast3Monthspercent
   * بازده نسبت به شاخص سه‌ماهه
   */
  returnVsTedpixLast3MonthsPercent: number | null;
  /**
   * Returnvstedpixlast6Monthspercent
   * بازده نسبت به شاخص شش‌ماهه
   */
  returnVsTedpixLast6MonthsPercent: number | null;
  /**
   * Returnvstedpixlastyearpercent
   * بازده نسبت به شاخص یک‌ساله
   */
  returnVsTedpixLastYearPercent: number | null;
  /**
   * Returnvstedpixcustomperiodpercent
   * بازده نسبت به شاخص بازه دلخواه
   */
  returnVsTedpixCustomPeriodPercent: number | null;
  /**
   * Assetallocationbondpercent
   * سهم اوراق مشارکت از پورتفوی
   */
  assetAllocationBondPercent: number;
  /**
   * Assetallocationbankdepositpercent
   * سهم سپرده بانکی از پورتفوی
   */
  assetAllocationBankDepositPercent: number;
  /**
   * Assetallocationcommoditydepositcertificatepercent
   * سهم گواهی سپرده کالایی از پورتفوی
   */
  assetAllocationCommodityDepositCertificatePercent: number;
  /**
   * Assetallocationcashpercent
   * سهم وجه نقد از پورتفوی
   */
  assetAllocationCashPercent: number;
  /**
   * Assetallocationstocksincludingtop5Percent
   * سهم سهام از پورتفوی
   */
  assetAllocationStocksIncludingTop5Percent: number;
  /**
   * Assetallocationfundunitspercent
   * سهم واحد صندوق‌ها از پورتفوی
   */
  assetAllocationFundUnitsPercent: number;
  /**
   * Assetallocationotherpercent
   * سهم سایر از پورتفوی
   */
  assetAllocationOtherPercent: number;
  /**
   * Assetallocationtop5Stockspercent
   * سهم پنج سهم برتر از پورتفوی
   */
  assetAllocationTop5StocksPercent: number;
  /**
   * Averageleveragelastweek
   * میانگین اهرم هفتگی
   */
  averageLeverageLastWeek: number | null;
  /**
   * Averageleveragelastmonth
   * میانگین اهرم ماهانه
   */
  averageLeverageLastMonth: number | null;
  /**
   * Averageleveragelast3Months
   * میانگین اهرم سه‌ماهه
   */
  averageLeverageLast3Months: number | null;
  /**
   * Averageleveragelast6Months
   * میانگین اهرم شش‌ماهه
   */
  averageLeverageLast6Months: number | null;
  /**
   * Averageleveragelastyear
   * میانگین اهرم یک‌ساله
   */
  averageLeverageLastYear: number | null;
  /**
   * Averageleveragecustomperiod
   * میانگین اهرم بازه دلخواه
   */
  averageLeverageCustomPeriod: number | null;
  /**
   * Standarddeviationlastweek
   * انحراف از میانگین هفتگی
   */
  standardDeviationLastWeek: number | null;
  /**
   * Standarddeviationlastmonth
   * انحراف از میانگین ماهانه
   */
  standardDeviationLastMonth: number | null;
  /**
   * Standarddeviationlast3Months
   * انحراف از میانگین سه‌ماهه
   */
  standardDeviationLast3Months: number | null;
  /**
   * Standarddeviationlast6Months
   * انحراف از میانگین شش‌ماهه
   */
  standardDeviationLast6Months: number | null;
  /**
   * Standarddeviationlastyear
   * انحراف از میانگین یک‌ساله
   */
  standardDeviationLastYear: number | null;
  /**
   * Standarddeviationcustomperiod
   * انحراف از میانگین بازه دلخواه
   */
  standardDeviationCustomPeriod: number | null;
  /**
   * Sharperatiolastweek
   * نسبت شارپی هفتگی
   */
  sharpeRatioLastWeek: number | null;
  /**
   * Sharperatiolastmonth
   * نسبت شارپی ماهانه
   */
  sharpeRatioLastMonth: number | null;
  /**
   * Sharperatiolast3Months
   * نسبت شارپی سه‌ماهه
   */
  sharpeRatioLast3Months: number | null;
  /**
   * Sharperatiolast6Months
   * نسبت شارپی شش‌ماهه
   */
  sharpeRatioLast6Months: number | null;
  /**
   * Sharperatiolastyear
   * نسبت شارپی یک‌ساله
   */
  sharpeRatioLastYear: number | null;
  /**
   * Sharperatiocustomperiod
   * نسبت شارپی بازه دلخواه
   */
  sharpeRatioCustomPeriod: number | null;
  /**
   * Informationratiolastweek
   * نسبت اطلاعاتی هفتگی
   */
  informationRatioLastWeek: number | null;
  /**
   * Informationratiolastmonth
   * نسبت اطلاعاتی ماهانه
   */
  informationRatioLastMonth: number | null;
  /**
   * Informationratiolast3Months
   * نسبت اطلاعاتی سه‌ماهه
   */
  informationRatioLast3Months: number | null;
  /**
   * Informationratiolast6Months
   * نسبت اطلاعاتی شش‌ماهه
   */
  informationRatioLast6Months: number | null;
  /**
   * Informationratiolastyear
   * نسبت اطلاعاتی یک‌ساله
   */
  informationRatioLastYear: number | null;
  /**
   * Informationratiocustomperiod
   * نسبت اطلاعاتی بازه دلخواه
   */
  informationRatioCustomPeriod: number | null;
  /**
   * Alphalastday
   * آلفا روزانه
   */
  alphaLastDay: number | null;
  /**
   * Alphalastweek
   * آلفا هفتگی
   */
  alphaLastWeek: number | null;
  /**
   * Alphalastmonth
   * آلفا ماهانه
   */
  alphaLastMonth: number | null;
  /**
   * Alphalast3Months
   * آلفا سه‌ماهه
   */
  alphaLast3Months: number | null;
  /**
   * Alphalast6Months
   * آلفا شش‌ماهه
   */
  alphaLast6Months: number | null;
  /**
   * Alphalastyear
   * آلفا یک‌ساله
   */
  alphaLastYear: number | null;
  /**
   * Alphacustomperiod
   * آلفا بازه دلخواه
   */
  alphaCustomPeriod: number | null;
  /**
   * Betalastday
   * بتا روزانه
   */
  betaLastDay: number | null;
  /**
   * Betalastweek
   * بتا هفتگی
   */
  betaLastWeek: number | null;
  /**
   * Betalastmonth
   * بتا ماهانه
   */
  betaLastMonth: number | null;
  /**
   * Betalast3Months
   * بتا سه‌ماهه
   */
  betaLast3Months: number | null;
  /**
   * Betalast6Months
   * بتا شش‌ماهه
   */
  betaLast6Months: number | null;
  /**
   * Betalastyear
   * بتا یک‌ساله
   */
  betaLastYear: number | null;
  /**
   * Betacustomperiod
   * بتا بازه دلخواه
   */
  betaCustomPeriod: number | null;
  /**
   * Maxdrawdownweek
   * بیشترین ریزش هفتگی
   */
  maxDrawdownWeek: number | null;
  /**
   * Maxdrawdownmonth
   * بیشترین ریزش ماهانه
   */
  maxDrawdownMonth: number | null;
  /**
   * Maxdrawdown3Months
   * بیشترین ریزش سه‌ماهه
   */
  maxDrawdown3Months: number | null;
  /**
   * Maxdrawdown6Months
   * بیشترین ریزش شش‌ماهه
   */
  maxDrawdown6Months: number | null;
  /**
   * Maxdrawdownyear
   * بیشترین ریزش یک‌ساله
   */
  maxDrawdownYear: number | null;
  /**
   * Maxdrawdowncustomperiod
   * بیشترین ریزش بازه دلخواه
   */
  maxDrawdownCustomPeriod: number | null;
}

/** FundTableResponseApiModel */
export interface FundTableResponseApiModel {
  /** Tabs */
  tabs: FundTableTabApiModel[];
  /** Selectedtabidentifier */
  selectedTabIdentifier: number;
  /** Selectedtabfunds */
  selectedTabFunds: FundsTableItemApiModel[];
  /** Columns */
  columns: FundTableTabColumnDto[];
  /** Columngroups */
  columnGroups: FundTableTabColumnGroupDto[];
  /** Defaultcolumns */
  defaultColumns: FundTableTabColumnDto[];
}

/** FundTableTabApiModel */
export interface FundTableTabApiModel {
  /** Identifier */
  identifier: number;
  /** Title */
  title: string;
  /** Color */
  color: string | null;
}

/** FundTableTabColumnDto */
export interface FundTableTabColumnDto {
  /** Label */
  label: string;
  /** Uppertitle */
  upperTitle: string;
  /** Lowertitle */
  lowerTitle: string | null;
  /** Key */
  key: string;
  /** Visible */
  visible: boolean;
  sort: FundTableTabColumnSort;
  colorFormat: FundTableTabColumnColorFormat;
  columnFilterType?: FundTableColumnFilterType | null;
  /** Columnfilter */
  columnFilter?:
    | FundTableTabColumnFilterTextDto
    | FundTableTabColumnFilterOptionsDto
    | null;
  /** Columngroupid */
  columnGroupId: number | null;
  /** Nameingroup */
  nameInGroup: string | null;
  /** Customperiodstartjdate */
  customPeriodStartJdate: string | null;
  /** Customperiodendjdate */
  customPeriodEndJdate: string | null;
}

/** FundTableTabColumnFilterDateAmountOptionDto */
export interface FundTableTabColumnFilterDateAmountOptionDto {
  /** Identifier */
  identifier: string;
  /** Label */
  label: string;
  /** Selected */
  selected: boolean;
  /** Min Date */
  min_date: string | null;
  /** Max Date */
  max_date: string | null;
}

/** FundTableTabColumnFilterFloatAmountOptionDto */
export interface FundTableTabColumnFilterFloatAmountOptionDto {
  /** Identifier */
  identifier: string;
  /** Label */
  label: string;
  /** Selected */
  selected: boolean;
  /** Min Amount */
  min_amount: number | null;
  /** Max Amount */
  max_amount: number | null;
}

/** FundTableTabColumnFilterIntAmountOptionDto */
export interface FundTableTabColumnFilterIntAmountOptionDto {
  /** Identifier */
  identifier: string;
  /** Label */
  label: string;
  /** Selected */
  selected: boolean;
  /** Min Amount */
  min_amount: number | null;
  /** Max Amount */
  max_amount: number | null;
}

/** FundTableTabColumnFilterOptionsDto */
export interface FundTableTabColumnFilterOptionsDto {
  /** Options */
  options: (
    | FundTableTabColumnFilterIntAmountOptionDto
    | FundTableTabColumnFilterFloatAmountOptionDto
    | FundTableTabColumnFilterDateAmountOptionDto
  )[];
}

/** FundTableTabColumnFilterTextDto */
export interface FundTableTabColumnFilterTextDto {
  /** Filter Text */
  filter_text: string | null;
}

/** FundTableTabColumnGroupDto */
export interface FundTableTabColumnGroupDto {
  /** Identifier */
  identifier: number;
  /** Label */
  label: string;
}

/** FundTimeRangeFilterOption */
export interface FundTimeRangeFilterOption {
  /** Identifier */
  identifier: string;
  /** Title */
  title: string;
  /** Iscustomperiod */
  isCustomPeriod: boolean;
  /** Periodstartjdate */
  periodStartJdate: string | null;
  /** Periodendjdate */
  periodEndJdate: string | null;
  /** Selected */
  selected: boolean;
}

/** FundTimeRangeFilterOptions */
export interface FundTimeRangeFilterOptions {
  /** Options */
  options: FundTimeRangeFilterOption[];
  /** Enablecustomperiod */
  enableCustomPeriod: boolean;
}

/** FundTypeApiModel */
export interface FundTypeApiModel {
  /** Identifier */
  identifier: number;
  /** Title */
  title: string;
}

/** FundVideoPlaylistItemApiModel */
export interface FundVideoPlaylistItemApiModel {
  /**
   * Recordjdate
   * تاریخ رکورد ویدئو به فرمت YYYY-mm-dd
   */
  recordJdate: string;
  /**
   * Intervieweeimagethumbnail
   * آدرس عکس مصاحبه شونده
   */
  intervieweeImageThumbnail: string | null;
  /**
   * Intervieweename
   * نام مصاحبه شونده
   */
  intervieweeName: string;
  /**
   * Intervieweerole
   * سمت مصاحبه شونده
   */
  intervieweeRole: string;
  video: VideoApiModel;
}

/** FundsTableItemApiModel */
export interface FundsTableItemApiModel {
  info: FundTableItemInfoApiModel;
  /** Pinned */
  pinned: boolean;
  /** Mark */
  mark: string | null;
  /** Isinwatchlist */
  isInWatchlist: boolean;
}

/** GetDashboardItemCalculationsBody */
export interface GetDashboardItemCalculationsBody {
  /** Selectedfilters */
  selectedFilters?: Record<string, any> | null;
}

/** GetForgotPasswordOtpBody */
export interface GetForgotPasswordOtpBody {
  /** Nationalcode */
  nationalCode: string;
  /** Phonenumber */
  phoneNumber: string;
  /** Captchauid */
  captchaUid: number;
  /** Captchavalue */
  captchaValue: string;
}

/** GetOtpForChangePasswordResponseApiModel */
export interface GetOtpForChangePasswordResponseApiModel {
  /** Retryseconds */
  retrySeconds: number;
  /** Phonenumber */
  phoneNumber: string;
  /** Userid */
  userId: number;
}

/** GetOtpForForgotPasswordResponseApiModel */
export interface GetOtpForForgotPasswordResponseApiModel {
  /** Retryseconds */
  retrySeconds: number;
  /** Phonenumber */
  phoneNumber: string;
  /** Userid */
  userId: number;
}

/** GetReportCalculationsBody */
export interface GetReportCalculationsBody {
  /** Selectedfilters */
  selectedFilters: Record<string, any> | null;
}

/** HealthApiModel */
export interface HealthApiModel {
  /** Status */
  status: string;
}

/** LogoutResponseApiModel */
export interface LogoutResponseApiModel {
  /** Success */
  success: boolean;
}

/** MarkFundBody */
export interface MarkFundBody {
  /** Color */
  color: string;
}

/** MarkFundResponseApiModel */
export interface MarkFundResponseApiModel {
  /** Success */
  success: boolean;
}

/** PinFundInTableTabBody */
export interface PinFundInTableTabBody {
  /** Fund */
  fund: number;
}

/** PinFundInTableTabResponseApiModel */
export interface PinFundInTableTabResponseApiModel {
  /** Success */
  success: boolean;
}

/** RemoveFundFromWatchListResponseApiModel */
export interface RemoveFundFromWatchListResponseApiModel {
  /** Success */
  success: boolean;
}

/** RenameDashboardForUserBody */
export interface RenameDashboardForUserBody {
  /** Name */
  name: string;
}

/** ReplaceDashboardItemCalculationsBody */
export interface ReplaceDashboardItemCalculationsBody {
  /** Newreportidentifier */
  newReportIdentifier: string;
}

/** Report13Dot1CalculationResult */
export interface Report13Dot1CalculationResult {
  lastDay: Report13Dot1CalculationResultColumn;
  lastDayNormalized: Report13Dot1CalculationResultColumnNormalized;
  maxValue: Report13Dot1CalculationResultColumn;
  minValue: Report13Dot1CalculationResultColumn;
  averageValue: Report13Dot1CalculationResultColumn;
  /** Currencyunit */
  currencyUnit: string;
}

/** Report13Dot1CalculationResultColumn */
export interface Report13Dot1CalculationResultColumn {
  /** Totaltrades */
  totalTrades: number;
  /** Totalbuyindividual */
  totalBuyIndividual: number;
  /** Totalbuycorporate */
  totalBuyCorporate: number;
  /** Totalsellindividual */
  totalSellIndividual: number;
  /** Totalsellcorporate */
  totalSellCorporate: number;
}

/** Report13Dot1CalculationResultColumnNormalized */
export interface Report13Dot1CalculationResultColumnNormalized {
  /** Totaltradesnormalized */
  totalTradesNormalized: number;
  /** Totalbuyindividualnormalized */
  totalBuyIndividualNormalized: number;
  /** Totalbuycorporatenormalized */
  totalBuyCorporateNormalized: number;
  /** Totalsellindividualnormalized */
  totalSellIndividualNormalized: number;
  /** Totalsellcorporatenormalized */
  totalSellCorporateNormalized: number;
}

/** Report13Dot2CalculationResult */
export interface Report13Dot2CalculationResult {
  data: Report13Dot2CalculationResultItem;
}

/** Report13Dot2CalculationResultItem */
export interface Report13Dot2CalculationResultItem {
  /** Mean */
  mean: number;
  /** Median */
  median: number;
  /** Lasttrade */
  lastTrade: number;
  /** Kdepoints */
  kdePoints: Report13Dot2GraphKdeResultItem[];
  /** Histpoints */
  histPoints: Report13Dot2GraphHistResultItem[];
}

/** Report13Dot2GraphHistResultItem */
export interface Report13Dot2GraphHistResultItem {
  /** Xmin */
  xMin: number;
  /** Xmax */
  xMax: number;
  /** Y */
  y: number;
}

/** Report13Dot2GraphKdeResultItem */
export interface Report13Dot2GraphKdeResultItem {
  /** X */
  x: number;
  /** Y */
  y: number;
}

/** Report13Dot3CalculationResult */
export interface Report13Dot3CalculationResult {
  /** Data */
  data: Report13Dot3CalculationResultItem[];
}

/** Report13Dot3CalculationResultItem */
export interface Report13Dot3CalculationResultItem {
  /** Points */
  points: Report13Dot3CalculationResultPoints[];
  /** Mean */
  mean: number;
}

/** Report13Dot3CalculationResultPoints */
export interface Report13Dot3CalculationResultPoints {
  /** Date */
  date: string;
  /** Value */
  value: number;
}

/** Report15CalculationResult */
export interface Report15CalculationResult {
  /** Beta */
  beta: number;
  /** Betaadjusted */
  betaAdjusted: number;
  /** Yintersect */
  yIntersect: number;
  /** Rsquared */
  rSquared: number;
  /** Pvalue */
  pValue: number;
  /** Graphdata */
  graphData: Report15CalculationResultGraphPoint[];
}

/** Report15CalculationResultGraphPoint */
export interface Report15CalculationResultGraphPoint {
  /** X */
  x: number;
  /** Y */
  y: number;
  /** Tradedateshamsi */
  tradeDateShamsi: string;
}

/** Report2CalculationResult */
export interface Report2CalculationResult {
  /** Data */
  data: Report2CalculationResultItem[];
  /** Unit */
  unit: string;
}

/** Report2CalculationResultItem */
export interface Report2CalculationResultItem {
  /** Sectortitle */
  sectorTitle: string;
  /** Netflow */
  netFlow: number;
}

/** Report36CalculationResult */
export interface Report36CalculationResult {
  /** Buckets */
  buckets: Report36CalculationResultBucket[];
  /** Positiveinstruments */
  positiveInstruments: number;
  /** Negativeinstruments */
  negativeInstruments: number;
  /** Bucketrangeunit */
  bucketRangeUnit: string;
  /** Bucketcountunit */
  bucketCountUnit: string;
}

/** Report36CalculationResultBucket */
export interface Report36CalculationResultBucket {
  /** Bucketmin */
  bucketMin: number | null;
  /** Bucketmax */
  bucketMax: number | null;
  /** Displaybucketaverage */
  displayBucketAverage: number;
  /** Bucketinstrumentscount */
  bucketInstrumentsCount: number;
}

/** Report39CalculationResult */
export interface Report39CalculationResult {
  /** Data */
  data: Report39InstrumentsResultItem[];
  /** Unit */
  unit: string;
}

/** Report39InstrumentsResultItem */
export interface Report39InstrumentsResultItem {
  /** Instrument */
  instrument: string;
  /** Netflow */
  netFlow: number;
}

/** Report6CalculationResult */
export interface Report6CalculationResult {
  /** Data */
  data: Report6CalculationResultTimeSeriesItem[];
  /** Indexunit */
  indexUnit: string;
  /** Netflowunit */
  netFlowUnit: string;
}

/** Report6CalculationResultTimeSeriesItem */
export interface Report6CalculationResultTimeSeriesItem {
  /** Dt */
  dt: string;
  /** Indexvalue */
  indexValue: number;
  /** Netflow */
  netFlow: number;
}

/** ReportScreenshotResponseApiModel */
export interface ReportScreenshotResponseApiModel {
  /** Queryid */
  queryId: string;
  /** Screenshoturl */
  screenshotUrl: string;
}

/** RequestReportForm */
export interface RequestReportForm {
  /** Title */
  title: string;
  /** Text */
  text: string;
  /** Call */
  call: string;
}

/** RequestReportResponseApiModel */
export interface RequestReportResponseApiModel {
  /** Requestfollowcode */
  requestFollowCode: number;
  /** Success */
  success: boolean;
}

/** ResetForgotPasswordByOtpResponseApiModel */
export interface ResetForgotPasswordByOtpResponseApiModel {
  /** Success */
  success: boolean;
}

/** ResetFundTabColumnsResponseApiModel */
export interface ResetFundTabColumnsResponseApiModel {
  /** Funds */
  funds: FundsTableItemApiModel[];
  /** Columns */
  columns: FundTableTabColumnDto[];
}

/** SelectedFundTimeRangeFilterOption */
export interface SelectedFundTimeRangeFilterOption {
  identifier: FundCalculationPeriod;
  /** Customperiodstartjdate */
  customPeriodStartJdate?: string | null;
  /**
   * Customperiodendjdate
   * پایان بازه زمانی دلخواه با فرمت YYYY-mm-dd
   */
  customPeriodEndJdate: string | null;
}

/** SortFundTabBody */
export interface SortFundTabBody {
  /** Columnkey */
  columnKey: string;
  direction: FundTableTabColumnSort;
}

/** SortFundTabResponseApiModel */
export interface SortFundTabResponseApiModel {
  /** Funds */
  funds: FundsTableItemApiModel[];
  /** Columns */
  columns: FundTableTabColumnDto[];
}

/** TokenApiModel */
export interface TokenApiModel {
  /** Access Token */
  access_token: string;
  /** Token Type */
  token_type: string;
}

/** TopLeftFilterOption */
export interface TopLeftFilterOption {
  /** Identifier */
  identifier: number;
  /** Title */
  title: string;
  /** Selected */
  selected: boolean;
}

/** TopLeftFilterOptions */
export interface TopLeftFilterOptions {
  /** Label */
  label: string;
  /** Options */
  options: TopLeftFilterOption[];
}

/** UnmarkFundResponseApiModel */
export interface UnmarkFundResponseApiModel {
  /** Success */
  success: boolean;
}

/** UnpinFundInTableTabBody */
export interface UnpinFundInTableTabBody {
  /** Fund */
  fund: number;
}

/** UnpinFundInTableTabResponseApiModel */
export interface UnpinFundInTableTabResponseApiModel {
  /** Success */
  success: boolean;
}

/** UpdateDashboardFundsBody */
export interface UpdateDashboardFundsBody {
  /** Fundtype */
  fundType: number;
  /** Sortparameter */
  sortParameter: number;
  /** Sortperiod */
  sortPeriod: number;
}

/** UpdateDashboardFundsResponseApiModel */
export interface UpdateDashboardFundsResponseApiModel {
  /** Funds */
  funds: DashboardFundApiModel[];
}

/** UpdateFundTabColumnsResponseApiModel */
export interface UpdateFundTabColumnsResponseApiModel {
  /** Funds */
  funds: FundsTableItemApiModel[];
  /** Columns */
  columns: FundTableTabColumnDto[];
}

/** UpdateFundTabSingleColumnResponseApiModel */
export interface UpdateFundTabSingleColumnResponseApiModel {
  /** Funds */
  funds: FundsTableItemApiModel[];
  /** Columns */
  columns: FundTableTabColumnDto[];
}

/** UpdateFundTableTabColumnItem */
export interface UpdateFundTableTabColumnItem {
  /** Key */
  key: string;
  sortDirection: FundTableTabColumnSort;
  /** Visible */
  visible: boolean;
  /** Selectedcolumnfilters */
  selectedColumnFilters?: string[] | null;
  /** Customperiodstartjdate */
  customPeriodStartJdate?: string | null;
  /** Customperiodendjdate */
  customPeriodEndJdate?: string | null;
}

/** UpdateFundTableTabColumnsBody */
export interface UpdateFundTableTabColumnsBody {
  /** Columns */
  columns: UpdateFundTableTabColumnItem[];
}

/** UpdateFundTableTabSingleColumnBody */
export interface UpdateFundTableTabSingleColumnBody {
  column: UpdateFundTableTabColumnItem;
}

/** UserManagedFundApiModel */
export interface UserManagedFundApiModel {
  /** Fundid */
  fundId: number;
  fundType: FundTypeApiModel;
  /** Fundabbreviatedname */
  fundAbbreviatedName: string;
}

/** UserProfileApiModel */
export interface UserProfileApiModel {
  userInfo: AressApiUser;
  /** Managedfunds */
  managedFunds: UserManagedFundApiModel[];
}

/** UserReportFavoriteStatus */
export interface UserReportFavoriteStatus {
  /** Userid */
  userId: number;
  /** Reportid */
  reportId: number;
  /** Isfavorite */
  isFavorite: boolean;
}

/** ValidatePasswordForUserBody */
export interface ValidatePasswordForUserBody {
  /** Password */
  password: string;
}

/** ValidatePasswordForUserResponseApiModel */
export interface ValidatePasswordForUserResponseApiModel {
  /** Passwordverificationtoken */
  passwordVerificationToken: string;
  /** Success */
  success: boolean;
}

/** VideoApiModel */
export interface VideoApiModel {
  /**
   * Identifier
   * Unique identifier of video
   */
  identifier: number;
  /**
   * Title
   * Title of video
   */
  title: string;
  /**
   * Description
   * Description of video
   */
  description: string | null;
  /**
   * Mp4Video1080P
   * Url of mp4 video file in 1080p
   */
  mp4Video1080P: string | null;
  /**
   * Mp4Video1080Psizebytes
   * Size of 1080p mp4 video file in bytes
   */
  mp4Video1080PSizeBytes: number | null;
  /**
   * Mp4Video720P
   * Url of mp4 video file in 720p
   */
  mp4Video720P: string | null;
  /**
   * Mp4Video720Psizebytes
   * Size of 720p mp4 video file in bytes
   */
  mp4Video720PSizeBytes: number | null;
  /**
   * Mp4Video480P
   * Url of mp4 video file in 480p
   */
  mp4Video480P: string | null;
  /**
   * Mp4Video480Psizebytes
   * Size of 480p mp4 video file in bytes
   */
  mp4Video480PSizeBytes: number | null;
  /**
   * Mp4Video360P
   * Url of mp4 video file in 360p
   */
  mp4Video360P: string | null;
  /**
   * Mp4Video360Psizebytes
   * Size of 360p mp4 video file in bytes
   */
  mp4Video360PSizeBytes: number | null;
  /**
   * Mp4Video240P
   * Url of mp4 video file in 240p
   */
  mp4Video240P: string;
  /**
   * Mp4Video240Psizebytes
   * Size of 240p mp4 video file in bytes
   */
  mp4Video240PSizeBytes: number;
  /**
   * Durationinseconds
   * Duration of video in seconds
   */
  durationInSeconds: number;
  /**
   * Poster
   * Poster (placeholder) image of video
   */
  poster: string;
  /**
   * Thumbnailimages
   * Thumbnail of video
   */
  thumbnailImages: VideoThumbnailApiModel[];
}

/** VideoThumbnailApiModel */
export interface VideoThumbnailApiModel {
  /**
   * Starttimeseconds
   * From which second we should use this video thumbnail
   */
  startTimeSeconds: number;
  /**
   * Durationseconds
   * After start time, until how many seconds use this video thumbnail
   */
  durationSeconds: number;
  /**
   * Image
   * Thumbnail file
   */
  image: string;
  /**
   * Intervalseconds
   * Interval in seconds between images
   */
  intervalSeconds: number;
  /**
   * Widthpixels
   * Width of each thumbnail in pixes
   */
  widthPixels: number;
  /**
   * Heightpixels
   * Height of each thumbnail in pixes
   */
  heightPixels: number;
  /**
   * Columns
   * Number of thumbnails per line
   */
  columns: number;
  /**
   * Totalframes
   * Total frames in thumbnail
   */
  totalFrames: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  JsonApi = 'application/vnd.api+json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => 'undefined' !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string'
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Aress FDP
 * @version 0.0.1
 *
 *
 * Aress API helps you get data from Aress Server. 🚀
 * There are several routes:
 *
 * ## Users
 * Endpoints for captcha, login, signup, and user data are in this section
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  health = {
    /**
     * @description Health check
     *
     * @tags Health
     * @name HealthHealthGet
     * @summary Health
     * @request GET:/health
     */
    healthHealthGet: (params: RequestParams = {}) =>
      this.request<HealthApiModel, ApiExceptionResponse>({
        path: `/health`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  users = {
    /**
     * @description Get captcha for a user. Captcha can be an **_image_** or an **_audio_**, depending on the **captchaType** param. In case of an image, you can also pass **captchaWidth** and **captchaHeight** for customizing the size of generated image.
     *
     * @tags Users
     * @name CaptchaForLoginUsersLoginCaptchaGet
     * @summary Captcha For Login
     * @request GET:/users/login/captcha
     * @secure
     */
    captchaForLoginUsersLoginCaptchaGet: (
      query?: {
        /**
         * Captchawidth
         * @min 50
         * @max 1000
         * @default 280
         */
        captchaWidth?: number;
        /**
         * Captchaheight
         * @min 50
         * @max 1000
         * @default 90
         */
        captchaHeight?: number;
        /** @default "image" */
        captchaType?: CaptchaType;
      },
      params: RequestParams = {},
    ) =>
      this.request<CaptchaApiModel, ApiExceptionResponse>({
        path: `/users/login/captcha`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get access token using credentials for users. You must provide solved captcha value (_captcha_) and unique identifier of catpcha (_captchaUid_), along with user credentials (_username_ and _password_).**Important note**: _username_ can be either username, email, phone number or national code of user.
     *
     * @tags Users
     * @name LoginForAccessTokenUsersLoginPost
     * @summary Login For Access Token
     * @request POST:/users/login
     */
    loginForAccessTokenUsersLoginPost: (
      query: {
        /** Captchauid */
        captchaUid: number | null;
        /** Captcha */
        captcha: string | null;
      },
      data: BodyLoginForAccessTokenUsersLoginPost,
      params: RequestParams = {},
    ) =>
      this.request<TokenApiModel, ApiExceptionResponse>({
        path: `/users/login`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.UrlEncoded,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get access token using credentials for test user. This method only works for **test** user. For login flow of real users, you must use _**login_captcha**_ and _**login**_ endpoints.
     *
     * @tags Users
     * @name TestUserAccessTokenUsersTokenPost
     * @summary Test User Access Token
     * @request POST:/users/token
     */
    testUserAccessTokenUsersTokenPost: (
      data: BodyTestUserAccessTokenUsersTokenPost,
      params: RequestParams = {},
    ) =>
      this.request<TokenApiModel, ApiExceptionResponse>({
        path: `/users/token`,
        method: 'POST',
        body: data,
        type: ContentType.UrlEncoded,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get data of current logged in user.
     *
     * @tags Users
     * @name GetCurrentUserUsersMeGet
     * @summary Get Current User
     * @request GET:/users/me
     * @secure
     */
    getCurrentUserUsersMeGet: (params: RequestParams = {}) =>
      this.request<AressApiUser | AnonymousApiUser, ApiExceptionResponse>({
        path: `/users/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get captcha to reset password
     *
     * @tags Users
     * @name ForgotPasswordCaptchaUsersPasswordForgotCaptchaGet
     * @summary Forgot Password Captcha
     * @request GET:/users/password/forgot/captcha
     * @secure
     */
    forgotPasswordCaptchaUsersPasswordForgotCaptchaGet: (
      query?: {
        /**
         * Captchawidth
         * @min 50
         * @max 1000
         * @default 280
         */
        captchaWidth?: number;
        /**
         * Captchaheight
         * @min 50
         * @max 1000
         * @default 90
         */
        captchaHeight?: number;
        /** @default "image" */
        captchaType?: CaptchaType;
      },
      params: RequestParams = {},
    ) =>
      this.request<CaptchaApiModel, ApiExceptionResponse>({
        path: `/users/password/forgot/captcha`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get OTP to reset password
     *
     * @tags Users
     * @name ForgotPasswordGetOtpUsersPasswordForgotOtpPost
     * @summary Forgot Password Get Otp
     * @request POST:/users/password/forgot/otp
     */
    forgotPasswordGetOtpUsersPasswordForgotOtpPost: (
      data: GetForgotPasswordOtpBody,
      params: RequestParams = {},
    ) =>
      this.request<
        GetOtpForForgotPasswordResponseApiModel,
        ApiExceptionResponse
      >({
        path: `/users/password/forgot/otp`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Recover password using otp and new password
     *
     * @tags Users
     * @name ForgotPasswordResetByOtpUsersPasswordForgotResetPost
     * @summary Forgot Password Reset By Otp
     * @request POST:/users/password/forgot/reset
     */
    forgotPasswordResetByOtpUsersPasswordForgotResetPost: (
      data: ForgotPasswordResetByOtpBody,
      params: RequestParams = {},
    ) =>
      this.request<
        ResetForgotPasswordByOtpResponseApiModel,
        ApiExceptionResponse
      >({
        path: `/users/password/forgot/reset`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get profile of current user.
     *
     * @tags Users
     * @name GetCurrentUserProfileUsersProfileGet
     * @summary Get Current User Profile
     * @request GET:/users/profile
     * @secure
     */
    getCurrentUserProfileUsersProfileGet: (params: RequestParams = {}) =>
      this.request<UserProfileApiModel, ApiExceptionResponse>({
        path: `/users/profile`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get otp to change password in user profile, does not need captcha
     *
     * @tags Users
     * @name ChangePasswordGetOtpUsersProfilePasswordChangeOtpGet
     * @summary Change Password Get Otp
     * @request GET:/users/profile/password/change/otp
     * @secure
     */
    changePasswordGetOtpUsersProfilePasswordChangeOtpGet: (
      params: RequestParams = {},
    ) =>
      this.request<
        GetOtpForChangePasswordResponseApiModel,
        ApiExceptionResponse
      >({
        path: `/users/profile/password/change/otp`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Change password using otp and new password
     *
     * @tags Users
     * @name ChangePasswordByOtpUsersProfilePasswordChangePost
     * @summary Change Password By Otp
     * @request POST:/users/profile/password/change
     * @secure
     */
    changePasswordByOtpUsersProfilePasswordChangePost: (
      data: ChangePasswordByOtpBody,
      params: RequestParams = {},
    ) =>
      this.request<ChangePasswordByOtpApiModel, ApiExceptionResponse>({
        path: `/users/profile/password/change`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Validate password for user
     *
     * @tags Users
     * @name ValidatePasswordForUserUsersProfilePasswordValidatePost
     * @summary Validate Password For User
     * @request POST:/users/profile/password/validate
     * @secure
     */
    validatePasswordForUserUsersProfilePasswordValidatePost: (
      data: ValidatePasswordForUserBody,
      params: RequestParams = {},
    ) =>
      this.request<
        ValidatePasswordForUserResponseApiModel,
        ApiExceptionResponse
      >({
        path: `/users/profile/password/validate`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description get otp to change phone
     *
     * @tags Users
     * @name ChangePhoneNumberGetOtpUsersProfilePhoneChangeOtpPost
     * @summary Change Phone Number Get Otp
     * @request POST:/users/profile/phone/change/otp
     * @secure
     */
    changePhoneNumberGetOtpUsersProfilePhoneChangeOtpPost: (
      data: ChangePhoneGetOtpBody,
      params: RequestParams = {},
    ) =>
      this.request<ChangePhoneGetOtpResponseApiModel, ApiExceptionResponse>({
        path: `/users/profile/phone/change/otp`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Change phone number with otp
     *
     * @tags Users
     * @name ChangePhoneNumberByOtpUsersProfilePhoneChangePost
     * @summary Change Phone Number By Otp
     * @request POST:/users/profile/phone/change
     * @secure
     */
    changePhoneNumberByOtpUsersProfilePhoneChangePost: (
      data: ChangePhoneByOtpBody,
      params: RequestParams = {},
    ) =>
      this.request<ChangePhoneByOtpResponseApiModel, ApiExceptionResponse>({
        path: `/users/profile/phone/change`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description get otp to change email
     *
     * @tags Users
     * @name ChangeEmailGetOtpUsersProfileEmailChangeOtpPost
     * @summary Change Email Get Otp
     * @request POST:/users/profile/email/change/otp
     * @secure
     */
    changeEmailGetOtpUsersProfileEmailChangeOtpPost: (
      data: ChangeEmailGetOtpBody,
      params: RequestParams = {},
    ) =>
      this.request<ChangeEmailGetOtpResponseApiModel, ApiExceptionResponse>({
        path: `/users/profile/email/change/otp`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Change email with otp
     *
     * @tags Users
     * @name ChangeEmailByOtpUsersProfileEmailChangePost
     * @summary Change Email By Otp
     * @request POST:/users/profile/email/change
     * @secure
     */
    changeEmailByOtpUsersProfileEmailChangePost: (
      data: ChangeEmailByOtpBody,
      params: RequestParams = {},
    ) =>
      this.request<ChangeEmailByOtpResponseApiModel, ApiExceptionResponse>({
        path: `/users/profile/email/change`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Change username
     *
     * @tags Users
     * @name ChangeUsernameUsersProfileUsernameChangePost
     * @summary Change Username
     * @request POST:/users/profile/username/change
     * @secure
     */
    changeUsernameUsersProfileUsernameChangePost: (
      data: ChangeUsernameBody,
      params: RequestParams = {},
    ) =>
      this.request<ChangeUsernameResponseApiModel, ApiExceptionResponse>({
        path: `/users/profile/username/change`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Change profile picture
     *
     * @tags Users
     * @name ChangeProfilePictureUsersProfilePictureChangePost
     * @summary Change Profile Picture
     * @request POST:/users/profile/picture/change
     * @secure
     */
    changeProfilePictureUsersProfilePictureChangePost: (
      data: BodyChangeProfilePictureUsersProfilePictureChangePost,
      params: RequestParams = {},
    ) =>
      this.request<ChangeProfilePictureResponseApiModel, ApiExceptionResponse>({
        path: `/users/profile/picture/change`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Logout user
     *
     * @tags Users
     * @name LogoutUserUsersLogoutPost
     * @summary Logout User
     * @request POST:/users/logout
     * @secure
     */
    logoutUserUsersLogoutPost: (params: RequestParams = {}) =>
      this.request<LogoutResponseApiModel, ApiExceptionResponse>({
        path: `/users/logout`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  reports = {
    /**
     * @description Get list of reports.
     *
     * @tags Reports
     * @name ReportListReportsGet
     * @summary Report List
     * @request GET:/reports
     * @secure
     */
    reportListReportsGet: (
      query?: {
        /** Onlyfavorite */
        onlyFavorite?: boolean | null;
        /** Onlynew */
        onlyNew?: boolean | null;
        /** Onlyhavingvideo */
        onlyHavingVideo?: boolean | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<FinancialReportListItemApiModel[], ApiExceptionResponse>({
        path: `/reports`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get list of report categories.
     *
     * @tags Reports
     * @name ReportCategoriesReportsCategoriesGet
     * @summary Report Categories
     * @request GET:/reports/categories
     */
    reportCategoriesReportsCategoriesGet: (params: RequestParams = {}) =>
      this.request<FinancialReportCategoryApiModel[], ApiExceptionResponse>({
        path: `/reports/categories`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Request a new report
     *
     * @tags Reports
     * @name RequestNewReportReportsRequestPost
     * @summary Request New Report
     * @request POST:/reports/request
     * @secure
     */
    requestNewReportReportsRequestPost: (
      data: BodyRequestNewReportReportsRequestPost,
      params: RequestParams = {},
    ) =>
      this.request<RequestReportResponseApiModel, ApiExceptionResponse>({
        path: `/reports/request`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get details of a report.
     *
     * @tags Reports
     * @name ReportDetailsReportsReportIdGet
     * @summary Report Details
     * @request GET:/reports/{report_id}
     * @secure
     */
    reportDetailsReportsReportIdGet: (
      reportId: string,
      query?: {
        /** Screenshotqueryid */
        screenshotQueryId?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<FinancialReportDetailsApiModel, ApiExceptionResponse>({
        path: `/reports/${reportId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get report calculations.
     *
     * @tags Reports
     * @name GetReportCalculationsReportsReportIdPost
     * @summary Get Report Calculations
     * @request POST:/reports/{report_id}
     * @secure
     */
    getReportCalculationsReportsReportIdPost: (
      reportId: string,
      data: GetReportCalculationsBody,
      params: RequestParams = {},
    ) =>
      this.request<FinancialReportCalculationApiModel, ApiExceptionResponse>({
        path: `/reports/${reportId}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Add a report to favorites
     *
     * @tags Reports
     * @name AddReportToFavoritesReportsReportIdFavoritePost
     * @summary Add Report To Favorites
     * @request POST:/reports/{report_id}/favorite
     * @secure
     */
    addReportToFavoritesReportsReportIdFavoritePost: (
      reportId: string,
      params: RequestParams = {},
    ) =>
      this.request<UserReportFavoriteStatus, ApiExceptionResponse>({
        path: `/reports/${reportId}/favorite`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Remove a report from favorites
     *
     * @tags Reports
     * @name RemoveReportFromFavoritesReportsReportIdFavoriteDelete
     * @summary Remove Report From Favorites
     * @request DELETE:/reports/{report_id}/favorite
     * @secure
     */
    removeReportFromFavoritesReportsReportIdFavoriteDelete: (
      reportId: string,
      params: RequestParams = {},
    ) =>
      this.request<UserReportFavoriteStatus, ApiExceptionResponse>({
        path: `/reports/${reportId}/favorite`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Save report screenshot
     *
     * @tags Reports
     * @name SaveScreenshotReportsReportIdScreenshotPost
     * @summary Save Screenshot
     * @request POST:/reports/{report_id}/screenshot
     * @secure
     */
    saveScreenshotReportsReportIdScreenshotPost: (
      reportId: string,
      data: BodySaveScreenshotReportsReportIdScreenshotPost,
      params: RequestParams = {},
    ) =>
      this.request<ReportScreenshotResponseApiModel, ApiExceptionResponse>({
        path: `/reports/${reportId}/screenshot`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),
  };
  dashboards = {
    /**
     * @description Get user dashboards.
     *
     * @tags Dashboards
     * @name UserDashboardsDashboardsGet
     * @summary User Dashboards
     * @request GET:/dashboards
     * @secure
     */
    userDashboardsDashboardsGet: (params: RequestParams = {}) =>
      this.request<DashboardListItemApiModel[], ApiExceptionResponse>({
        path: `/dashboards`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Add dashboard for user.
     *
     * @tags Dashboards
     * @name CreateDashboardForUserDashboardsPut
     * @summary Create Dashboard For User
     * @request PUT:/dashboards
     * @secure
     */
    createDashboardForUserDashboardsPut: (
      data: CreateDashboardForUserBody,
      params: RequestParams = {},
    ) =>
      this.request<CreateDashboardResponseApiModel, ApiExceptionResponse>({
        path: `/dashboards`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get dashboard details.
     *
     * @tags Dashboards
     * @name DashboardDetailsDashboardsDashboardIdGet
     * @summary Dashboard Details
     * @request GET:/dashboards/{dashboard_id}
     * @secure
     */
    dashboardDetailsDashboardsDashboardIdGet: (
      dashboardId: number,
      params: RequestParams = {},
    ) =>
      this.request<DashboardDetailsApiModel, ApiExceptionResponse>({
        path: `/dashboards/${dashboardId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Rename dashboard.
     *
     * @tags Dashboards
     * @name RenameDashboardDashboardsDashboardIdPost
     * @summary Rename Dashboard
     * @request POST:/dashboards/{dashboard_id}
     * @secure
     */
    renameDashboardDashboardsDashboardIdPost: (
      dashboardId: number,
      data: RenameDashboardForUserBody,
      params: RequestParams = {},
    ) =>
      this.request<DashboardListItemApiModel, ApiExceptionResponse>({
        path: `/dashboards/${dashboardId}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete dashboard.
     *
     * @tags Dashboards
     * @name DeleteDashboardDashboardsDashboardIdDelete
     * @summary Delete Dashboard
     * @request DELETE:/dashboards/{dashboard_id}
     * @secure
     */
    deleteDashboardDashboardsDashboardIdDelete: (
      dashboardId: number,
      params: RequestParams = {},
    ) =>
      this.request<DashboardListItemApiModel[], ApiExceptionResponse>({
        path: `/dashboards/${dashboardId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Add report item to dashboard.
     *
     * @tags Dashboards
     * @name AddReportToDashboardDashboardsDashboardIdPut
     * @summary Add Report To Dashboard
     * @request PUT:/dashboards/{dashboard_id}
     * @secure
     */
    addReportToDashboardDashboardsDashboardIdPut: (
      dashboardId: number,
      data: AddReportToDashboardForUserBody,
      params: RequestParams = {},
    ) =>
      this.request<DashboardItemApiModel, ApiExceptionResponse>({
        path: `/dashboards/${dashboardId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update dashboard funds list.
     *
     * @tags Dashboards
     * @name UpdateDashboardFundsDashboardsDashboardIdFundsPost
     * @summary Update Dashboard Funds
     * @request POST:/dashboards/{dashboard_id}/funds
     * @secure
     */
    updateDashboardFundsDashboardsDashboardIdFundsPost: (
      dashboardId: number,
      data: UpdateDashboardFundsBody,
      params: RequestParams = {},
    ) =>
      this.request<UpdateDashboardFundsResponseApiModel, ApiExceptionResponse>({
        path: `/dashboards/${dashboardId}/funds`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Duplicate dashboard
     *
     * @tags Dashboards
     * @name DuplicateDashboardDashboardsDashboardIdDuplicatePost
     * @summary Duplicate Dashboard
     * @request POST:/dashboards/{dashboard_id}/duplicate
     * @secure
     */
    duplicateDashboardDashboardsDashboardIdDuplicatePost: (
      dashboardId: number,
      data: DuplicateDashboardForUserBody,
      params: RequestParams = {},
    ) =>
      this.request<DashboardDetailsApiModel, ApiExceptionResponse>({
        path: `/dashboards/${dashboardId}/duplicate`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get dashboard items for preview in dashboard list.
     *
     * @tags Dashboards
     * @name GetDashboardItemsForPreviewDashboardsDashboardIdPreviewGet
     * @summary Get Dashboard Items For Preview
     * @request GET:/dashboards/{dashboard_id}/preview
     * @secure
     */
    getDashboardItemsForPreviewDashboardsDashboardIdPreviewGet: (
      dashboardId: number,
      params: RequestParams = {},
    ) =>
      this.request<DashboardItemPreviewApiModel[], ApiExceptionResponse>({
        path: `/dashboards/${dashboardId}/preview`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Remove items from dashboard.
     *
     * @tags Dashboards
     * @name RemoveItemFromDashboardDashboardsDashboardIdItemsDashboardItemIdDelete
     * @summary Remove Item From Dashboard
     * @request DELETE:/dashboards/{dashboard_id}/items/{dashboard_item_id}
     * @secure
     */
    removeItemFromDashboardDashboardsDashboardIdItemsDashboardItemIdDelete: (
      dashboardId: number,
      dashboardItemId: number,
      params: RequestParams = {},
    ) =>
      this.request<DeleteDashboardItemResponseApiModel, ApiExceptionResponse>({
        path: `/dashboards/${dashboardId}/items/${dashboardItemId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Replace item in dashboard.
     *
     * @tags Dashboards
     * @name ReplaceDashboardItemDashboardsDashboardIdItemsDashboardItemIdReplacePost
     * @summary Replace Dashboard Item
     * @request POST:/dashboards/{dashboard_id}/items/{dashboard_item_id}/replace
     * @secure
     */
    replaceDashboardItemDashboardsDashboardIdItemsDashboardItemIdReplacePost: (
      dashboardId: number,
      dashboardItemId: number,
      data: ReplaceDashboardItemCalculationsBody,
      params: RequestParams = {},
    ) =>
      this.request<DashboardItemApiModel, ApiExceptionResponse>({
        path: `/dashboards/${dashboardId}/items/${dashboardItemId}/replace`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Replace item in dashboard.
     *
     * @tags Dashboards
     * @name SaveDashboardItemScreenshotDashboardsDashboardIdItemsDashboardItemIdScreenshotPost
     * @summary Save Dashboard Item Screenshot
     * @request POST:/dashboards/{dashboard_id}/items/{dashboard_item_id}/screenshot
     * @secure
     */
    saveDashboardItemScreenshotDashboardsDashboardIdItemsDashboardItemIdScreenshotPost:
      (
        dashboardId: number,
        dashboardItemId: number,
        data: BodySaveDashboardItemScreenshotDashboardsDashboardIdItemsDashboardItemIdScreenshotPost,
        params: RequestParams = {},
      ) =>
        this.request<
          DashboardItemScreenshotResponseApiModel,
          ApiExceptionResponse
        >({
          path: `/dashboards/${dashboardId}/items/${dashboardItemId}/screenshot`,
          method: 'POST',
          body: data,
          secure: true,
          type: ContentType.FormData,
          format: 'json',
          ...params,
        }),

    /**
     * @description Get dashboard item calculations.
     *
     * @tags Dashboards
     * @name GetDashboardItemCalculationsDashboardsDashboardIdItemsDashboardItemIdCalculationsPost
     * @summary Get Dashboard Item Calculations
     * @request POST:/dashboards/{dashboard_id}/items/{dashboard_item_id}/calculations
     * @secure
     */
    getDashboardItemCalculationsDashboardsDashboardIdItemsDashboardItemIdCalculationsPost:
      (
        dashboardId: number,
        dashboardItemId: number,
        data: GetDashboardItemCalculationsBody,
        params: RequestParams = {},
      ) =>
        this.request<DashboardItemApiModel, ApiExceptionResponse>({
          path: `/dashboards/${dashboardId}/items/${dashboardItemId}/calculations`,
          method: 'POST',
          body: data,
          secure: true,
          type: ContentType.Json,
          format: 'json',
          ...params,
        }),

    /**
     * @description Change dashboard item sort order.
     *
     * @tags Dashboards
     * @name ChangeDashboardItemSortOrderDashboardsDashboardIdItemsDashboardItemIdReorderPost
     * @summary Change Dashboard Item Sort Order
     * @request POST:/dashboards/{dashboard_id}/items/{dashboard_item_id}/reorder
     * @secure
     */
    changeDashboardItemSortOrderDashboardsDashboardIdItemsDashboardItemIdReorderPost:
      (
        dashboardId: number,
        dashboardItemId: number,
        data: ChangeDashboardReportItemSortOrderBody,
        params: RequestParams = {},
      ) =>
        this.request<any, ApiExceptionResponse>({
          path: `/dashboards/${dashboardId}/items/${dashboardItemId}/reorder`,
          method: 'POST',
          body: data,
          secure: true,
          type: ContentType.Json,
          format: 'json',
          ...params,
        }),
  };
  funds = {
    /**
     * @description Get list of all funds
     *
     * @tags Funds
     * @name AllFundsFundsGet
     * @summary All Funds
     * @request GET:/funds
     */
    allFundsFundsGet: (params: RequestParams = {}) =>
      this.request<FundListItemApiModel[], ApiExceptionResponse>({
        path: `/funds`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Get list of funds of one type.
     *
     * @tags Funds
     * @name FundsListFundsTypeFundTypeGet
     * @summary Funds List
     * @request GET:/funds/type/{fund_type}
     */
    fundsListFundsTypeFundTypeGet: (
      fundType: number,
      params: RequestParams = {},
    ) =>
      this.request<FundListItemApiModel[], ApiExceptionResponse>({
        path: `/funds/type/${fundType}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Add fund to watchlist
     *
     * @tags Funds
     * @name AddFundToWatchlistFundsFundIdWatchlistPut
     * @summary Add Fund To Watchlist
     * @request PUT:/funds/{fund_id}/watchlist
     * @secure
     */
    addFundToWatchlistFundsFundIdWatchlistPut: (
      fundId: number,
      params: RequestParams = {},
    ) =>
      this.request<AddFundToWatchListResponseApiModel, ApiExceptionResponse>({
        path: `/funds/${fundId}/watchlist`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Remove fund from watchlist
     *
     * @tags Funds
     * @name RemoveFundFromWatchlistFundsFundIdWatchlistDelete
     * @summary Remove Fund From Watchlist
     * @request DELETE:/funds/{fund_id}/watchlist
     * @secure
     */
    removeFundFromWatchlistFundsFundIdWatchlistDelete: (
      fundId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        RemoveFundFromWatchListResponseApiModel,
        ApiExceptionResponse
      >({
        path: `/funds/${fundId}/watchlist`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a fund type or watchlist tab of fund table for user
     *
     * @tags Funds
     * @name FundTableTabFundsTableGet
     * @summary Fund Table Tab
     * @request GET:/funds/table
     * @secure
     */
    fundTableTabFundsTableGet: (
      query?: {
        /**
         * Tab
         * @default 1
         */
        tab?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FundTableResponseApiModel, ApiExceptionResponse>({
        path: `/funds/table`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get excel output of fund table tab
     *
     * @tags Funds
     * @name FundTableTabExcelFundsTableTabTabCsvGet
     * @summary Fund Table Tab Excel
     * @request GET:/funds/table/tab/{tab}/csv
     * @secure
     */
    fundTableTabExcelFundsTableTabTabCsvGet: (
      tab: number,
      params: RequestParams = {},
    ) =>
      this.request<any, ApiExceptionResponse>({
        path: `/funds/table/tab/${tab}/csv`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Pin fund in table tab
     *
     * @tags Funds
     * @name PinFundInTableTabFundsTableTabTabPinPost
     * @summary Pin Fund In Table Tab
     * @request POST:/funds/table/tab/{tab}/pin
     * @secure
     */
    pinFundInTableTabFundsTableTabTabPinPost: (
      tab: number,
      data: PinFundInTableTabBody,
      params: RequestParams = {},
    ) =>
      this.request<PinFundInTableTabResponseApiModel, ApiExceptionResponse>({
        path: `/funds/table/tab/${tab}/pin`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Unpin fund in table tab
     *
     * @tags Funds
     * @name UnpinFundInTableTabFundsTableTabTabUnpinPost
     * @summary Unpin Fund In Table Tab
     * @request POST:/funds/table/tab/{tab}/unpin
     * @secure
     */
    unpinFundInTableTabFundsTableTabTabUnpinPost: (
      tab: number,
      data: UnpinFundInTableTabBody,
      params: RequestParams = {},
    ) =>
      this.request<UnpinFundInTableTabResponseApiModel, ApiExceptionResponse>({
        path: `/funds/table/tab/${tab}/unpin`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Mark fund in table tab
     *
     * @tags Funds
     * @name MarkFundInFundsFundIdMarkPost
     * @summary Mark Fund In
     * @request POST:/funds/{fund_id}/mark
     * @secure
     */
    markFundInFundsFundIdMarkPost: (
      fundId: number,
      data: MarkFundBody,
      params: RequestParams = {},
    ) =>
      this.request<MarkFundResponseApiModel, ApiExceptionResponse>({
        path: `/funds/${fundId}/mark`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Unmark fund in table tab
     *
     * @tags Funds
     * @name UnmarkFundInTableTabFundsFundIdUnmarkPost
     * @summary Unmark Fund In Table Tab
     * @request POST:/funds/{fund_id}/unmark
     * @secure
     */
    unmarkFundInTableTabFundsFundIdUnmarkPost: (
      fundId: number,
      params: RequestParams = {},
    ) =>
      this.request<UnmarkFundResponseApiModel, ApiExceptionResponse>({
        path: `/funds/${fundId}/unmark`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Sort rows of a fund tab
     *
     * @tags Funds
     * @name SortFundTabFundsTableTabTabSortPost
     * @summary Sort Fund Tab
     * @request POST:/funds/table/tab/{tab}/sort
     * @secure
     */
    sortFundTabFundsTableTabTabSortPost: (
      tab: number,
      data: SortFundTabBody,
      params: RequestParams = {},
    ) =>
      this.request<SortFundTabResponseApiModel, ApiExceptionResponse>({
        path: `/funds/table/tab/${tab}/sort`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update columns of a fund tab
     *
     * @tags Funds
     * @name UpdateFundTabColumnsFundsTableTabTabColumnsPost
     * @summary Update Fund Tab Columns
     * @request POST:/funds/table/tab/{tab}/columns
     * @secure
     */
    updateFundTabColumnsFundsTableTabTabColumnsPost: (
      tab: number,
      data: UpdateFundTableTabColumnsBody,
      params: RequestParams = {},
    ) =>
      this.request<UpdateFundTabColumnsResponseApiModel, ApiExceptionResponse>({
        path: `/funds/table/tab/${tab}/columns`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update columns of a fund tab
     *
     * @tags Funds
     * @name ResetFundTabColumnsFundsTableTabTabColumnsResetPost
     * @summary Reset Fund Tab Columns
     * @request POST:/funds/table/tab/{tab}/columns/reset
     * @secure
     */
    resetFundTabColumnsFundsTableTabTabColumnsResetPost: (
      tab: number,
      params: RequestParams = {},
    ) =>
      this.request<ResetFundTabColumnsResponseApiModel, ApiExceptionResponse>({
        path: `/funds/table/tab/${tab}/columns/reset`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update a single columns of a fund tab
     *
     * @tags Funds
     * @name UpdateFundTabColumnFundsTableTabTabColumnPost
     * @summary Update Fund Tab Column
     * @request POST:/funds/table/tab/{tab}/column
     * @secure
     */
    updateFundTabColumnFundsTableTabTabColumnPost: (
      tab: number,
      data: UpdateFundTableTabSingleColumnBody,
      params: RequestParams = {},
    ) =>
      this.request<
        UpdateFundTabSingleColumnResponseApiModel,
        ApiExceptionResponse
      >({
        path: `/funds/table/tab/${tab}/column`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Stock Fund Summary Page
     *
     * @tags Funds
     * @name StockFundSummaryFundsStockFundIdSummaryGet
     * @summary Stock Fund Summary
     * @request GET:/funds/stock/{fund_id}/summary
     * @secure
     */
    stockFundSummaryFundsStockFundIdSummaryGet: (
      fundId: number,
      params: RequestParams = {},
    ) =>
      this.request<FundSummaryResponseApiModel, ApiExceptionResponse>({
        path: `/funds/stock/${fundId}/summary`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Stock Fund Summary Case By Case Section
     *
     * @tags Funds
     * @name StockFundSummaryCaseByCaseFundsStockFundIdSummaryCaseByCasePost
     * @summary Stock Fund Summary Case By Case
     * @request POST:/funds/stock/{fund_id}/summary/case_by_case
     * @secure
     */
    stockFundSummaryCaseByCaseFundsStockFundIdSummaryCaseByCasePost: (
      fundId: number,
      data: FundSummaryCaseByCaseBody,
      params: RequestParams = {},
    ) =>
      this.request<FundSummaryCaseByCaseApiModel, ApiExceptionResponse>({
        path: `/funds/stock/${fundId}/summary/case_by_case`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Stock Fund Return Analysis Page
     *
     * @tags Funds
     * @name StockFundReturnAnalysisFundsStockFundIdReturnAnalysisGet
     * @summary Stock Fund Return Analysis
     * @request GET:/funds/stock/{fund_id}/return_analysis
     * @secure
     */
    stockFundReturnAnalysisFundsStockFundIdReturnAnalysisGet: (
      fundId: number,
      params: RequestParams = {},
    ) =>
      this.request<FundReturnAnalysisResponseApiModel, ApiExceptionResponse>({
        path: `/funds/stock/${fundId}/return_analysis`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Fund Return Analysis Return Trend Section
     *
     * @tags Funds
     * @name StockFundReturnAnalysisReturnTrendSectionFundsStockFundIdReturnAnalysisReturnTrendPost
     * @summary Stock Fund Return Analysis Return Trend Section
     * @request POST:/funds/stock/{fund_id}/return_analysis/return_trend
     * @secure
     */
    stockFundReturnAnalysisReturnTrendSectionFundsStockFundIdReturnAnalysisReturnTrendPost:
      (
        fundId: number,
        data: FundReturnAnalysisReturnTrendBody,
        params: RequestParams = {},
      ) =>
        this.request<
          FundReturnAnalysisReturnTrendApiModel,
          ApiExceptionResponse
        >({
          path: `/funds/stock/${fundId}/return_analysis/return_trend`,
          method: 'POST',
          body: data,
          secure: true,
          type: ContentType.Json,
          format: 'json',
          ...params,
        }),

    /**
     * @description Stock Fund Return Analysis Return Comparison Section
     *
     * @tags Funds
     * @name StockFundReturnAnalysisReturnComparisonSectionFundsStockFundIdReturnAnalysisReturnComparisonPost
     * @summary Stock Fund Return Analysis Return Comparison Section
     * @request POST:/funds/stock/{fund_id}/return_analysis/return_comparison
     * @secure
     */
    stockFundReturnAnalysisReturnComparisonSectionFundsStockFundIdReturnAnalysisReturnComparisonPost:
      (
        fundId: number,
        data: FundReturnAnalysisReturnComparisonBody,
        params: RequestParams = {},
      ) =>
        this.request<
          FundReturnAnalysisReturnComparisonApiModel,
          ApiExceptionResponse
        >({
          path: `/funds/stock/${fundId}/return_analysis/return_comparison`,
          method: 'POST',
          body: data,
          secure: true,
          type: ContentType.Json,
          format: 'json',
          ...params,
        }),

    /**
     * @description Stock Fund Return Analysis Return Rank Section
     *
     * @tags Funds
     * @name StockFundReturnAnalysisReturnRankSectionFundsStockFundIdReturnAnalysisReturnRankPost
     * @summary Stock Fund Return Analysis Return Rank Section
     * @request POST:/funds/stock/{fund_id}/return_analysis/return_rank
     * @secure
     */
    stockFundReturnAnalysisReturnRankSectionFundsStockFundIdReturnAnalysisReturnRankPost:
      (
        fundId: number,
        data: FundReturnAnalysisReturnRankBody,
        params: RequestParams = {},
      ) =>
        this.request<
          FundReturnAnalysisReturnRankApiModel,
          ApiExceptionResponse
        >({
          path: `/funds/stock/${fundId}/return_analysis/return_rank`,
          method: 'POST',
          body: data,
          secure: true,
          type: ContentType.Json,
          format: 'json',
          ...params,
        }),

    /**
     * @description Stock Fund Return Analysis Risk Return Analysis Section
     *
     * @tags Funds
     * @name StockFundReturnAnalysisRiskReturnAnalysisSectionFundsStockFundIdReturnAnalysisRiskReturnAnalysisPost
     * @summary Stock Fund Return Analysis Risk Return Analysis Section
     * @request POST:/funds/stock/{fund_id}/return_analysis/risk_return_analysis
     * @secure
     */
    stockFundReturnAnalysisRiskReturnAnalysisSectionFundsStockFundIdReturnAnalysisRiskReturnAnalysisPost:
      (
        fundId: number,
        data: FundReturnAnalysisRiskReturnAnalysisBody,
        params: RequestParams = {},
      ) =>
        this.request<
          FundReturnAnalysisRiskReturnAnalysisApiModel,
          ApiExceptionResponse
        >({
          path: `/funds/stock/${fundId}/return_analysis/risk_return_analysis`,
          method: 'POST',
          body: data,
          secure: true,
          type: ContentType.Json,
          format: 'json',
          ...params,
        }),

    /**
     * @description Stock Fund Return Analysis Seasonality Effect Analysis Section
     *
     * @tags Funds
     * @name StockFundReturnAnalysisSeasonalityEffectSectionFundsStockFundIdReturnAnalysisSeasonalityEffectAnalysisPost
     * @summary Stock Fund Return Analysis Seasonality Effect Section
     * @request POST:/funds/stock/{fund_id}/return_analysis/seasonality_effect_analysis
     * @secure
     */
    stockFundReturnAnalysisSeasonalityEffectSectionFundsStockFundIdReturnAnalysisSeasonalityEffectAnalysisPost:
      (
        fundId: number,
        data: FundReturnAnalysisSeasonalityEffectAnalysisBody,
        params: RequestParams = {},
      ) =>
        this.request<
          FundReturnAnalysisSeasonalityEffectAnalysisApiModel,
          ApiExceptionResponse
        >({
          path: `/funds/stock/${fundId}/return_analysis/seasonality_effect_analysis`,
          method: 'POST',
          body: data,
          secure: true,
          type: ContentType.Json,
          format: 'json',
          ...params,
        }),
  };
}
