import { ID, INTEGER_ID } from "@core/constant/common/id";
import { z } from "zod";

export const PostLikesSchema = z.object({
  id: INTEGER_ID,
  userId: ID.USER,
  postId: ID.POST,
});
export type PostLikesSchema = z.infer<typeof PostLikesSchema>;

const COUNT_BY_POST_IDS = (ids: ID["POST"][], name: string) =>
  `
  SELECT postId AS id, count(*) AS ${name} from postLikes where postId in ( ${ids.join(", ")} )
  GROUP BY id
  `;

const COUNT_BY_POST_ID = (id: ID["POST"], name: string) =>
  `
  SELECT postId AS id, count(*) AS ${name} from postLikes where postId = ${id}
  GROUP BY id
  `;

export const postLikes = {
  schema: PostLikesSchema,
  COUNT_BY_POST_IDS,
  COUNT_BY_POST_ID,
};
