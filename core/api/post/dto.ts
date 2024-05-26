import { POST_COMMENT_TEXT, POST_TEXT } from "@core/constant/post/text";
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
  pageNumber: z.coerce.number().int().nonnegative().default(1),
  orderBy: z.enum(["recent", "view"]).default("recent"),
});
export type GetPostsQueryDto = z.infer<typeof GetPostsQueryDto>;

/*
 * Body DTO
 */
export const PostPostBodyDto = z.object({
  title: POST_TEXT.TITLE,
  content: POST_TEXT.CONTENT,
});
export type PostPostBodyDto = z.infer<typeof PostPostBodyDto>;

export const PostPostCommentBodyDto = z.object({
  content: POST_COMMENT_TEXT.content,
});
export type PostPostCommentBodyDto = z.infer<typeof PostPostCommentBodyDto>;
