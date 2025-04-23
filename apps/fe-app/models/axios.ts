/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** AnonymousApiUser */
export type AnonymousApiUser = object;

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
  value: string;
  /** Uid */
  uid: number;
  /** Required */
  required: boolean;
}

/** CaptchaType */
export enum CaptchaType {
  Image = 'image',
  Audio = 'audio',
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
  identifier: number;
  /** Title */
  title: string;
  category: FinancialReportCategoryApiModel;
  /** Image */
  image: string;
  /** Summary */
  summary: string;
  /** Htmldescription */
  htmlDescription: string | null;
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
}

/** FinancialReportListItemApiModel */
export interface FinancialReportListItemApiModel {
  /**
   * Identifier
   * Unique identifier of report
   */
  identifier: number;
  /** Title */
  title: string;
  category: FinancialReportCategoryApiModel;
  /** Image */
  image: string;
  /** Summary */
  summary: string;
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
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** TokenApiModel */
export interface TokenApiModel {
  /** Access Token */
  access_token: string;
  /** Token Type */
  token_type: string;
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

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/** VideoApiModel */
export interface VideoApiModel {
  /**
   * Identifier
   * Unique identifier of video
   */
  identifier: number;
  /**
   * Mp4Video1080P
   * Url of mp4 video file in 1080p
   */
  mp4Video1080P: string;
  /**
   * Mp4Video1080Psizebytes
   * Size of 1080p mp4 video file in bytes
   */
  mp4Video1080PSizeBytes: number;
  /**
   * Mp4Video720P
   * Url of mp4 video file in 720p
   */
  mp4Video720P: string;
  /**
   * Mp4Video720Psizebytes
   * Size of 720p mp4 video file in bytes
   */
  mp4Video720PSizeBytes: number;
  /**
   * Mp4Video480P
   * Url of mp4 video file in 480p
   */
  mp4Video480P: string;
  /**
   * Mp4Video480Psizebytes
   * Size of 480p mp4 video file in bytes
   */
  mp4Video480PSizeBytes: number;
  /**
   * Mp4Video360P
   * Url of mp4 video file in 360p
   */
  mp4Video360P: string;
  /**
   * Mp4Video360Psizebytes
   * Size of 360p mp4 video file in bytes
   */
  mp4Video360PSizeBytes: number;
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
   * Poster1080P
   * Poster (placeholder) image of video in medium size (1920x1080)
   */
  poster1080P: string;
  /**
   * Poster720P
   * Poster (placeholder) image of video in medium size (1280x720)
   */
  poster720P: string;
  /**
   * Poster480P
   * Poster (placeholder) image of video in medium size (854x480)
   */
  poster480P: string;
  /**
   * Poster360P
   * Poster (placeholder) image of video in medium size (640x360)
   */
  poster360P: string;
  /**
   * Poster240P
   * Poster (placeholder) image of video in medium size (426x240)
   */
  poster240P: string;
  /**
   * Thumbnailimage
   * Thumbnail of video
   */
  thumbnailImage: string;
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

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

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
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
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
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
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

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
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

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
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
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  users = {
    /**
     * @description Get captcha for a user. Captcha can be an **image** or an **audio**, depending on the **captchaType** param. In case of an image, you can also pass **captchaWidth** and **captchaHeight** for customizing the size of generated image.
     *
     * @tags users
     * @name CaptchaForLoginUsersLoginCaptchaGet
     * @summary Captcha For Login
     * @request GET:/users/login_captcha
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
        /**
         * Captchatype
         * @default "image"
         */
        captchaType?: CaptchaType;
      },
      params: RequestParams = {},
    ) =>
      this.request<CaptchaApiModel, HTTPValidationError>({
        path: `/users/login_captcha`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get access token using credentials for users. You must provide solved captcha value (_captcha_) and unique identifier of catpcha (_captchaUid_), along with user credentials (_username_ and _password_).**Important note**: _username_ can be either username, email, phone number or national code of user.
     *
     * @tags users
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
      this.request<TokenApiModel, HTTPValidationError>({
        path: `/users/login`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.UrlEncoded,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get access token using credentials for test user. This method only works for **test** user. For login flow of real users, you must use **login_captcha** and **login** endpoints.
     *
     * @tags users
     * @name TestUserAccessTokenUsersTokenPost
     * @summary Test User Access Token
     * @request POST:/users/token
     */
    testUserAccessTokenUsersTokenPost: (data: BodyTestUserAccessTokenUsersTokenPost, params: RequestParams = {}) =>
      this.request<TokenApiModel, HTTPValidationError>({
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
     * @tags users
     * @name GetCurrentUserUsersMeGet
     * @summary Get Current User
     * @request GET:/users/me
     * @secure
     */
    getCurrentUserUsersMeGet: (params: RequestParams = {}) =>
      this.request<AressApiUser | AnonymousApiUser, any>({
        path: `/users/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  dashboard = {
    /**
     * @description Get list of reports.
     *
     * @tags dashboard
     * @name ReportListDashboardReportsGet
     * @summary Report List
     * @request GET:/dashboard/reports
     * @secure
     */
    reportListDashboardReportsGet: (
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
      this.request<FinancialReportListItemApiModel[], HTTPValidationError>({
        path: `/dashboard/reports`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get list of reports.
     *
     * @tags dashboard
     * @name ReportDetailsDashboardReportsReportIdGet
     * @summary Report Details
     * @request GET:/dashboard/reports/{report_id}
     * @secure
     */
    reportDetailsDashboardReportsReportIdGet: (reportId: number, params: RequestParams = {}) =>
      this.request<FinancialReportDetailsApiModel, HTTPValidationError>({
        path: `/dashboard/reports/${reportId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get list of report categories.
     *
     * @tags dashboard
     * @name ReportCategoriesDashboardReportsCategoriesGet
     * @summary Report Categories
     * @request GET:/dashboard/reports/categories
     */
    reportCategoriesDashboardReportsCategoriesGet: (params: RequestParams = {}) =>
      this.request<FinancialReportCategoryApiModel[], any>({
        path: `/dashboard/reports/categories`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Add a report to favorites
     *
     * @tags dashboard
     * @name AddReportToFavoritesDashboardReportsReportIdFavoritePost
     * @summary Add Report To Favorites
     * @request POST:/dashboard/reports/{report_id}/favorite
     * @secure
     */
    addReportToFavoritesDashboardReportsReportIdFavoritePost: (reportId: number, params: RequestParams = {}) =>
      this.request<UserReportFavoriteStatus, HTTPValidationError>({
        path: `/dashboard/reports/${reportId}/favorite`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Remove a report from favorites
     *
     * @tags dashboard
     * @name RemoveReportFromFavoritesDashboardReportsReportIdFavoriteDelete
     * @summary Remove Report From Favorites
     * @request DELETE:/dashboard/reports/{report_id}/favorite
     * @secure
     */
    removeReportFromFavoritesDashboardReportsReportIdFavoriteDelete: (reportId: number, params: RequestParams = {}) =>
      this.request<UserReportFavoriteStatus, HTTPValidationError>({
        path: `/dashboard/reports/${reportId}/favorite`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
