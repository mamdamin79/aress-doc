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
  /** Password */
  password: string;
  /**
   * Scope
   * @default ""
   */
  scope?: string;
  /** Client Id */
  client_id?: string | null;
  /** Client Secret */
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
  /** Password */
  password: string;
  /**
   * Scope
   * @default ""
   */
  scope?: string;
  /** Client Id */
  client_id?: string | null;
  /** Client Secret */
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
  /** Fundsbycategory */
  fundsByCategory: DashboardFundCategoryApiModel[];
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
  /** Returnlastweekpercent */
  returnLastWeekPercent: number | null;
  /** Returnlastmonthpercent */
  returnLastMonthPercent: number | null;
  /** Returnlast3Monthspercent */
  returnLast3MonthsPercent: number | null;
  /** Returnlastyearpercent */
  returnLastYearPercent: number | null;
  /** Dailyredeemnavmonth */
  dailyRedeemNavMonth: number[] | null;
}

/** DashboardFundCategoryApiModel */
export interface DashboardFundCategoryApiModel {
  /** Title */
  title: string;
  /**
   * Identifier
   * Unique identifier of report category
   */
  identifier: number;
  /** Funds */
  funds: DashboardFundApiModel[];
}

/** DashboardItemApiModel */
export interface DashboardItemApiModel {
  /** Identifier */
  identifier: number;
  /** Order */
  order: number;
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
   * مدیر صنودق
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
   * مدیر صنودق
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
   * دارایی تحت مدیریت (ریال)
   */
  assetUnderManagementRials: number;
  /**
   * Numberofunits
   * تعداد واحد
   */
  numberOfUnits: number;
  /**
   * Returnlastweekpercent
   * بازدهی هفته اخیر
   */
  returnLastWeekPercent: number | null;
  /**
   * Returnlastmonthpercent
   * بازدهی ماه اخیر
   */
  returnLastMonthPercent: number | null;
  /**
   * Returnlast3Monthspercent
   * بازدهی سه ماه اخیر
   */
  returnLast3MonthsPercent: number | null;
  /**
   * Returnlastyearpercent
   * بازدهی سال اخیر
   */
  returnLastYearPercent: number | null;
  /**
   * Returncustomperiodpercent
   * بازدهی بازه دلخواه
   */
  returnCustomPeriodPercent: number | null;
  /**
   * Returnvstedpixlastweekpercent
   * بازدهی به شاخص هفته اخیر
   */
  returnVsTedpixLastWeekPercent: number | null;
  /**
   * Returnvstedpixlastmonthpercent
   * بازدهی به شاخص ماه اخیر
   */
  returnVsTedpixLastMonthPercent: number | null;
  /**
   * Returnvstedpixlast3Monthspercent
   * بازدهی به شاخص سه ماه اخیر
   */
  returnVsTedpixLast3MonthsPercent: number | null;
  /**
   * Returnvstedpixlastyearpercent
   * بازدهی به شاخص سال اخیر
   */
  returnVsTedpixLastYearPercent: number | null;
  /**
   * Returnvstedpixcustomperiodpercent
   * بازدهی به شاخص بازه دلخواه
   */
  returnVsTedpixCustomPeriodPercent: number | null;
  /**
   * Assetallocationbondpercent
   * سهم اوراق از پورتفوی
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
   * میانگین اهرم هفته اخیر
   */
  averageLeverageLastWeek: number | null;
  /**
   * Averageleveragelastmonth
   * میانگین اهرم ماه اخیر
   */
  averageLeverageLastMonth: number | null;
  /**
   * Averageleveragelast3Months
   * میانگین اهرم سه ماه اخیر
   */
  averageLeverageLast3Months: number | null;
  /**
   * Averageleveragelastyear
   * میانگین اهرم سال اخیر
   */
  averageLeverageLastYear: number | null;
  /**
   * Averageleveragecustomperiod
   * میانگین اهرم بازه دلخواه
   */
  averageLeverageCustomPeriod: number | null;
  /**
   * Standarddeviationlastweek
   * انحراف از میانگین هفته اخیر
   */
  standardDeviationLastWeek: number | null;
  /**
   * Standarddeviationlastmonth
   * انحراف از میانگین ماه اخیر
   */
  standardDeviationLastMonth: number | null;
  /**
   * Standarddeviationlast3Month
   * انحراف از میانگین سه ماه اخیر
   */
  standardDeviationLast3Month: number | null;
  /**
   * Standarddeviationlastyear
   * انحراف از میانگین سال اخیر
   */
  standardDeviationLastYear: number | null;
  /**
   * Standarddeviationcustomperiod
   * انحراف از میانگین بازه دلخواه
   */
  standardDeviationCustomPeriod: number | null;
  /**
   * Sharperatiolastweek
   * نسبت شارپی هفته اخیر
   */
  sharpeRatioLastWeek: number | null;
  /**
   * Sharperatiolastmonth
   * نسبت شارپی ماه اخیر
   */
  sharpeRatioLastMonth: number | null;
  /**
   * Sharperatiolast3Months
   * نسبت شارپی سه ماه اخیر
   */
  sharpeRatioLast3Months: number | null;
  /**
   * Sharperatiolastyear
   * نسبت شارپی سال اخیر
   */
  sharpeRatioLastYear: number | null;
  /**
   * Sharperatiocustomperiod
   * نسبت شارپی بازه دلخواه
   */
  sharpeRatioCustomPeriod: number | null;
  /**
   * Informationratiolastweek
   * نسبت اصلاعاتی هفته اخیر
   */
  informationRatioLastWeek: number | null;
  /**
   * Informationratiolastmonth
   * نسبت اصلاعاتی ماه اخیر
   */
  informationRatioLastMonth: number | null;
  /**
   * Informationratiolast3Months
   * نسبت اصلاعاتی سه ماه اخیر
   */
  informationRatioLast3Months: number | null;
  /**
   * Informationratiolastyear
   * نسبت اصلاعاتی سال اخیر
   */
  informationRatioLastYear: number | null;
  /**
   * Informationratiocustomperiod
   * نسبت اصلاعاتی بازه دلخواه
   */
  informationRatioCustomPeriod: number | null;
  /**
   * Alphalastday
   * آلفا روز اخیر
   */
  alphaLastDay: number | null;
  /**
   * Alphalastweek
   * آلفا هفته اخیر
   */
  alphaLastWeek: number | null;
  /**
   * Alphalastmonth
   * آلفا ماه اخیر
   */
  alphaLastMonth: number | null;
  /**
   * Alphalast3Months
   * آلفا سه ماه اخیر
   */
  alphaLast3Months: number | null;
  /**
   * Alphalastyear
   * آلفا سال اخیر
   */
  alphaLastYear: number | null;
  /**
   * Alphacustomperiod
   * آلفا بازه دلخواه
   */
  alphaCustomPeriod: number | null;
  /**
   * Betalastday
   * بتا روز اخیر
   */
  betaLastDay: number | null;
  /**
   * Betalastweek
   * بتا هفته اخیر
   */
  betaLastWeek: number | null;
  /**
   * Betalastmonth
   * بتا ماه اخیر
   */
  betaLastMonth: number | null;
  /**
   * Betalast3Months
   * بتا سه ماه اخیر
   */
  betaLast3Months: number | null;
  /**
   * Betalastyear
   * بتا سال اخیر
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
   * Maxdrawdown3Month
   * بیشترین ریزش سه‌ماهه
   */
  maxDrawdown3Month: number | null;
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
  /** Columnfilter */
  columnFilter:
    | FundTableTabColumnFilterTextDto
    | FundTableTabColumnFilterOptionsDto
    | null;
  /** Columngroupid */
  columnGroupId: number | null;
  /** Customperiodstartjdate */
  customPeriodStartJdate: string | null;
  /** Customperiodendjdate */
  customPeriodEndJdate: string | null;
}

/** FundTableTabColumnFilterOptionDto */
export interface FundTableTabColumnFilterOptionDto {
  /** Identifier */
  identifier: string;
  /** Label */
  label: string;
  /** Selected */
  selected: boolean;
}

/** FundTableTabColumnFilterOptionsDto */
export interface FundTableTabColumnFilterOptionsDto {
  /** Options */
  options: FundTableTabColumnFilterOptionDto[];
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

/** FundTypeApiModel */
export interface FundTypeApiModel {
  /** Identifier */
  identifier: number;
  /** Title */
  title: string;
}

/** FundsTableItemApiModel */
export interface FundsTableItemApiModel {
  info: FundTableItemInfoApiModel;
  /** Pinned */
  pinned: boolean;
  /** Mark */
  mark: string | null;
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

/** MarkFundInTableTabBody */
export interface MarkFundInTableTabBody {
  /** Fund */
  fund: number;
  /** Color */
  color: string;
}

/** MarkFundInTableTabResponseApiModel */
export interface MarkFundInTableTabResponseApiModel {
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

/** UnmarkFundInTableTabBody */
export interface UnmarkFundInTableTabBody {
  /** Fund */
  fund: number;
}

/** UnmarkFundInTableTabResponseApiModel */
export interface UnmarkFundInTableTabResponseApiModel {
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

/** UpdateFundTabColumnsResponseApiModel */
export interface UpdateFundTabColumnsResponseApiModel {
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
  /** Selectedfilter */
  selectedFilter: string | null;
  /** Customperiodstartjdate */
  customPeriodStartJdate: string | null;
  /** Customperiodendjdate */
  customPeriodEndJdate: string | null;
}

/** UpdateFundTableTabColumnsBody */
export interface UpdateFundTableTabColumnsBody {
  /** Columns */
  columns: UpdateFundTableTabColumnItem[];
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
     * @name MarkFundInTableTabFundsTableTabTabMarkPost
     * @summary Mark Fund In Table Tab
     * @request POST:/funds/table/tab/{tab}/mark
     * @secure
     */
    markFundInTableTabFundsTableTabTabMarkPost: (
      tab: number,
      data: MarkFundInTableTabBody,
      params: RequestParams = {},
    ) =>
      this.request<MarkFundInTableTabResponseApiModel, ApiExceptionResponse>({
        path: `/funds/table/tab/${tab}/mark`,
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
     * @name UnmarkFundInTableTabFundsTableTabTabUnmarkPost
     * @summary Unmark Fund In Table Tab
     * @request POST:/funds/table/tab/{tab}/unmark
     * @secure
     */
    unmarkFundInTableTabFundsTableTabTabUnmarkPost: (
      tab: number,
      data: UnmarkFundInTableTabBody,
      params: RequestParams = {},
    ) =>
      this.request<UnmarkFundInTableTabResponseApiModel, ApiExceptionResponse>({
        path: `/funds/table/tab/${tab}/unmark`,
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
  };
}
