export interface Meta {
  message?: string | undefined;
  status?: boolean | undefined;
  pagination?: { page: number; total: number; count: number; size: number };
}

export interface ResponseData {
  data: unknown;
  meta: Meta;
}
