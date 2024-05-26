import qs from "qs";
import { ZodType, z } from "zod";

export const parseQuery = (query?: Record<string, unknown>) =>
  query && Object.keys(query).length > 0 ? "?" + qs.stringify(query) : "";

export const parsePaginatedQuery = <Config extends { pageNumber?: number }>(
  config?: Config,
) => parseQuery({ pageNumber: 1, ...config });

export const Paginated = <T>(data: ZodType<T>) =>
  z.object({ items: data.array() });
export type Paginated<T> = { items: T[] };
