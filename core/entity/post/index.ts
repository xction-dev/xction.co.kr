import { ID } from "@core/constant/common/id";
import { z } from "zod";
import { Creatable } from "../utility/creatable";
import { Tag } from "../tag";
import { POST_TYPE } from "@core/constant/post/postType";
import { POST_TEXT } from "@core/constant/post/text";

/**
 * @entity Post
 * @description 커뮤니티 탭에 작성되는 포스트입니다.
 */
export const Post = z
  .object({
    id: ID.POST,
    postType: POST_TYPE,
    title: POST_TEXT.TITLE,
    content: POST_TEXT.CONTENT,
    tags: Tag.array().default([]),
    likesCount: z.number().default(0),
    viewsCount: z.number().default(0),
    commentsCount: z.number().default(0),
  })
  .extend(Creatable.shape);
export type Post = z.infer<typeof Post>;
