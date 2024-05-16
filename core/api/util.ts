import qs from "qs";
import createFetch from "../../library/fetch/common/index";
import { ZodType, z } from "zod";

export const { api, authApi } = createFetch({
  baseUrl: "http://localhost:8080",
});

export const parseQuery = (query?: Record<string, unknown>) =>
  query && Object.keys(query).length > 0 ? "?" + qs.stringify(query) : "";

export const parsePaginatedQuery = <Config extends { pageNumber?: number }>(
  config?: Config,
) => parseQuery({ pageNumber: 1, ...config });

export const Paginated = (data: ZodType) =>
  z.object({
    items: data.array(),
    maxPageNumber: z.number().int().nonnegative(),
  });
export type Paginated<T> = { items: T[]; maxPageNumber: number };
