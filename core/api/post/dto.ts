import { Post } from "@core/entity/post";
import { z } from "zod";

/*
 * Base DTO
 */
export const PostDto = Post.omit({ tags: true });
export type PostDto = z.infer<typeof PostDto>;

/*
 * Query DTO
 */
export const GetPostsQueryDto = z.object({
  pageNumber: z.number().int().nonnegative().default(1),
  orderBy: z.enum(["recent", "view"]).default("recent"),
});
export type GetPostsQueryDto = z.infer<typeof GetPostsQueryDto>;

/*
 * Body DTO
 */
