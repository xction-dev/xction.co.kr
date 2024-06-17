import { z } from "zod";
import { CreatableSchema } from "../utils/Creatable";

export const PostSchema = z
  .object({
    id: z.number(),
    postTypeId: z.number(),
    title: z.string(),
    content: z.string(),
    viewsCount: z.number(),
  })
  .merge(CreatableSchema);
export type PostSchema = z.infer<typeof PostSchema>;

export const PostCommentSchema = z
  .object({
    id: z.number(),
    content: z.string(),
  })
  .merge(CreatableSchema);
export type PostCommentSchema = z.infer<typeof PostCommentSchema>;
