import { ID } from "@core/constant/common/id";
import { z } from "zod";
import { Creatable } from "../utility/creatable";
import { Tag } from "../tag";
import { POST_TYPE } from "@core/constant/post/postType";

/**
 * @entity Post
 * @description 커뮤니티 탭에 작성되는 포스트입니다.
 */
export const Post = z
  .object({
    id: ID.POST,
    title: z.string().min(1).max(100),
    content: z.string().min(1),
    postType: POST_TYPE,
    tags: Tag.array(),
    likesCount: z.number().int().nonnegative(),
    viewsCount: z.number().int().nonnegative(),
    commentsCount: z.number().int().nonnegative(),
  })
  .extend(Creatable.shape);
export type Post = z.infer<typeof Post>;
