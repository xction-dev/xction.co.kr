import { ID, INTEGER_ID } from "@core/constant/common/id";
import { POST_COMMENT_TEXT } from "@core/constant/post/text";
import { z } from "zod";
import { as, oneLine } from "../util";

export const PostCommentsSchema = z.object({
  id: INTEGER_ID,
  postId: ID.POST,
  content: POST_COMMENT_TEXT.content,
  createdTime: z.date(),
  lastModifiedTime: z.date().nullable(),
});
export type PostCommentsSchema = z.infer<typeof PostCommentsSchema>;

const SELECT = (config?: { name?: string }) => {
  const { name } = config || {};
  return oneLine(`
    postComments.id${as("id", name)}, 
    postComments.content${as("content", name)}, 
    postComments.createdTime${as("createdTime", name)},
    postComments.lastModifiedTime${as("lastModifiedTime", name)}

  `);
};

const FROM_POST_ID = (id?: ID["POST"]) => {
  return `postComments ${id ? `WHERE postComments.postId = ${id}` : ""}`;
};

const COUNT_BY_POST_IDS = (ids: ID["POST"][], name: string) =>
  `
  SELECT postId AS id, count(*) AS ${name} from postComments where postId in ( ${ids.join(", ")} )
  GROUP BY id
  `;

const COUNT_BY_POST_ID = (id: ID["POST"], name: string) =>
  `
  SELECT postId AS id, count(*) AS ${name} from postComments where postId = ${id}
  GROUP BY id
  `;

export const postComments = {
  schema: PostCommentsSchema,
  SELECT,
  FROM_POST_ID,
  COUNT_BY_POST_IDS,
  COUNT_BY_POST_ID,
};
