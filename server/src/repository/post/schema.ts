import { ID, INTEGER_ID } from "@core/constant/common/id";
import { POST_TYPE } from "@core/constant/post/postType";
import { POST_TEXT } from "@core/constant/post/text";
import { z } from "zod";

export const PostTypeEnum = z.object({
  id: INTEGER_ID,
  value: POST_TYPE,
});
export type PostTypeEnum = z.infer<typeof PostTypeEnum>;

export const PostSchema = z.object({
  ID: ID.POST,
  POST_TYPE_ID: PostTypeEnum.shape.id,
  TITLE: POST_TEXT.TITLE,
  CONTENT: POST_TEXT.CONTENT,
});
export type PostSchema = z.infer<typeof PostSchema>;
