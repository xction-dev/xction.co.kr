import { z } from "zod";

export const GetPostsConfig = z
  .object({
    pageNumber: z.number().int().nonnegative(),
    orderBy: z.enum(["recent", "view"]),
  })
  .partial();
export type GetPostsConfig = z.infer<typeof GetPostsConfig>;
