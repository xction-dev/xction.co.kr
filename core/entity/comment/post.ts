import { ID } from "@core/constant/common/id";
import { z } from "zod";
import { Creatable } from "../utility/creatable";

/**
 * @entity PostReply
 * @description 커뮤니티 탭에 달리는 대댓글입니다.
 */
export const PostReply = z
  .object({
    id: ID.POST_REPLY,
    content: z.string().min(1),
  })
  .extend(Creatable.shape);
export type PostReply = z.infer<typeof PostReply>;

/**
 * @entity PostComment
 * @description 커뮤니티 탭에 달리는 댓글입니다. (임시)
 */
export const PostComment = z
  .object({
    id: ID.POST_COMMENT,
    content: z.string().min(1),
    likesCount: z.number().int().nonnegative(),
  })
  .extend(Creatable.shape);
export type PostComment = z.infer<typeof PostComment>;
