/**
 * Transport-level types for the HTTP API. The frontend uses these to type
 * axios responses; the backend uses them to shape controller return values.
 */

/** Standard success envelope returned by the API. */
export interface ApiResponse<T> {
  success: true;
  data: T;
}

/** Standard error envelope returned by the API. */
export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
}

/** A page of results plus the metadata needed to render pagination controls. */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** Query parameters accepted by list endpoints. */
export interface PaginationQuery {
  page?: number;
  pageSize?: number;
}
