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

export interface ActivateUserCommand {
  code?: string | null;
  username?: string | null;
}

export interface AdminBlogCategoryDto {
  /** @format int64 */
  id?: number;
  title?: string | null;
  imageUrl?: string | null;
}

export interface AdminBlogPostApprovalDto {
  createdAt?: string | null;
  comment?: string | null;
  reviewAt?: string | null;
  state?: BlogPostApprovalStatus;
}

export interface AdminBlogPostDetailsDto {
  title?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  slug?: string | null;
  summary?: string | null;
  coverImageUrl?: string | null;
  /** @format int64 */
  categoryId?: number;
}

export interface AdminBlogPostDto {
  /** @format int64 */
  id?: number;
  createdAt?: string | null;
  lastModified?: string | null;
  title?: string | null;
  published?: boolean;
  thumbnailUrl?: string | null;
  author?: string | null;
  state?: BlogPostApprovalStatus;
  category?: string | null;
}

export interface AdminBlogPostDtoPaging {
  /** @format int32 */
  count?: number;
  data?: AdminBlogPostDto[] | null;
}

export interface AdminCouponDto {
  code?: string | null;
  /** @format int32 */
  usageLimit?: number;
}

export interface AdminCourseCategoryDto {
  /** @format int64 */
  id?: number;
  title?: string | null;
  enTitle?: string | null;
  imageUrl?: string | null;
}

export interface AdminCreateBlogCategoryDto {
  title?: string | null;
  metaTitle?: string | null;
  slug?: string | null;
  description?: string | null;
  metaDescription?: string | null;
  /** @format binary */
  image?: File | null;
}

export interface AdminCreateBlogPostApprovalDto {
  /** @format int64 */
  postId?: number;
  status?: BlogPostApprovalStatus;
  comment?: string | null;
}

export interface AdminCreateBlogPostDto {
  title?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  slug?: string | null;
  summary?: string | null;
  /** @format binary */
  coverImage?: File | null;
  /** @format int64 */
  categoryId?: number;
}

export interface AdminCreateCourseCategoryDto {
  title?: string | null;
  enTitle?: string | null;
  metaTitle?: string | null;
  slug?: string | null;
  description?: string | null;
  metaDescription?: string | null;
  /** @format binary */
  image?: File | null;
}

export interface AdminCreateDiscountDto {
  name?: string | null;
  /** @format double */
  value?: number;
  type?: DiscountType;
  /** @format date-time */
  validFrom?: string;
  /** @format date-time */
  validUntil?: string;
  description?: string | null;
  courseIds?: number[] | null;
  coupon?: AdminCouponDto;
  userIds?: string[] | null;
}

export interface AdminDiscountDto {
  /** @format int64 */
  id?: number;
  name?: string | null;
  /** @format double */
  value?: number;
  type?: string | null;
  validFrom?: string | null;
  validUntil?: string | null;
}

export interface AdminFullBlogCategoryDto {
  /** @format int64 */
  id?: number;
  title?: string | null;
  metaTitle?: string | null;
  slug?: string | null;
  description?: string | null;
  metaDescription?: string | null;
  imageUrl?: string | null;
}

export interface AdminFullCourseCategoryDto {
  /** @format int64 */
  id?: number;
  title?: string | null;
  enTitle?: string | null;
  metaTitle?: string | null;
  slug?: string | null;
  description?: string | null;
  metaDescription?: string | null;
  imageUrl?: string | null;
}

export interface AdminFullDiscountDto {
  /** @format int64 */
  id?: number;
  name?: string | null;
  /** @format double */
  value?: number;
  type?: DiscountType;
  /** @format date-time */
  validFrom?: string;
  /** @format date-time */
  validUntil?: string;
  description?: string | null;
}

export interface AdminUpdateBlogCategoryDto {
  /** @format int64 */
  id?: number;
  title?: string | null;
  metaTitle?: string | null;
  slug?: string | null;
  description?: string | null;
  metaDescription?: string | null;
  /** @format binary */
  image?: File | null;
}

export interface AdminUpdateBlogPostBodyDto {
  /** @format int64 */
  id?: number;
  body?: string | null;
}

export interface AdminUpdateBlogPostDto {
  /** @format int64 */
  id?: number;
  title?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  slug?: string | null;
  summary?: string | null;
  /** @format binary */
  coverImage?: File | null;
  /** @format int64 */
  categoryId?: number;
}

export interface AdminUpdateCourseCategoryDto {
  /** @format int64 */
  id?: number;
  title?: string | null;
  enTitle?: string | null;
  metaTitle?: string | null;
  slug?: string | null;
  description?: string | null;
  metaDescription?: string | null;
  /** @format binary */
  image?: File | null;
}

export interface AdminUpdateDiscountDto {
  /** @format int64 */
  id?: number;
  name?: string | null;
  /** @format double */
  value?: number;
  type?: DiscountType;
  /** @format date-time */
  validFrom?: string;
  /** @format date-time */
  validUntil?: string;
  description?: string | null;
}

/** @format int32 */
export enum BlogPostApprovalStatus {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
  Value6 = 6,
}

export interface BlogPostSummary {
  title?: string | null;
  slug?: string | null;
  postDate?: string | null;
  thumbnailUrl?: string | null;
  /** @format int32 */
  studyTime?: number;
  isNew?: boolean;
  /** @format int32 */
  numberOfViews?: number;
  author?: string | null;
  /** @format int32 */
  numberOfComments?: number;
  summary?: string | null;
  category?: string | null;
}

export interface Cart {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string | null;
  /** @format date-time */
  completedAt?: string | null;
  userId?: string | null;
  idempotencyKey?: string | null;
  lineItems?: LineItem[] | null;
}

export interface CourseCardDTO {
  /** @format int64 */
  id?: number;
  title?: string | null;
  /** @format int64 */
  courseCategoryId?: number;
  duration?: string | null;
  level?: string | null;
  levelNumber?: CourseLevel;
  /** @format int32 */
  averageReviewRating?: number | null;
  /** @format int32 */
  numOfReviews?: number | null;
  /** @format int64 */
  coverImageId?: number | null;
  recordStatus?: string | null;
  slug?: string | null;
  subTitle?: string | null;
  isFree?: boolean;
  /** @format double */
  basePrice?: number;
  /** @format double */
  discountedPrice?: number | null;
  /** @format int32 */
  discountRemainingTime?: number | null;
  discountType?: DiscountType;
}

export interface CourseCommentDTO {
  data?: CourseComments[] | null;
  /** @format int32 */
  nextPage?: number | null;
}

export interface CourseComments {
  /** @format int64 */
  id?: number;
  date?: string | null;
  /** @format int64 */
  userId?: number | null;
  fullName?: string | null;
  commentText?: string | null;
  /** @format int32 */
  score?: number | null;
  isResponse?: boolean;
}

export interface CourseDetailsCurriculumDTO {
  /** @format int64 */
  id?: number;
  title?: string | null;
  /** @format int32 */
  numOfLectures?: number;
  duration?: string | null;
  lectures?: CourseDetailsLectureDTO[] | null;
}

export interface CourseDetailsDTO {
  /** @format int64 */
  id?: number;
  title?: string | null;
  slug?: string | null;
  /** @format double */
  basePrice?: number | null;
  /** @format int32 */
  numberOfLectures?: number;
  level?: string | null;
  levelNumber?: CourseLevel;
  /** @format int32 */
  numOfStudents?: number;
  duration?: string | null;
  isDownloadable?: boolean;
  /** @format int32 */
  numOfReviews?: number | null;
  isFree?: boolean;
  subTitle?: string | null;
  /** @format int32 */
  averageReviewRating?: number | null;
  /** @format int64 */
  profileImageId?: number | null;
  authorName?: string | null;
  recordStatus?: string | null;
  authorSpecialty?: string | null;
  videoUrl?: string | null;
  /** @format int64 */
  coverImageId?: number | null;
  description?: string | null;
  showWithSpotPlayer?: boolean;
  downloadLink?: string | null;
  excerciseFileUrl?: string | null;
  frequentlyAskedQuestions?: CourseDetailsFAQDTO[] | null;
}

export interface CourseDetailsFAQDTO {
  /** @format int64 */
  id?: number;
  question?: string | null;
  answer?: string | null;
}

export interface CourseDetailsLectureDTO {
  title?: string | null;
  duration?: string | null;
  description?: string | null;
  videoSize?: string | null;
}

/** @format int32 */
export enum CourseLevel {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
}

export interface CourseNameDTO {
  /** @format int64 */
  id?: number;
  title?: string | null;
}

export interface CreateBlogPostCommentDto {
  /** @format int64 */
  postId?: number;
  /** @format int64 */
  parentId?: number | null;
  content?: string | null;
}

export interface CreateCourseComment {
  commentText?: string | null;
  /** @format int32 */
  score?: number | null;
  courseSlug?: string | null;
  /** @format int64 */
  parentId?: number | null;
}

export interface CreateLineItemDto {
  /** @format int32 */
  courseId?: number;
  /** @format int32 */
  licenseQuantity?: number;
}

export interface DashboardSummaryDto {
  spotPlayerLicense?: string | null;
}

export interface DiscountDto {
  description?: string | null;
  /** @format double */
  percent?: number;
  courses?: CourseNameDTO[] | null;
  type?: DiscountType;
  coupon?: string | null;
  /** @format int32 */
  duration?: number;
}

/** @format int32 */
export enum DiscountType {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
}

export interface EnrolledCourseDTO {
  /** @format int64 */
  id?: number;
  title?: string | null;
  subTitle?: string | null;
  duration?: string | null;
  level?: string | null;
  levelNumber?: CourseLevel;
  /** @format int64 */
  coverImageId?: number | null;
  recordStatus?: string | null;
  slug?: string | null;
  showWithSpotPlayer?: boolean;
  isFree?: boolean;
}

export interface GridifyQuery {
  /** @format int32 */
  page?: number;
  /** @format int32 */
  pageSize?: number;
  orderBy?: string | null;
  filter?: string | null;
}

export interface LineItem {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  cartId?: number;
  /** @format int32 */
  courseId?: number;
  /** @format int32 */
  licenseQuantity?: number;
}

export interface SearchUserQuery {
  term?: string | null;
}

export interface SearchUserResponseDTO {
  id?: string | null;
  response?: string | null;
}

export interface SendActivationCodeQuery {
  mobile?: string | null;
}

export interface SignInCommand {
  mobile?: string | null;
}

export interface UpdateProfileCommand {
  email?: string | null;
  firstName?: string | null;
  surName?: string | null;
}

export interface UserInfo {
  token?: string | null;
  refreshToken?: string | null;
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
 * @title Classbon App
 * @version v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Admin Blog
     * @name AdminBlogListCreate
     * @request POST:/api/admin/blog/list
     * @secure
     */
    adminBlogListCreate: (data: GridifyQuery, params: RequestParams = {}) =>
      this.request<AdminBlogPostDtoPaging, any>({
        path: `/api/admin/blog/list`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Blog
     * @name AdminBlogDetail
     * @request GET:/api/admin/blog/{postId}
     * @secure
     */
    adminBlogDetail: (postId: number, params: RequestParams = {}) =>
      this.request<AdminBlogPostDetailsDto, any>({
        path: `/api/admin/blog/${postId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Blog
     * @name AdminBlogDelete
     * @request DELETE:/api/admin/blog/{postId}
     * @secure
     */
    adminBlogDelete: (postId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/admin/blog/${postId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Blog
     * @name AdminBlogCreate
     * @request POST:/api/admin/blog
     * @secure
     */
    adminBlogCreate: (
      data: {
        model: AdminCreateBlogPostDto;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/admin/blog`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Blog
     * @name AdminBlogUpdate
     * @request PUT:/api/admin/blog
     * @secure
     */
    adminBlogUpdate: (
      data: {
        model: AdminUpdateBlogPostDto;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/admin/blog`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Blog
     * @name AdminBlogBodyCreate
     * @request POST:/api/admin/blog/body
     * @secure
     */
    adminBlogBodyCreate: (data: AdminUpdateBlogPostBodyDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/admin/blog/body`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Blog
     * @name AdminBlogBodyDetail
     * @request GET:/api/admin/blog/body/{postId}
     * @secure
     */
    adminBlogBodyDetail: (postId: number, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/admin/blog/body/${postId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Blog
     * @name AdminBlogPostApprovalCreate
     * @request POST:/api/admin/blog/post-approval
     * @secure
     */
    adminBlogPostApprovalCreate: (data: AdminCreateBlogPostApprovalDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/admin/blog/post-approval`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Blog
     * @name AdminBlogPostUnderReviewCreate
     * @request POST:/api/admin/blog/post-under-review/{postId}
     * @secure
     */
    adminBlogPostUnderReviewCreate: (postId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/admin/blog/post-under-review/${postId}`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Blog
     * @name AdminBlogPostApprovalsDetail
     * @request GET:/api/admin/blog/post-approvals/{postId}
     * @secure
     */
    adminBlogPostApprovalsDetail: (postId: number, params: RequestParams = {}) =>
      this.request<AdminBlogPostApprovalDto[], any>({
        path: `/api/admin/blog/post-approvals/${postId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Blog Category
     * @name AdminBlogCategoryListList
     * @request GET:/api/admin/blog/category/list
     * @secure
     */
    adminBlogCategoryListList: (params: RequestParams = {}) =>
      this.request<AdminBlogCategoryDto[], any>({
        path: `/api/admin/blog/category/list`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Blog Category
     * @name AdminBlogCategoryDetail
     * @request GET:/api/admin/blog/category/{id}
     * @secure
     */
    adminBlogCategoryDetail: (id: number, params: RequestParams = {}) =>
      this.request<AdminFullBlogCategoryDto, any>({
        path: `/api/admin/blog/category/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Blog Category
     * @name AdminBlogCategoryDelete
     * @request DELETE:/api/admin/blog/category/{categoryId}
     * @secure
     */
    adminBlogCategoryDelete: (categoryId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/admin/blog/category/${categoryId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Blog Category
     * @name AdminBlogCategoryCreate
     * @request POST:/api/admin/blog/category
     * @secure
     */
    adminBlogCategoryCreate: (
      data: {
        model: AdminCreateBlogCategoryDto;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/admin/blog/category`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Blog Category
     * @name AdminBlogCategoryUpdate
     * @request PUT:/api/admin/blog/category
     * @secure
     */
    adminBlogCategoryUpdate: (
      data: {
        model: AdminUpdateBlogCategoryDto;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/admin/blog/category`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Discount
     * @name AdminDiscountListList
     * @request GET:/api/admin/discount/list
     * @secure
     */
    adminDiscountListList: (params: RequestParams = {}) =>
      this.request<AdminDiscountDto[], any>({
        path: `/api/admin/discount/list`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Discount
     * @name AdminDiscountDetail
     * @request GET:/api/admin/discount/{id}
     * @secure
     */
    adminDiscountDetail: (id: number, params: RequestParams = {}) =>
      this.request<AdminFullDiscountDto, any>({
        path: `/api/admin/discount/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Discount
     * @name AdminDiscountDelete
     * @request DELETE:/api/admin/discount/{discountId}
     * @secure
     */
    adminDiscountDelete: (discountId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/admin/discount/${discountId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Discount
     * @name AdminDiscountCreate
     * @request POST:/api/admin/discount
     * @secure
     */
    adminDiscountCreate: (data: AdminCreateDiscountDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/admin/discount`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin Discount
     * @name AdminDiscountUpdate
     * @request PUT:/api/admin/discount
     * @secure
     */
    adminDiscountUpdate: (data: AdminUpdateDiscountDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/admin/discount`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Blog
     * @name BlogNewestDetail
     * @request GET:/api/blog/newest/{count}
     * @secure
     */
    blogNewestDetail: (count: number, params: RequestParams = {}) =>
      this.request<BlogPostSummary[], any>({
        path: `/api/blog/newest/${count}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Blog
     * @name BlogCommentCreate
     * @request POST:/api/blog/comment
     * @secure
     */
    blogCommentCreate: (data: CreateBlogPostCommentDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/blog/comment`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Blog
     * @name BlogCommentDelete
     * @request DELETE:/api/blog/comment/{commentId}
     * @secure
     */
    blogCommentDelete: (commentId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/blog/comment/${commentId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartGetCartList
     * @request GET:/api/cart/get-cart
     * @secure
     */
    cartGetCartList: (params: RequestParams = {}) =>
      this.request<Cart, any>({
        path: `/api/cart/get-cart`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartCreateCartCreate
     * @request POST:/api/cart/create-cart
     * @secure
     */
    cartCreateCartCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/cart/create-cart`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartCompleteUpdate
     * @request PUT:/api/cart/{cartId}/complete
     * @secure
     */
    cartCompleteUpdate: (cartId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/cart/${cartId}/complete`,
        method: 'PUT',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartLineItemsCreate
     * @request POST:/api/cart/{cartId}/line-items
     * @secure
     */
    cartLineItemsCreate: (cartId: number, data: CreateLineItemDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/cart/${cartId}/line-items`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartLineItemsDelete
     * @request DELETE:/api/cart/line-items/{lineId}
     * @secure
     */
    cartLineItemsDelete: (lineId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/cart/line-items/${lineId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartCountItemsList
     * @request GET:/api/cart/count-items
     * @secure
     */
    cartCountItemsList: (params: RequestParams = {}) =>
      this.request<number, any>({
        path: `/api/cart/count-items`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name SigninCreate
     * @request POST:/api/signin
     * @secure
     */
    signinCreate: (data: SignInCommand, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/signin`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name VerifyCreate
     * @request POST:/api/verify
     * @secure
     */
    verifyCreate: (data: ActivateUserCommand, params: RequestParams = {}) =>
      this.request<UserInfo, any>({
        path: `/api/verify`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name SendAuthCodeCreate
     * @request POST:/api/send-auth-code
     * @secure
     */
    sendAuthCodeCreate: (data: SendActivationCodeQuery, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/send-auth-code`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name SetProfileImageCreate
     * @request POST:/api/set-profile-image
     * @secure
     */
    setProfileImageCreate: (
      data: {
        /** @format binary */
        profileImage: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<number, any>({
        path: `/api/set-profile-image`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name RemoveProfileImageDelete
     * @request DELETE:/api/remove-profile-image
     * @secure
     */
    removeProfileImageDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/remove-profile-image`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name UpdateProfileCreate
     * @request POST:/api/update-profile
     * @secure
     */
    updateProfileCreate: (data: UpdateProfileCommand, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/update-profile`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name CoursesNewestDetail
     * @request GET:/api/courses/newest/{count}
     * @secure
     */
    coursesNewestDetail: (count: number, params: RequestParams = {}) =>
      this.request<CourseCardDTO[], any>({
        path: `/api/courses/newest/${count}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name CoursesSlugsList
     * @request GET:/api/courses/slugs
     * @secure
     */
    coursesSlugsList: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/api/courses/slugs`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name CoursesDetail
     * @request GET:/api/courses/{slug}
     * @secure
     */
    coursesDetail: (slug: string, params: RequestParams = {}) =>
      this.request<CourseDetailsDTO, any>({
        path: `/api/courses/${slug}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name CoursesCommentsDetail
     * @request GET:/api/courses/{slug}/comments
     * @secure
     */
    coursesCommentsDetail: (
      slug: string,
      query: {
        /** @format int32 */
        page: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CourseCommentDTO, any>({
        path: `/api/courses/${slug}/comments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name CoursesCurriculumDetail
     * @request GET:/api/courses/{slug}/curriculum
     * @secure
     */
    coursesCurriculumDetail: (slug: string, params: RequestParams = {}) =>
      this.request<CourseDetailsCurriculumDTO[], any>({
        path: `/api/courses/${slug}/curriculum`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name CoursesAddCommentCreate
     * @request POST:/api/courses/add-comment
     * @secure
     */
    coursesAddCommentCreate: (data: CreateCourseComment, params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/api/courses/add-comment`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name CoursesIsEnrolledDetail
     * @request GET:/api/courses/{slug}/is-enrolled
     * @secure
     */
    coursesIsEnrolledDetail: (slug: string, params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/api/courses/${slug}/is-enrolled`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name CoursesEnrolledCoursesList
     * @request GET:/api/courses/enrolled-courses
     * @secure
     */
    coursesEnrolledCoursesList: (params: RequestParams = {}) =>
      this.request<EnrolledCourseDTO[], any>({
        path: `/api/courses/enrolled-courses`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name CoursesAllList
     * @request GET:/api/courses/all
     * @secure
     */
    coursesAllList: (params: RequestParams = {}) =>
      this.request<CourseNameDTO[], any>({
        path: `/api/courses/all`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Classbon.API
     * @name PictureDetail
     * @request GET:/api/picture/{id}
     * @secure
     */
    pictureDetail: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/picture/${id}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course Category
     * @name AdminCourseCategoryListList
     * @request GET:/api/admin/course-category/list
     * @secure
     */
    adminCourseCategoryListList: (params: RequestParams = {}) =>
      this.request<AdminCourseCategoryDto[], any>({
        path: `/api/admin/course-category/list`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course Category
     * @name AdminCourseCategoryDetail
     * @request GET:/api/admin/course-category/{id}
     * @secure
     */
    adminCourseCategoryDetail: (id: number, params: RequestParams = {}) =>
      this.request<AdminFullCourseCategoryDto, any>({
        path: `/api/admin/course-category/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course Category
     * @name AdminCourseCategoryDelete
     * @request DELETE:/api/admin/course-category/{categoryId}
     * @secure
     */
    adminCourseCategoryDelete: (categoryId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/admin/course-category/${categoryId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course Category
     * @name AdminCourseCategoryCreate
     * @request POST:/api/admin/course-category
     * @secure
     */
    adminCourseCategoryCreate: (
      data: {
        model: AdminCreateCourseCategoryDto;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/admin/course-category`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course Category
     * @name AdminCourseCategoryUpdate
     * @request PUT:/api/admin/course-category
     * @secure
     */
    adminCourseCategoryUpdate: (
      data: {
        model: AdminUpdateCourseCategoryDto;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/admin/course-category`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboard
     * @name DashboardSummaryList
     * @request GET:/api/dashboard/summary
     * @secure
     */
    dashboardSummaryList: (params: RequestParams = {}) =>
      this.request<DashboardSummaryDto, any>({
        path: `/api/dashboard/summary`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Discount
     * @name DiscountActiveList
     * @request GET:/api/discount/active
     * @secure
     */
    discountActiveList: (params: RequestParams = {}) =>
      this.request<DiscountDto, any>({
        path: `/api/discount/active`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exceptions
     * @name BadRequestCreate
     * @request POST:/api/bad-request
     * @secure
     */
    badRequestCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/bad-request`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exceptions
     * @name UnauthorizedExeptionCreate
     * @request POST:/api/unauthorized-exeption
     * @secure
     */
    unauthorizedExeptionCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/unauthorized-exeption`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exceptions
     * @name UnhandledExceptionCreate
     * @request POST:/api/unhandled-exception
     * @secure
     */
    unhandledExceptionCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/unhandled-exception`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exceptions
     * @name ValidationErrorCreate
     * @request POST:/api/validation-error
     * @secure
     */
    validationErrorCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/validation-error`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserSearchCreate
     * @request POST:/api/user/search/{term}
     * @secure
     */
    userSearchCreate: (term: string, data: SearchUserQuery, params: RequestParams = {}) =>
      this.request<SearchUserResponseDTO[], any>({
        path: `/api/user/search/${term}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
}
