import { ID, INTEGER_ID } from "@core/constant/common/id";
import { POST_TYPE } from "@core/constant/post/postType";
import { POST_TEXT } from "@core/constant/post/text";
import { z } from "zod";
import { as, oneLine } from "../util";
import { postTypes } from "./postTypes";

export const PostsSchema = z.object({
  id: ID.POST,
  postType: postTypes.schema.shape.value,
  title: POST_TEXT.TITLE,
  content: POST_TEXT.CONTENT.nullable(),
  viewsCount: z.number(),
  createdTime: z.date(),
  lastModifiedTime: z.date().nullable(),
});
export type PostsSchema = z.infer<typeof PostsSchema>;

export const PostTypeEnum = z.object({
  id: INTEGER_ID,
  value: POST_TYPE,
});
export type PostTypeEnum = z.infer<typeof PostTypeEnum>;

const SELECT = (config?: { name?: string }) => {
  const { name } = config || {};
  return oneLine(`
    posts.id${as("id", name)}, 
    postTypes.value${as("postType", name, true)},
    posts.title${as("title", name)}, 
    posts.content${as("content", name)}, 
    posts.viewsCount${as("viewsCount", name)}, 
    posts.createdTime${as("createdTime", name)},
    posts.lastModifiedTime${as("lastModifiedTime", name)}
  `);
};

const FROM = () => `posts
  LEFT JOIN postTypes ON posts.postTypeId = postTypes.id
`;

export const posts = { schema: PostsSchema, SELECT, FROM };
