import qs from "qs";
import createFetch from "../../library/fetch/common/index";
import { ZodType, z } from "zod";

export const { api, authApi } = createFetch({
  baseUrl: "http://localhost:8080",
});

export const parseConfig = (config?: Record<string, unknown>) =>
  config && Object.keys(config).length > 0 ? "?" + qs.stringify(config) : "";

export const parsePaginatedConfig = <Config extends { pageNumber?: number }>(
  config?: Config,
) => parseConfig({ pageNumber: 1, ...config });

export const Paginated = (data: ZodType) =>
  z.object({
    items: data.array(),
    maxPageNumber: z.number().int().nonnegative(),
  });
