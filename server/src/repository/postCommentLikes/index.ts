import { ID, INTEGER_ID } from "@core/constant/common/id";
import { z } from "zod";

export const PostCommentLikesSchema = z.object({
  id: INTEGER_ID,
  userId: ID.USER,
  postCommentId: ID.POST_COMMENT,
});
export type PostCommentLikesSchema = z.infer<typeof PostCommentLikesSchema>;

const COUNT_BY_POST_COMMENT_IDS = (ids: ID["POST_COMMENT"][], name: string) =>
  `
  SELECT postCommentId AS id, count(*) AS ${name} from postCommentLikes where postCommentId in ( ${ids.join(", ")} )
  GROUP BY id
  `;

const COUNT_BY_POST_Comment_ID = (id: ID["POST_COMMENT"], name: string) =>
  `
  SELECT postCommentId AS id, count(*) AS ${name} from postCommentLikes where postCommentId = ${id}
  GROUP BY id
  `;

export const postCommentLikes = {
  schema: PostCommentLikesSchema,
  COUNT_BY_POST_COMMENT_IDS,
  COUNT_BY_POST_Comment_ID,
};
